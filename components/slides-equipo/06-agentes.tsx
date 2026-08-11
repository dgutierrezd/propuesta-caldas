'use client'

import { motion } from 'framer-motion'
import { UserCog, ListOrdered, MessagesSquare, Route, ScanSearch, ShieldCheck, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const AGENTES: { n: string; icon: LucideIcon; name: string; text: string }[] = [
  { n: '01', icon: UserCog, name: 'Perfilado', text: 'Convierte las 4 respuestas en un perfil de sesión que orienta el recorrido.' },
  { n: '02', icon: ListOrdered, name: 'Recomendación / ranking', text: 'Ordena las fichas según el perfil y explica por qué cada una aparece.' },
  { n: '03', icon: MessagesSquare, name: 'Conversacional (RAG)', text: 'Responde sobre fichas reales; declara cuando no tiene el dato.' },
  { n: '04', icon: Route, name: 'Itinerarios', text: 'Conecta municipios cercanos por subregión en recorridos de 2 a 5 días.' },
  { n: '05', icon: ScanSearch, name: 'Análisis de brechas', text: 'Cruza la demanda observada contra la oferta publicada por municipio.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="mesh" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Los agentes de IA</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Cinco agentes, cada uno con una función <GradientText>precisa</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {AGENTES.map(({ n, icon: Icon, name, text }) => (
          <Card key={n} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-display text-sm text-cloud/40">{n}</span>
            </div>
            <h3 className="mb-1.5 font-display text-[1.05rem] leading-tight text-ink">{name}</h3>
            <p className="text-[0.82rem] leading-snug text-cloud/70">{text}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex items-start gap-4 rounded-2xl border border-accent-bright/25 bg-accent/12 px-6 py-4"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-bright text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <p className="text-[0.98rem] leading-snug text-cloud">
          <span className="font-semibold text-accent-bright">Anclaje obligatorio.</span> Si no hay
          respaldo en el catálogo, el sistema lo declara en vez de inventar. Es una regla transversal
          a los cinco agentes, no una opción de configuración.
        </p>
      </motion.div>
    </SlideShell>
  )
}
