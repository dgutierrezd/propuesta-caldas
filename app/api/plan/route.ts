import { NextResponse } from 'next/server'
import https from 'node:https'
import type { PlanRequest, PlanResponse, PlanDay, PlanItem } from '@/lib/plan'

/* ============================================================================
 * GENERADOR DE PLAN REAL — Caldas es Natural
 * ----------------------------------------------------------------------------
 * Arma un itinerario día por día con contenido REAL del catálogo WordPress de
 * https://esnatural.caldas.gov.co usando su API REST pública (solo lectura).
 *
 * DESCUBRIMIENTO DE LA API (verificado con curl sobre wp-json/wp/v2):
 *   Custom post types: destinos(27=municipios), experiencia(47), prestadores(841),
 *   rutas(7), pit.
 *   - `experiencia`  → taxonomías: `zonas` (municipio + región) y `tipo_de_experiencia`.
 *       Campos clave: title.rendered, link, featured_media, zonas:[ids], tipo_de_experiencia:[ids].
 *   - `prestadores`  → taxonomías: `zonas` y `categorias_servicios`
 *       (18=Gastronomía, 19=Alojamiento, 20=Agencias). Muchos SIN imagen destacada.
 *   - Con `?_embed` llega la imagen destacada (_embedded['wp:featuredmedia'][0].source_url)
 *     y los términos de taxonomía (_embedded['wp:term']) en una sola llamada.
 *   - `zonas` mezcla municipios (ej. manizales=13) y regiones (occidente=9, norte=11…);
 *     un ítem suele tener [municipioId, regionId].
 *
 * SSL: el host tiene la cadena de certificados incompleta ("unable to verify the
 * first certificate"). curl funciona pero fetch de Node falla. Al ser una API
 * PÚBLICA de gobierno y SOLO LECTURA, usamos un dispatcher undici que no verifica
 * el certificado ÚNICAMENTE para estas llamadas GET. No se envían credenciales.
 * ==========================================================================*/

export const runtime = 'nodejs'

const API = 'https://esnatural.caldas.gov.co/wp-json/wp/v2'

// Ver nota SSL arriba. Agente https de Node que NO verifica la cadena de
// certificados, usado SOLO para estos GET públicos de gobierno (sin credenciales).
const insecureAgent = new https.Agent({ rejectUnauthorized: false })

/* --- Mapa municipio(slug del demo) → id de taxonomía `zonas` (verificado) --- */
const ZONA_ID: Record<string, number> = {
  aguadas: 44, anserma: 59, aranzazu: 42, belalcazar: 15, chinchina: 35,
  filadelfia: 45, 'la-dorada': 41, 'la-merced': 46, manizales: 13, manzanares: 54,
  marmato: 52, marquetalia: 55, marulanda: 53, neira: 16, norcasia: 14,
  pacora: 43, palestina: 37, pensilvania: 56, riosucio: 49, risaralda: 57,
  salamina: 38, samana: 40, 'san-jose': 39, supia: 48, victoria: 17,
  villamaria: 73, viterbo: 58,
}
const ZONA_LABEL: Record<string, string> = {
  aguadas: 'Aguadas', anserma: 'Anserma', aranzazu: 'Aranzazu', belalcazar: 'Belalcázar',
  chinchina: 'Chinchiná', filadelfia: 'Filadelfia', 'la-dorada': 'La Dorada',
  'la-merced': 'La Merced', manizales: 'Manizales', manzanares: 'Manzanares',
  marmato: 'Marmato', marquetalia: 'Marquetalia', marulanda: 'Marulanda', neira: 'Neira',
  norcasia: 'Norcasia', pacora: 'Pácora', palestina: 'Palestina', pensilvania: 'Pensilvania',
  riosucio: 'Riosucio', risaralda: 'Risaralda', salamina: 'Salamina', samana: 'Samaná',
  'san-jose': 'San José', supia: 'Supía', victoria: 'Victoria', villamaria: 'Villamaría',
  viterbo: 'Viterbo',
}

