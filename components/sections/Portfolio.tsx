"use client";

import { useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

const ITEMS = [
  { id: 1, tag: "Foto",   label: "Fotografía Comercial",  src: "/portfolio/foto-comercial.svg", desc: "Producto · Editorial · Lifestyle", span: "lg:col-span-7", h: 460 },
  { id: 2, tag: "Brand",  label: "Branding",              src: "/portfolio/branding.svg",       desc: "Identidad · Sistema Visual",     span: "lg:col-span-5", h: 460 },
  { id: 3, tag: "Video",  label: "Video Spot",            src: "/portfolio/video-spot.svg",     desc: "Comercial · Motion",             span: "lg:col-span-5", h: 420 },
  { id: 4, tag: "Diseño", label: "Diseño Editorial",      src: "/portfolio/editorial.svg",      desc: "Revista · Print · Digital",      span: "lg:col-span-7", h: 420 },
  { id: 5, tag: "Foto",   label: "Fotografía de Producto", src: "/portfolio/producto.svg",      desc: "Macro · Lifestyle · E-commerce", span: "lg:col-span-6", h: 400 },
  { id: 6, tag: "Brand",  label: "Identidad de Marca",    src: "/portfolio/identidad.svg",      desc: "Logotipo · Manual · Naming",     span: "lg:col-span-6", h: 400 },
];

function Tile({ item, index, visible }: { item: typeof ITEMS[0]; index: number; visible: boolean }) {
  const [hover, setHover] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <figure
      className={`relative overflow-hidden ${item.span}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        margin: 0, borderRadius: 14, height: item.h, cursor: "pointer",
        background: "var(--pollen)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      {!imgErr && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.label}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImgErr(true)}
          className="editorial-img"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: hover ? "scale(1.04)" : "scale(1)",
          }}
        />
      )}

      {/* Caption — Fraunces italic (rol Times), abajo-izquierda */}
      <figcaption style={{ position: "absolute", left: 18, bottom: 16, right: 18 }}>
        <span className="font-ui" style={{
          display: "inline-block", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
          fontWeight: 500, color: "var(--ink)", background: "var(--voltage)", padding: "3px 9px", borderRadius: 5, marginBottom: 10,
        }}>
          {item.tag}
        </span>
        <div className="font-display" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", fontWeight: 400, lineHeight: 1, color: "var(--linen)", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}>
          {item.label}
        </div>
        <div className="font-arch" style={{
          fontSize: 16, fontStyle: "italic", color: "var(--linen)", marginTop: 6, textShadow: "0 1px 10px rgba(0,0,0,0.55)",
          opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 320ms ease, transform 320ms ease",
        }}>
          {item.desc}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Portfolio() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="portafolio" style={{ background: "var(--linen)" }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "100px 50px" }}>

        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: 70 }}>
          <RevealTitle lines={[{ text: "Nuestro" }, { text: "trabajo.", accent: true }]} />
          <p className="font-ui" style={{ fontSize: 16, lineHeight: 1.4, letterSpacing: "-0.32px", color: "var(--ink)", maxWidth: "28ch" }}>
            Proyectos reales para marcas que confían en nuestra visión creativa.
          </p>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {ITEMS.map((item, i) => (
            <Tile key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between gap-4 flex-wrap" style={{ marginTop: 40 }}>
          <p className="font-arch" style={{ fontSize: 16, fontStyle: "italic", color: "var(--sage)" }}>
            Solicita más ejemplos de trabajo por WhatsApp.
          </p>
          <a
            href="https://wa.me/525562123864?text=Hola%2C%20quiero%20ver%20m%C3%A1s%20ejemplos%20del%20portafolio%20de%20Fractal%20Studio%20MX."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui editorial-navlink"
            style={{ fontSize: 14, fontWeight: 350, color: "var(--ink)", textDecoration: "none" }}
          >
            Ver más trabajos →
          </a>
        </div>
      </div>
    </section>
  );
}
