"use client";

import { useEffect, useRef, useState } from "react";

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

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const { Icon } = service;

  return (
    <div
      ref={ref}
      className="group relative p-8 transition-all duration-300"
      style={{
        border:    "1px solid rgba(255,255,255,0.05)",
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms, border-color 300ms, background 300ms`,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,234,59,0.18)"; (e.currentTarget as HTMLElement).style.background = "rgba(59,234,59,0.015)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,234,59,0.35) 50%, transparent)" }}
      />

      {/* Number + Icon */}
      <div className="flex items-center justify-between mb-7">
        <span
          className="font-mono transition-colors duration-200 group-hover:text-[rgba(59,234,59,0.6)]"
          style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "rgba(59,234,59,0.3)" }}
        >
          {service.num}
        </span>
        <div
          className="w-10 h-10 flex items-center justify-center transition-all duration-300"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span
            className="transition-colors duration-300 group-hover:text-[#3BEA3B]"
            style={{ color: "rgba(245,245,245,0.3)" }}
          >
            <Icon />
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-headline font-bold leading-tight tracking-[-0.02em] mb-3 text-[#F5F5F5]"
        style={{ fontSize: "1.15rem" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#888" }}>
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono uppercase"
            style={{
              fontSize:      "0.7rem",
              letterSpacing: "0.1em",
              color:         "rgba(245,245,245,0.22)",
              border:        "1px solid rgba(255,255,255,0.06)",
              padding:       "2px 8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="servicios" className="py-24 md:py-32 bg-[#080808] relative overflow-hidden">
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
          ref={ref}
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
          <h2
            className="font-headline font-extrabold text-[#F5F5F5] leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            LO QUE<br />
            <span className="text-[#3BEA3B]">HACEMOS.</span>
          </h2>
        </div>

        {/* 2×2 grid with gap-px effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.07)]">
          {SERVICES.map((service, i) => (
            <div key={service.num} className="bg-[#080808]">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
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
