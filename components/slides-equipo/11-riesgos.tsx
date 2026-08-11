'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, KeyRound, Users, Cpu } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const RIESGOS = [
  { r: 'Fichas con poca información', m: 'El sistema declara lo que no sabe; el informe de brechas prioriza qué enriquecer.' },
  { r: 'Cambios en la API o el catálogo', m: 'Capa desacoplada y de sólo lectura: el ajuste se absorbe sin tocar la plataforma.' },
  { r: 'Consumo de IA por encima de lo previsto', m: 'Límites y alertas de uso, y reporte de consumo mensual.' },
  { r: 'Expectativa de reservas o precios', m: 'Límite declarado desde la propuesta (ver «Fuera de alcance»).' },
]

const DEPS = [
  { icon: KeyRound, t: 'Acceso de lectura a la API REST y credenciales / IP autorizadas.' },
  { icon: Users, t: 'Contraparte del cliente designada para demos y aprobaciones.' },
  { icon: Cpu, t: 'Proveedor y modelo de IA definidos, con costo mensual estimado.' },
]

export default function Slide() {
  return (
    <SlideShell ambient="grid" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Riesgos y dependencias</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Lo que puede frenarnos, y cómo lo <GradientText>manejamos</GradientText>.
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={stagger} className="flex flex-col gap-2.5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cloud/50">
            <AlertTriangle className="h-4 w-4 text-accent-bright" /> Riesgos y manejo
          </p>
          {RIESGOS.map(({ r, m }) => (
            <motion.div key={r} variants={popIn} className="rounded-xl border border-black/[0.08] bg-white px-4 py-3">
              <p className="text-[0.92rem] font-semibold text-ink">{r}</p>
              <p className="mt-0.5 text-[0.84rem] leading-snug text-cloud/70">{m}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={stagger} className="flex flex-col gap-2.5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cloud/50">
            <KeyRound className="h-4 w-4 text-accent-bright" /> Dependencias del cliente
          </p>
          {DEPS.map(({ icon: Icon, t }) => (
            <motion.div key={t} variants={popIn} className="flex items-start gap-3 rounded-xl border border-accent-bright/20 bg-accent/10 px-4 py-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-bright/15 text-accent-bright">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-[0.9rem] leading-snug text-cloud">{t}</p>
            </motion.div>
          ))}
          <p className="mt-1 text-[0.82rem] text-cloud/55">Sin estas tres, no arranca el Sprint 1.</p>
        </motion.div>
      </div>
    </SlideShell>
  )
}
