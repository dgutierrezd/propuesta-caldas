'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { BrandLogo, Kicker, GradientText, Chip } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const CHIPS = ['27 municipios', '10 semanas', '5 sprints', 'Demo en cada sprint']

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="justify-center">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Columna de texto */}
        <div className="flex flex-col gap-5">
          <motion.div variants={fadeUp}>
            <BrandLogo priority className="h-11 sm:h-12" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Kicker>Propuesta para la Gobernación de Caldas</Kicker>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[15ch] font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            Una capa de <GradientText>inteligencia artificial</GradientText> para Caldas es Natural
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-[48ch] text-lg leading-relaxed text-cloud/70">
            Para que cada visitante reciba recomendaciones e itinerarios personalizados sobre el
            catálogo turístico que el departamento ya tiene publicado.
          </motion.p>

          <motion.div variants={stagger} className="flex flex-wrap gap-2.5">
            {CHIPS.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </motion.div>

          <motion.p
            variants={popIn}
            className="max-w-[60ch] border-l-2 border-accent-bright/40 pl-4 text-sm leading-relaxed text-cloud/65"
          >
            No reconstruimos ni rediseñamos la plataforma; sumamos una capa sobre el contenido que ya
            existe en <span className="text-cloud/80">esnatural.caldas.gov.co</span>.
          </motion.p>
        </div>

        {/* Columna visual: foto real de la región + logo del cliente (co-branding) */}
        <motion.div variants={popIn} className="relative hidden lg:block">
          <div className="relative h-[58vh] w-full overflow-hidden rounded-[28px] border border-black/[0.06] shadow-[0_22px_60px_rgba(29,31,27,0.20)]">
            <Image
              src="/esnatural/foto-centro-sur.jpg"
              alt="Región cafetera de Caldas"
              fill
              sizes="45vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12251A]/55 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
              <Image
                src="/esnatural/caldas-es-natural-logo.png"
                alt="Caldas es Natural"
                width={284}
                height={290}
                className="h-12 w-auto"
              />
              <div>
                <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent">
                  La plataforma
                </div>
                <div className="font-display text-lg leading-tight text-ink">Caldas es Natural</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  )
}
