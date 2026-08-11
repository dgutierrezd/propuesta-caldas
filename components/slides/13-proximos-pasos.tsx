'use client'

import { motion } from 'framer-motion'
import { MessagesSquare, Link2, FileSignature, Rocket, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

type Step = { n: number; icon: LucideIcon; title: string; body: string }

const STEPS: Step[] = [
  {
    n: 1,
    icon: MessagesSquare,
    title: 'Reunión de aclaración',
    body: 'Resolvemos dudas del comité y alineamos expectativas.',
  },
  {
    n: 2,
    icon: Link2,
    title: 'Confirmación de dependencias',
    body: 'Acceso a la API, contraparte designada y proveedor de IA.',
  },
  {
    n: 3,
    icon: FileSignature,
    title: 'Ajuste y firma',
    body: 'Cerramos alcance y condiciones por escrito.',
  },
  {
    n: 4,
    icon: Rocket,
    title: 'Arranque del Sprint 1',
    body: 'Primera demostración a las 2 semanas.',
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="justify-center gap-10">
      <motion.div variants={fadeUp}>
        <Kicker>Próximos pasos</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-4xl leading-[1.1] text-ink sm:text-5xl"
      >
        De la propuesta a la <GradientText>primera demostración</GradientText> en dos semanas.
      </motion.h2>

      <motion.div variants={stagger} className="grid gap-4 md:grid-cols-4">
        {STEPS.map(({ n, icon: Icon, title, body }) => {
          const isMilestone = n === 4
          return (
            <motion.div
              key={n}
              variants={popIn}
              className={
                isMilestone
                  ? 'relative flex flex-col rounded-2xl border border-accent-bright/50 bg-accent/30 p-6 shadow-[0_10px_40px_rgba(29,31,27,0.12)]'
                  : 'relative flex flex-col rounded-2xl border border-black/[0.08] bg-white p-6'
              }
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    isMilestone
                      ? 'font-display text-5xl leading-none text-accent-bright'
                      : 'font-display text-5xl leading-none text-ink/25'
                  }
                >
                  {n}
                </span>
                <span
                  className={
                    isMilestone
                      ? 'flex h-11 w-11 items-center justify-center rounded-xl bg-accent-bright text-white'
                      : 'flex h-11 w-11 items-center justify-center rounded-xl border border-accent-bright/25 bg-white text-accent-bright'
                  }
                >
                  <Icon size={22} />
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg leading-tight text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cloud/70">{body}</p>

              {isMilestone && (
                <span className="mt-4 inline-flex w-fit rounded-full bg-accent-bright/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent-bright">
                  El hito
                </span>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </SlideShell>
  )
}
