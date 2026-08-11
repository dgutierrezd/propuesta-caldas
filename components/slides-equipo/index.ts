import type { SlideDef } from '@/lib/slides'

import Portada from './01-portada'
import Encargo from './02-encargo'
import PuntoPartida from './03-punto-partida'
import QueConstruimos from './04-que-construimos'
import Arquitectura from './05-arquitectura'
import Agentes from './06-agentes'
import ReglasTecnicas from './07-reglas-tecnicas'
import PlanSprints from './08-plan-sprints'
import DefinicionHecho from './09-definicion-hecho'
import Responsabilidades from './10-responsabilidades'
import Riesgos from './11-riesgos'
import PreguntasCliente from './11b-preguntas-cliente'
import FueraAlcance from './12-fuera-alcance'
import ComoTrabajamos from './13-como-trabajamos'
import Arranque from './14-arranque'
import Cierre from './15-cierre'

export const slidesEquipo: SlideDef[] = [
  { id: 'portada', label: 'Plan de trabajo', Component: Portada },
  { id: 'encargo', label: 'El encargo', Component: Encargo },
  { id: 'punto-partida', label: 'Punto de partida', Component: PuntoPartida },
  { id: 'que-construimos', label: 'Qué construimos', Component: QueConstruimos },
  { id: 'arquitectura', label: 'Arquitectura', Component: Arquitectura },
  { id: 'agentes', label: 'Agentes de IA', Component: Agentes },
  { id: 'reglas', label: 'Reglas técnicas', Component: ReglasTecnicas },
  { id: 'plan', label: 'El plan · sprints', Component: PlanSprints },
  { id: 'definicion-hecho', label: 'Definición de Hecho', Component: DefinicionHecho },
  { id: 'responsabilidades', label: 'Responsabilidades', Component: Responsabilidades },
  { id: 'riesgos', label: 'Riesgos y dependencias', Component: Riesgos },
  { id: 'preguntas-cliente', label: 'Preguntas para el cliente', Component: PreguntasCliente },
  { id: 'fuera-alcance', label: 'Fuera de alcance', Component: FueraAlcance },
  { id: 'como-trabajamos', label: 'Cómo trabajamos', Component: ComoTrabajamos },
  { id: 'arranque', label: 'Arranque', Component: Arranque },
  { id: 'cierre', label: 'Cierre', Component: Cierre },
]
