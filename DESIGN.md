# DESIGN — Fractal Studio MX

Documentado desde el código existente (2026-07-30). El disco manda: si algo aquí contradice al código, gana el código y se actualiza este archivo.

## Estrategia de color: **Committed**

Un solo acento saturado que carga la identidad. Nada de paleta amplia.

| Rol | Valor | Uso |
|---|---|---|
| Obsidiana | `#080808` | fondo de todo el sitio |
| Lima | `#C3DD2E` | acento único: HUD, scan line, cifras, CTA primario, fractal generativo |
| Hueso | `#F5F5F5` | titulares y texto de alto contraste |
| Gris cuerpo | `#999` | párrafos |
| Gris apagado | `#888` / `rgba(245,245,245,.35)` | etiquetas mono, metadatos |

Reglas: el lima nunca se usa como relleno de área grande salvo el CTA primario. Las capas decorativas viven entre `0.04` y `0.14` de opacidad (grid, glows, divisores). El blanco puro y el negro puro están prohibidos.

## Tipografía

| Familia | Variable | Uso |
|---|---|---|
| **Syne** 400/600/700/800 | `--font-syne` → `font-headline` | titulares, cifras, botones con peso |
| **JetBrains Mono** 300/400/500 | `--font-jetbrains-mono` → `font-mono` | etiquetas HUD, metadatos, tags, nav |
| **DM Sans** 300/400/500/600 | `--font-dm-sans` → `font-body` | párrafos |

El titular del hero usa `clamp(2rem, 9vw, 8.5rem)`, `leading-[0.87]`, `tracking-[-0.04em]`. Las etiquetas mono siempre van en mayúsculas con `letter-spacing` entre `0.12em` y `0.22em`: es la firma tipográfica de la marca.

## Movimiento

Curva estándar: `cubic-bezier(0.2, 0, 0, 1)` (ease-out exponencial). Sin rebote, sin elástico.

Piezas ya existentes que definen el vocabulario:
- **Split-text por carácter** con stagger de 28ms y `translateY(110%)` desde un contenedor con `overflow: hidden`.
- **Botones magnéticos** que siguen el cursor al 0.28 de fuerza y regresan en 400ms.
- **Scan line** vertical de 2px que barre la pantalla cada 4.5s, con `box-shadow` lima.
- **Contadores** con easeOutExpo disparados por IntersectionObserver.
- **LivingFractal**: canvas generativo persistente que muta de forma según la sección visible (knot → aperture → spiral → stream → wave → pulse).
- **Parallax** en el titular (0.22) y subtítulo (0.12) del hero.

Todo lo nuevo debe respetar `prefers-reduced-motion` y animar solo `transform` y `opacity`.

## Textura

Grid de 64px en lima al 4.2% de opacidad, glows radiales elípticos al 7% y 4%, divisores de 1px con degradado que se desvanece a los lados. La página nunca es negro plano.

## Componentes existentes

`Navbar` (sticky, se contrae al hacer scroll), `Footer`, `Hero`, `Services` (numerados 01-06 con iconos SVG en línea y tags), `Portfolio`, `Process`, `Testimonials`, `Contact`, `CustomCursor`, `LoadingScreen`, `RevealTitle`, `WhatsAppFloat`, `LivingFractal`.

Los iconos son SVG en línea a propósito: se eliminó `lucide-react` del bundle.

## Boost 2026-07-30

- **`Decoded`** sustituye al split-text del titular: el texto se resuelve desde ruido con el alfabeto de la marca. Arranca con el texto REAL y avanza por reloj (no por cuadros) con tope duro, para que nunca quede un hero en blanco si el navegador estrangula los temporizadores en pestaña de fondo.
- **`CrucesLima`**: marcas de registro de imprenta / encuadre de visor, girando en lima. Guiño al oficio, no adorno al azar. Siempre en el fondo, nunca sobre texto.
- **`Sonido`**: síntesis con Web Audio, cero archivos. Arranca APAGADO con interruptor visible y persistente. Se engancha por delegación a `a, button, [role=button], input, summary`.
- **`Clientes`**: marquesina infinita con 10 logos reales, todos monocromo blanco a 96px de alto (`/public/clientes/`). Al 45% de opacidad, 100% al hover: la marca del cliente nunca compite con la de Fractal.
- **`Showreel`**: franja de cierre a sangre con trabajo REAL de clientes en loop (`/public/reel/`). Carga diferida por `requestIdleCallback` + play atado a IntersectionObserver.
- **Video del hero**: mismo montaje en blanco y negro al 34% bajo dos velos, con parallax más lento que el texto.

## Gotchas del proyecto

- `tsconfig` apunta a target < ES2015: nada de `matchAll` con spread ni iteración de iteradores.
- Los links del nav son rutas absolutas (`/#seccion`) para que el menú funcione fuera del home.
- Assets en `/public`. El portafolio hoy usa SVG de relleno, no fotos reales.
