'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const FINDINGS = [
  'Opera sobre WordPress con tipos de contenido personalizados para prestadores.',
  'Ya existen las taxonomías de tipo de experiencia y categorías de servicios.',
  'Los 27 municipios ya están clasificados en 6 subregiones.',
  'El contenido es consumible por API REST estándar.',
  'El sitio ya es bilingüe español / inglés.',
  'La estructura de datos que la personalización necesita ya está construida.',
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="justify-center gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Nuestro diferenciador · Diagnóstico técnico</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[22ch] font-display text-4xl leading-[1.08] text-ink sm:text-5xl"
      >
        Revisamos la plataforma antes de cotizar.
      </motion.h2>

      <motion.p variants={fadeUp} className="max-w-[62ch] text-lg leading-relaxed text-cloud/70">
        Estos son los hallazgos verificables sobre los que apoyamos alcance y precio.
      </motion.p>

      <motion.div variants={stagger} className="grid gap-3 md:grid-cols-2">
        {FINDINGS.map((f) => (
          <motion.div
            key={f}
            variants={popIn}
            className="flex items-start gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3.5"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={17} strokeWidth={2.8} />
            </span>
            <p className="text-[0.95rem] leading-snug text-cloud/85">{f}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-accent-bright/40 bg-accent/35 px-7 py-5 shadow-[0_10px_40px_rgba(29,31,27,0.12)]"
      >
        <p className="max-w-[80ch] text-lg leading-relaxed text-ink sm:text-xl">
          El modelo de datos que la personalización necesita{' '}
          <GradientText className="font-semibold">ya está construido</GradientText>. Por eso podemos comprometer los{' '}
          <GradientText className="font-semibold">27 municipios</GradientText> —no una selección parcial— en 10
          semanas.
        </p>
      </motion.div>
    </SlideShell>
  )
}
