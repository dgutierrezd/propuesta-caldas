'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger, easeOut } from '@/lib/motion'

type Sprint = { n: number; weeks: string; title: string; demo: string }

const SPRINTS: Sprint[] = [
  { n: 1, weeks: 'Sem 1–2', title: 'Ingesta del catálogo e indexación', demo: 'Demo' },
  { n: 2, weeks: 'Sem 3–4', title: 'Perfil de viajero y feed personalizado', demo: 'Demo' },
  { n: 3, weeks: 'Sem 5–6', title: 'Asistente conversacional bilingüe, anclado', demo: 'Demo' },
  { n: 4, weeks: 'Sem 7–8', title: 'Itinerarios, WhatsApp, Google Maps y sin conexión', demo: 'Demo' },
  { n: 5, weeks: 'Sem 9–10', title: 'Tablero, informe de brechas, pruebas y entrega', demo: 'Demo final' },
]

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="justify-center gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>Cronograma</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-4xl leading-[1.08] text-ink sm:text-5xl"
      >
        <GradientText>10 semanas</GradientText> · 5 sprints · una demo al cierre de cada uno.
      </motion.h2>

      <div className="relative">
        {/* Barra base */}
        <div className="absolute left-0 right-0 top-[22px] h-1 rounded-full bg-black/10" />
        {/* Barra que se dibuja */}
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 1.2, ease: easeOut, delay: 0.2 } },
          }}
          className="absolute left-0 right-0 top-[22px] h-1 origin-left rounded-full bg-gradient-to-r from-accent-bright to-accent"
        />

        <motion.div variants={stagger} className="relative grid grid-cols-5 gap-3">
          {SPRINTS.map((s) => {
            const isFinal = s.n === 5
            return (
              <motion.div key={s.n} variants={popIn} className="flex flex-col items-center">
                <span
                  className={
                    isFinal
                      ? 'flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent-bright bg-accent-bright font-display text-lg text-white shadow-[0_0_24px_rgba(79,165,36,0.45)]'
                      : 'flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent-bright/60 bg-white font-display text-lg text-accent-bright'
                  }
                >
                  {s.n}
                </span>

                <div
                  className={
                    isFinal
                      ? 'mt-4 flex w-full flex-1 flex-col rounded-2xl border border-accent-bright/40 bg-accent/25 p-4'
                      : 'mt-4 flex w-full flex-1 flex-col rounded-2xl border border-black/[0.08] bg-white p-4'
                  }
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent-bright">
                    Sprint {s.n}
                  </p>
                  <p className="mt-1 font-display text-sm tnum text-cloud/70">{s.weeks}</p>
                  <p className="mt-3 flex-1 text-sm font-medium leading-snug text-ink">{s.title}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-bright/30 bg-white px-3 py-1.5 text-xs font-semibold text-cloud">
                    <Play size={13} className="text-accent-bright" fill="currentColor" />
                    {s.demo}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SlideShell>
  )
}
