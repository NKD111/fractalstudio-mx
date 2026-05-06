# fractalstudio.com.mx

Sitio web de **Fractal Studio MX** — estudio creativo en CDMX.  
Stack: Next.js 14 · Tailwind CSS · shadcn/ui · Vercel

---

## Deploy en Vercel

1. Push este repositorio a GitHub / GitLab / Bitbucket.
2. En [vercel.com](https://vercel.com), haz **Add New → Project** e importa el repo.
3. Framework preset se detecta automáticamente como **Next.js**. No cambies nada.
4. Haz clic en **Deploy**. En ~90 segundos el sitio está en línea.

### Dominio personalizado

En Vercel → Project → **Settings → Domains**, agrega `www.fractalstudio.com.mx`.  
Vercel te dará un registro CNAME; agrégalo en tu proveedor DNS (Cloudflare, GoDaddy, etc.).

---

## IDs de Analytics — reemplazar antes de producción

Abre `app/layout.tsx` y edita las 3 constantes al inicio del archivo:

```ts
const GA_ID     = "G-XXXXXXXXXX";          // Google Analytics 4
const GTM_ID    = "GTM-XXXXXXX";           // Google Tag Manager
const META_PIXEL = "XXXXXXXXXXXXXXXXXX";   // Meta Pixel / Facebook Pixel
```

| Variable | Dónde obtenerla |
|---|---|
| `GA_ID` | [analytics.google.com](https://analytics.google.com) → Admin → Flujos de datos → ID de medición |
| `GTM_ID` | [tagmanager.google.com](https://tagmanager.google.com) → Cuenta → Contenedor → ID |
| `META_PIXEL` | [business.facebook.com](https://business.facebook.com) → Administrador de eventos → Píxel → ID |

---

## Acciones manuales pendientes (3 pasos)

### 1 — Google Search Console (verificación)

1. Ve a [search.google.com/search-console](https://search.google.com/search-console).
2. Agrega propiedad `https://www.fractalstudio.com.mx`.
3. Elige verificación por **Metaetiqueta HTML**, copia el valor del atributo `content`.
4. En `app/layout.tsx`, reemplaza en el objeto `other`:
   ```ts
   other: { "google-site-verification": "TU_CODIGO_AQUI" }
   ```
5. Push y redespliega.

### 2 — Crear cuenta de Google Analytics 4

1. [analytics.google.com](https://analytics.google.com) → Crear cuenta.
2. Propiedad: `fractalstudio.com.mx` · Categoría: Servicios profesionales.
3. Copia el **ID de medición** (`G-XXXXXXXXXX`) y pégalo en `GA_ID`.

### 3 — Crear Meta Pixel

1. [business.facebook.com](https://business.facebook.com) → Administrador de eventos → Agregar fuente de datos → Píxel de Meta.
2. Nombre: `Fractal Studio MX Web`.
3. Copia el **ID del Píxel** y pégalo en `META_PIXEL`.

---

## Variables de entorno (opcional)

Si en el futuro agregas API routes, crea un archivo `.env.local` (nunca lo subas a git):

```env
# Ejemplo
NEXT_PUBLIC_SITE_URL=https://www.fractalstudio.com.mx
```

---

## Estructura del proyecto

```
fractalstudio-mx/
├── app/
│   ├── layout.tsx          # SEO, JSON-LD, Analytics, fuentes
│   ├── page.tsx            # Página principal (todas las secciones)
│   ├── globals.css         # Estilos globales + animaciones
│   ├── sitemap.ts          # /sitemap.xml generado automáticamente
│   └── robots.ts           # /robots.txt generado automáticamente
├── components/
│   ├── core/
│   │   ├── Navbar.tsx      # Navegación scroll-aware + mobile menu
│   │   └── Footer.tsx      # Footer 3 columnas + copyright
│   ├── sections/
│   │   ├── Hero.tsx        # Sección principal con scan-line animation
│   │   ├── Services.tsx    # 4 servicios en grid 2×2
│   │   ├── Portfolio.tsx   # Bento grid 6 celdas (placeholder)
│   │   └── Contact.tsx     # Formulario + info de contacto
│   └── ui/
│       └── WhatsAppFloat.tsx  # Botón flotante WhatsApp
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── public/
│   └── favicon.svg         # Ícono geométrico marca Fractal
└── next.config.mjs
```

---

## Desarrollado con ❤️ para Fractal Studio MX · CDMX 2025
