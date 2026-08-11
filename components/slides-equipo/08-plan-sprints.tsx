'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const SPRINTS = [
  { s: 'Sprint 1', wk: 'Sem 1–2', title: 'Ingesta del catálogo e indexación', demo: 'Demo' },
  { s: 'Sprint 2', wk: 'Sem 3–4', title: 'Perfil de viajero y feed personalizado', demo: 'Demo' },
  { s: 'Sprint 3', wk: 'Sem 5–6', title: 'Asistente conversacional bilingüe, anclado', demo: 'Demo' },
  { s: 'Sprint 4', wk: 'Sem 7–8', title: 'Itinerarios, WhatsApp, Google Maps y sin conexión', demo: 'Demo' },
  { s: 'Sprint 5', wk: 'Sem 9–10', title: 'Tablero, informe de brechas, pruebas y entrega', demo: 'Demo final' },
]

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>El plan</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        <GradientText>5 sprints</GradientText> · 10 semanas · una demo al cierre de cada uno.
      </motion.h2>

      <div className="relative mt-2">
        <div className="absolute left-0 right-0 top-[18px] h-[3px] rounded bg-black/10" />
        <motion.div
          className="absolute left-0 top-[18px] h-[3px] origin-left rounded bg-gradient-to-r from-accent to-accent-bright"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } }}
          style={{ width: '100%' }}
        />
        <motion.div variants={stagger} className="grid grid-cols-2 gap-4 pt-11 sm:grid-cols-3 lg:grid-cols-5">
          {SPRINTS.map(({ s, wk, title, demo }, i) => (
            <motion.div key={s} variants={popIn} className="relative">
              <span
                className={`absolute -top-[41px] left-4 h-3.5 w-3.5 rounded-full border-[3px] ${i === 4 ? 'border-accent-bright bg-accent-bright shadow-[0_0_14px_2px_rgba(79,165,36,0.6)]' : 'border-accent-bright bg-white'}`}
              />
              <div className={`h-full rounded-xl border p-4 ${i === 4 ? 'border-accent-bright/40 bg-accent/15' : 'border-black/[0.08] bg-white'}`}>
                <div className="text-[0.68rem] font-bold uppercase tracking-wider text-accent-bright">{s}</div>
                <div className="tnum mb-2 text-xs text-cloud/55">{wk}</div>
                <h3 className="mb-3 font-display text-[0.95rem] leading-tight text-ink">{title}</h3>
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-accent-bright">
                  <Play className="h-3 w-3 fill-current" /> {demo}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  )
}
