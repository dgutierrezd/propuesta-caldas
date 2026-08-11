'use client'

import { motion } from 'framer-motion'
import { BarChart3, FileSearch } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, easeOut, stagger } from '@/lib/motion'
import type { ReactNode } from 'react'

// Alturas genéricas para el mock de barras (sin cifras, solo forma).
const BARRAS = [0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5]

// Filas genéricas para el mock de brechas: porción cubierta vs. faltante.
const BRECHAS = [0.75, 0.5, 0.6, 0.35]

const growBar = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.7, ease: easeOut } },
}

const growRow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: easeOut } },
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent-bright/30 bg-accent-bright/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright">
      {children}
    </span>
  )
}

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="gap-8">
      <motion.div variants={fadeUp}>
        <Kicker>Cómo funciona · Recorrido del funcionario</Kicker>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-[26ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        Inteligencia de destino para la <GradientText>Gobernación</GradientText>.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tarjeta 1 — Tablero */}
        <Card variant="glass" className="flex flex-col gap-5 p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-bright/15 text-accent-bright">
              <BarChart3 className="h-5 w-5" />
            </span>
            <Tag>Tablero</Tag>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Inteligencia de destino</h3>
            <p className="mt-3 text-base leading-relaxed text-cloud/70">
              Métricas agregadas y anónimas: intereses y municipios más buscados, longitud típica de los
              itinerarios y consultas que quedaron sin respuesta.
            </p>
          </div>

          {/* Mock visual de barras — genérico, sin cifras */}
          <motion.div
            variants={stagger}
            className="mt-auto flex h-24 items-end gap-2 rounded-xl border border-black/[0.08] bg-white px-4 pb-4 pt-3"
          >
            {BARRAS.map((h, i) => (
              <motion.div
                key={i}
                variants={growBar}
                style={{ height: `${h * 100}%`, transformOrigin: 'bottom' }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-accent-bright/40 to-accent-bright/80"
              />
            ))}
          </motion.div>
        </Card>

        {/* Tarjeta 2 — Informe */}
        <Card variant="glass" className="flex flex-col gap-5 p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-bright/15 text-accent-bright">
              <FileSearch className="h-5 w-5" />
            </span>
            <Tag>Informe</Tag>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Brechas de contenido por municipio</h3>
            <p className="mt-3 text-base leading-relaxed text-cloud/70">
              Dónde el catálogo se queda corto frente a la demanda, para priorizar qué producir con criterio.
            </p>
          </div>

          {/* Mock visual de brechas — porción cubierta vs. faltante, sin etiquetas */}
          <motion.div
            variants={stagger}
            className="mt-auto flex flex-col gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-4"
          >
            {BRECHAS.map((cover, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent-bright/50" />
                <div className="relative h-2.5 flex-1 overflow-hidden rounded-full border border-dashed border-black/15 bg-white">
                  <motion.div
                    variants={growRow}
                    style={{ width: `${cover * 100}%`, transformOrigin: 'left' }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-bright/70 to-accent-bright/40"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </Card>
      </motion.div>
    </SlideShell>
  )
}
