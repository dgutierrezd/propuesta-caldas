'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const CRITERIOS = [
  { id: 'RF-01', text: 'Perfil generado en < 3 s, sin registro ni datos personales identificables.', s: 'S2' },
  { id: 'RF-02', text: 'Feed ordenado con explicación por tarjeta; toda ficha mostrada existe en el catálogo.', s: 'S2' },
  { id: 'RF-03', text: 'El asistente responde citando fichas reales y declara cuando no tiene el dato.', s: 'S3' },
  { id: 'RF-04', text: 'Itinerario de 2 a 5 días configurable, conectando municipios por subregión.', s: 'S4' },
  { id: 'RF-07', text: 'Un itinerario generado se consulta sin conexión en el mismo dispositivo.', s: 'S4' },
  { id: 'RF-08', text: 'Tablero con métricas agregadas y anónimas, sin datos individuales.', s: 'S5' },
  { id: 'RF-09', text: 'Informe que señala, por municipio, dónde el catálogo se queda corto.', s: 'S5' },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Definición de «Hecho»</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[30ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.3rem]"
      >
        Hecho = su criterio se <GradientText>demuestra</GradientText> en el cierre del sprint.
      </motion.h2>

      <motion.div variants={stagger} className="flex flex-col gap-2">
        {CRITERIOS.map(({ id, text, s }) => (
          <motion.div
            key={id}
            variants={popIn}
            className="flex items-center gap-4 rounded-xl border border-black/[0.08] bg-white px-5 py-2.5"
          >
            <span className="w-16 shrink-0 font-display text-sm font-bold text-accent-bright">{id}</span>
            <p className="flex-1 text-[0.92rem] leading-snug text-cloud">{text}</p>
            <span className="shrink-0 rounded-full bg-black/10 px-2.5 py-1 text-[0.7rem] font-bold text-cloud/70">{s}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} className="text-sm text-cloud/55">
        Cada criterio es verificable y se revisa en la demostración del sprint. Nada se da por hecho
        sin demostrarlo.
      </motion.p>
    </SlideShell>
  )
}
