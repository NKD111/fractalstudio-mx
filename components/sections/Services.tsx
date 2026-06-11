"use client";

import { useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

const SERVICES = [
  {
    num: "01", title: "Fotografía Comercial",
    description: "Imágenes que venden. Desde producto hasta lifestyle — capturamos la esencia de tu marca con precisión profesional y visión artística.",
    tags: ["Producto", "Editorial", "Corporativo", "Lifestyle"],
  },
  {
    num: "02", title: "Producción de Video",
    description: "Contenido audiovisual que conecta. Spots comerciales, reels y documentales que generan impacto real y convierten audiencias en clientes.",
    tags: ["Spots", "Reels", "Documentales", "Motion Graphics"],
  },
  {
    num: "03", title: "Diseño Gráfico",
    description: "Piezas que comunican con claridad y estilo. Materiales digitales y print que refuerzan tu identidad en cada punto de contacto.",
    tags: ["Print", "Digital", "Social Media", "Packaging"],
  },
  {
    num: "04", title: "Branding & Identidad",
    description: "Construimos marcas que perduran. Estrategia, naming, logotipo y sistema visual cohesivo que diferencia tu negocio en el mercado.",
    tags: ["Logotipo", "Manual de Marca", "Naming", "Estrategia"],
  },
];

function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline"
      style={{
        borderTop:  "1px solid var(--mist)",
        padding:    "40px 0",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 90}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 90}ms`,
      }}
    >
      {/* Index serif gigante */}
      <div className="md:col-span-1 font-arch" style={{
        fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 400, lineHeight: 1,
        color: hover ? "var(--voltage)" : "var(--mist)", transition: "color 350ms ease",
      }}>
        {service.num}
      </div>

      {/* Nombre */}
      <div className="md:col-span-5">
        <h3 className="font-display" style={{
          fontSize: "clamp(1.75rem, 3.4vw, 3rem)", fontWeight: 400, lineHeight: 0.95,
          letterSpacing: "-0.02em", color: "var(--ink)", margin: 0,
          transform: hover ? "translateX(6px)" : "translateX(0)", transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
        }}>
          {service.title}
        </h3>
      </div>

      {/* Descripción + tags */}
      <div className="md:col-span-6">
        <p className="font-ui" style={{ fontSize: 16, lineHeight: 1.4, letterSpacing: "-0.32px", color: "var(--ink)", maxWidth: "46ch", margin: 0 }}>
          {service.description}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5" style={{ marginTop: 18 }}>
          {service.tags.map((tag) => (
            <span key={tag} className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage)", fontWeight: 400 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" style={{ background: "var(--linen)" }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "100px 50px" }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: 70 }}>
          <RevealTitle lines={[{ text: "Lo que" }, { text: "hacemos.", accent: true }]} />
          <p className="font-ui" style={{ fontSize: 11, letterSpacing: "0.11px", textTransform: "uppercase", color: "var(--sage)", fontWeight: 350 }}>
            Servicios — 01
          </p>
        </div>

        {/* Editorial rows */}
        <div style={{ borderBottom: "1px solid var(--mist)" }}>
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.num} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-end" style={{ marginTop: 40 }}>
          <a
            href="https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui editorial-navlink"
            style={{ fontSize: 14, fontWeight: 350, color: "var(--ink)", textDecoration: "none" }}
          >
            Solicitar cotización →
          </a>
        </div>
      </div>
    </section>
  );
}
