'use client'

import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { fadeUp, popIn, springHover, easeOut } from '@/lib/motion'

/* ------------------------------------------------------------------ Logo */
export function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/adisoft-logo-full.png"
      alt="Adisoft"
      width={818}
      height={268}
      priority={priority}
      className={clsx('h-auto w-auto select-none', className)}
    />
  )
}

export function BrandIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/adisoft-icon.png"
      alt="Adisoft"
      width={487}
      height={512}
      className={clsx('h-auto w-auto select-none', className)}
    />
  )
}

/* ------------------------------------------------------------------ Kicker / eyebrow */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      variants={fadeUp}
      className={clsx(
        'inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-accent',
        className,
      )}
    >
      <span className="h-px w-6 bg-accent/50" />
      {children}
    </motion.p>
  )
}

/* ------------------------------------------------------------------ Highlight (verde sólido, sin degradado) */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx('text-accent', className)}>{children}</span>
}

/* ------------------------------------------------------------------ Chip */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      variants={popIn}
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white px-4 py-2 text-sm font-medium text-ink',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ Card */
export function Card({
  children,
  className,
  hover = true,
  variant = 'glass',
}: {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'glass' | 'solid' | 'outline'
}) {
  const reduce = useReducedMotion()
  const styles = {
    glass: 'border-black/[0.06] bg-white',
    solid: 'border-black/[0.06] bg-[#FBF7F1]',
    outline: 'border-accent/30 bg-transparent',
  }[variant]
  return (
    <motion.div
      variants={popIn}
      whileHover={hover && !reduce ? { y: -5, transition: springHover } : undefined}
      className={clsx('rounded-2xl border p-6 shadow-[0_6px_20px_rgba(29,31,27,0.08)]', styles, className)}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ Stat */
export function Stat({ value, label, className }: { value: ReactNode; label: string; className?: string }) {
  return (
    <motion.div
      variants={popIn}
      className={clsx(
        'rounded-2xl border border-black/[0.06] bg-white px-6 py-6 text-center shadow-[0_6px_20px_rgba(29,31,27,0.08)]',
        className,
      )}
    >
      <div className="font-display text-4xl leading-none text-accent sm:text-5xl">{value}</div>
      <div className="mt-2 text-sm text-cloud/70">{label}</div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ AnimatedNumber */
export function AnimatedNumber({
  to,
  duration = 1.4,
  className,
  format,
}: {
  to: number
  duration?: number
  className?: string
  format?: (n: number) => string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) {
      setVal(to)
      return
    }
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(to * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  const display = format ? format(val) : Math.round(val).toString()
  return (
    <span ref={ref} className={clsx('tnum', className)}>
      {display}
    </span>
  )
}

/* ------------------------------------------------------------------ MotionItem (generic fadeUp wrapper) */
export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}

export { fadeUp, popIn, easeOut }
