'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
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
  User, Heart, Baby, Users, X, Check, RotateCcw, MapPin, ArrowRight,
  CalendarDays, Wand2, type LucideIcon,
} from 'lucide-react'

/* ---------------------------------------------------------------- i18n */
type Lang = 'es' | 'en'
type Loc = { es: string; en: string }

const t = {
  es: {
    reset: 'Reiniciar demo',
    langLabel: 'Cambiar idioma',
    introTitle: 'Arma tu viaje por Caldas',
    introSub: 'Cuatro preguntas, sin registro. Eliges lo que te gusta y te armamos el plan.',
    start: 'Empezar',
    introTime: 'Te toma unos 20 segundos',
    q1Kicker: 'Pregunta 1 de 4',
    q1Title: '¿Qué planes te provocan?',
    q1Help: 'Marca a la derecha lo que te gusta, a la izquierda lo que no.',
    like: 'Me gusta',
    nope: 'Paso',
    pass: 'Paso',
    ready: '¡Listo!',
    interesSing: 'interés',
    interesPlur: 'intereses',
    plan: 'Plan',
    q2Title: '¿Cuánto dura tu viaje?',
    q2Hint: 'Toca una opción',
    days: 'días',
    q3Title: '¿Con quién viajas?',
    q3Hint: 'Toca una opción',
    q4Title: '¿A qué municipios quieres ir?',
    q4Hint: 'Elige uno o varios, o déjate sorprender',
    continue: 'Continuar',
    surprise: 'Sorpréndeme',
    selectedCount: (n: number) => `${n} ${n === 1 ? 'municipio' : 'municipios'} seleccionado${n === 1 ? '' : 's'}`,
    resTitle: 'Tu perfil está listo',
    resSub: (d: string) => `Con esto armamos tu feed y un itinerario de ${d} días.`,
    interestsLabel: 'Intereses',
    noInterests: 'Sin preferencias — te mostramos lo más querido',
    municipiosLabel: 'Municipios',
    surpriseTag: 'Ruta sorpresa por Caldas',
    miniDays: 'Días',
    miniCompany: 'Compañía',
    miniDest: 'Destino',
    municipiosWord: 'municipios',
    feedNote: 'Armado con fichas reales del catálogo.',
    catalog: 'catálogo',
    retry: 'Probar de nuevo',
    footer: 'Prototipo · Adisoft para Caldas es Natural · datos ilustrativos',
  },
  en: {
    reset: 'Restart demo',
    langLabel: 'Change language',
    introTitle: 'Plan your trip through Caldas',
    introSub: 'Four questions, no sign-up. Pick what you like and we build your plan.',
    start: 'Start',
    introTime: 'Takes about 20 seconds',
    q1Kicker: 'Question 1 of 4',
    q1Title: 'What plans appeal to you?',
    q1Help: 'Mark right what you like, left what you don’t.',
    like: 'Like',
    nope: 'Nope',
    pass: 'Nope',
    ready: 'Done!',
    interesSing: 'interest',
    interesPlur: 'interests',
    plan: 'Plan',
    q2Title: 'How long is your trip?',
    q2Hint: 'Tap an option',
    days: 'days',
    q3Title: 'Who are you traveling with?',
    q3Hint: 'Tap an option',
    q4Title: 'Which towns do you want to visit?',
    q4Hint: 'Pick one or more, or let us surprise you',
    continue: 'Continue',
    surprise: 'Surprise me',
    selectedCount: (n: number) => `${n} town${n === 1 ? '' : 's'} selected`,
    resTitle: 'Your profile is ready',
    resSub: (d: string) => `With this we build your feed and a ${d}-day itinerary.`,
    interestsLabel: 'Interests',
    noInterests: 'No preferences — we show the most loved',
    municipiosLabel: 'Towns',
    surpriseTag: 'Surprise route through Caldas',
    miniDays: 'Days',
    miniCompany: 'Company',
    miniDest: 'Destination',
    municipiosWord: 'towns',
    feedNote: 'Built with real cards from the catalog.',
    catalog: 'catalog',
    retry: 'Try again',
    footer: 'Prototype · Adisoft for Caldas es Natural · sample data',
  },
}
type Dict = typeof t['es']

