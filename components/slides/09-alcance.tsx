'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Stat, AnimatedNumber } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const STATS: { to: number; label: string }[] = [
  { to: 27, label: 'Municipios incluidos' },
  { to: 6, label: 'Subregiones' },
  { to: 10, label: 'Semanas' },
  { to: 12, label: 'Meses de IA e infraestructura incluidos' },
]

const SUBREGIONS = ['01', '02', '03', '04', '05', '06']

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="justify-center gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Alcance</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-4xl leading-[1.08] text-ink sm:text-5xl"
      >
        Los <GradientText>27 municipios</GradientText>, en 6 subregiones. No una muestra.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {STATS.map((s) => (
          <Stat
            key={s.label}
            value={<AnimatedNumber to={s.to} />}
            label={s.label}
            className="px-4 py-4"
          />
        ))}
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {SUBREGIONS.map((n) => (
          <motion.div
            key={n}
            variants={popIn}
            className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white px-4 py-4"
          >
            <div className="pointer-events-none absolute inset-0 bg-dots-light opacity-30" />
            <div className="relative">
              <span className="font-display text-4xl leading-none text-accent-bright">{n}</span>
              <p className="mt-2 text-sm font-semibold text-cloud">Subregión</p>
              <p className="mt-1 text-[0.72rem] leading-snug text-cloud/55">
                Municipios agrupados por la clasificación de la plataforma
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} className="max-w-[92ch] text-sm leading-relaxed text-cloud/60">
        Las seis subregiones corresponden a la agrupación que la propia plataforma ya define; la solución
        trabaja sobre esa clasificación existente y cubre los 27 municipios completos.
      </motion.p>
    </SlideShell>
  )
}
