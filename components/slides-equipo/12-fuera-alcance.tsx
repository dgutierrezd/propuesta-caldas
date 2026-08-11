'use client'

import { motion } from 'framer-motion'
import { Ban } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const FUERA = [
  { t: 'Reservas, pagos o precios', d: 'Las fichas no publican precio ni disponibilidad. Remitimos al prestador.' },
  { t: 'Rediseño de la plataforma', d: 'No reconstruimos ni cambiamos el contenido publicado.' },
  { t: 'Producción de contenido', d: 'El informe de brechas señala qué falta; producirlo es un trabajo aparte.' },
  { t: 'App nativa en tiendas', d: 'La solución es web y funciona en móvil; el itinerario se guarda para uso offline.' },
  { t: 'Integraciones de terceros', d: 'Pasarelas, centrales de reservas o CRM no contemplados en este alcance.' },
  { t: 'Idiomas más allá de ES / EN', d: 'Nos apoyamos en el contenido bilingüe que ya existe.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Fuera de alcance · para no desviarnos</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Lo que <GradientText>no</GradientText> vamos a hacer.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FUERA.map(({ t, d }) => (
          <motion.div key={t} variants={popIn} className="rounded-xl border border-black/[0.08] bg-white px-5 py-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/10 text-cloud/60">
                <Ban className="h-4 w-4" />
              </span>
              <h3 className="font-display text-[1rem] text-ink">{t}</h3>
            </div>
            <p className="text-[0.84rem] leading-snug text-cloud/65">{d}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} className="text-sm text-cloud/55">
        Declarar el límite protege el cronograma y la confianza del cliente. Todo esto puede
        contratarse aparte si lo piden.
      </motion.p>
    </SlideShell>
  )
}
