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

/* --- Mapa municipio(slug) → id de REGIÓN (taxonomía `zonas`) para secuenciar
 * los días agrupando municipios cercanos de la misma región (verificado). --- */
const REGION_ID: Record<string, number> = {
  // Centro Sur
  manizales: 12, villamaria: 12, chinchina: 12, neira: 12, palestina: 12,
  // Norte
  salamina: 11, aguadas: 11, pacora: 11, aranzazu: 11, filadelfia: 11, 'la-merced': 11, marulanda: 11,
  // Occidente Alto
  riosucio: 9, supia: 9, marmato: 9, 'san-jose': 9,
  // Occidente Bajo
  anserma: 10, belalcazar: 10, risaralda: 10, viterbo: 10,
  // Alto Oriente
  manzanares: 7, marquetalia: 7, pensilvania: 7,
  // Magdalena Caldense
  'la-dorada': 8, victoria: 8, norcasia: 8, samana: 8,
}
/* Ordena municipios agrupando por región (los de la misma región quedan juntos)
 * para que la ruta día a día sea geográficamente coherente. Mantiene el orden
 * relativo original dentro de cada región (estable). */
function sequenceByRegion(slugs: string[]): string[] {
  const groups = new Map<number, string[]>()
  const order: number[] = []
  for (const s of slugs) {
    const r = REGION_ID[s] ?? 999
    if (!groups.has(r)) { groups.set(r, []); order.push(r) }
    groups.get(r)!.push(s)
  }
  return order.flatMap((r) => groups.get(r)!)
}

function mapsUrlFor(title: string, municipio: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title}, ${municipio}, Caldas, Colombia`)}`
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
function toPlanItem(item: WpItem, taxonomy: string, want: Set<number>, municipio: string): PlanItem {
  const title = decode(item.title.rendered)
  return {
    title,
    tipo: tipoLabel(item, taxonomy, want),
    link: item.link,
    image: imageOf(item),
    mapsUrl: mapsUrlFor(title, municipio),
  }
}

/* Elige actividades reales para un municipio con RANKING por relevancia y
 * VARIEDAD dentro del día:
 *  - Puntúa cada experiencia por nº de coincidencias con los intereses; la
 *    imagen desempata. Ordena descendente.
 *  - Evita repetir el mismo `tipo` dentro del día (mix de experiencias).
 *  - Garantiza al menos 1 experiencia + intenta 1 prestador local
 *    (gastronomía/alojamiento) del municipio para dar mezcla.
 *  - `seen` evita repetir ítems entre días. */
