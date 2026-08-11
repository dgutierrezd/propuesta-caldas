import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const bricolage = Montserrat({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Adisoft · Propuesta para la Gobernación de Caldas',
  description:
    'Capa de inteligencia artificial para Caldas es Natural: recomendaciones e itinerarios personalizados sobre el catálogo turístico de los 27 municipios.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bricolage.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
