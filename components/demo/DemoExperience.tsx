'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'framer-motion'
import {
  Coffee, Droplets, Footprints, Compass, Landmark, UtensilsCrossed, Bird, Palette,
  User, Heart, Baby, Users, X, Check, RotateCcw, Sparkles, MapPin, ArrowRight,
  CalendarDays, Wand2, type LucideIcon,
} from 'lucide-react'
import { BrandLogo } from '@/components/ui/primitives'

/* ------------------------------------------------------------------ Datos */
type Interes = { id: string; label: string; tag: string; icon: LucideIcon; from: string; to: string }

const INTERESES: Interes[] = [
  { id: 'cafe', label: 'Café', tag: 'Fincas, catación y paisaje cultural', icon: Coffee, from: '#7A4B1E', to: '#4E2E12' },
  { id: 'termales', label: 'Aguas termales', tag: 'Descanso entre montañas', icon: Droplets, from: '#1E88C7', to: '#0B4F7A' },
  { id: 'senderismo', label: 'Naturaleza y senderismo', tag: 'Bosques, nevado y miradores', icon: Footprints, from: '#2F7D14', to: '#17420A' },
  { id: 'aventura', label: 'Aventura', tag: 'Parapente, rafting y canopy', icon: Compass, from: '#E8871E', to: '#9A5510' },
  { id: 'cultura', label: 'Cultura y patrimonio', tag: 'Pueblos, arriería y tradición', icon: Landmark, from: '#8A3FC0', to: '#54237A' },
  { id: 'gastronomia', label: 'Gastronomía', tag: 'Cocina de montaña y café', icon: UtensilsCrossed, from: '#E23E96', to: '#8F1E5C' },
  { id: 'aves', label: 'Avistamiento de aves', tag: 'Cientos de especies nativas', icon: Bird, from: '#0EA5A0', to: '#075E5B' },
  { id: 'artesanias', label: 'Artesanías', tag: 'Tejido, guadua y cerámica', icon: Palette, from: '#C99A00', to: '#856600' },
]

const DIAS = [2, 3, 4, 5]

type Opcion = { id: string; label: string; icon: LucideIcon }
const COMPANIA: Opcion[] = [
  { id: 'solo', label: 'Solo/a', icon: User },
  { id: 'pareja', label: 'En pareja', icon: Heart },
  { id: 'familia', label: 'En familia', icon: Baby },
  { id: 'amigos', label: 'Con amigos', icon: Users },
]

// Municipios reconocibles de Caldas (la gente piensa en municipios, no en subregiones).
// Muestra ilustrativa; en producción sale del catálogo real de los 27 municipios.
const ZONAS: Opcion[] = [
  { id: 'manizales', label: 'Manizales', icon: MapPin },
  { id: 'villamaria', label: 'Villamaría', icon: MapPin },
  { id: 'salamina', label: 'Salamina', icon: MapPin },
  { id: 'aguadas', label: 'Aguadas', icon: MapPin },
  { id: 'riosucio', label: 'Riosucio', icon: MapPin },
  { id: 'marmato', label: 'Marmato', icon: MapPin },
  { id: 'la-dorada', label: 'La Dorada', icon: MapPin },
  { id: 'sorprendeme', label: 'Sorpréndeme', icon: Wand2 },
]

type Profile = { intereses: string[]; dias: number | null; compania: string | null; zona: string | null }
const EMPTY: Profile = { intereses: [], dias: null, compania: null, zona: null }

type Step = 'intro' | 'intereses' | 'dias' | 'compania' | 'zona' | 'resultado'
const QUESTION_STEPS: Step[] = ['intereses', 'dias', 'compania', 'zona']

