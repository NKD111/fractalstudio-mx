import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/* ─── Analytics IDs ─────────────────────────────────────────────────────────
   Reemplaza estos placeholders con tus IDs reales.
   Ver README.md → sección "Analytics" para instrucciones.           ────── */
const GA_ID        = "G-YHBC00E9WE";
const GTM_ID       = "GTM-XXXXXXX";
const META_PIXEL   = "1948542752447075";

/* ─── Fonts ─────────────────────────────────────────────────────────────── */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.fractalstudio.com.mx"),

  title: {
    default:  "Fractal Studio MX | Diseño, Fotografía y Video en CDMX",
    template: "%s | Fractal Studio MX | CDMX",
  },
  description:
    "Agencia creativa en CDMX especializada en diseño gráfico, fotografía comercial, producción de video y branding. Transformamos tu marca con visión estratégica e impacto visual desde Ciudad de México.",
  keywords: [
    "agencia creativa CDMX",
    "diseño gráfico Ciudad de México",
    "fotografía comercial CDMX",
    "producción de video México",
    "branding e identidad de marca",
    "Fractal Studio MX",
    "agencia de diseño México",
    "fotografía de producto CDMX",
    "video corporativo CDMX",
  ],

  authors:  [{ name: "Fractal Studio MX", url: "https://www.fractalstudio.com.mx" }],
  creator:  "Fractal Studio MX",
  publisher:"Fractal Studio MX",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type:        "website",
    locale:      "es_MX",
    url:         "https://www.fractalstudio.com.mx",
    siteName:    "Fractal Studio MX",
    title:       "Fractal Studio MX | Diseño, Fotografía y Video en CDMX",
    description: "Agencia creativa en CDMX. Diseño gráfico, fotografía comercial, producción de video y branding para marcas que quieren destacar.",
    images: [{
      url:    "/og.jpg",
      width:  1200,
      height: 630,
      alt:    "Fractal Studio MX — Agencia Creativa en CDMX",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Fractal Studio MX | Agencia Creativa CDMX",
    description: "Diseño, fotografía, video y branding en CDMX. Potenciamos tu marca.",
    creator:     "@fractalstudiomx",
    images:      ["/og.jpg"],
  },

  alternates: {
    canonical: "https://www.fractalstudio.com.mx",
  },

  other: {
    "google-site-verification": "MCvery0HSnp_JoELgRpKZW_MeMBj-HFjc8quS3Ey33k",
  },
};

/* ─── JSON-LD Structured Data ────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name:        "Fractal Studio MX",
  description: "Agencia creativa en CDMX especializada en diseño gráfico, fotografía comercial, producción de video y branding.",
  url:         "https://www.fractalstudio.com.mx",
  telephone:   "+52-55-6212-3864",
  email:       "hola@fractalstudio.com.mx",
  address: {
    "@type":         "PostalAddress",
    addressLocality: "Ciudad de México",
    addressRegion:   "Ciudad de México",
    addressCountry:  "MX",
  },
  geo: {
    "@type":    "GeoCoordinates",
    latitude:   "19.4326",
    longitude:  "-99.1332",
  },
  openingHoursSpecification: [{
    "@type":     "OpeningHoursSpecification",
    dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens:       "09:00",
    closes:      "18:00",
  }],
  priceRange:         "$$",
  currenciesAccepted: "MXN",
  areaServed: { "@type": "City", name: "Ciudad de México" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Servicios Creativos",
    itemListElement: [
      { "@type": "Offer", name: "Fotografía Comercial" },
      { "@type": "Offer", name: "Producción de Video" },
      { "@type": "Offer", name: "Diseño Gráfico" },
      { "@type": "Offer", name: "Branding & Identidad" },
    ],
  },
  sameAs: [
    "https://www.instagram.com/fractalstudiomx",
    "https://www.facebook.com/fractalstudiomx",
  ],
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />

        {/* Preconnects — next/font ya sirve fuentes desde /_next/static, solo necesitamos analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* JSON-LD Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="min-h-dvh antialiased bg-[#080808] text-[#F5F5F5] overflow-x-hidden">

        {/* ── Skip to content (accesibilidad) ── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#3BEA3B] focus:text-[#080808] focus:font-mono focus:text-sm focus:font-semibold focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        {children}

        {/* ── Google Tag Manager — solo si el ID es real (no placeholder) ── */}
        {GTM_ID && !GTM_ID.includes("X") && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0" width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
            <Script id="gtm" strategy="afterInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}</Script>
          </>
        )}

        {/* ── Google Analytics 4 ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}</Script>

        {/* ── Meta Pixel ── */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
          n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
          t=b.createElement(e);t.async=!0;t.src=v;
          s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${META_PIXEL}');fbq('track','PageView');
        `}</Script>

        {/* ── Mariana Widget ── */}
        <Script
          src="https://fractal-virtual-team-production.up.railway.app/mariana-widget.js"
          data-agency="fractal"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
