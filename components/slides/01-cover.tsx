'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { BrandLogo, Kicker, GradientText, Chip } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const CHIPS = ['27 municipios', '10 semanas', '5 sprints', 'Demo funcionando en cada sprint']

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="justify-center gap-7">
      <motion.div variants={fadeUp}>
        <BrandLogo priority className="h-12 sm:h-14" />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Kicker>Propuesta para la Gobernación de Caldas</Kicker>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="max-w-[19ch] font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
      >
        Una capa de <GradientText>inteligencia artificial</GradientText> para Caldas es Natural
      </motion.h1>

      <motion.p variants={fadeUp} className="max-w-[62ch] text-lg leading-relaxed text-cloud/70 sm:text-xl">
        Para que cada visitante reciba recomendaciones e itinerarios personalizados sobre el catálogo turístico
        que el departamento ya tiene publicado.
      </motion.p>

      <motion.div variants={stagger} className="flex flex-wrap gap-3">
        {CHIPS.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </motion.div>

      <motion.p
        variants={popIn}
        className="max-w-[70ch] border-l-2 border-accent-bright/40 pl-4 text-sm leading-relaxed text-cloud/55"
      >
        No reconstruimos ni rediseñamos la plataforma; sumamos una capa sobre el contenido que ya existe en{' '}
        <span className="text-cloud/80">esnatural.caldas.gov.co</span>.
      </motion.p>
    </SlideShell>
  )
}
