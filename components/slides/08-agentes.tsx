'use client'

import { motion } from 'framer-motion'
import {
  UserCog,
  ListOrdered,
  MessagesSquare,
  Route,
  SearchCheck,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, stagger } from '@/lib/motion'

const AGENTES: { n: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    n: '01',
    icon: UserCog,
    title: 'Perfilado',
    desc: 'Convierte las 4 respuestas del visitante en un perfil de sesión que orienta todo el recorrido.',
  },
  {
    n: '02',
    icon: ListOrdered,
    title: 'Recomendación / ranking',
    desc: 'Ordena las fichas según el perfil y explica por qué cada una aparece.',
  },
  {
    n: '03',
    icon: MessagesSquare,
    title: 'Conversacional',
    desc: 'RAG sobre fichas reales; declara cuando no tiene el dato en lugar de improvisar.',
  },
  {
    n: '04',
    icon: Route,
    title: 'Itinerarios',
    desc: 'Conecta municipios cercanos por subregión en recorridos de 2 a 5 días.',
  },
  {
    n: '05',
    icon: SearchCheck,
    title: 'Análisis de brechas',
    desc: 'Cruza la demanda observada contra la oferta publicada por municipio.',
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Los agentes de IA</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.5rem]"
      >
        Cinco agentes, todos anclados al <GradientText>catálogo</GradientText>.
      </motion.h2>

      <motion.p variants={fadeUp} className="max-w-[70ch] text-lg leading-relaxed text-cloud/70">
        Cada uno cumple una función precisa. Ninguno inventa: trabajan sobre las fichas reales.
      </motion.p>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {AGENTES.map(({ n, icon: Icon, title, desc }) => (
          <Card key={n} variant="glass" className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-sm tnum text-accent-bright/70">{n}</span>
            </div>
            <h3 className="font-display text-lg leading-tight text-ink">{title}</h3>
            <p className="text-[0.82rem] leading-relaxed text-cloud/70">{desc}</p>
          </Card>
        ))}
      </motion.div>

      {/* Banda destacada — anclaje obligatorio */}
      <motion.div
        variants={fadeUp}
        className="flex items-start gap-4 rounded-2xl border border-accent-bright/30 bg-accent-bright/[0.07] px-6 py-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-bright/15 text-accent-bright">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <p className="text-base leading-relaxed text-cloud/85">
          <span className="font-semibold text-ink">Anclaje obligatorio al contenido.</span> Si no hay respaldo
          en el catálogo, el sistema lo declara en vez de inventar. Es una regla transversal a los cinco agentes,
          no una opción de configuración.
        </p>
      </motion.div>
    </SlideShell>
  )
}
