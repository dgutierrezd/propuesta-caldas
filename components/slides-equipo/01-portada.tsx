'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { BrandLogo, Kicker, GradientText, Chip } from '@/components/ui/primitives'
import { fadeUp, stagger } from '@/lib/motion'

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="gap-6">
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <BrandLogo priority className="h-9" />
        <span className="text-xl font-light text-cloud/30">×</span>
        <Image
          src="/esnatural/caldas-es-natural-logo.png"
          alt="Caldas es Natural"
          width={284}
          height={290}
          className="h-10 w-auto"
        />
      </motion.div>

      <motion.div variants={fadeUp} className="mt-2">
        <Kicker>Plan de trabajo · Equipo Adisoft</Kicker>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="max-w-[18ch] font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
      >
        Capa de IA para <GradientText>Caldas es Natural</GradientText>
      </motion.h1>

      <motion.p variants={fadeUp} className="max-w-[52ch] text-lg text-cloud/70 sm:text-xl">
        Qué vamos a construir, cómo lo organizamos y qué necesitamos para arrancar.
      </motion.p>

      <motion.div variants={stagger} className="mt-2 flex flex-wrap gap-3">
        <Chip>27 municipios</Chip>
        <Chip>10 semanas</Chip>
        <Chip>5 sprints</Chip>
        <Chip>Demo funcionando cada sprint</Chip>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-3 max-w-[60ch] border-l-2 border-accent-bright/50 pl-4 text-sm text-cloud/65"
      >
        Sesión de arranque interna. No es el material que ve el cliente: aquí alineamos el equipo
        sobre el trabajo y el plan.
      </motion.p>
    </SlideShell>
  )
}