async function itemsForMuni(zonaId: number, wantTipos: Set<number>, seen: Set<string>, municipio: string): Promise<PlanItem[]> {
  const [experiencias, prestadores] = await Promise.all([
    wpGet(`/experiencia?zonas=${zonaId}&per_page=30&_embed`).catch(() => []),
    wpGet(`/prestadores?zonas=${zonaId}&per_page=20&_embed`).catch(() => []),
  ])

  const scored = experiencias
    .filter((e) => !seen.has(e.link))
    .map((e) => {
      const tipos = e.tipo_de_experiencia ?? []
      const match = tipos.reduce((acc, id) => acc + (wantTipos.has(id) ? 1 : 0), 0)
      return { e, score: match * 2 + (imageOf(e) ? 1 : 0) }
    })
    .sort((a, b) => b.score - a.score)

  const chosen: PlanItem[] = []
  const tiposUsados = new Set<string>() // variedad: no repetir tipo dentro del día
  const MAX = 3

  // 1) Experiencias: prioriza puntaje alto y tipos NO repetidos en el día.
  for (const s of scored) {
    if (chosen.length >= MAX) break
    const it = toPlanItem(s.e, 'tipo_de_experiencia', wantTipos, municipio)
    if (tiposUsados.has(it.tipo)) continue // salta duplicados de tipo en primera pasada
    seen.add(s.e.link)
    tiposUsados.add(it.tipo)
    chosen.push(it)
  }
  // 1b) Segunda pasada: si aún hay hueco, admite tipos repetidos (mejor llenar).
  if (chosen.length < 2) {
    for (const s of scored) {
      if (chosen.length >= MAX) break
      if (seen.has(s.e.link)) continue
      seen.add(s.e.link)
      chosen.push(toPlanItem(s.e, 'tipo_de_experiencia', wantTipos, municipio))
    }
  }

  // 2) Un prestador local para el mix (gastronomía/alojamiento), con imagen primero.
  if (chosen.length < MAX) {
    const withImg = [...prestadores].sort((a, b) => (imageOf(b) ? 1 : 0) - (imageOf(a) ? 1 : 0))
    for (const p of withImg) {
      if (chosen.length >= MAX) break
      if (seen.has(p.link)) continue
      const it = toPlanItem(p, 'categorias_servicios', wantTipos, municipio)
      if (tiposUsados.has(it.tipo)) continue
      seen.add(p.link)
      tiposUsados.add(it.tipo)
      chosen.push(it)
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

  const lang: 'es' | 'en' = body.lang === 'en' ? 'en' : 'es'
  const compania = typeof body.compania === 'string' ? body.compania : null

  // Municipios elegidos por el usuario (válidos); si no eligió, modo sorpresa.
  const picked = (Array.isArray(body.municipios) ? body.municipios : []).filter((m) => ZONA_ID[m])
  // Secuencia por región: agrupa municipios cercanos para una ruta coherente.
  const base = sequenceByRegion(picked.length ? picked : DEFAULT_MUNIS)
  let note: string | null = picked.length
    ? null
    : lang === 'en'
      ? 'Route suggested by Caldas es Natural based on your interests (you did not pick towns).'
      : 'Ruta sugerida por Caldas es Natural según tus intereses (no elegiste municipios).'

  // Un municipio por día; si hay menos municipios que días, se reparten cíclicamente.
  const perDay: string[] = Array.from({ length: dias }, (_, d) => base[d % base.length]!)

  try {
    const days: PlanDay[] = []
    const seen = new Set<string>()
    for (let d = 0; d < perDay.length; d++) {
      const slug = perDay[d]!
      const muniLabel = ZONA_LABEL[slug] ?? slug
      const items = await itemsForMuni(ZONA_ID[slug]!, wantTipos, seen, muniLabel)
      days.push({ n: d + 1, municipio: muniLabel, items })
    }

    if (!note && days.every((dd) => dd.items.length === 0)) {
      note = lang === 'en'
        ? 'We found no listings for this combination; try other towns or interests.'
        : 'No encontramos fichas para esta combinación; prueba con otros municipios o intereses.'
    } else if (days.some((dd) => dd.items.length < 2)) {
      note = note ?? (lang === 'en'
        ? 'Some days show fewer activities because the catalog still has few listings for that town.'
        : 'Algunos días muestran menos actividades porque el catálogo aún tiene pocas fichas para ese municipio.')
    }

    // Narrativa: IA si hay ANTHROPIC_API_KEY; si no o si falla, fallback por reglas.
    const { intro, aiNarrative } = await narrate(days, intereses, compania, lang)

    // Enlaces para compartir.
    const uniqueMunis = [...new Set(days.map((d) => d.municipio))]
    const mapsAllUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uniqueMunis.join(', ') + ', Caldas, Colombia')}`
    const shareText = buildShareText(days, intro, uniqueMunis, lang)

    const payload: PlanResponse = {
      days, usedInterests: intereses, note, intro, shareText, mapsAllUrl, aiNarrative,
    }
    return NextResponse.json(payload)
  } catch (e) {
    return NextResponse.json(
      { error: 'No pudimos consultar el catálogo en este momento.', detail: String(e) },
      { status: 502 },
    )
  }
}

/* ---------------------------------------------------- narrativa (IA + fallback)
 * Redacta una intro cálida y 1 frase por día, ANCLADA solo a las fichas reales
 * ya seleccionadas. Usa el SDK de Anthropic (carga dinámica) si hay API key; si
 * no hay key o si algo falla, cae a un resumen por reglas. El demo funciona igual
 * sin key. Muta `days[i].narrative`. */
async function narrate(
  days: PlanDay[],
  intereses: string[],
  compania: string | null,
  lang: 'es' | 'en',
): Promise<{ intro: string | null; aiNarrative: boolean }> {
  // Fallback por reglas (siempre disponible).
  const ruleFallback = (): { intro: string | null; aiNarrative: false } => {
    for (const d of days) {
      const titles = d.items.map((i) => i.title)
      d.narrative = titles.length
        ? lang === 'en'
          ? `In ${d.municipio}: ${titles.slice(0, 3).join(', ')}.`
          : `En ${d.municipio}: ${titles.slice(0, 3).join(', ')}.`
        : lang === 'en'
          ? `Free day to explore ${d.municipio}.`
          : `Día libre para explorar ${d.municipio}.`
    }
    const munis = [...new Set(days.map((d) => d.municipio))]
    const intro = lang === 'en'
      ? `A ${days.length}-day route through ${munis.join(', ')} with real Caldas es Natural listings.`
      : `Una ruta de ${days.length} días por ${munis.join(', ')} con fichas reales de Caldas es Natural.`
    return { intro, aiNarrative: false }
  }

  const key = process.env.GROQ_API_KEY
  if (!key) return ruleFallback()

  try {
    const facts = days.map((d) => ({
      day: d.n,
      town: d.municipio,
      items: d.items.map((i) => ({ title: i.title, type: i.tipo })),
    }))
    const langName = lang === 'en' ? 'English' : 'Spanish'
    const system =
      `You write warm, concise travel copy for a Caldas (Colombia) tourism demo. ` +
      `Write ONLY in ${langName}. Use EXCLUSIVELY the real listings given by the user; ` +
      `do NOT invent places, prices, hours or facts. If a day has no items, say it is a free/open day. ` +
      `Return STRICT JSON ONLY (no markdown), shape: ` +
      `{"intro": string (<=2 sentences), "days": [{"day": number, "line": string (1 sentence)}]}.`
    const user =
      `Traveler interests: ${intereses.join(', ') || 'general'}. Company: ${compania || 'unspecified'}.\n` +
      `Listings (use only these):\n${JSON.stringify(facts)}`

    const callGroq = async (model: string) => {
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 6000)
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            temperature: 0.4,
            max_tokens: 500,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: system },
              { role: 'user', content: user },
            ],
          }),
          signal: ctrl.signal,
        })
        if (!res.ok) return null
        return (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
      } catch {
        return null
      } finally {
        clearTimeout(to)
      }
    }

    // Modelo principal; respaldo a un modelo más ligero si el primero no responde.
    const data = (await callGroq('llama-3.3-70b-versatile')) ?? (await callGroq('llama-3.1-8b-instant'))
    const text = data?.choices?.[0]?.message?.content ?? ''
    if (!text) return ruleFallback()

    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)
    const parsed = JSON.parse(jsonStr) as { intro?: string; days?: Array<{ day: number; line: string }> }
    const byDay = new Map((parsed.days ?? []).map((x) => [x.day, x.line]))
    for (const d of days) {
      const line = byDay.get(d.n)
      if (line && typeof line === 'string') d.narrative = line
    }
    // Si el modelo no cubrió ningún día, considera fallo → reglas.
    if (days.every((d) => !d.narrative)) return ruleFallback()
    return { intro: parsed.intro ?? ruleFallback().intro, aiNarrative: true }
  } catch {
    return ruleFallback()
  }
}

/* Texto plano para compartir por WhatsApp (bilingüe según el idioma pedido). */
function buildShareText(days: PlanDay[], intro: string | null, munis: string[], lang: 'es' | 'en'): string {
  const L = lang === 'en'
  const head = L ? `My Caldas itinerary (${days.length} days)` : `Mi itinerario por Caldas (${days.length} días)`
  const lines: string[] = [head]
  if (intro) lines.push(intro)
  lines.push('')
  for (const d of days) {
    lines.push(`${L ? 'Day' : 'Día'} ${d.n} · ${d.municipio}`)
    if (d.items.length === 0) lines.push(`  - ${L ? '(free day)' : '(día libre)'}`)
    for (const it of d.items) lines.push(`  - ${it.title} (${it.tipo})`)
    lines.push('')
  }
  lines.push(L ? 'Built with Caldas es Natural · esnatural.caldas.gov.co' : 'Armado con Caldas es Natural · esnatural.caldas.gov.co')
  return lines.join('\n')
}
