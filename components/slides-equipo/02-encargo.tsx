'use client'

import { motion } from 'framer-motion'
import { Layers, Eye, MonitorPlay } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const PUNTOS = [
  { icon: Layers, title: 'No reconstruimos la plataforma', text: 'Sumamos una capa por encima. La plataforma actual sigue operando igual.' },
  { icon: Eye, title: 'Trabajamos sobre lo que ya existe', text: 'Leemos el catálogo publicado en modo sólo lectura. No migramos ni reescribimos.' },
  { icon: MonitorPlay, title: 'Entregamos software funcionando', text: 'Una demostración operativa al cierre de cada sprint, no informes de avance.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>El encargo, en una frase</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.12] text-ink sm:text-4xl lg:text-[2.6rem]"
      >
        Sumar una capa de IA sobre el catálogo que la Gobernación ya publicó, para que cada visitante
        reciba <GradientText>recomendaciones e itinerarios personalizados</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PUNTOS.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mb-2 font-display text-lg text-ink">{title}</h3>
            <p className="text-sm leading-snug text-cloud/70">{text}</p>
          </Card>
        ))}
      </motion.div>
    </SlideShell>
  )
}