/* ================================================================== Root */
export default function DemoExperience() {
  const [step, setStep] = useState<Step>('intro')
  const [profile, setProfile] = useState<Profile>(EMPTY)
  const reduce = useReducedMotion()

  const reset = useCallback(() => {
    setProfile(EMPTY)
    setStep('intro')
  }, [])

  const qIndex = QUESTION_STEPS.indexOf(step) // -1 en intro/resultado

  return (
    <div className="relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden px-4">
      <Ambient />

      {/* Marco tipo teléfono */}
      <div className="relative z-10 flex h-[min(780px,92vh)] w-[min(410px,94vw)] flex-col overflow-hidden rounded-[38px] border border-black/[0.08] bg-[#FBFAF6] shadow-[0_30px_80px_rgba(29,31,27,0.22)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-3 pt-6">
          <BrandLogo className="h-6 w-auto" />
          {step !== 'intro' && (
            <button
              type="button"
              onClick={reset}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-black/[0.08] bg-white text-cloud transition hover:border-accent/40"
              aria-label="Reiniciar demo"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Barra de progreso de las 4 preguntas */}
        {qIndex >= 0 && (
          <div className="flex gap-1.5 px-6 pb-4">
            {QUESTION_STEPS.map((s, i) => (
              <div key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.08]">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={false}
                  animate={{ scaleX: i <= qIndex ? 1 : 0 }}
                  style={{ transformOrigin: 'left' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Contenido */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col px-6 pb-6"
            >
              {step === 'intro' && <Intro onStart={() => setStep('intereses')} />}

              {step === 'intereses' && (
                <SwipeStep
                  reduce={!!reduce}
                  liked={profile.intereses}
                  onLike={(id) =>
                    setProfile((p) => ({ ...p, intereses: [...p.intereses, id] }))
                  }
                  onDone={() => setStep('dias')}
                />
              )}

              {step === 'dias' && (
                <ChoiceStep
                  title="¿Cuánto dura tu viaje?"
                  hint="Toca una opción"
                  columns={2}
                  options={DIAS.map((d) => ({ id: String(d), label: `${d} días`, icon: CalendarDays }))}
                  selected={profile.dias != null ? String(profile.dias) : null}
                  onPick={(id) => {
                    setProfile((p) => ({ ...p, dias: Number(id) }))
                    setStep('compania')
                  }}
                />
              )}

              {step === 'compania' && (
                <ChoiceStep
                  title="¿Con quién viajas?"
                  hint="Toca una opción"
                  columns={2}
                  options={COMPANIA}
                  selected={profile.compania}
                  onPick={(id) => {
                    setProfile((p) => ({ ...p, compania: id }))
                    setStep('zona')
                  }}
                />
              )}

              {step === 'zona' && (
                <ChoiceStep
                  title="¿A qué municipio quieres ir?"
                  hint="Elige uno o déjate sorprender"
                  columns={2}
                  options={ZONAS}
                  selected={profile.zona}
                  onPick={(id) => {
                    setProfile((p) => ({ ...p, zona: id }))
                    setStep('resultado')
                  }}
                />
              )}

              {step === 'resultado' && <Result profile={profile} onReset={reset} reduce={!!reduce} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pie */}
        <div className="px-6 pb-4 pt-1 text-center text-[0.68rem] text-cloud/55">
          Prototipo · Adisoft para Caldas es Natural · datos ilustrativos
        </div>
      </div>
    </div>
  )
}

/* ============================================================== Intro */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-accent text-white shadow-lg"
      >
        <Sparkles className="h-9 w-9" />
      </motion.div>
      <h1 className="font-display text-3xl leading-tight text-ink">Arma tu viaje por Caldas</h1>
      <p className="mt-3 max-w-[28ch] text-[0.95rem] leading-relaxed text-cloud/70">
        Cuatro preguntas, sin registro. Deslizas lo que te gusta y te armamos el plan.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-accent-hover active:scale-[0.98]"
      >
        Empezar <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-6 text-xs text-cloud/55">Te toma unos 20 segundos</p>
    </div>
  )
}

/* ============================================================== Swipe */
function SwipeStep({
  reduce,
  liked,
  onLike,
  onDone,
}: {
  reduce: boolean
  liked: string[]
  onLike: (id: string) => void
  onDone: () => void
}) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const total = INTERESES.length

  const decide = useCallback(
    (d: number) => {
      setDir(d)
      const item = INTERESES[i]
      if (d > 0 && item) onLike(item.id)
      setI((v) => v + 1)
    },
    [i, onLike],
  )

  // Al terminar el mazo, avanza al siguiente paso.
  useEffect(() => {
    if (i >= total) {
      const t = setTimeout(onDone, 260)
      return () => clearTimeout(t)
    }
  }, [i, total, onDone])

  // Teclado: ← paso, → me gusta
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (i >= total) return
      if (e.key === 'ArrowRight') decide(1)
      if (e.key === 'ArrowLeft') decide(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [decide, i, total])

  const done = i >= total

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Pregunta 1 de 4</p>
        <h2 className="mt-1 font-display text-2xl text-ink">¿Qué planes te provocan?</h2>
        <p className="text-sm text-cloud/65">
          Desliza a la <span className="font-semibold text-accent">derecha</span> lo que te gusta, a
          la <span className="font-semibold text-cloud">izquierda</span> lo que no.
        </p>
      </div>

      {/* Mazo */}
      <div className="relative flex-1">
        <AnimatePresence custom={dir}>
          {!done &&
            INTERESES.slice(i, i + 3)
              .map((item, idx) => (
                <DeckCard
                  key={item.id}
                  item={item}
                  offset={idx}
                  isTop={idx === 0}
                  reduce={reduce}
                  onDecide={decide}
                />
              ))
              .reverse()}
        </AnimatePresence>

        {done && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="h-7 w-7" />
              </div>
              <p className="font-display text-lg text-ink">¡Listo!</p>
              <p className="text-sm text-cloud/65">
                {liked.length} {liked.length === 1 ? 'interés' : 'intereses'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botones */}
      {!done && (
        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => decide(-1)}
            aria-label="Paso"
            className="grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-black/10 bg-white text-cloud shadow-sm transition hover:border-rose-300 hover:text-rose-500 active:scale-90"
          >
            <X className="h-7 w-7" strokeWidth={2.5} />
          </button>
          <div className="text-center">
            <div className="tnum font-display text-lg text-ink">
              {Math.min(i + 1, total)}
              <span className="text-cloud/40">/{total}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => decide(1)}
            aria-label="Me gusta"
            className="grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-accent/30 bg-accent text-white shadow-md transition hover:bg-accent-hover active:scale-90"
          >
            <Heart className="h-7 w-7 fill-current" />
          </button>
        </div>
      )}
    </div>
  )
}

function DeckCard({
  item,
  offset,
  isTop,
  reduce,
  onDecide,
}: {
  item: Interes
  offset: number
  isTop: boolean
  reduce: boolean
  onDecide: (d: number) => void
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-16, 16])
  const likeOpacity = useTransform(x, [30, 130], [0, 1])
  const nopeOpacity = useTransform(x, [-130, -30], [1, 0])
  const Icon = item.icon

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const off = info.offset.x
    const vel = info.velocity.x
    if (off > 110 || vel > 700) onDecide(1)
    else if (off < -110 || vel < -700) onDecide(-1)
  }

  const variants = {
    exit: reduce
      ? { opacity: 0, transition: { duration: 0.15 } }
      : (d: number) => ({
          x: (d || 1) * 480,
          rotate: (d || 1) * 20,
          opacity: 0,
          transition: { duration: 0.32, ease: 'easeIn' as const },
        }),
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={isTop ? { x, rotate } : undefined}
      drag={isTop && !reduce ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? onDragEnd : undefined}
      variants={variants}
      initial={reduce ? { opacity: 0 } : { scale: 0.92, y: 24, opacity: 0 }}
      animate={{ scale: 1 - offset * 0.05, y: offset * 14, opacity: 1 }}
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[28px] p-7 text-white shadow-xl ${
          isTop && !reduce ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        style={{ background: `linear-gradient(155deg, ${item.from}, ${item.to})` }}
      >
        {/* textura */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]">
            Plan
          </span>
          <Icon className="h-6 w-6 opacity-90" />
        </div>

        <div>
          <Icon className="mb-3 h-14 w-14" strokeWidth={1.6} />
          <h3 className="font-display text-[2rem] leading-none">{item.label}</h3>
          <p className="mt-2 text-sm text-white/85">{item.tag}</p>
        </div>

        {isTop && !reduce && (
          <>
            <motion.span
              style={{ opacity: likeOpacity }}
              className="pointer-events-none absolute left-5 top-6 rotate-[-14deg] rounded-lg border-[3px] border-white px-3 py-1 text-lg font-black uppercase tracking-wide"
            >
              Me gusta
            </motion.span>
            <motion.span
              style={{ opacity: nopeOpacity }}
              className="pointer-events-none absolute right-5 top-6 rotate-[14deg] rounded-lg border-[3px] border-white px-3 py-1 text-lg font-black uppercase tracking-wide"
            >
              Paso
            </motion.span>
          </>
        )}
      </div>
    </motion.div>
  )
}

/* ============================================================== Choice */
function ChoiceStep({
  title,
  hint,
  options,
  selected,
  onPick,
  columns,
}: {
  title: string
  hint: string
  options: Opcion[]
  selected: string | null
  onPick: (id: string) => void
  columns: number
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <p className="text-sm text-cloud/65">{hint}</p>
      </div>

      <motion.div
        className={`grid flex-1 content-center gap-3 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {options.map(({ id, label, icon: Icon }) => {
          const active = selected === id
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => onPick(id)}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileTap={{ scale: 0.96 }}
              className={`group flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
                active
                  ? 'border-accent bg-accent text-white shadow-md'
                  : 'border-black/[0.08] bg-white text-ink hover:border-accent/40 hover:shadow-sm'
              }`}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl transition ${
                  active ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-lg leading-tight">{label}</span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ============================================================== Result */
function Result({ profile, onReset, reduce }: { profile: Profile; onReset: () => void; reduce: boolean }) {
  const intereses = useMemo(
    () => INTERESES.filter((it) => profile.intereses.includes(it.id)),
    [profile.intereses],
  )
  const zona = ZONAS.find((z) => z.id === profile.zona)
  const compania = COMPANIA.find((c) => c.id === profile.compania)

  const feed = (intereses.length ? intereses : INTERESES).slice(0, 2)

  return (
    <div className="flex h-full flex-col">
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="mx-auto mb-2.5 grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg"
      >
        <Check className="h-7 w-7" strokeWidth={2.5} />
      </motion.div>

      <h2 className="text-center font-display text-xl text-ink">Tu perfil está listo</h2>
      <p className="mx-auto mt-1 max-w-[32ch] text-center text-[0.82rem] leading-snug text-cloud/65">
        Con esto armamos tu feed y un itinerario de {profile.dias ?? '—'} días.
      </p>

      <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-3">
          <p className="mb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cloud/55">Intereses</p>
          <div className="flex flex-wrap gap-1.5">
            {intereses.length ? (
              intereses.map((it) => (
                <span key={it.id} className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.72rem] font-semibold text-accent">
                  {it.label}
                </span>
              ))
            ) : (
              <span className="text-[0.8rem] text-cloud/65">Sin preferencias — te mostramos lo más querido</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <Mini label="Días" value={profile.dias != null ? `${profile.dias}` : '—'} />
          <Mini label="Compañía" value={compania?.label ?? '—'} />
          <Mini label="Destino" value={zona?.label ?? '—'} />
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/[0.06] p-3">
          <div className="flex -space-x-2">
            {feed.map((it) => {
              const Icon = it.icon
              return (
                <span
                  key={it.id}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white ring-2 ring-[#FBFAF6]"
                  style={{ background: `linear-gradient(155deg, ${it.from}, ${it.to})` }}
                >
                  <Icon className="h-4 w-4" />
                </span>
              )
            })}
          </div>
          <p className="text-[0.8rem] leading-snug text-cloud/80">
            Armado con fichas reales del <span className="font-semibold text-accent">catálogo</span>.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-accent-hover active:scale-[0.99]"
      >
        <RotateCcw className="h-4 w-4" /> Probar de nuevo
      </button>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-3 text-center">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-cloud/55">{label}</p>
      <p className="mt-1 truncate font-display text-base text-ink">{value}</p>
    </div>
  )
}

/* ============================================================== Fondo */
function Ambient() {
  const reduce = useReducedMotion()
  const float = (dur: number, delay = 0) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -24, 0], x: [0, 12, 0] },
          transition: { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' as const },
        }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#FBF7F1_0%,#F4EFE9_55%,#EFE7DB_100%)]" />
      <motion.div {...float(12)} className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-[#68C41C]/15 blur-[90px]" />
      <motion.div {...float(14, 1)} className="absolute -right-10 bottom-8 h-80 w-80 rounded-full bg-[#FFC318]/15 blur-[90px]" />
      <motion.div {...float(10, 0.5)} className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-[#FF41A9]/10 blur-[90px]" />
    </div>
  )
}
