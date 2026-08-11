'use client'

import { motion } from 'framer-motion'
import { CalendarRange, MonitorPlay, RefreshCw, ShieldCheck, UserRound, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const RITMO: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CalendarRange, title: 'Planeación por sprint', text: 'Al inicio de cada sprint acordamos objetivo y criterios de aceptación.' },
  { icon: MonitorPlay, title: 'Demo cada 2 semanas', text: 'Software funcionando que el cliente evalúa contra los criterios.' },
  { icon: RefreshCw, title: 'Retro y ajuste', text: 'Recogemos comentarios y ajustamos el siguiente sprint sin cambiar el alcance total.' },
  { icon: ShieldCheck, title: 'Anclaje como estándar de calidad', text: 'Banco de preguntas de prueba: verificamos que el asistente no inventa.' },
  { icon: UserRound, title: 'Un solo interlocutor', text: 'El PM centraliza la comunicación con el cliente. Sin ruido.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Cómo trabajamos</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Ritmo <GradientText>quincenal</GradientText>, siempre con algo funcionando.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RITMO.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-5">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mb-1.5 font-display text-[1.05rem] leading-tight text-ink">{title}</h3>
            <p className="text-[0.86rem] leading-snug text-cloud/70">{text}</p>
          </Card>
        ))}
      </motion.div>
    </SlideShell>
  )
}
