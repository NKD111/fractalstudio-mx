"use client";

import { useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

const TESTIMONIALS = [
  { quote: "Fractal Studio transformó por completo nuestra identidad. El proceso fue claro, los tiempos impecables y los resultados superaron todo lo que esperábamos.", name: "Carlos Mendoza", title: "Director Creativo", company: "Estudio M" },
  { quote: "La sesión de fotografía de producto elevó nuestra presencia digital. Las ventas en línea crecieron 40% tras renovar nuestras imágenes con ellos.", name: "Ana Reyes", title: "Fundadora", company: "Marca Propia" },
  { quote: "El spot de video fue exactamente lo que necesitábamos — impacto visual, concepto sólido y entrega a tiempo. Los volvería a contratar sin pensarlo.", name: "Roberto Silva", title: "CMO", company: "Grupo Innovar" },
];

const CLIENT_TAGS = ["Estudio M", "Marca Propia", "Grupo Innovar", "Nexo CDMX", "Viral Roots", "Brend Co", "Colectivo AR", "Soltura MX", "Alto Nivel", "DF Brands"];

function Quote({ t, index, visible }: { t: typeof TESTIMONIALS[0]; index: number; visible: boolean }) {
  return (
    <blockquote
      style={{
        margin: 0, padding: "56px 0", borderTop: "1px solid var(--mist)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
    >
      <div className="md:col-span-3">
        <span aria-hidden className="font-display" style={{ fontSize: "5rem", lineHeight: 0.7, color: "var(--voltage)" }}>&ldquo;</span>
      </div>
      <div className="md:col-span-9">
        <p className="font-display" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.35rem)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
          {t.quote}
        </p>
        <footer className="flex items-center gap-3" style={{ marginTop: 28 }}>
          <span aria-hidden style={{ width: 32, height: 1, background: "var(--ink)", display: "block" }} />
          <span className="font-ui" style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{t.name}</span>
          <span className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage)" }}>
            {t.title} · {t.company}
          </span>
        </footer>
      </div>
    </blockquote>
  );
}

export default function Testimonials() {
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
    <section id="testimonios" style={{ background: "var(--linen)" }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "100px 50px" }}>

        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: 40 }}>
          <RevealTitle lines={[{ text: "Lo que dicen" }, { text: "nuestros clientes.", accent: true }]} />
          <p className="font-ui" style={{ fontSize: 11, letterSpacing: "0.11px", textTransform: "uppercase", color: "var(--sage)", fontWeight: 350 }}>
            Clientes — 04
          </p>
        </div>

        <div style={{ borderBottom: "1px solid var(--mist)" }}>
          {TESTIMONIALS.map((t, i) => (
            <Quote key={t.name} t={t} index={i} visible={visible} />
          ))}
        </div>

        {/* Client marquee */}
        <div aria-hidden style={{ marginTop: 70, opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 600ms" }}>
          <p className="font-ui" style={{ fontSize: 11, letterSpacing: "0.11px", textTransform: "uppercase", color: "var(--sage)", marginBottom: 28, fontWeight: 350 }}>
            Marcas que confían en nosotros
          </p>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, zIndex: 1, background: "linear-gradient(90deg, var(--linen), transparent)" }} />
            <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, zIndex: 1, background: "linear-gradient(270deg, var(--linen), transparent)" }} />
            <div className="marquee-track" style={{ display: "flex", gap: 48, width: "max-content" }}>
              {[...CLIENT_TAGS, ...CLIENT_TAGS, ...CLIENT_TAGS].map((tag, i) => (
                <span key={i} className="font-display" style={{ fontSize: "1.6rem", fontWeight: 400, color: "var(--mist)", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
