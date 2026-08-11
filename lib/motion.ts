// Tokens de movimiento compartidos — todo el deck se siente como un solo sistema.
import type { Variants, Transition } from 'framer-motion'

export const easeOut = [0.22, 1, 0.36, 1] as const

export const springHover: Transition = { type: 'spring', stiffness: 400, damping: 30 }
export const springPress: Transition = { type: 'spring', stiffness: 400, damping: 17 }

/** Entrada escalonada de los hijos de un slide. Úsalo en el contenedor. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

/** Aparición hacia arriba para elementos individuales dentro de un slide. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

/** Aparición con escala suave (para tarjetas y cifras). */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } },
}

/** Barrido lateral (para líneas de tiempo y barras). */
export const wipeX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: easeOut } },
}

/** Transición direccional entre slides, controlada por AnimatePresence. */
export const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 64 : -64,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easeOut },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -64 : 64,
    filter: 'blur(6px)',
    transition: { duration: 0.4, ease: easeOut },
  }),
}
