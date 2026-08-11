import type { SlideDef } from '@/lib/slides'

import Cover from './01-cover'
import Oportunidad from './02-oportunidad'
import Propuesta from './03-propuesta'
import Diagnostico from './04-diagnostico'
import RecorridoVisitante from './05-recorrido-visitante'
import RecorridoFuncionario from './06-recorrido-funcionario'
import Funcionalidades from './07-funcionalidades'
import Agentes from './08-agentes'
import Alcance from './09-alcance'
import Cronograma from './10-cronograma'
import LimiteHonesto from './11-limite-honesto'
import PorQueAdisoft from './12-por-que-adisoft'
import ProximosPasos from './13-proximos-pasos'
import Economica from './14-economica'
import EconomicaDetalle from './15-economica-detalle'
import Cierre from './16-cierre'

export const slides: SlideDef[] = [
  { id: 'cover', label: 'Portada', Component: Cover },
  { id: 'oportunidad', label: 'La oportunidad', Component: Oportunidad },
  { id: 'propuesta', label: 'Qué proponemos', Component: Propuesta },
  { id: 'diagnostico', label: 'Diagnóstico', Component: Diagnostico },
  { id: 'recorrido-visitante', label: 'Recorrido del visitante', Component: RecorridoVisitante },
  { id: 'recorrido-funcionario', label: 'Recorrido del funcionario', Component: RecorridoFuncionario },
  { id: 'funcionalidades', label: 'Funcionalidades', Component: Funcionalidades },
  { id: 'agentes', label: 'Agentes de IA', Component: Agentes },
  { id: 'alcance', label: 'Alcance', Component: Alcance },
  { id: 'cronograma', label: 'Cronograma', Component: Cronograma },
  { id: 'limite', label: 'Límite honesto', Component: LimiteHonesto },
  { id: 'por-que', label: 'Por qué Adisoft', Component: PorQueAdisoft },
  { id: 'pasos', label: 'Próximos pasos', Component: ProximosPasos },
  { id: 'economica', label: 'Propuesta económica · el valor', Component: Economica },
  { id: 'economica-detalle', label: 'Propuesta económica · el detalle', Component: EconomicaDetalle },
  { id: 'cierre', label: 'Cierre', Component: Cierre },
]
