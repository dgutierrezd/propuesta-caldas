'use client'

import { MapPin, Users, Handshake, SearchCheck, Home, Target, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, stagger } from '@/lib/motion'

type Reason = { icon: LucideIcon; title: string; body: string }

const REASONS: Reason[] = [
  {
    icon: MapPin,
    title: 'De Manizales, Caldas',
    body: 'Empresa de desarrollo de software con cercanía territorial al proyecto y a la plataforma sobre la que se trabaja.',
  },
  {
    icon: Users,
    title: 'Equipo completo y dedicado',
    body: 'Diseñadores, desarrolladores y project managers dedicados al proyecto.',
  },
  {
    icon: Handshake,
    title: 'Trato directo',
    body: 'Sin intermediarios comerciales: quien conversa la propuesta es quien la ejecuta.',
  },
  {
    icon: SearchCheck,
    title: 'Diagnóstico antes de cotizar',
    body: 'Alcance y precio basados en hallazgos verificables sobre la plataforma, no en supuestos.',
  },
  {
    icon: Home,
    title: 'Cercanía territorial',
    body: 'Empresa del departamento trabajando sobre la plataforma del departamento.',
  },
  {
    icon: Target,
    title: 'Compromiso con los 27',
    body: 'Nos comprometemos con los 27 municipios completos porque la base de datos lo permite.',
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="justify-center gap-7">
      <motion.div variants={fadeUp}>
        <Kicker>Por qué Adisoft</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[30ch] font-display text-4xl leading-[1.1] text-ink sm:text-[2.9rem]"
      >
        Una empresa <GradientText>caldense</GradientText> trabajando sobre la plataforma de su propio
        departamento.
      </motion.h2>

      <motion.div variants={stagger} className="grid gap-4 md:grid-cols-3">
        {REASONS.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="flex flex-col gap-3 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-bright/25 bg-accent/30 text-accent-bright">
              <Icon size={22} />
            </span>
            <h3 className="font-display text-lg leading-tight text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-cloud/70">{body}</p>
          </Card>
        ))}
      </motion.div>
    </SlideShell>
  )
}
