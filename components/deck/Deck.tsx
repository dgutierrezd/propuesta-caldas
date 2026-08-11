'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import type { SlideDef } from '@/lib/slides'
import { slideVariants } from '@/lib/motion'
import { BrandLogo } from '@/components/ui/primitives'

export default function Deck({ slides }: { slides: SlideDef[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const lockRef = useRef(false)
  const total = slides.length

  const go = useCallback(
    (target: number, dir: number) => {
      const clamped = Math.max(0, Math.min(total - 1, target))
      setIndex((cur) => {
        if (clamped === cur) return cur
        setDirection(dir)
        return clamped
      })
    },
    [total],
  )

  const paginate = useCallback(
    (dir: number) => {
      if (lockRef.current) return
      lockRef.current = true
      go(index + dir, dir)
      window.setTimeout(() => {
        lockRef.current = false
      }, 620)
    },
    [go, index],
  )

  const jump = useCallback(
    (target: number) => {
      if (target === index) return
      go(target, target > index ? 1 : -1)
    },
    [go, index],
  )

  /* ---- Teclado ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          e.preventDefault()
          paginate(1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          paginate(-1)
          break
        case 'Home':
          e.preventDefault()
          jump(0)
          break
        case 'End':
          e.preventDefault()
          jump(total - 1)
          break
        case 'f':
        case 'F':
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen?.()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paginate, jump, total])

  /* ---- Rueda / trackpad ---- */
  useEffect(() => {
    let cooldown = false
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(d) < 24 || cooldown) return
      cooldown = true
      paginate(d > 0 ? 1 : -1)
      window.setTimeout(() => {
        cooldown = false
      }, 700)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [paginate])

  /* ---- Gestos táctiles ---- */
  useEffect(() => {
    let sx = 0
    let sy = 0
    const onStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX
      sy = e.touches[0].clientY
    }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx
      const dy = e.changedTouches[0].clientY - sy
      const horizontal = Math.abs(dx) > Math.abs(dy)
      const mag = horizontal ? dx : dy
      if (Math.abs(mag) < 55) return
      paginate(mag < 0 ? 1 : -1)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [paginate])

  const Active = slides[index].Component
  const variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : slideVariants

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-blue-950">
      {/* Slide activo */}
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={slides[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Active />
        </motion.div>
      </AnimatePresence>

      {/* Chrome superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <BrandLogo priority className="h-7 opacity-95 sm:h-8" />
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 backdrop-blur-md">
          <span className="tnum text-sm font-semibold text-cloud">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs text-cloud/45">/ {String(total).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Chrome inferior */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <span className="hidden text-xs text-cloud/45 sm:block">
          {slides[index].label} · usa ← → o la rueda para navegar
        </span>

        {/* Puntos */}
        <div className="pointer-events-auto mx-auto flex items-center gap-2 sm:mx-0">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir a ${s.label}`}
              aria-current={i === index}
              onClick={() => jump(i)}
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-7 bg-accent-bright' : 'w-2 bg-black/20 hover:bg-black/40',
              )}
            />
          ))}
        </div>

        {/* Flechas */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/[0.08] bg-white text-cloud transition hover:border-accent-bright/60 hover:bg-black/[0.04] disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => paginate(1)}
            disabled={index === total - 1}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/[0.08] bg-white text-cloud transition hover:border-accent-bright/60 hover:bg-black/[0.04] disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="absolute inset-x-0 bottom-0 z-40 h-[3px] bg-black/10">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-accent to-accent-bright"
          animate={{ scaleX: (index + 1) / total }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}