/* --- Mapa interés del demo → ids de taxonomía `tipo_de_experiencia` (verificado) --- */
const INTEREST_TIPO: Record<string, number[]> = {
  cafe: [102, 86, 98, 100],        // Experiencia Cafetera, Experiencias cafeteras, Paisaje Cultural Cafetero, Agroturismo
  termales: [103, 104, 67, 105],   // Termalismo, Spa, Bienestar, Meditación
  senderismo: [81, 80, 71, 83],    // Hiking, Trekking, Naturaleza y aventura, Áreas Protegidas
  aventura: [76, 78, 77, 79, 71],  // Deportes extremos, Canyoning, Body Rafting, Bicimontañismo, Naturaleza y aventura
  cultura: [70, 93, 89, 90, 88],   // Cultura, Pueblos Patrimonio, Turismo Arquitectónico, Centro Histórico, Turismo Religioso
  gastronomia: [91, 92],           // Gastronomía, Bocados típicos
  aves: [75, 108],                 // Avistamiento de Aves, Aviturismo
  artesanias: [70, 68, 101],       // Cultura, Turismo comunitario, Comunidad indígena
}

// Municipios con contenido para el modo "Sorpréndeme" (orden por riqueza del catálogo).
const DEFAULT_MUNIS = [
  'manizales', 'villamaria', 'chinchina', 'salamina', 'aguadas',
  'riosucio', 'filadelfia', 'neira', 'supia', 'anserma',
]

/* ------------------------------------------------------------------ tipos WP */
type WpTerm = { id: number; name: string; taxonomy: string }
type WpItem = {
  id: number
  title: { rendered: string }
  link: string
  zonas?: number[]
  tipo_de_experiencia?: number[]
  categorias_servicios?: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>
    'wp:term'?: WpTerm[][]
  }
}

/* --------------------------------------------------- cache en memoria (1h) */
type CacheEntry = { at: number; data: WpItem[] }
const cache = new Map<string, CacheEntry>()
const TTL = 3600_000

function httpsGetJson(url: string): Promise<WpItem[]> {
  return new Promise((resolve, reject) => {
    const r = https.get(url, { agent: insecureAgent, headers: { accept: 'application/json' } }, (res) => {
      if ((res.statusCode ?? 0) >= 400) {
        res.resume()
        reject(new Error(`WP ${url} → ${res.statusCode}`))
        return
      }
      let raw = ''
      res.setEncoding('utf8')
      res.on('data', (c) => (raw += c))
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw) as WpItem[])
        } catch (e) {
          reject(e)
        }
      })
    })
    r.on('error', reject)
    r.setTimeout(12000, () => r.destroy(new Error('timeout')))
  })
}

async function wpGet(path: string): Promise<WpItem[]> {
  const hit = cache.get(path)
  if (hit && Date.now() - hit.at < TTL) return hit.data
  const data = await httpsGetJson(`${API}${path}`)
  cache.set(path, { at: Date.now(), data })
  return data
}

function imageOf(item: WpItem): string | null {
  return item._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}
const NAMED: Record<string, string> = {
  amp: '&', quot: '"', apos: "'", nbsp: ' ', laquo: '«', raquo: '»',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Ntilde: 'Ñ',
}
function decode(s: string): string {
  return s
    // Entidades numéricas: &#8220; &#xNN;
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    // Entidades con nombre conocidas
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED[name] ?? m)
    .trim()
}
function tipoLabel(item: WpItem, taxonomy: string, want: Set<number>): string {
  const terms = (item._embedded?.['wp:term']?.flat() ?? []).filter(
    (tr) => tr.taxonomy === taxonomy && tr.name && tr.name !== 'Todas',
  )
  // Prefiere el término que coincide con un interés del usuario; si no, el primero.
  const pref = terms.find((tr) => want.has(tr.id)) ?? terms[0]
  return pref ? decode(pref.name) : 'Experiencia'
}
function toPlanItem(item: WpItem, taxonomy: string, want: Set<number>): PlanItem {
  return { title: decode(item.title.rendered), tipo: tipoLabel(item, taxonomy, want), link: item.link, image: imageOf(item) }
}

