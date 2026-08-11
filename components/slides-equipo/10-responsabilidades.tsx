'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Boxes, Server, Smartphone, PenTool, TestTube2, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const ROLES: { icon: LucideIcon; role: string; text: string }[] = [
  { icon: ClipboardCheck, role: 'Project manager', text: 'Interlocución con el cliente, planeación de sprints, demos y control de alcance.' },
  { icon: Boxes, role: 'Líder técnico / arquitecto', text: 'Diseño de la capa, decisiones de arquitectura, anclaje y control de costo de IA.' },
  { icon: Server, role: 'Backend / IA', text: 'Ingesta, indexación, agentes de IA e integración con la API REST.' },
  { icon: Smartphone, role: 'Frontend', text: 'Interfaz móvil primero: perfil, feed, chat, itinerarios, compartir y offline.' },
  { icon: PenTool, role: 'Diseño de producto / UX', text: 'Recorrido del visitante, las 4 preguntas, explicaciones y accesibilidad.' },
  { icon: TestTube2, role: 'QA', text: 'Pruebas por sprint, banco de preguntas del asistente y verificación de criterios.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Responsabilidades por rol</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Un equipo dedicado, <GradientText>roles claros</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map(({ icon: Icon, role, text }) => (
          <Card key={role} className="p-5">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mb-1.5 font-display text-[1.05rem] leading-tight text-ink">{role}</h3>
            <p className="text-[0.86rem] leading-snug text-cloud/70">{text}</p>
          </Card>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} className="text-sm text-cloud/65">
        Asignación de personas por confirmar en la reunión de arranque.
      </motion.p>
    </SlideShell>
  )
}
