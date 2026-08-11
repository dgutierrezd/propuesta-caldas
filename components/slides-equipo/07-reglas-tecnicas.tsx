'use client'

import { motion } from 'framer-motion'
import { Eye, ShieldCheck, UserX, Gauge, WifiOff, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, stagger } from '@/lib/motion'

const REGLAS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Eye, title: 'Sólo lectura sobre el catálogo', text: 'Nunca escribimos en la plataforma. La capa consume el contenido; jamás lo modifica.' },
  { icon: ShieldCheck, title: 'Anclaje obligatorio (grounding)', text: 'Toda respuesta se apoya en fichas reales. Sin respaldo, el sistema lo declara. No se inventa.' },
  { icon: UserX, title: 'Sin datos personales identificables', text: 'Perfil sin registro; el tablero usa datos agregados y anónimos.' },
  { icon: Gauge, title: 'Control de costo de IA', text: 'Límites y alertas de uso, y reporte de consumo mensual dentro del presupuesto.' },
  { icon: WifiOff, title: 'Itinerario sin conexión', text: 'Un itinerario generado se puede consultar sin internet en el mismo dispositivo.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="gap-7">
      <motion.div variants={fadeUp}>
        <Kicker>Reglas técnicas · no negociables</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Cinco reglas que <GradientText>todos respetamos</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REGLAS.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-5">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mb-1.5 font-display text-[1.05rem] leading-tight text-ink">{title}</h3>
            <p className="text-[0.86rem] leading-snug text-cloud/70">{text}</p>
          </Card>
        ))}
      </motion.div>
    </SlideShell>
  )
}