/* Elige actividades reales para un municipio, priorizando los intereses.
 * `seen` acumula links ya usados para que un municipio repetido en otro día no
 * muestre exactamente lo mismo. */
async function itemsForMuni(zonaId: number, wantTipos: Set<number>, seen: Set<string>): Promise<PlanItem[]> {
  const [experiencias, prestadores] = await Promise.all([
    wpGet(`/experiencia?zonas=${zonaId}&per_page=30&_embed`).catch(() => []),
    wpGet(`/prestadores?zonas=${zonaId}&per_page=20&_embed`).catch(() => []),
  ])

  // Puntuar experiencias por coincidencia con los intereses; imagen suma desempate.
  const scored = experiencias
    .filter((e) => !seen.has(e.link))
    .map((e) => {
      const tipos = e.tipo_de_experiencia ?? []
      const match = tipos.reduce((acc, id) => acc + (wantTipos.has(id) ? 1 : 0), 0)
      return { e, score: match * 2 + (imageOf(e) ? 1 : 0) }
    })
    .sort((a, b) => b.score - a.score)

  const matched = scored.filter((s) => s.score >= 2)
  const chosen = (matched.length ? matched : scored).slice(0, 3).map((s) => {
    seen.add(s.e.link)
    return toPlanItem(s.e, 'tipo_de_experiencia', wantTipos)
  })

  // Rellenar con un prestador local (gastronomía/alojamiento) si quedan huecos.
  if (chosen.length < 3) {
    const withImg = [...prestadores].sort((a, b) => (imageOf(b) ? 1 : 0) - (imageOf(a) ? 1 : 0))
    for (const p of withImg) {
      if (chosen.length >= 3) break
      if (seen.has(p.link)) continue
      seen.add(p.link)
      chosen.push(toPlanItem(p, 'categorias_servicios', wantTipos))
    }
  }
  return chosen
}

/* ------------------------------------------------------------------- POST */
export async function POST(req: Request) {
  let body: PlanRequest
  try {
    body = (await req.json()) as PlanRequest
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 })
  }

  const dias = Math.min(5, Math.max(2, Number(body.dias) || 3))
  const intereses = Array.isArray(body.intereses) ? body.intereses.filter((i) => INTEREST_TIPO[i]) : []
  const wantTipos = new Set<number>(intereses.flatMap((i) => INTEREST_TIPO[i] ?? []))

  // Municipios elegidos por el usuario (válidos); si no eligió, modo sorpresa.
  const picked = (Array.isArray(body.municipios) ? body.municipios : []).filter((m) => ZONA_ID[m])
  const base = picked.length ? picked : DEFAULT_MUNIS
  let note: string | null = picked.length
    ? null
    : 'Ruta sugerida por Caldas es Natural según tus intereses (no elegiste municipios).'

  // Un municipio por día; si hay menos municipios que días, se reparten cíclicamente.
  const perDay: string[] = Array.from({ length: dias }, (_, d) => base[d % base.length]!)

  try {
    const days: PlanDay[] = []
    const seen = new Set<string>()
    for (let d = 0; d < perDay.length; d++) {
      const slug = perDay[d]!
      const items = await itemsForMuni(ZONA_ID[slug]!, wantTipos, seen)
      days.push({ n: d + 1, municipio: ZONA_LABEL[slug] ?? slug, items })
    }

    if (!note && days.every((dd) => dd.items.length === 0)) {
      note = 'No encontramos fichas para esta combinación; prueba con otros municipios o intereses.'
    } else if (days.some((dd) => dd.items.length < 2)) {
      note = note ?? 'Algunos días muestran menos actividades porque el catálogo aún tiene pocas fichas para ese municipio.'
    }

    const payload: PlanResponse = { days, usedInterests: intereses, note }
    return NextResponse.json(payload)
  } catch (e) {
    return NextResponse.json(
      { error: 'No pudimos consultar el catálogo en este momento.', detail: String(e) },
      { status: 502 },
    )
  }
}
