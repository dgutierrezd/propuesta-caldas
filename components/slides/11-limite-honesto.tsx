'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Tag, CalendarX, Users } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const PILLS = [
  { icon: Tag, label: 'No cotiza' },
  { icon: CalendarX, label: 'No reserva' },
  { icon: Users, label: 'No confirma cupos' },
]

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="justify-center gap-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="space-y-7">
          <motion.div variants={fadeUp}>
            <Kicker>El límite honesto</Kicker>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="max-w-[24ch] font-display text-4xl leading-[1.1] text-ink sm:text-5xl"
          >
            Lo que la solución <GradientText>no hace</GradientText>, y por qué lo decimos de frente.
          </motion.h2>

          <motion.p variants={fadeUp} className="max-w-[58ch] text-lg leading-relaxed text-cloud/75">
            Las fichas del catálogo no publican precio ni disponibilidad por fecha. Por eso la solución
            recomienda, explica y arma itinerarios sobre el contenido existente, pero remite al prestador para
            precio y disponibilidad.
          </motion.p>

          <motion.div variants={stagger} className="flex flex-wrap gap-3">
            {PILLS.map(({ icon: Icon, label }) => (
              <motion.span
                key={label}
                variants={popIn}
                className="inline-flex items-center gap-2.5 rounded-full border border-accent-bright/40 bg-accent/30 px-5 py-3 text-base font-semibold text-ink"
              >
                <Icon size={20} className="text-accent-bright" />
                {label}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={popIn}
          className="hidden shrink-0 items-center justify-center lg:flex"
        >
          <div className="flex h-44 w-44 items-center justify-center rounded-full border border-accent-bright/30 bg-white shadow-[0_0_60px_rgba(104,196,28,0.25)]">
            <ShieldCheck size={80} strokeWidth={1.4} className="text-accent-bright" />
          </div>
        </motion.div>
      </div>

      <motion.p variants={fadeUp} className="max-w-[80ch] text-sm leading-relaxed text-cloud/60">
        Ser claros sobre este límite es parte de la propuesta: el visitante llega bien informado al prestador,
        que es quien cierra la transacción.
      </motion.p>
    </SlideShell>
  )
}
