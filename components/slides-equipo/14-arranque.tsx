'use client'

import { motion } from 'framer-motion'
import { KeyRound, Boxes, Cpu, Users, ServerCog, GitBranch, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const CLIENTE: { icon: LucideIcon; t: string }[] = [
  { icon: KeyRound, t: 'Acceso de lectura a la API + credenciales / IP.' },
  { icon: Boxes, t: 'Volumen del catálogo: fichas por municipio.' },
  { icon: Cpu, t: 'Proveedor y modelo de IA + costo mensual estimado.' },
  { icon: Users, t: 'Contraparte del cliente designada.' },
  { icon: ServerCog, t: 'Entorno de despliegue (hosting) definido.' },
]

const INTERNO: { icon: LucideIcon; t: string }[] = [
  { icon: GitBranch, t: 'Repositorio, entornos y tablero de tareas listos.' },
  { icon: Boxes, t: 'Prototipo de ingesta contra la API en la semana 1.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Arranque · qué necesitamos para el Sprint 1</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Para arrancar bien, <GradientText>esto primero</GradientText>.
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={stagger} className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-cloud/50">Del cliente</p>
          {CLIENTE.map(({ icon: Icon, t }) => (
            <motion.div key={t} variants={popIn} className="flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-[0.9rem] text-cloud">{t}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={stagger} className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-cloud/50">De nuestro lado</p>
          {INTERNO.map(({ icon: Icon, t }) => (
            <motion.div key={t} variants={popIn} className="flex items-center gap-3 rounded-xl border border-accent-bright/20 bg-accent/10 px-4 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-bright/15 text-accent-bright">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-[0.9rem] text-cloud">{t}</p>
            </motion.div>
          ))}
          <div className="mt-2 rounded-xl border border-black/[0.08] bg-white px-4 py-3">
            <p className="text-[0.86rem] leading-snug text-cloud/70">
              Primero: reunión de aclaración con el cliente. Luego confirmación de dependencias, ajuste
              y firma, y arranque del Sprint 1 con demo a las 2 semanas.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  )
}
