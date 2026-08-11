'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const HALLAZGOS = [
  'Opera sobre WordPress con tipos de contenido personalizados para prestadores.',
  'Ya existen las taxonomías de tipo de experiencia y categorías de servicios.',
  'Los 27 municipios ya están clasificados en 6 subregiones.',
  'El contenido es consumible por API REST estándar.',
  'El sitio ya es bilingüe español / inglés.',
  'La estructura de datos que la personalización necesita ya está construida.',
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="gap-7">
      <motion.div variants={fadeUp}>
        <Kicker>Punto de partida · lo que ya existe</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[22ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.6rem]"
      >
        Revisamos la plataforma antes de arrancar.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {HALLAZGOS.map((h) => (
          <motion.div
            key={h}
            variants={popIn}
            className="flex items-start gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <p className="text-[0.95rem] leading-snug text-cloud">{h}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-accent-bright/25 bg-accent/15 px-6 py-5"
      >
        <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
          El modelo de datos ya está construido. Nuestro trabajo es construir{' '}
          <GradientText>el motor que lo lee</GradientText> —no el modelo—, y por eso comprometemos los
          27 municipios en 10 semanas.
        </p>
      </motion.div>
    </SlideShell>
  )
}
