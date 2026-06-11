"use client";

import { useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

const STEPS = [
  {
    num: "01",
    title: "Briefing",
    desc:  "Escuchamos a fondo. Mapeamos tu marca, audiencia, objetivos y tiempos para definir el alcance exacto del proyecto.",
    glyph: "◎",
  },
  {
    num: "02",
    title: "Concepto",
    desc:  "Desarrollamos la dirección creativa: moodboards, referencias visuales y propuestas de concepto antes de producir.",
    glyph: "◈",
  },
  {
    num: "03",
    title: "Producción",
    desc:  "Ejecutamos con precisión. Fotografía, video, diseño — cada entregable pasa por un proceso de control de calidad.",
    glyph: "◉",
  },
  {
    num: "04",
    title: "Entrega",
    desc:  "Archivos finales optimizados para cada uso, manual de aplicación y soporte post-entrega incluido.",
    glyph: "◌",
  },
];

export default function Process() {
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
    <section id="proceso" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#050505" }}>

      {/* Ambient centre glow */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        width: "60vw", height: "60vw", maxWidth: 700,
        borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(ellipse, rgba(195,221,46,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={ref}
          className="mb-16"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-5" aria-hidden="true">
            <span className="block w-5 h-px bg-[#C3DD2E] opacity-50" />
            <span className="font-mono uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: "rgba(195,221,46,0.4)" }}>
              PROCESO // 03
            </span>
          </div>
          <RevealTitle lines={[{ text: "CÓMO" }, { text: "TRABAJAMOS.", accent: true }]} />
        </div>

        {/* Steps grid */}
        <div className="relative">

          {/* Horizontal connecting line (desktop only) */}
          <div
            aria-hidden
            className="hidden md:block"
            style={{
              position:  "absolute",
              top:       40,
              left:      40,
              right:     40,
              height:    1,
              background: visible
                ? "linear-gradient(90deg, transparent, rgba(195,221,46,0.22) 20%, rgba(195,221,46,0.22) 80%, transparent)"
                : "transparent",
              transition: "background 0.8s ease 0.4s",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0)" : "translateY(36px)",
                  transition: `opacity 0.6s ease ${200 + i * 120}ms, transform 0.6s cubic-bezier(0.2,0,0,1) ${200 + i * 120}ms`,
                }}
              >
                {/* Circle + number row */}
                <div className="flex items-center gap-4 mb-7">
                  <div style={{
                    width:          48,
                    height:         48,
                    borderRadius:   "50%",
                    border:         "1px solid rgba(195,221,46,0.18)",
                    background:     "rgba(195,221,46,0.04)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    boxShadow:      visible ? "0 0 18px rgba(195,221,46,0.08)" : "none",
                    transition:     `box-shadow 0.6s ease ${400 + i * 120}ms`,
                  }}>
                    <span style={{ fontSize: "1.1rem", color: "#C3DD2E", lineHeight: 1 }}>
                      {step.glyph}
                    </span>
                  </div>
                  <span
                    className="font-mono"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(195,221,46,0.28)" }}
                  >
                    {step.num}
                  </span>
                </div>

                <h3
                  className="font-headline font-bold text-[#F5F5F5] mb-3"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#888" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 800ms, transform 0.6s ease 800ms",
          }}
        >
          <a
            href="https://wa.me/525562123864?text=Hola%2C%20quiero%20iniciar%20un%20proyecto%20con%20Fractal%20Studio%20MX."
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-colors duration-200 hover:text-[#C3DD2E]"
            style={{ fontSize: "0.85rem", letterSpacing: "0.14em", color: "rgba(195,221,46,0.85)" }}
          >
            ¿LISTO PARA EMPEZAR? HABLEMOS →
          </a>
        </div>
      </div>
    </section>
  );
}
