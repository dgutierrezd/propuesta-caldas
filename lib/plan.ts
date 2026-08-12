/* Tipos compartidos entre el API route (app/api/plan/route.ts) y el cliente
   (components/demo/DemoExperience.tsx). Contrato único, sin duplicar. */

export type PlanRequest = {
  intereses: string[]
  dias: number | null
  compania: string | null
  municipios: string[]
}

export type PlanItem = {
  title: string
  /** Etiqueta legible del tipo (p.ej. "Experiencia Cafetera", "Gastronomía"). En español, del catálogo. */
  tipo: string
  /** Enlace REAL a la ficha en esnatural.caldas.gov.co */
  link: string
  /** URL de imagen destacada real, o null si la ficha no tiene. */
  image: string | null
}

export type PlanDay = {
  n: number
  municipio: string
  items: PlanItem[]
}

export type PlanResponse = {
  days: PlanDay[]
  usedInterests: string[]
  note: string | null
}
