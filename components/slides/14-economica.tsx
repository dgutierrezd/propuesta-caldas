'use client'

import { motion } from 'framer-motion'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText, AnimatedNumber } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const cop = (n: number) => '$' + Math.round(n).toLocaleString('es-CO')

/* Fila del desglose */
function Row({
  label,
  sub,
  amount,
  highlight = false,
  muted = false,
}: {
  label: string
  sub?: string
  amount: string
  highlight?: boolean
  muted?: boolean
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={[
        'flex items-baseline justify-between gap-4 rounded-lg px-3 py-2',
        highlight ? 'border border-accent-bright/30 bg-accent-bright/10' : '',
      ].join(' ')}
    >
      <div className="min-w-0">
        <p
          className={[
            'truncate text-[0.95rem] leading-tight',
            highlight ? 'font-semibold text-ink' : muted ? 'text-cloud/60' : 'text-cloud',
          ].join(' ')}
        >
          {label}
        </p>
        {sub && <p className="mt-0.5 truncate text-[0.72rem] text-cloud/50">{sub}</p>}
      </div>
      <p
        className={[
          'tnum shrink-0 text-right font-display leading-none',
          highlight ? 'text-xl text-accent-bright' : muted ? 'text-base text-cloud/60' : 'text-base text-ink',
        ].join(' ')}
      >
        {amount}
      </p>
    </motion.div>
  )
}

/* Tarjeta de forma de pago */
function PayCard({ pct, when, amount }: { pct: string; when: string; amount: string }) {
  return (
    <motion.div
      variants={popIn}
      className="flex flex-col rounded-2xl border border-black/[0.08] bg-white px-5 py-4 backdrop-blur-sm"
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl leading-none text-accent-bright">{pct}</span>
        <span className="text-[0.75rem] uppercase tracking-wider text-cloud/60">del total</span>
      </div>
      <p className="mt-2 text-sm font-medium text-ink">{when}</p>
      <p className="tnum mt-1 font-display text-lg text-cloud">{amount}</p>
    </motion.div>
  )
}

export default function Slide() {
  return (
    <SlideShell ambient="spotlight" contentClassName="justify-center gap-7">
      <Kicker>Propuesta económica</Kicker>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Cifra protagonista */}
        <motion.div variants={fadeUp} className="text-center lg:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cloud/60">Inversión total</p>
          <div className="mt-2 font-display font-semibold leading-[0.95] text-accent-bright [font-size:clamp(3.4rem,7vw,6.2rem)]">
            <AnimatedNumber to={29988000} duration={1.8} format={cop} />
          </div>
          <p className="mt-3 text-lg font-medium text-ink">
            <GradientText>COP · IVA incluido</GradientText>
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.95rem] text-cloud/70 lg:mx-0">
            Con 12 meses de costos de IA e infraestructura incluidos.
          </p>
        </motion.div>

        {/* Desglose */}
        <motion.div
          variants={stagger}
          className="rounded-2xl border border-black/[0.08] bg-white p-4 backdrop-blur-sm"
        >
          <Row label="Implementación" sub="5 sprints · 10 semanas" amount="$18.500.000" />
          <Row
            label="Licencia y operación año 1"
            sub="IA e infraestructura · 12 meses"
            amount="$6.700.000"
          />
          <div className="my-1 h-px bg-black/10" />
          <Row label="Subtotal" amount="$25.200.000" muted />
          <Row label="IVA 19%" amount="$4.788.000" muted />
          <div className="my-1.5" />
          <Row label="Total con IVA" amount="$29.988.000" highlight />
        </motion.div>
      </div>

      {/* Forma de pago */}
      <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PayCard pct="30%" when="A la firma" amount="$8.996.400" />
        <PayCard pct="40%" when="Cierre del Sprint 3" amount="$11.995.200" />
        <PayCard pct="30%" when="Entrega final" amount="$8.996.400" />
      </motion.div>
    </SlideShell>
  )
}
