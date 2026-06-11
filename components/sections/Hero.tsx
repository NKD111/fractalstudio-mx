"use client";

import { useEffect, useRef, useState } from "react";

const WA_LINK =
  "https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Fractal%20Studio%20MX.";

const STATS = [
  { prefix: "+", target: 120, suffix: "", label: "Proyectos entregados" },
  { prefix: "+", target: 50,  suffix: "", label: "Clientes satisfechos" },
  { prefix: "",  target: 5,   suffix: "+", label: "Años de experiencia" },
];

/* Animated counter — easeOutExpo */
function Counter({ target, prefix = "", suffix = "", active, duration = 1700 }: {
  target: number; prefix?: string; suffix?: string; active: boolean; duration?: number;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return <span>{prefix}{val}{suffix}</span>;
}

/* Display line con reveal por máscara */
function Line({ children, delay, italic = false }: { children: React.ReactNode; delay: number; italic?: boolean }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVis(true); return; }
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <span className="block" style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.06em" }}>
      <span
        className="block"
        style={{
          fontStyle:  italic ? "italic" : "normal",
          transform:  vis ? "translateY(0)" : "translateY(106%)",
          transition: `transform 0.95s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    ready ? 1 : 0,
    transform:  ready ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section id="inicio" aria-label="Inicio" className="relative" style={{ background: "var(--linen)" }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "190px 50px 120px" }}>

        {/* Eyebrow */}
        <div className="flex items-center gap-4" style={{ ...fade(0), marginBottom: 50 }}>
          <span aria-hidden style={{ width: 50, height: 2, background: "var(--voltage)", display: "block" }} />
          <span className="font-ui" style={{ fontSize: 11, letterSpacing: "0.11px", textTransform: "uppercase", color: "var(--sage)", fontWeight: 350 }}>
            CDMX — Estudio Creativo · SP—2026
          </span>
        </div>

        {/* Hero display + image tile */}
        <div className="relative">
          <h1 className="font-display" style={{
            color:         "var(--ink)",
            fontWeight:    400,
            fontSize:      "clamp(3.5rem, 13vw, 11.5rem)",
            lineHeight:    0.9,
            letterSpacing: "-0.03em",
            margin:        0,
          }}>
            <span className="sr-only">Fractal Studio MX — Nacimos para crear experiencias visuales</span>
            <span aria-hidden>
              <Line delay={80}>Nacimos</Line>
              <Line delay={200} italic>para crear</Line>
              <Line delay={320}>experiencias</Line>
              <span className="block" style={{ display: "flex", alignItems: "baseline", gap: "0.3em", flexWrap: "wrap" }}>
                <Line delay={440}>visuales.</Line>
              </span>
            </span>
          </h1>

          {/* B&N image tile tucked top-right, overlapping */}
          <div
            aria-hidden
            className="hidden lg:block absolute overflow-hidden editorial-img"
            style={{ top: "1%", right: 0, width: 300, height: 380, borderRadius: 14, ...fade(700) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portfolio/foto-comercial.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <span className="font-arch" style={{
              position: "absolute", left: 14, bottom: 12, fontSize: 16, fontStyle: "italic",
              color: "var(--linen)", textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}>
              Fig. 01 — dirección de arte
            </span>
          </div>
        </div>

        {/* Supporting paragraph + tags */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ marginTop: 60 }}>
          <div className="lg:col-span-6" style={fade(560)}>
            <p className="font-ui" style={{ fontSize: 18, lineHeight: 1.4, letterSpacing: "-0.36px", color: "var(--ink)", maxWidth: "32ch" }}>
              Creamos experiencias visuales que conectan marcas con personas.
              Desde la conceptualización hasta la entrega final.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2" style={{ marginTop: 24 }}>
              {["Diseño", "Fotografía", "Video", "Branding"].map((t) => (
                <span key={t} className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage)", fontWeight: 400 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="lg:col-span-6 flex items-center gap-7 lg:justify-end" style={fade(660)}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="voltage-cta font-ui" aria-label="Iniciar conversación en WhatsApp">
              Iniciar proyecto →
            </a>
            <a href="#servicios" className="font-ui editorial-navlink" style={{ fontSize: 14, fontWeight: 350, color: "var(--ink)", textDecoration: "none" }}>
              Ver servicios
            </a>
          </div>
        </div>

        {/* Stats — serif numerals + small-caps labels */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8" style={{ ...fade(820), marginTop: 120, maxWidth: 720 }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                <Counter prefix={s.prefix} target={s.target} suffix={s.suffix} active={statsVisible} />
              </div>
              <div className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage)", marginTop: 10, fontWeight: 400 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
