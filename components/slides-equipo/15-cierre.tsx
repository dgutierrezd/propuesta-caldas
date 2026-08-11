'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { BrandLogo, GradientText } from '@/components/ui/primitives'
import { fadeUp } from '@/lib/motion'

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="items-center gap-7 text-center">
      <motion.div variants={fadeUp}>
        <BrandLogo priority className="h-10" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[20ch] font-display text-5xl leading-[1.05] text-ink sm:text-6xl"
      >
        El modelo ya existe. <GradientText>Manos a la obra.</GradientText>
      </motion.h2>

      <motion.p variants={fadeUp} className="max-w-[46ch] text-lg text-cloud/70">
        27 municipios · 10 semanas · una demostración funcionando al cierre de cada sprint.
      </motion.p>

      <motion.p variants={fadeUp} className="text-sm text-cloud/45">
        Equipo Adisoft · Plan de trabajo interno · Capa de IA para Caldas es Natural
      </motion.p>
    </SlideShell>
  )
}
