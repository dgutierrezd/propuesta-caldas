/* Tipos compartidos entre el API route (app/api/plan/route.ts) y el cliente
   (components/demo/DemoExperience.tsx). Contrato único, sin duplicar. */

export type PlanRequest = {
  intereses: string[]
  dias: number | null
  compania: string | null
  municipios: string[]
  /** Idioma para la narrativa y las notas ('es' | 'en'). Opcional. */
  lang?: 'es' | 'en'
}

export type PlanItem = {
  title: string
  /** Etiqueta legible del tipo (p.ej. "Experiencia Cafetera", "Gastronomía"). En español, del catálogo. */
  tipo: string
  /** Enlace REAL a la ficha en esnatural.caldas.gov.co */
  link: string
  /** URL de imagen destacada real, o null si la ficha no tiene. */
  image: string | null
  /** Búsqueda en Google Maps ("<title>, <municipio>, Caldas"). Siempre presente. */
  mapsUrl: string
}

export type PlanDay = {
  n: number
  municipio: string
  items: PlanItem[]
  /** Frase cálida del día (IA si hay API key; si no, resumen por reglas). */
  narrative?: string | null
}

export type PlanResponse = {
  days: PlanDay[]
  usedInterests: string[]
  note: string | null
  /** Intro cálida del plan completo (IA o reglas). */
  intro?: string | null
  /** Resumen en texto plano para compartir por WhatsApp. */
  shareText: string
  /** Búsqueda combinada en Google Maps de los municipios del plan. */
  mapsAllUrl: string
  /** true si la narrativa la redactó el modelo; false si es el fallback por reglas. */
  aiNarrative: boolean
}
