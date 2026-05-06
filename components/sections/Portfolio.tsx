"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { id: 1, col: "md:col-span-2", row: "md:row-span-2", tag: "FOTO",   label: "Fotografía Comercial"  },
  { id: 2, col: "",              row: "",               tag: "BRAND",  label: "Branding"               },
  { id: 3, col: "",              row: "",               tag: "VIDEO",  label: "Video Spot"             },
  { id: 4, col: "",              row: "md:row-span-2",  tag: "DISEÑO", label: "Diseño Editorial"       },
  { id: 5, col: "",              row: "",               tag: "FOTO",   label: "Fotografía de Producto" },
  { id: 6, col: "md:col-span-2", row: "",               tag: "BRAND",  label: "Identidad de Marca"    },
];

const SHADES = ["#0e0e0e", "#111111", "#101010", "#0f0f0f", "#121212", "#0d0d0d"];

export default function Portfolio() {
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
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
              <span className="font-mono uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.4)" }}>
                PORTAFOLIO // 02
              </span>
            </div>
            <h2
              className="font-headline font-extrabold text-[#F5F5F5] leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              NUESTRO<br />
              <span className="text-[#3BEA3B]">TRABAJO.</span>
            </h2>
          </div>
          <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: "#555" }}>
            Proyectos reales para marcas que confían en nuestra visión creativa.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 grid-rows-auto gap-2"
          style={{ minHeight: "56vh" }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`relative overflow-hidden group cursor-pointer ${item.col} ${item.row}`}
              style={{
                background:  SHADES[i],
                border:      "1px solid rgba(255,255,255,0.04)",
                minHeight:   200,
                opacity:     visible ? 1 : 0,
                transform:   visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                transition:  `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
              }}
            >
              {/* Film grain overlay */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.018] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize:  "150px 150px",
                }}
              />

              {/* Corner brackets */}
              {(["tl","tr","bl","br"] as const).map((pos) => (
                <span key={pos} aria-hidden className="absolute w-3.5 h-3.5" style={{
                  top:          pos.includes("t") ? 10 : "auto",
                  bottom:       pos.includes("b") ? 10 : "auto",
                  left:         pos.includes("l") ? 10 : "auto",
                  right:        pos.includes("r") ? 10 : "auto",
                  borderTop:    pos.includes("t") ? "1px solid rgba(59,234,59,0.12)" : "none",
                  borderBottom: pos.includes("b") ? "1px solid rgba(59,234,59,0.12)" : "none",
                  borderLeft:   pos.includes("l") ? "1px solid rgba(59,234,59,0.12)" : "none",
                  borderRight:  pos.includes("r") ? "1px solid rgba(59,234,59,0.12)" : "none",
                }} />
              ))}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                <span
                  className="font-mono"
                  style={{
                    fontSize:      "0.52rem",
                    letterSpacing: "0.16em",
                    color:         "rgba(59,234,59,0.28)",
                    border:        "1px solid rgba(59,234,59,0.1)",
                    padding:       "2px 8px",
                  }}
                >
                  {item.tag}
                </span>
                <span
                  className="font-headline font-bold text-center leading-tight"
                  style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)", color: "rgba(245,245,245,0.1)" }}
                >
                  {item.label}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "0.48rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.12)", marginTop: 4 }}
                >
                  Próximamente
                </span>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(59,234,59,0.025)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(59,234,59,0.18)" }}
              />
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-center font-mono uppercase"
          style={{ fontSize: "0.58rem", letterSpacing: "0.14em", color: "rgba(245,245,245,0.14)" }}
        >
          Portafolio completo disponible próximamente · Solicita ejemplos de trabajo por WhatsApp
        </p>
      </div>
    </section>
  );
}
