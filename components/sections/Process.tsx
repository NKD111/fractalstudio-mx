"use client";

import { useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

const STEPS = [
  { num: "01", title: "Briefing",   desc: "Escuchamos a fondo. Mapeamos tu marca, audiencia, objetivos y tiempos para definir el alcance exacto del proyecto.", glyph: "◎" },
  { num: "02", title: "Concepto",   desc: "Desarrollamos la dirección creativa: moodboards, referencias visuales y propuestas de concepto antes de producir.",    glyph: "◈" },
  { num: "03", title: "Producción", desc: "Ejecutamos con precisión. Fotografía, video, diseño — cada entregable pasa por un proceso de control de calidad.",     glyph: "◉" },
  { num: "04", title: "Entrega",    desc: "Archivos finales optimizados para cada uso, manual de aplicación y soporte post-entrega incluido.",                 glyph: "◌" },
];

function StepRow({ step, index, visible }: { step: typeof STEPS[0]; index: number; visible: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline"
      style={{
        borderTop: "1px solid var(--mist)", padding: "44px 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}
    >
      <div className="md:col-span-2 flex items-baseline gap-3">
        <span className="font-arch" style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 400, lineHeight: 1, color: "var(--ink)" }}>
          {step.num}
        </span>
        <span aria-hidden style={{ fontSize: "1.25rem", color: hover ? "var(--voltage)" : "var(--moss)", transition: "color 350ms ease" }}>
          {step.glyph}
        </span>
      </div>

      <div className="md:col-span-4">
        <h3 className="font-display" style={{
          fontSize: "clamp(1.75rem, 3.4vw, 3rem)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0,
          transform: hover ? "translateX(6px)" : "translateX(0)", transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
        }}>
          {step.title}
        </h3>
      </div>

      <div className="md:col-span-6">
        <p className="font-ui" style={{ fontSize: 16, lineHeight: 1.4, letterSpacing: "-0.32px", color: "var(--ink)", maxWidth: "46ch", margin: 0 }}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}

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
    <section id="proceso" style={{ background: "var(--linen)" }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "100px 50px" }}>

        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: 70 }}>
          <RevealTitle lines={[{ text: "Cómo" }, { text: "trabajamos.", accent: true }]} />
          <p className="font-ui" style={{ fontSize: 11, letterSpacing: "0.11px", textTransform: "uppercase", color: "var(--sage)", fontWeight: 350 }}>
            Proceso — 03
          </p>
        </div>

        <div style={{ borderBottom: "1px solid var(--mist)" }}>
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} visible={visible} />
          ))}
        </div>

        <div className="flex justify-end" style={{ marginTop: 40 }}>
          <a
            href="https://wa.me/525562123864?text=Hola%2C%20quiero%20iniciar%20un%20proyecto%20con%20Fractal%20Studio%20MX."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui editorial-navlink"
            style={{ fontSize: 14, fontWeight: 350, color: "var(--ink)", textDecoration: "none" }}
          >
            ¿Listo para empezar? Hablemos →
          </a>
        </div>
      </div>
    </section>
  );
}
