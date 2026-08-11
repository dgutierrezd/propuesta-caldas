'use client'

import { motion } from 'framer-motion'
import { Database, DownloadCloud, Bot, Smartphone, BarChart3, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const CAPAS: { icon: LucideIcon; name: string; text: string; tag: string }[] = [
  { icon: Database, name: 'Contenido', tag: 'Plataforma actual', text: 'WordPress + API REST. Fuente única del catálogo. Acceso de SÓLO LECTURA.' },
  { icon: DownloadCloud, name: 'Ingesta e indexación', tag: 'Nuestro', text: 'Lee las fichas por la API, las normaliza y construye un índice de búsqueda por significado.' },
  { icon: Bot, name: 'Agentes de IA', tag: 'Nuestro', text: 'Perfilan, recomiendan, conversan, arman itinerarios y analizan brechas. Anclados al catálogo.' },
  { icon: Smartphone, name: 'Experiencia', tag: 'Nuestro', text: 'Web móvil primero: perfil, feed, chat, itinerarios, compartir y guardado sin conexión.' },
  { icon: BarChart3, name: 'Gobierno', tag: 'Nuestro', text: 'Tablero de inteligencia y informe de brechas. Métricas agregadas y anónimas.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Arquitectura</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Cinco capas sobre el contenido, <GradientText>sin tocar la plataforma</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="flex flex-col gap-2.5">
        {CAPAS.map(({ icon: Icon, name, text, tag }) => (
          <motion.div
            key={name}
            variants={popIn}
            className="flex items-center gap-4 rounded-xl border border-black/[0.08] bg-white px-5 py-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex w-52 shrink-0 items-center gap-2">
              <span className="font-display text-lg text-ink">{name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${tag === 'Nuestro' ? 'bg-accent-bright/15 text-accent-bright' : 'bg-black/10 text-cloud/60'}`}>
                {tag}
              </span>
            </div>
            <p className="text-[0.92rem] leading-snug text-cloud/75">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </SlideShell>
  )
}
