# Identidad visual — "Caldas es Natural" (esnatural.caldas.gov.co)

> Extraído directamente del CSS real del sitio el 2026-08-03.
> Método que funcionó: `curl -sL` sobre el HTML y las hojas de estilo. (WebFetch falló por un error de certificado SSL: "unable to verify the first certificate".)
> Plataforma: WordPress + Elementor (tema Hello Elementor + child theme "hello-theme-child-master"). La paleta y tipografía globales provienen del "kit" de Elementor: `wp-content/uploads/elementor/css/post-8.css` (`.elementor-kit-8`), que es la fuente oficial de las variables de tema.

---

## Paleta de colores

### Colores globales del tema (fuente definitiva: kit de Elementor, `post-8.css`)

| Rol | Variable Elementor | HEX | Notas |
|-----|--------------------|-----|-------|
| **PRIMARIO** | `--e-global-color-primary` | `#FFC318` | Amarillo / dorado. Color de marca dominante (botones, acentos, resaltados). |
| **SECUNDARIO** | `--e-global-color-secondary` | `#9641D3` | Púrpura / violeta. |
| **ACENTO** | `--e-global-color-accent` | `#FF41A9` | Rosa / magenta. |
| **TEXTO** | `--e-global-color-text` | `#FFFFFF` | Blanco (texto sobre fotos e imágenes de fondo a pantalla completa). |
| Verde | `--e-global-color-a1bcbf6` | `#68C41C` | Verde "naturaleza". |
| Naranja | `--e-global-color-ed54ded` | `#FFA11B` | Naranja. |
| Crema / hueso | `--e-global-color-a58d698` | `#F4EFE9` | Fondo claro cálido. |
| Azul | `--e-global-color-07aa32c` | `#009EF5` | Azul (agua/cielo). |
| Oscuro | `--e-global-color-450928c` | `#1D1F1B` | Casi negro (verdoso). Texto/fondos oscuros. |
| Rojo | `--e-global-color-351b39e` | `#FF0000` | Rojo puro (alertas/acentos). |
| Gris verdoso claro | `--e-global-color-cae8430` | `#D8DFD7` | Bordes/superficies suaves. |

### Colores adicionales usados en el CSS real de la home y del child theme
(No son variables globales, pero aparecen aplicados en la página real — botones, secciones, hovers.)

| HEX | Uso observado / rol probable |
|-----|------------------------------|
| `#281334` | Púrpura muy oscuro (fondos/texto sobre claro). |
| `#833CA3` | Variante de púrpura (fondo de sección). |
| `#FEAF2D` / `#FFA52D` | Naranja de botones / hovers. |
| `#FF6B65` | Coral / salmón (botón/acento). |
| `#FEEAD6` | Durazno claro / crema (fondo de bloque). |
| `#683E22` | Marrón / tierra (texto sobre crema). |
| `#9C9895` / `#4C4847` | Grises neutros de texto. |
| `#F5F5F5` | Gris muy claro (superficie). |
| `#FFBC7D` | Melocotón — color de la transición de página de Elementor (`e-page-transition`). |
| `#000000` / `#FFFFFF` | Negro y blanco base. |

### Marca de roles clave (resumen para la presentación)
- **Primario:** `#FFC318` (amarillo)
- **Acento(s):** `#FF41A9` (rosa) · `#9641D3` (púrpura) · `#68C41C` (verde) · `#FFA11B`/`#FEAF2D` (naranja) · `#009EF5` (azul)
- **Fondo claro:** `#F4EFE9` (crema) / `#FEEAD6` (durazno) / `#FFFFFF`
- **Fondo oscuro:** `#1D1F1B` / `#281334`
- **Texto (por defecto del tema):** `#FFFFFF` blanco (sobre imágenes); textos sobre claro: `#1D1F1B`, `#683E22`, grises.
- **Bordes/superficies suaves:** `#D8DFD7`

---

## Degradados
No se encontró ningún `linear-gradient` ni `radial-gradient` en el CSS de la home (`post-549.css`) ni en el child theme (`child.css`). El diseño usa **colores planos (flat)** y **fotografías a pantalla completa** (slider Vegas) en lugar de degradados CSS.
(No verificado en cada subpágina; solo se auditó la home + kit + child theme.)

