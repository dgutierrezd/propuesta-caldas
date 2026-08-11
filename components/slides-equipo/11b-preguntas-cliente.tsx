'use client'

import { motion } from 'framer-motion'
import { KeyRound, Cpu, Layers, Scale, HelpCircle, type LucideIcon } from 'lucide-react'
import { SlideShell } from '@/components/ui/SlideShell'
import { Kicker, GradientText } from '@/components/ui/primitives'
import { fadeUp, popIn, stagger } from '@/lib/motion'

const GRUPOS: { icon: LucideIcon; cat: string; preguntas: string[] }[] = [
  {
    icon: KeyRound,
    cat: 'Accesos y catálogo',
    preguntas: [
      '¿Acceso de lectura a la API REST? ¿Credenciales o IP autorizadas?',
      '¿Cuántas fichas de prestadores hay, aproximadamente, por municipio?',
      '¿Tienen analítica de uso de la plataforma para fijar línea base?',
    ],
  },
  {
    icon: Cpu,
    cat: 'IA e infraestructura',
    preguntas: [
      '¿Restricción sobre proveedor/modelo de IA o país donde residen los datos?',
      '¿Dónde se despliega la capa: infraestructura de la Gobernación o nuestra?',
      '¿Hay un límite de costo mensual de IA que debamos respetar?',
    ],
  },
  {
    icon: Layers,
    cat: 'Alcance y contenido',
    preguntas: [
      '¿Confirmamos que las fichas no publican precio ni disponibilidad por fecha?',
      '¿El asistente debe cubrir temas fuera del catálogo (eventos, clima, transporte)?',
      '¿La clasificación de 27 municipios en 6 subregiones es la oficial y estable?',
    ],
  },
  {
    icon: Scale,
    cat: 'Proceso y cumplimiento',
    preguntas: [
      '¿Quién es la contraparte que participa en demos y aprueba criterios?',
      '¿Proceso de contratación, documentos habilitantes (RUP) y garantías exigidas?',
      '¿Tratamiento de datos, accesibilidad y propiedad intelectual del software?',
    ],
  },
]

export default function Slide() {
  return (
    <SlideShell ambient="deep" contentClassName="gap-6">
      <motion.div variants={fadeUp}>
        <Kicker>Preguntas para el cliente</Kicker>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[28ch] font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.4rem]"
      >
        Lo que necesitamos <GradientText>aclarar</GradientText> antes de arrancar.
      </motion.h2>

      <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GRUPOS.map(({ icon: Icon, cat, preguntas }) => (
          <motion.div
            key={cat}
            variants={popIn}
            className="rounded-2xl border border-black/[0.08] bg-white px-5 py-4"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-bright/12 text-accent-bright">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <h3 className="font-display text-[1.05rem] text-ink">{cat}</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {preguntas.map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-[0.86rem] leading-snug text-cloud/80">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright/70" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} className="text-sm text-cloud/55">
        Estas respuestas cierran nuestros supuestos abiertos y desbloquean el Sprint 1. Las llevamos a
        la reunión de aclaración.
      </motion.p>
    </SlideShell>
  )
}
