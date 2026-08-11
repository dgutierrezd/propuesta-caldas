'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, wipeX, stagger } from '@/lib/motion'

const PASOS = [
  {
    n: '1',
    title: 'Responde 4 preguntas',
    desc: 'Intereses, días disponibles, con quién viaja y municipios de interés. Sin registro.',
  },
  {
    n: '2',
    title: 'Feed personalizado',
    desc: 'Cada recomendación explica por qué se le sugiere.',
  },
  {
    n: '3',
    title: 'Pregunta en lenguaje natural',
    desc: 'Un asistente responde con fichas reales del catálogo; si algo no está, lo dice.',
  },
  {
    n: '4',
    title: 'Genera un itinerario',
    desc: 'De 2 a 5 días, conectando municipios cercanos por subregión.',
  },
  {
    n: '5',
    title: 'Se lo lleva',
    desc: 'Comparte por WhatsApp, abre rutas en Google Maps y guarda para consultar sin conexión.',
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>Cómo funciona · Recorrido del visitante</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        Cinco pasos, sin registro, de la <GradientText>duda</GradientText> al itinerario.
      </motion.h2>

      <div className="relative mt-2">
        {/* Línea conectora que se dibuja */}
        <motion.div
          variants={wipeX}
          className="absolute left-[10%] right-[10%] top-8 hidden h-0.5 origin-left bg-gradient-to-r from-accent-bright/70 via-accent-bright/40 to-accent-bright/10 lg:block"
        />

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
        >
          {PASOS.map((p) => (
            <motion.div
              key={p.n}
              variants={popIn}
              className="flex flex-col items-center text-center lg:items-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-accent-bright/40 bg-white font-display text-2xl text-accent-bright shadow-[0_8px_24px_rgba(29,31,27,0.14)]">
                {p.n}
              </div>
              <h3 className="mt-4 font-display text-lg leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-cloud/70">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  )
}