/* ------------------------------------------------------------------ Datos */
type Interes = { id: string; label: Loc; tag: Loc; icon: LucideIcon; from: string; to: string; img?: string }

const INTERESES: Interes[] = [
  { id: 'cafe', label: { es: 'Café', en: 'Coffee' }, tag: { es: 'Fincas, catación y paisaje cultural', en: 'Farms, tasting and cultural landscape' }, icon: Coffee, from: '#7A4B1E', to: '#4E2E12', img: '/esnatural/foto-centro-sur.jpg' },
  { id: 'termales', label: { es: 'Aguas termales', en: 'Hot springs' }, tag: { es: 'Descanso entre montañas', en: 'Rest among the mountains' }, icon: Droplets, from: '#1E88C7', to: '#0B4F7A' },
  { id: 'senderismo', label: { es: 'Naturaleza y senderismo', en: 'Nature and hiking' }, tag: { es: 'Bosques, nevado y miradores', en: 'Forests, snow peak and lookouts' }, icon: Footprints, from: '#2F7D14', to: '#17420A', img: '/esnatural/foto-norte.jpg' },
  { id: 'aventura', label: { es: 'Aventura', en: 'Adventure' }, tag: { es: 'Parapente, rafting y canopy', en: 'Paragliding, rafting and canopy' }, icon: Compass, from: '#E8871E', to: '#9A5510' },
  { id: 'cultura', label: { es: 'Cultura y patrimonio', en: 'Culture and heritage' }, tag: { es: 'Pueblos, arriería y tradición', en: 'Towns, muleteering and tradition' }, icon: Landmark, from: '#8A3FC0', to: '#54237A', img: '/esnatural/foto-belalcazar.png' },
  { id: 'gastronomia', label: { es: 'Gastronomía', en: 'Gastronomy' }, tag: { es: 'Cocina de montaña y café', en: 'Mountain cuisine and coffee' }, icon: UtensilsCrossed, from: '#E23E96', to: '#8F1E5C' },
  { id: 'aves', label: { es: 'Avistamiento de aves', en: 'Bird watching' }, tag: { es: 'Cientos de especies nativas', en: 'Hundreds of native species' }, icon: Bird, from: '#0EA5A0', to: '#075E5B' },
  { id: 'artesanias', label: { es: 'Artesanías', en: 'Crafts' }, tag: { es: 'Tejido, guadua y cerámica', en: 'Weaving, bamboo and ceramics' }, icon: Palette, from: '#C99A00', to: '#856600', img: '/esnatural/foto-artesanias.png' },
]

const DIAS = [2, 3, 4, 5]

type Opcion = { id: string; label: Loc; icon: LucideIcon }
const COMPANIA: Opcion[] = [
  { id: 'solo', label: { es: 'Solo/a', en: 'Solo' }, icon: User },
  { id: 'pareja', label: { es: 'En pareja', en: 'As a couple' }, icon: Heart },
  { id: 'familia', label: { es: 'En familia', en: 'With family' }, icon: Baby },
  { id: 'amigos', label: { es: 'Con amigos', en: 'With friends' }, icon: Users },
]

// Municipios reconocibles de Caldas (muestra ilustrativa; en producción, catálogo de los 27).
// Los nombres se mantienen iguales en ambos idiomas.
type Muni = { id: string; label: string; img?: string }
const MUNICIPIOS: Muni[] = [
  { id: 'manizales', label: 'Manizales', img: '/esnatural/foto-manizales.jpg' },
  { id: 'villamaria', label: 'Villamaría' },
  { id: 'chinchina', label: 'Chinchiná' },
  { id: 'neira', label: 'Neira' },
  { id: 'salamina', label: 'Salamina' },
  { id: 'aguadas', label: 'Aguadas' },
  { id: 'pensilvania', label: 'Pensilvania' },
  { id: 'riosucio', label: 'Riosucio' },
  { id: 'marmato', label: 'Marmato' },
  { id: 'supia', label: 'Supía' },
  { id: 'anserma', label: 'Anserma' },
  { id: 'belalcazar', label: 'Belalcázar', img: '/esnatural/foto-belalcazar.png' },
  { id: 'la-dorada', label: 'La Dorada' },
]

