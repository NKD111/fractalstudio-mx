"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:   "Fractal Studio transformó por completo nuestra identidad. El proceso fue claro, los tiempos impecables y los resultados superaron todo lo que esperábamos.",
    name:    "Carlos Mendoza",
    title:   "Director Creativo",
    company: "Estudio M",
    init:    "CM",
    color:   "rgba(59,234,59,0.12)",
  },
  {
    quote:   "La sesión de fotografía de producto elevó nuestra presencia digital. Las ventas en línea crecieron 40% tras renovar nuestras imágenes con ellos.",
    name:    "Ana Reyes",
    title:   "Fundadora",
    company: "Marca Propia",
    init:    "AR",
    color:   "rgba(59,234,59,0.08)",
  },
  {
    quote:   "El spot de video fue exactamente lo que necesitábamos — impacto visual, concepto sólido y entrega a tiempo. Los volvería a contratar sin pensarlo.",
    name:    "Roberto Silva",
    title:   "CMO",
    company: "Grupo Innovar",
    init:    "RS",
    color:   "rgba(59,234,59,0.06)",
  },
];

const CLIENT_TAGS = ["ESTUDIO M", "MARCA PROPIA", "GRUPO INNOVAR", "NEXO CDMX", "VIRAL ROOTS", "BREND CO", "COLECTIVO AR", "SOLTURA MX", "ALTO NIVEL", "DF BRANDS"];

export default function Testimonials() {
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
    <section id="testimonios" className="py-24 md:py-32 bg-[#080808] relative overflow-hidden">

      {/* Ambient glow top-right */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0,
        width: "35vw", height: "35vw", maxWidth: 450,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(59,234,59,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={ref}
          className="mb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-5" aria-hidden="true">
            <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
            <span className="font-mono uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.4)" }}>
              CLIENTES // 04
            </span>
          </div>
          <h2
            className="font-headline font-extrabold text-[#F5F5F5] leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
          >
            LO QUE DICEN<br />
            <span className="text-[#3BEA3B]">NUESTROS CLIENTES.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                border:     "1px solid rgba(255,255,255,0.05)",
                padding:    32,
                background: "rgba(255,255,255,0.01)",
                position:   "relative",
                opacity:    visible ? 1 : 0,
                transform:  visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${150 + i * 130}ms, transform 0.65s cubic-bezier(0.2,0,0,1) ${150 + i * 130}ms`,
              }}
            >
              {/* Top accent line */}
              <div style={{
                position:   "absolute",
                top:        0,
                left:       0,
                right:      0,
                height:     1,
                background: `linear-gradient(90deg, transparent, ${t.color} 50%, transparent)`,
              }} />

              {/* Quote mark */}
              <div style={{
                fontFamily:  "Georgia, serif",
                fontSize:    "3.5rem",
                lineHeight:  1,
                color:       "rgba(59,234,59,0.18)",
                marginBottom: 12,
                userSelect:  "none",
              }}>
                &ldquo;
              </div>

              <p
                className="font-body text-sm leading-relaxed mb-6"
                style={{ color: "#888" }}
              >
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div style={{
                  width:          40,
                  height:         40,
                  borderRadius:   "50%",
                  background:     "rgba(59,234,59,0.06)",
                  border:         "1px solid rgba(59,234,59,0.14)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}>
                  <span
                    className="font-mono"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.06em", color: "#3BEA3B" }}
                  >
                    {t.init}
                  </span>
                </div>
                <div>
                  <div className="font-body font-semibold" style={{ fontSize: "1.0625rem", color: "#F5F5F5" }}>
                    {t.name}
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.675rem", letterSpacing: "0.08em", color: "#888", marginTop: 2 }}>
                    {t.title} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginBottom: 40 }} />

        {/* Marquee */}
        <div
          aria-hidden="true"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.65s ease 700ms",
          }}
        >
          <p
            className="font-mono uppercase mb-5"
            style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(245,245,245,0.16)" }}
          >
            Marcas que confían en nosotros
          </p>

          <div style={{ overflow: "hidden", position: "relative" }}>
            {/* Fade masks */}
            <div aria-hidden style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 1,
              background: "linear-gradient(90deg, #080808, transparent)",
            }} />
            <div aria-hidden style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 1,
              background: "linear-gradient(270deg, #080808, transparent)",
            }} />

            <div className="marquee-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
              {[...CLIENT_TAGS, ...CLIENT_TAGS, ...CLIENT_TAGS].map((tag, i) => (
                <div
                  key={i}
                  style={{
                    padding:       "8px 20px",
                    border:        "1px solid rgba(255,255,255,0.05)",
                    flexShrink:    0,
                    whiteSpace:    "nowrap",
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: "0.725rem", letterSpacing: "0.12em", color: "rgba(245,245,245,0.18)" }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
