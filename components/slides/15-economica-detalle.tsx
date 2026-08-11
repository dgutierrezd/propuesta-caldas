'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, stagger, easeOut } from '@/lib/motion'

const SPRINTS = [
  { id: 'S1', name: 'Ingesta e indexación', amount: 3700000 },
  { id: 'S2', name: 'Perfil y feed', amount: 4100000 },
  { id: 'S3', name: 'Asistente conversacional', amount: 3900000 },
  { id: 'S4', name: 'Itinerarios, WhatsApp, Maps, offline', amount: 3900000 },
  { id: 'S5', name: 'Tablero, brechas, entrega', amount: 2900000 },
]
const MAX = 4100000
const cop = (n: number) => '$' + n.toLocaleString('es-CO')

function SprintRow({ id, name, amount }: { id: string; name: string; amount: number }) {
  const frac = amount / MAX
  return (
    <motion.div variants={fadeUp} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <span className="font-display text-sm font-semibold text-accent-bright">{id}</span>
      <div className="min-w-0">
        <p className="truncate text-[0.9rem] leading-tight text-cloud">{name}</p>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <motion.div
            className="h-full origin-left rounded-full bg-accent-bright/70"
            style={{ width: `${frac * 100}%` }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: easeOut } } }}
          />
        </div>
      </div>
      <span className="tnum shrink-0 font-display text-base text-ink">{cop(amount)}</span>
    </motion.div>
  )
}

const REASONS = [
  'El motor de personalización ya está construido y operando: se cotiza su adaptación al catálogo de Caldas, no su desarrollo desde cero.',
  'La plataforma expone su contenido por API estándar: no hay migración ni reconstrucción.',
  'Las taxonomías y la clasificación territorial ya existen: no hay que crearlas.',
  'Quien cotiza es quien construye, sin capa comercial intermedia.',
  'El costo marginal por municipio es cercano a cero: el trabajo está en construir el motor, no en repetirlo. Por eso incluimos los 27.',
  'Desglose por sprint para que el precio sea auditable en cada etapa.',
]

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="justify-center gap-6">
      <div>
        <Kicker>Propuesta económica · el detalle</Kicker>
        <motion.h2 variants={fadeUp} className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Un precio <GradientText>auditable</GradientText>, sprint por sprint.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Desglose por sprint */}
        <motion.div
          variants={stagger}
          className="flex flex-col gap-3 rounded-2xl border border-black/[0.08] bg-white p-5 backdrop-blur-sm"
        >
          <div className="flex flex-col gap-3">
            {SPRINTS.map((s) => (
              <SprintRow key={s.id} {...s} />
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-1 flex items-baseline justify-between rounded-lg border border-accent-bright/30 bg-accent-bright/10 px-3 py-2"
          >
            <span className="text-sm font-semibold text-ink">Subtotal implementación</span>
            <span className="tnum font-display text-xl text-accent-bright">$18.500.000</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-baseline justify-between px-3">
            <span className="text-[0.82rem] text-cloud/60">Renovación año 2 en adelante · opcional</span>
            <span className="tnum text-[0.9rem] text-cloud/70">$6.700.000 + IVA anual</span>
          </motion.div>
        </motion.div>

        {/* Por qué es defendible */}
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-accent-bright"
          >
            Por qué este precio es defendible
          </motion.p>
          <motion.ol variants={stagger} className="flex flex-col gap-2.5">
            {REASONS.map((r, i) => (
              <motion.li key={i} variants={fadeUp} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-bright/40 font-display text-xs font-semibold text-accent-bright">
                  {i + 1}
                </span>
                <span className="text-[0.86rem] leading-snug text-cloud/85">{r}</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </SlideShell>
  )
}
