'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { BrandLogo, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn } from '@/lib/motion'

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="items-center justify-center gap-8 text-center">
      <motion.div variants={popIn}>
        <BrandLogo priority className="h-14 w-auto sm:h-16" />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
      >
        El modelo de datos ya está construido.{' '}
        <GradientText>Nosotros construimos lo que falta.</GradientText>
      </motion.h1>

      <motion.p variants={fadeUp} className="text-lg text-cloud/75 sm:text-xl">
        27 municipios · 10 semanas · una demostración funcionando al cierre de cada sprint.
      </motion.p>

      <motion.div
        variants={popIn}
        className="inline-flex items-center gap-3 rounded-full border border-accent-bright/40 bg-accent-bright/10 px-7 py-3.5 text-base font-medium text-ink backdrop-blur-sm"
      >
        Agendemos una reunión de aclaración.
        <ArrowRight className="h-4 w-4 text-accent-bright" aria-hidden />
      </motion.div>

      <motion.p variants={fadeUp} className="mt-2 text-[0.82rem] text-cloud/50">
        Adisoft · Manizales, Caldas · Propuesta para la Gobernación de Caldas.
      </motion.p>
    </SlideShell>
  )
}
