# Propuesta Caldas — Deck de presentación

Presentación tipo deck (sin scroll, una pantalla por slide) para la propuesta de
Adisoft a la Gobernación de Caldas: capa de IA sobre *Caldas es Natural*.

Construida con **Next.js 16 · React 19 · Tailwind v4 · Framer Motion**, con la
identidad de marca de Adisoft (azul profundo, Bricolage Grotesque + Inter, logo).

Contiene **dos presentaciones** que comparten el mismo motor de deck:

| Ruta | Para quién | Contenido |
|---|---|---|
| `/` | El cliente (Gobernación) | La propuesta: valor, cómo queda la plataforma, precios al final |
| `/equipo` | El equipo Adisoft | Plan de trabajo interno: qué construir, arquitectura, sprints, roles, arranque |

## Ejecutar

```bash
npm install      # ya ejecutado
npm run dev      # http://localhost:3000  (deck del cliente)
                 # http://localhost:3000/equipo  (deck del equipo)
```

Para proyectar: abre en el navegador y presiona **F** para pantalla completa.

## Navegación

| Acción | Teclas / gestos |
|---|---|
| Siguiente | → · ↓ · Espacio · Enter · rueda abajo · swipe |
| Anterior | ← · ↑ · rueda arriba · swipe |
| Primer / último slide | Inicio / Fin |
| Pantalla completa | F |
| Ir a un slide | clic en los puntos inferiores |

## Estructura

- `app/` — layout (fuentes + tema), `page.tsx` monta el `Deck`.
- `components/deck/Deck.tsx` — controlador: navegación, transiciones, chrome.
- `components/ui/` — `SlideShell` (layout + fondo ambiental + orquestación de
  entrada) y `primitives.tsx` (logo, kicker, tarjetas, cifras animadas).
- `components/slides/` — un archivo por slide, registrados en `index.ts`.
- `lib/motion.ts` — tokens de animación compartidos.

El contenido cumple las reglas de la propuesta: sin datos inventados, límite de
alcance declarado (no cotiza / no reserva) y cifras económicas auditables.
