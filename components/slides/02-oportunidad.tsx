'use client'

import { motion } from 'framer-motion'
import { Check, CircleAlert } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

type Row = { kind: 'have' | 'gap'; title: string; detail: string }

const ROWS: Row[] = [
  {
    kind: 'have',
    title: 'Contenido publicado y clasificado',
    detail: 'Los 27 municipios, las taxonomías y las subregiones ya existen.',
  },
  {
    kind: 'have',
    title: 'Sitio bilingüe y consumible por API',
    detail: 'La base técnica ya está lista para trabajar sobre ella.',
  },
  {
    kind: 'gap',
    title: 'Falta: llevar al visitante a lo suyo',
    detail: 'Según su tiempo, sus intereses y con quién viaja.',
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="justify-center gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>La oportunidad</Kicker>
      </motion.div>

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-6">
          <motion.h2
            variants={fadeUp}
            className="max-w-[16ch] font-display text-4xl leading-[1.08] text-ink sm:text-5xl"
          >
            La brecha no es de contenido: es de <GradientText>navegación</GradientText>.
          </motion.h2>

          <motion.p variants={fadeUp} className="max-w-[52ch] text-lg leading-relaxed text-cloud/70">
            La plataforma Caldas es Natural ya reúne y clasifica la oferta turística de los 27 municipios. Lo que
            hoy no ofrece es una forma de que el visitante llegue directo a lo que le interesa según su tiempo, sus
            intereses y con quién viaja.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-[52ch] border-l-2 border-accent-bright/50 pl-4 text-base font-medium leading-relaxed text-cloud"
          >
            Esa distancia entre un catálogo bien organizado y una experiencia guiada es exactamente lo que cerramos.
          </motion.p>
        </div>

        <motion.div variants={stagger} className="flex flex-col gap-3">
          {ROWS.map((row) => {
            const isGap = row.kind === 'gap'
            return (
              <motion.div
                key={row.title}
                variants={popIn}
                className={
                  isGap
                    ? 'flex items-start gap-4 rounded-2xl border border-accent-bright/40 bg-accent/25 p-5'
                    : 'flex items-start gap-4 rounded-2xl border border-black/[0.08] bg-white p-5'
                }
              >
                <span
                  className={
                    isGap
                      ? 'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-bright/15 text-accent-bright'
                      : 'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent'
                  }
                >
                  {isGap ? <CircleAlert size={20} /> : <Check size={20} strokeWidth={2.6} />}
                </span>
                <div>
                  <p className={isGap ? 'font-semibold text-ink' : 'font-semibold text-cloud'}>{row.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cloud/65">{row.detail}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SlideShell>
  )
}