---

## Tipografía

| Rol | Familia | Detalle (confirmado en CSS) |
|-----|---------|------------------------------|
| **Display y cuerpo (todo)** | **Gotham** | Fuente propia auto-alojada (`.woff`). El kit define Gotham para *primary, secondary, text y accent* — es decir, se usa para títulos y cuerpo por igual. Fallback: `sans-serif`. |
| Fallback cargado | Roboto | Se carga localmente (`google-fonts/css/roboto.css`) como respaldo del sistema. |

Archivos y pesos reales de Gotham (`@font-face` en `post-8.css`):
- `GothamNarrow-Light.woff` — weight **300**
- `Gotham-Medium.woff` — weight **500**
- `Gotham-Black.woff` — weight **900**
- Pesos declarados por el kit para roles: primary **600**, accent **500**, secondary/text **400**.

`body { font-family: "Gotham", sans-serif; }` (definido en el child theme).

> No hay distinción display vs. cuerpo: la marca usa **una sola familia (Gotham)** en distintos pesos (Light 300 → Black 900).

---

## Modo predominante y estilo

**Modo:** Claro y muy colorido (no es un tema oscuro). El texto global por defecto es blanco porque gran parte del contenido se monta sobre **fotografías de paisajes a pantalla completa** (slider Vegas); las secciones internas alternan **fondos crema/durazno claros** (`#F4EFE9`, `#FEEAD6`) con bloques de color sólido vibrante.

**Estilo (3–4 frases):** Es una marca de **turismo/naturaleza alegre y saturada**, con una paleta de arcoíris cálido: amarillo protagonista, más rosa, púrpura, verde, naranja y azul como acentos. La estética se apoya en **fotografía grande de destinos** ("Destinos en Caldas", "Sumérgete en Caldas", "¿Qué hacer?"), tipografía Gotham en pesos fuertes para titulares, y **botones de esquinas muy redondeadas** — radios de `16px` y formas tipo píldora (`100px`) — con **relleno sólido** (no outline). El tono es amable, terroso-vibrante y orientado al ciudadano/visitante, coherente con una plataforma pública de la Gobernación de Caldas.

**Botones/formas (confirmado en CSS):** `border-radius: 16px` en tarjetas y `border-radius: 100px` (píldora) en botones; fondos sólidos (`#FFC318`, `#FEAF2D`, `#FF41A9`, etc.).

---

## Confianza

**Confirmado directamente del CSS del sitio (alta confianza):**
- Los 11 colores globales del tema y sus roles (primary/secondary/accent/text) — leídos de `.elementor-kit-8` en `post-8.css`. Es la fuente autoritativa del tema.
- La tipografía **Gotham** (auto-alojada, `.woff`, pesos 300/500/900) y su uso para todos los roles; fallback `sans-serif`; Roboto cargado como respaldo — leídos de `post-8.css` y `child.css`.
- Colores de botones/secciones adicionales (`#FEAF2D`, `#FF6B65`, `#FEEAD6`, `#281334`, `#833CA3`, etc.) — leídos de `post-549.css` (home) y `child.css`.
- Ausencia de degradados CSS y presencia del slider de fondo a pantalla completa (Vegas) — verificado en el HTML/CSS.
- Radios de borde de botones/tarjetas (16px y 100px).

**Inferencia visual (no medida pixel a pixel):**
- Que el modo sea "claro y vibrante": inferido de fondos crema + texto blanco sobre fotos + colores planos. No se renderizó la página (WebFetch bloqueado por SSL), así que la jerarquía exacta de qué color domina cada sección es una lectura del CSS, no una captura visual.
- La asignación exacta de cuál color acompaña a cuál sección (más allá de las variables globales) es aproximada.

**No se pudo obtener:**
- Render/captura visual de la página (WebFetch falló: error de certificado SSL "unable to verify the first certificate"). Todo se obtuvo vía `curl` sobre HTML/CSS.
- Auditoría de subpáginas individuales más allá de la home y las plantillas globales (post-549, post-8, child). Otras plantillas (post-553, post-68, post-6230) no se analizaron a fondo.
- Códigos de marca "oficiales" fuera del CSS (no hay manual de marca publicado en el sitio; los valores anteriores son los realmente implementados).
