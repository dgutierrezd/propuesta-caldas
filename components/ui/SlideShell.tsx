'use client'

import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { stagger } from '@/lib/motion'

type Ambient = 'mesh' | 'grid' | 'spotlight' | 'deep' | 'none'

/**
 * Fondo ambiental animado y sutil. Estático si el usuario prefiere menos movimiento.
 */
export function Ambient({ variant = 'mesh' }: { variant?: Ambient }) {
  const reduce = useReducedMotion()
  if (variant === 'none') return null

  const float = (dur: number, delay = 0) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -26, 0], x: [0, 14, 0] },
          transition: { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' as const },
        }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base clara (crema) */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#FBF7F1_0%,#F4EFE9_55%,#EFE7DB_100%)]" />

      {variant === 'grid' && <div className="absolute inset-0 bg-grid-light opacity-80" />}
      {variant === 'deep' && <div className="absolute inset-0 bg-dots-light opacity-70" />}

      {variant === 'spotlight' && (
        <div className="absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(104,196,28,0.12),transparent)]" />
      )}

      {(variant === 'mesh' || variant === 'grid' || variant === 'spotlight') && (
        <>
          <motion.div
            {...float(11)}
            className="absolute -left-24 top-10 h-[38vh] w-[38vh] rounded-full bg-[#68C41C]/12 blur-[90px]"
          />
          <motion.div
            {...float(13, 1.2)}
            className="absolute -right-16 bottom-4 h-[42vh] w-[42vh] rounded-full bg-[#FFC318]/12 blur-[90px]"
          />
          <motion.div
            {...float(9, 0.6)}
            className="absolute left-1/3 -bottom-24 h-[30vh] w-[30vh] rounded-full bg-[#FF41A9]/10 blur-[90px]"
          />
        </>
      )}

      {/* viñeta clara y muy sutil (no oscurece los bordes) */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_50%,transparent_60%,rgba(29,31,27,0.04)_100%)]" />
    </div>
  )
}

/**
 * Contenedor de un slide: pantalla completa, contenido centrado y orquestación
 * de entrada escalonada (los hijos con variants fadeUp/popIn animan al montarse).
 */
export function SlideShell({
  children,
  className,
  contentClassName,
  ambient = 'mesh',
  align = 'center',
}: {
  children: ReactNode
  className?: string
  contentClassName?: string
  ambient?: Ambient
  align?: 'center' | 'start'
}) {
  return (
    <section className={clsx('relative h-full w-full overflow-hidden', className)}>
      <Ambient variant={ambient} />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className={clsx(
          'relative z-10 mx-auto flex h-full w-full max-w-[1180px] flex-col px-7 py-14 sm:px-12 lg:px-16',
          align === 'center' ? 'justify-center' : 'justify-center',
          contentClassName,
        )}
      >
        {children}
      </motion.div>
    </section>
  )
}
