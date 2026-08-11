'use client'

import { motion } from 'framer-motion'
import { Layers, Eye, RotateCcw, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, stagger } from '@/lib/motion'

type Feature = { icon: LucideIcon; title: string; body: string }

const FEATURES: Feature[] = [
  {
    icon: Layers,
    title: 'Sobre lo que ya existe',
    body: 'Trabajamos por encima del catálogo publicado, sin migrar ni reconstruir. La fuente de verdad sigue siendo la plataforma del departamento.',
  },
  {
    icon: Eye,
    title: 'Sólo lectura',
    body: 'La capa consume el contenido, no lo modifica. Ordena, explica y recomienda; nunca reescribe las fichas ni altera la plataforma.',
  },
  {
    icon: RotateCcw,
    title: 'Reversible por diseño',
    body: 'Si la capa se apagara, la plataforma seguiría funcionando como hoy. No introduce dependencias sobre la operación actual.',
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="justify-center gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>Qué proponemos</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-4xl leading-[1.08] text-ink sm:text-5xl"
      >
        Una capa de IA de <GradientText>sólo lectura</GradientText> sobre el contenido publicado.
      </motion.h2>

      <motion.p variants={fadeUp} className="max-w-[62ch] text-lg leading-relaxed text-cloud/70">
        Ordena la experiencia para el visitante y da inteligencia a la Gobernación. La plataforma actual sigue
        operando igual.
      </motion.p>

      <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="flex flex-col gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-bright/25 bg-accent/30 text-accent-bright">
              <Icon size={24} />
            </span>
            <h3 className="font-display text-xl text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-cloud/70">{body}</p>
          </Card>
        ))}
      </motion.div>
    </SlideShell>
  )
}
