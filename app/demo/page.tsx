import type { Metadata } from 'next'
import DemoExperience from '@/components/demo/DemoExperience'

export const metadata: Metadata = {
  title: 'Demo · Perfil de viajero en 4 toques — Caldas es Natural',
  description: 'Prototipo interactivo del onboarding: arma tu viaje deslizando cards, sin registro.',
}

export default function Page() {
  return <DemoExperience />
}
