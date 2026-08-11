import type { ComponentType } from 'react'

export type SlideDef = {
  /** Identificador estable del slide. */
  id: string
  /** Etiqueta corta para navegación y menú. */
  label: string
  /** Componente de pantalla completa. */
  Component: ComponentType
}
