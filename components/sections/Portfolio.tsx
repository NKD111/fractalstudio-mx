"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    id:    1,
    col:   "md:col-span-2",
    row:   "md:row-span-2",
    tag:   "FOTO",
    label: "Fotografía Comercial",
    src:   "/portfolio/foto-comercial.svg",
    desc:  "Producto · Editorial · Lifestyle",
  },
  {
    id:    2,
    col:   "",
    row:   "",
    tag:   "BRAND",
    label: "Branding",
    src:   "/portfolio/branding.svg",
    desc:  "Identidad · Sistema Visual",
  },
  {
    id:    3,
    col:   "",
    row:   "",
    tag:   "VIDEO",
    label: "Video Spot",
    src:   "/portfolio/video-spot.svg",
    desc:  "Comercial · Motion",
  },
  {
    id:    4,
    col:   "",
    row:   "md:row-span-2",
    tag:   "DISEÑO",
    label: "Diseño Editorial",
    src:   "/portfolio/editorial.svg",
    desc:  "Revista · Print · Digital",
  },
  {
    id:    5,
    col:   "",
    row:   "",
    tag:   "FOTO",
    label: "Fotografía de Producto",
    src:   "/portfolio/producto.svg",
    desc:  "Macro · Lifestyle · E-commerce",
  },
  {
    id:    6,
    col:   "md:col-span-2",
    row:   "",
    tag:   "BRAND",
    label: "Identidad de Marca",
    src:   "/portfolio/identidad.svg",
    desc:  "Logotipo · Manual · Naming",
  },
];

/* Fallback gradient per item */
const FALLBACKS = [
  "linear-gradient(135deg,#0e1a0e 0%,#0a140a 50%,#080808 100%)",
  "linear-gradient(135deg,#0d1a10 0%,#080808 100%)",
  "linear-gradient(135deg,#101010 0%,#0a160a 100%)",
  "linear-gradient(135deg,#0f1a0f 0%,#090909 100%)",
  "linear-gradient(135deg,#0e180e 0%,#080808 100%)",
  "linear-gradient(135deg,#0d1c0d 0%,#090909 100%)",
];

function PortfolioCell({ item, index, visible }: {
  item: typeof ITEMS[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);

  return (
    <div
      className={`relative overflow-hidden group ${item.col} ${item.row}`}
      style={{
        background:  FALLBACKS[index],
        border:      "1px solid rgba(255,255,255,0.04)",
        minHeight:   220,
        cursor:      "pointer",
        opacity:     visible ? 1 : 0,
        transform:   visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition:  `opacity 0.55s ease ${index * 70}ms, transform 0.55s ease ${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      {!imgErr && (
        <img
          src={item.src}
          alt={item.label}
          aria-hidden
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImgErr(true)}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            transform:  hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 600ms cubic-bezier(0.2,0,0,1)",
            opacity:    0.9,
          }}
        />
      )}

      {/* Dark overlay — darker on rest, lighter on hover */}
      <div
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          background: hovered
            ? "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.2) 100%)",
          transition: "background 400ms ease",
        }}
      />

      {/* Corner brackets */}
      {(["tl","tr","bl","br"] as const).map((pos) => (
        <span key={pos} aria-hidden style={{
          position: "absolute", width: 14, height: 14,
          top:          pos.includes("t") ? 10 : "auto",
          bottom:       pos.includes("b") ? 10 : "auto",
          left:         pos.includes("l") ? 10 : "auto",
          right:        pos.includes("r") ? 10 : "auto",
          borderTop:    pos.includes("t") ? `1px solid rgba(59,234,59,${hovered ? 0.35 : 0.14})` : "none",
          borderBottom: pos.includes("b") ? `1px solid rgba(59,234,59,${hovered ? 0.35 : 0.14})` : "none",
          borderLeft:   pos.includes("l") ? `1px solid rgba(59,234,59,${hovered ? 0.35 : 0.14})` : "none",
          borderRight:  pos.includes("r") ? `1px solid rgba(59,234,59,${hovered ? 0.35 : 0.14})` : "none",
          transition: "border-color 300ms",
        }} />
      ))}

      {/* Content — always visible */}
      <div
        style={{
          position: "absolute",
          bottom:   0,
          left:     0,
          right:    0,
          padding:  "20px 18px",
          transform:  hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 400ms ease",
        }}
      >
        <span style={{
          display:       "inline-block",
          fontFamily:    "var(--font-jetbrains-mono,monospace)",
          fontSize:      "0.5rem",
          letterSpacing: "0.16em",
          color:         "#3BEA3B",
          border:        "1px solid rgba(59,234,59,0.25)",
          padding:       "2px 7px",
          marginBottom:  8,
        }}>
          {item.tag}
        </span>
        <div
          className="font-headline font-bold text-[#F5F5F5] leading-tight"
          style={{ fontSize: "clamp(0.85rem,1.5vw,1rem)" }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily:    "var(--font-jetbrains-mono,monospace)",
            fontSize:      "0.5rem",
            letterSpacing: "0.1em",
            color:         "rgba(245,245,245,0.4)",
            marginTop:     4,
            opacity:       hovered ? 1 : 0,
            transform:     hovered ? "translateY(0)" : "translateY(6px)",
            transition:    "opacity 300ms ease 60ms, transform 300ms ease 60ms",
          }}
        >
          {item.desc}
        </div>
      </div>

      {/* Green bottom border on hover */}
      <div aria-hidden style={{
        position:   "absolute",
        bottom:     0,
        left:       0,
        right:      0,
        height:     2,
        background: "#3BEA3B",
        opacity:    hovered ? 0.7 : 0,
        transition: "opacity 300ms",
        boxShadow:  "0 0 12px rgba(59,234,59,0.5)",
      }} />
    </div>
  );
}

export default function Portfolio() {
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

  return (
    <section id="portafolio" className="py-24 md:py-32 relative" style={{ background: "#050505" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={ref}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
              <span className="font-mono uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.4)" }}>
                PORTAFOLIO // 02
              </span>
            </div>
            <h2
              className="font-headline font-extrabold text-[#F5F5F5] leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
            >
              NUESTRO<br />
              <span className="text-[#3BEA3B]">TRABAJO.</span>
            </h2>
          </div>
          <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: "#888" }}>
            Proyectos reales para marcas que confían en nuestra visión creativa.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2"
          style={{ minHeight: "60vh" }}
        >
          {ITEMS.map((item, i) => (
            <PortfolioCell key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <p
            aria-hidden="true"
            className="font-mono uppercase"
            style={{ fontSize: "0.56rem", letterSpacing: "0.14em", color: "rgba(245,245,245,0.5)" }}
          >
            Solicita más ejemplos de trabajo por WhatsApp
          </p>
          <a
            href="https://wa.me/525562123864?text=Hola%2C%20quiero%20ver%20m%C3%A1s%20ejemplos%20del%20portafolio%20de%20Fractal%20Studio%20MX."
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-colors duration-200 hover:text-[#3BEA3B] inline-flex items-center gap-2"
            style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "rgba(59,234,59,0.85)" }}
          >
            VER MÁS TRABAJOS →
          </a>
        </div>
      </div>
    </section>
  );
}
