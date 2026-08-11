'use client'

import { motion } from 'framer-motion'
import { BarChart3, FileSearch } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, Card } from '@/components/ui/primitives'
import { fadeUp, easeOut, stagger } from '@/lib/motion'
import type { ReactNode } from 'react'

// Mock del tablero: barras ORDENADAS descendente (ranking) con paleta categórica
// derivada de la marca Caldas es Natural. Sin cifras: es una vista previa ilustrativa.
const CHART: { h: number; c: string }[] = [
  { h: 0.96, c: '#2F7D14' },
  { h: 0.8, c: '#1E88C7' },
  { h: 0.68, c: '#E8871E' },
  { h: 0.58, c: '#8A3FC0' },
  { h: 0.48, c: '#E23E96' },
  { h: 0.4, c: '#4FA524' },
  { h: 0.32, c: '#C99A00' },
]

// Filas del mock de brechas: cobertura por municipio, ordenadas descendente. Sin etiquetas.
const BRECHAS = [0.82, 0.64, 0.5, 0.34]

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

          {/* Gráfico de barras (vista previa, sin cifras): ranking descendente, color por categoría */}
          <div className="mt-auto">
            <motion.div
              variants={stagger}
              aria-hidden
              className="relative flex h-28 items-end gap-2.5 rounded-xl border border-black/[0.08] bg-white px-4 pb-6 pt-3"
            >
              <div className="pointer-events-none absolute inset-x-4 top-[34%] h-px bg-black/[0.05]" />
              <div className="pointer-events-none absolute inset-x-4 top-[62%] h-px bg-black/[0.05]" />
              <div className="pointer-events-none absolute inset-x-4 bottom-6 h-px bg-black/15" />
              {CHART.map((b, i) => (
                <motion.div
                  key={i}
                  variants={growBar}
                  style={{ height: `${b.h * 100}%`, transformOrigin: 'bottom', backgroundColor: b.c }}
                  className="flex-1 rounded-t-md"
                />
              ))}
            </motion.div>
            <p className="mt-2 text-xs text-cloud/65">Intereses más buscados · vista previa</p>
          </div>
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

          {/* Mock de cobertura por municipio (vista previa): parte cubierta vs. brecha, sin etiquetas */}
          <div className="mt-auto">
            <motion.div
              variants={stagger}
              aria-hidden
              className="flex flex-col gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-4"
            >
              {BRECHAS.map((cover, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div className="relative h-2.5 flex-1 overflow-hidden rounded-full border border-dashed border-black/15 bg-black/[0.03]">
                    <motion.div
                      variants={growRow}
                      style={{ width: `${cover * 100}%`, transformOrigin: 'left' }}
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
            <p className="mt-2 text-xs text-cloud/65">
              <span className="inline-block h-2 w-2 rounded-full bg-accent align-middle" /> Cobertura
              &nbsp;·&nbsp; <span className="inline-block h-2 w-4 rounded-full border border-dashed border-black/25 align-middle" /> Brecha &nbsp;·&nbsp; vista previa
            </p>
          </div>
        </Card>
      </motion.div>
    </SlideShell>
  )
}