type Profile = { intereses: string[]; dias: number | null; compania: string | null; municipios: string[] }
const EMPTY: Profile = { intereses: [], dias: null, compania: null, municipios: [] }

type Step = 'intro' | 'intereses' | 'dias' | 'compania' | 'municipios' | 'resultado'
const QUESTION_STEPS: Step[] = ['intereses', 'dias', 'compania', 'municipios']

/* ================================================================== Root */
export default function DemoExperience() {
  const [step, setStep] = useState<Step>('intro')
  const [profile, setProfile] = useState<Profile>(EMPTY)
  const [lang, setLang] = useState<Lang>('es')
  const reduce = useReducedMotion()
  const T = t[lang]

  const reset = useCallback(() => {
    setProfile(EMPTY)
    setStep('intro')
  }, [])

  const qIndex = QUESTION_STEPS.indexOf(step) // -1 en intro/resultado
  const desktop = useIsDesktop()

  /* Contenido interno del marco (idéntico en móvil y escritorio): header con
     logos + toggle + reset, barra de progreso, pasos y pie. Se define una sola
     vez para reutilizar la MISMA lógica/estado; solo cambian paddings/tamaños
     de "chrome" según el viewport. */
  const inner = (
    <>
      {/* Header */}
      <div className={desktop ? 'flex items-center justify-between px-8 pb-4 pt-7' : 'flex items-center justify-between px-6 pb-3 pt-6'}>
        <div className="flex items-center gap-2.5">
          <Image
            src="/esnatural/caldas-es-natural-logo.png"
            alt="Caldas es Natural"
            width={40}
            height={40}
            className={desktop ? 'h-9 w-9 object-contain' : 'h-8 w-8 object-contain'}
            priority
          />
          <span className={desktop ? 'font-display text-base font-semibold text-ink' : 'font-display text-sm font-semibold text-ink'}>
            Caldas es Natural
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LangToggle lang={lang} onChange={setLang} label={T.langLabel} />
          {step !== 'intro' && (
            <button
              type="button"
              onClick={reset}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-black/[0.08] bg-white text-cloud transition hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
              aria-label={T.reset}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Barra de progreso de las 4 preguntas */}
      {qIndex >= 0 && (
        <div className={desktop ? 'flex gap-1.5 px-8 pb-4' : 'flex gap-1.5 px-6 pb-4'}>
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
            className={desktop ? 'absolute inset-0 flex flex-col px-8 pb-7' : 'absolute inset-0 flex flex-col px-6 pb-6'}
          >
            {step === 'intro' && <Intro onStart={() => setStep('intereses')} T={T} />}

            {step === 'intereses' && (
              <SwipeStep
                reduce={!!reduce}
                lang={lang}
                T={T}
                liked={profile.intereses}
                onLike={(id) =>
                  setProfile((p) => ({ ...p, intereses: [...p.intereses, id] }))
                }
                onDone={() => setStep('dias')}
              />
            )}

            {step === 'dias' && (
              <ChoiceStep
                title={T.q2Title}
                hint={T.q2Hint}
                columns={2}
                options={DIAS.map((d) => ({ id: String(d), label: { es: `${d} ${t.es.days}`, en: `${d} ${t.en.days}` }, icon: CalendarDays }))}
                lang={lang}
                selected={profile.dias != null ? String(profile.dias) : null}
                onPick={(id) => {
                  setProfile((p) => ({ ...p, dias: Number(id) }))
                  setStep('compania')
                }}
              />
            )}

            {step === 'compania' && (
              <ChoiceStep
                title={T.q3Title}
                hint={T.q3Hint}
                columns={2}
                options={COMPANIA}
                lang={lang}
                selected={profile.compania}
                onPick={(id) => {
                  setProfile((p) => ({ ...p, compania: id }))
                  setStep('municipios')
                }}
              />
            )}

            {step === 'municipios' && (
              <MultiSelectStep
                T={T}
                selected={profile.municipios}
                onToggle={(id) =>
                  setProfile((p) => ({
                    ...p,
                    municipios: p.municipios.includes(id)
                      ? p.municipios.filter((m) => m !== id)
                      : [...p.municipios, id],
                  }))
                }
                onContinue={() => setStep('resultado')}
                onSurprise={() => {
                  setProfile((p) => ({ ...p, municipios: [] }))
                  setStep('resultado')
                }}
              />
            )}

            {step === 'resultado' && <Result profile={profile} onReset={reset} reduce={!!reduce} lang={lang} T={T} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pie */}
      <div className={desktop ? 'px-8 pb-5 pt-1 text-center text-[0.72rem] text-cloud/55' : 'px-6 pb-4 pt-1 text-center text-[0.68rem] text-cloud/55'}>
        {T.footer}
      </div>
    </>
  )

  return (
    <div className="relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden px-4">
      <Ambient />

      {desktop ? (
        /* Escritorio (≥ lg): dos columnas dentro de un contenedor ancho.
           Izquierda = panel de marca con foto real. Derecha = el mismo flujo
           interactivo en una tarjeta más amplia. */
        <div className="relative z-10 flex h-[min(820px,90vh)] w-full max-w-6xl overflow-hidden rounded-[40px] border border-black/[0.08] bg-[#FBFAF6] shadow-[0_40px_100px_rgba(29,31,27,0.24)]">
          <BrandPanel T={T} />
          <div className="flex min-w-0 flex-1 flex-col">{inner}</div>
        </div>
      ) : (
        /* Móvil (< lg): marco tipo teléfono, sin cambios respecto al original. */
        <div className="relative z-10 flex h-[min(780px,92vh)] w-[min(410px,94vw)] flex-col overflow-hidden rounded-[38px] border border-black/[0.08] bg-[#FBFAF6] shadow-[0_30px_80px_rgba(29,31,27,0.22)]">
          {inner}
        </div>
      )}
    </div>
  )
}

/* ============================================================== Hooks */
// Detecta ≥ lg (1024px) de forma segura para SSR: renderiza móvil por defecto
// (igual al servidor, evita mismatch de hidratación) y cambia tras montar.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

/* ============================================================== Brand panel (desktop) */
function BrandPanel({ T }: { T: Dict }) {
  return (
    <div className="relative w-[45%] shrink-0 overflow-hidden">
      <Image
        src="/esnatural/foto-centro-sur.jpg"
        alt=""
        fill
        sizes="45vw"
        className="pointer-events-none select-none object-cover"
        priority
      />
      {/* Scrim verde para legibilidad */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(150deg, rgba(18,50,7,0.74) 0%, rgba(47,125,20,0.66) 52%, rgba(14,40,5,0.88) 100%)' }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#68C41C]/25 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between p-10">
        {/* Co-branding sobre chip claro para contraste */}
        <div className="inline-flex items-center gap-3 self-start rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
          <Image
            src="/esnatural/caldas-es-natural-logo.png"
            alt="Caldas es Natural"
            width={44}
            height={44}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-display text-base font-semibold text-ink">Caldas es Natural</span>
        </div>

        <div>
          <h1 className="font-display text-4xl leading-[1.05] text-white xl:text-5xl">{T.introTitle}</h1>
          <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-white/85">{T.introSub}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
            {T.introTime}
          </p>
        </div>

        <p className="text-sm text-white/70">{T.footer}</p>
      </div>
    </div>
  )
}

/* ============================================================== Lang toggle */
function LangToggle({ lang, onChange, label }: { lang: Lang; onChange: (l: Lang) => void; label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="relative flex h-11 items-center rounded-full border border-black/[0.08] bg-white p-1"
    >
      {(['es', 'en'] as const).map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={active}
            className="relative z-10 min-w-[40px] cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          >
            {active && (
              <motion.span
                layoutId="langPill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className={active ? 'text-white' : 'text-cloud/70'}>{l.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ============================================================== Intro */
function Intro({ onStart, T }: { onStart: () => void; T: Dict }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-white shadow-lg ring-1 ring-black/[0.06]"
      >
        <Image
          src="/esnatural/caldas-es-natural-logo.png"
          alt="Caldas es Natural"
          width={72}
          height={72}
          className="h-16 w-16 object-contain"
          priority
        />
      </motion.div>
      <h1 className="font-display text-3xl leading-tight text-ink">{T.introTitle}</h1>
      <p className="mt-3 max-w-[28ch] text-[0.95rem] leading-relaxed text-cloud/70">{T.introSub}</p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
      >
        {T.start} <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-6 text-xs text-cloud/55">{T.introTime}</p>
    </div>
  )
}

/* ============================================================== Swipe */
function SwipeStep({
  reduce,
  lang,
  T,
  liked,
  onLike,
  onDone,
}: {
  reduce: boolean
  lang: Lang
  T: Dict
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

  useEffect(() => {
    if (i >= total) {
      const t2 = setTimeout(onDone, 260)
      return () => clearTimeout(t2)
    }
  }, [i, total, onDone])

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
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{T.q1Kicker}</p>
        <h2 className="mt-1 font-display text-2xl text-ink">{T.q1Title}</h2>
        <p className="text-sm text-cloud/65">{T.q1Help}</p>
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
                  lang={lang}
                  T={T}
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
              <p className="font-display text-lg text-ink">{T.ready}</p>
              <p className="text-sm text-cloud/65">
                {liked.length} {liked.length === 1 ? T.interesSing : T.interesPlur}
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
            aria-label={T.pass}
            className="grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-black/10 bg-white text-cloud shadow-sm transition hover:border-rose-300 hover:text-rose-500 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
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
            aria-label={T.like}
            className="grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-accent/30 bg-accent text-white shadow-md transition hover:bg-accent-hover active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
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
  lang,
  T,
  onDecide,
}: {
  item: Interes
  offset: number
  isTop: boolean
  reduce: boolean
  lang: Lang
  T: Dict
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
        {/* Foto real de fondo (si existe) + scrim para legibilidad */}
        {item.img && (
          <>
            <Image
              src={item.img}
              alt=""
              fill
              sizes="(max-width: 410px) 90vw, 360px"
              className="pointer-events-none select-none object-cover"
              draggable={false}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${item.from}CC 0%, ${item.from}66 40%, ${item.to}E6 100%)` }}
            />
          </>
        )}
        {/* textura */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] backdrop-blur-sm">
            {T.plan}
          </span>
          <Icon className="h-6 w-6 opacity-90" />
        </div>

        <div className="relative">
          <Icon className="mb-3 h-14 w-14 drop-shadow" strokeWidth={1.6} />
          <h3 className="font-display text-[2rem] leading-none drop-shadow-sm">{item.label[lang]}</h3>
          <p className="mt-2 text-sm text-white/90">{item.tag[lang]}</p>
        </div>

        {isTop && !reduce && (
          <>
            <motion.span
              style={{ opacity: likeOpacity }}
              className="pointer-events-none absolute left-5 top-6 rotate-[-14deg] rounded-lg border-[3px] border-white px-3 py-1 text-lg font-black uppercase tracking-wide"
            >
              {T.like}
            </motion.span>
            <motion.span
              style={{ opacity: nopeOpacity }}
              className="pointer-events-none absolute right-5 top-6 rotate-[14deg] rounded-lg border-[3px] border-white px-3 py-1 text-lg font-black uppercase tracking-wide"
            >
              {T.nope}
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
  lang,
}: {
  title: string
  hint: string
  options: Opcion[]
  selected: string | null
  onPick: (id: string) => void
  columns: number
  lang: Lang
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
              className={`group flex min-h-[44px] cursor-pointer flex-col items-start gap-3 rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6] ${
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
              <span className="font-display text-lg leading-tight">{label[lang]}</span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ======================================================== Multi-select */
function MultiSelectStep({
  T,
  selected,
  onToggle,
  onContinue,
  onSurprise,
}: {
  T: Dict
  selected: string[]
  onToggle: (id: string) => void
  onContinue: () => void
  onSurprise: () => void
}) {
  const count = selected.length
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <h2 className="font-display text-2xl text-ink">{T.q4Title}</h2>
        <p className="text-sm text-cloud/65">{T.q4Hint}</p>
      </div>

      {/* Grid con scroll interno propio */}
      <div className="-mx-1 flex-1 overflow-y-auto px-1 py-1">
        <div className="grid grid-cols-2 gap-2.5">
          {MUNICIPIOS.map(({ id, label, img }) => {
            const active = selected.includes(id)
            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggle(id)}
                aria-pressed={active}
                className={`flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-2xl border p-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6] ${
                  active
                    ? 'border-accent bg-accent text-white shadow-md'
                    : 'border-black/[0.08] bg-white text-ink hover:border-accent/40 hover:shadow-sm'
                }`}
              >
                <span
                  className={`relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg transition ${
                    active ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'
                  }`}
                >
                  {img ? (
                    <Image src={img} alt="" fill sizes="36px" className="object-cover" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </span>
                <span className="flex-1 truncate font-display text-[0.95rem] leading-tight">{label}</span>
                {active && <Check className="h-4 w-4 shrink-0" strokeWidth={3} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Acciones fijas */}
      <div className="mt-3 space-y-2">
        <div className="h-4 text-center text-[0.72rem] font-semibold text-accent">
          {count > 0 ? T.selectedCount(count) : ''}
        </div>
        <button
          type="button"
          onClick={onContinue}
          disabled={count === 0}
          className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-accent-hover active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6] disabled:cursor-not-allowed disabled:bg-cloud/25 disabled:text-white/70 disabled:shadow-none"
        >
          {T.continue} <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onSurprise}
          className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-accent/30 bg-white px-6 py-2.5 text-sm font-semibold text-accent transition hover:border-accent/60 hover:bg-accent/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
        >
          <Wand2 className="h-4 w-4" /> {T.surprise}
        </button>
      </div>
    </div>
  )
}

/* ============================================================== Result */
function Result({
  profile,
  onReset,
  reduce,
  lang,
  T,
}: {
  profile: Profile
  onReset: () => void
  reduce: boolean
  lang: Lang
  T: Dict
}) {
  const intereses = useMemo(
    () => INTERESES.filter((it) => profile.intereses.includes(it.id)),
    [profile.intereses],
  )
  const municipios = useMemo(
    () => MUNICIPIOS.filter((m) => profile.municipios.includes(m.id)),
    [profile.municipios],
  )
  const compania = COMPANIA.find((c) => c.id === profile.compania)

  const feed = (intereses.length ? intereses : INTERESES).slice(0, 2)

  const destino =
    municipios.length === 0
      ? T.surprise
      : municipios.length === 1
        ? municipios[0]!.label
        : `${municipios.length} ${T.municipiosWord}`

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

      <h2 className="text-center font-display text-xl text-ink">{T.resTitle}</h2>
      <p className="mx-auto mt-1 max-w-[32ch] text-center text-[0.82rem] leading-snug text-cloud/65">
        {T.resSub(profile.dias != null ? String(profile.dias) : '—')}
      </p>

      <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-3">
          <p className="mb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cloud/55">{T.interestsLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {intereses.length ? (
              intereses.map((it) => (
                <span key={it.id} className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.72rem] font-semibold text-accent">
                  {it.label[lang]}
                </span>
              ))
            ) : (
              <span className="text-[0.8rem] text-cloud/65">{T.noInterests}</span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-white p-3">
          <p className="mb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cloud/55">{T.municipiosLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {municipios.length ? (
              municipios.map((m) => (
                <span key={m.id} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[0.72rem] font-semibold text-accent">
                  <MapPin className="h-3 w-3" /> {m.label}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center gap-1 text-[0.8rem] text-cloud/65">
                <Wand2 className="h-3.5 w-3.5 text-accent" /> {T.surpriseTag}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <Mini label={T.miniDays} value={profile.dias != null ? `${profile.dias}` : '—'} />
          <Mini label={T.miniCompany} value={compania?.label[lang] ?? '—'} />
          <Mini label={T.miniDest} value={destino} />
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
          <p className="text-[0.8rem] leading-snug text-cloud/80">{T.feedNote}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-3 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-accent-hover active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
      >
        <RotateCcw className="h-4 w-4" /> {T.retry}
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
