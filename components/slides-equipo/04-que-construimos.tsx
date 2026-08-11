'use client'

import { motion } from 'framer-motion'
import {
  ClipboardList, Sparkles, MessagesSquare, Route, MessageCircle,
  MapPin, WifiOff, Languages, LayoutDashboard, FileBarChart, type LucideIcon,
} from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const ITEMS: { icon: LucideIcon; text: string }[] = [
  { icon: ClipboardList, text: 'Perfil en 4 preguntas, sin registro' },
  { icon: Sparkles, text: 'Feed personalizado con explicación' },
  { icon: MessagesSquare, text: 'Asistente conversacional anclado' },
  { icon: Route, text: 'Itinerarios de 2 a 5 días' },
  { icon: MessageCircle, text: 'Compartir por WhatsApp' },
  { icon: MapPin, text: 'Rutas en Google Maps' },
  { icon: WifiOff, text: 'Itinerario sin conexión' },
  { icon: Languages, text: 'Respuesta bilingüe ES / EN' },
  { icon: LayoutDashboard, text: 'Tablero de inteligencia de destino' },
  { icon: FileBarChart, text: 'Informe de brechas por municipio' },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>Qué construimos</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[24ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.6rem]"
      >
        Diez entregables <GradientText>concretos</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {ITEMS.map(({ icon: Icon, text }) => (
          <motion.div
            key={text}
            variants={popIn}
            className="flex items-center gap-4 rounded-xl border border-black/[0.08] bg-white px-5 py-3.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[1.02rem] text-cloud">{text}</span>
          </motion.div>
        ))}
      </motion.div>
    </SlideShell>
  )
}
