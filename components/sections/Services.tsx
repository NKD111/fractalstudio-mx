"use client";

import { useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

/* Inline SVG icons — eliminates lucide-react from bundle */
const CameraIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const VideoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);
const PencilIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const SERVICES = [
  {
    num: "01", Icon: CameraIcon, title: "Fotografía Comercial",
    description: "Imágenes que venden. Desde producto hasta lifestyle — capturamos la esencia de tu marca con precisión profesional y visión artística.",
    tags: ["Producto", "Editorial", "Corporativo", "Lifestyle"],
  },
  {
    num: "02", Icon: VideoIcon, title: "Producción de Video",
    description: "Contenido audiovisual que conecta. Spots comerciales, reels y documentales que generan impacto real y convierten audiencias en clientes.",
    tags: ["Spots", "Reels", "Documentales", "Motion Graphics"],
  },
  {
    num: "03", Icon: PencilIcon, title: "Diseño Gráfico",
    description: "Piezas que comunican con claridad y estilo. Materiales digitales y print que refuerzan tu identidad en cada punto de contacto.",
    tags: ["Print", "Digital", "Social Media", "Packaging"],
  },
  {
    num: "04", Icon: LayersIcon, title: "Branding & Identidad",
    description: "Construimos marcas que perduran. Estrategia, naming, logotipo y sistema visual cohesivo que diferencia tu negocio en el mercado.",
    tags: ["Logotipo", "Manual de Marca", "Naming", "Estrategia"],
  },
];

/* ── Card del deck — sticky, se apilan como expedientes ─────────────────── */
function StackCard({
  service,
  numRef,
}: {
  service: typeof SERVICES[0];
  numRef: (el: HTMLSpanElement | null) => void;
}) {
  const { Icon } = service;
  const [hover, setHover] = useState(false);

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        background:   "#0A0A0A",
        border:       `1px solid ${hover ? "rgba(59,234,59,0.22)" : "rgba(255,255,255,0.07)"}`,
        minHeight:    "clamp(380px, 56vh, 540px)",
        transition:   "border-color 350ms ease",
        display:      "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Número fantasma gigante — parallax independiente */}
      <span
        ref={numRef}
        aria-hidden
        className="font-headline font-extrabold absolute pointer-events-none select-none"
        style={{
          fontSize:        "clamp(8rem, 24vw, 19rem)",
          lineHeight:      1,
          right:           "-0.04em",
          top:             "0.05em",
          color:           "transparent",
          WebkitTextStroke: `1px ${hover ? "rgba(59,234,59,0.28)" : "rgba(59,234,59,0.11)"}`,
          transition:      "-webkit-text-stroke-color 400ms ease",
          willChange:      "transform",
        }}
      >
        {service.num}
      </span>

      {/* Accent line superior */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          opacity:    hover ? 1 : 0,
          background: "linear-gradient(90deg, transparent, rgba(59,234,59,0.4) 50%, transparent)",
        }}
      />

      {/* Strip header — visible cuando la card está apilada */}
      <div
        className="flex items-center gap-4 px-8 md:px-12"
        style={{
          height:       64,
          flexShrink:   0,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: hover ? "rgba(59,234,59,0.8)" : "rgba(59,234,59,0.4)", transition: "color 300ms" }}
        >
          {service.num}
        </span>
        <span className="block w-6 h-px" style={{ background: "rgba(59,234,59,0.25)" }} />
        <span
          className="font-mono uppercase truncate"
          style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.45)" }}
        >
          {service.title}
        </span>
        <div
          className="ml-auto w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            border: `1px solid ${hover ? "rgba(59,234,59,0.35)" : "rgba(255,255,255,0.08)"}`,
            color:  hover ? "#3BEA3B" : "rgba(245,245,245,0.3)",
          }}
        >
          <Icon />
        </div>
      </div>

      {/* Cuerpo */}
      <div className="relative z-[1] flex flex-col justify-end flex-1 px-8 md:px-12 py-10 md:py-12">
        <h3
          className="font-headline font-bold leading-[0.95] tracking-[-0.025em] mb-5 text-[#F5F5F5]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", maxWidth: "12ch" }}
        >
          {service.title}
        </h3>

        <p
          className="font-body leading-relaxed mb-8"
          style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "#999", maxWidth: "46ch" }}
        >
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, ti) => (
            <span
              key={tag}
              className="font-mono uppercase transition-colors duration-300"
              style={{
                fontSize:      "0.7rem",
                letterSpacing: "0.1em",
                color:         hover ? "rgba(59,234,59,0.55)" : "rgba(245,245,245,0.25)",
                border:        `1px solid ${hover ? "rgba(59,234,59,0.18)" : "rgba(255,255,255,0.07)"}`,
                padding:       "3px 10px",
                transitionDelay: `${ti * 40}ms`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [visible, setVisible] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  /* Parallax de los números fantasma — un solo rAF para las 4 cards */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of numRefs.current) {
        if (!el) continue;
        const card = el.parentElement;
        if (!card) continue;
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        /* progreso de la card a través del viewport → desplazamiento contrario */
        const progress = (r.top + r.height * 0.5 - vh * 0.5) / vh;
        el.style.transform = `translateY(${progress * 90}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; raf = requestAnimationFrame(update); }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="servicios" className="py-24 md:py-32 bg-[#080808] relative">
      {/* Ambient */}
      <div
        aria-hidden className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "40vw", height: "40vw", maxWidth: 500,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,234,59,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={headRef}
          className="mb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-4" aria-hidden="true">
            <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
            <span className="font-mono uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.4)" }}>
              SERVICIOS // 01
            </span>
          </div>
          <RevealTitle lines={[{ text: "LO QUE" }, { text: "HACEMOS.", accent: true }]} />
        </div>

        {/* Deck sticky — las cards se apilan como expedientes al scrollear */}
        <div className="relative">
          {SERVICES.map((service, i) => (
            <div
              key={service.num}
              style={{
                position: "sticky",
                top:      `calc(84px + ${i * 64}px)`,
                zIndex:   i + 1,
                marginBottom: i < SERVICES.length - 1 ? "2.5rem" : 0,
              }}
            >
              <StackCard
                service={service}
                numRef={(el) => { numRefs.current[i] = el; }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-end">
          <a
            href="https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-colors duration-200 hover:text-[#3BEA3B] inline-flex items-center gap-2"
            style={{ fontSize: "0.85rem", letterSpacing: "0.14em", color: "rgba(59,234,59,0.85)" }}
          >
            SOLICITAR COTIZACIÓN →
          </a>
        </div>
      </div>
    </section>
  );
}
