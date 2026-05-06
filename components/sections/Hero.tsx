"use client";

import { useEffect, useState } from "react";

const WA_LINK =
  "https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Fractal%20Studio%20MX.";

const STATS = [
  { num: "+120", label: "Proyectos entregados" },
  { num: "+50",  label: "Clientes satisfechos"  },
  { num: "5+",   label: "Años de experiencia"   },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const enter = (delay: number) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section
      id="inicio"
      aria-label="Inicio"
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-[#080808]"
    >
      {/* ── Grid background ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.028,
          backgroundImage:
            "linear-gradient(rgba(59,234,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,234,59,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Radial glow ── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "40%", left: "20%",
          width: "55vw", height: "55vw",
          maxWidth: 720,
          borderRadius: "50%",
          transform: "translate(-30%, -50%)",
          background: "radial-gradient(ellipse, rgba(59,234,59,0.07) 0%, transparent 68%)",
        }}
      />

      {/* ── Scan line ── */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 pointer-events-none z-10"
        style={{
          width: 2,
          background: "linear-gradient(to bottom, transparent 0%, rgba(59,234,59,0.85) 35%, #3BEA3B 50%, rgba(59,234,59,0.85) 65%, transparent 100%)",
          boxShadow: "0 0 18px #3BEA3B, 0 0 50px rgba(59,234,59,0.25)",
          animation: "scanLine 4.5s ease-in-out infinite",
        }}
      />

      <div className="relative z-1 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* HUD label */}
        <div className="flex items-center gap-3 mb-8" style={enter(0)}>
          <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.45)" }}
          >
            CDMX // ESTUDIO CREATIVO
          </span>
        </div>

        {/* Headline */}
        <div style={enter(140)}>
          <h1
            className="font-headline font-extrabold leading-[0.87] tracking-[-0.04em] mb-8"
            style={{ fontSize: "clamp(3.8rem, 13vw, 11rem)" }}
          >
            <span className="block text-[#F5F5F5]">FRACTAL</span>
            <span className="block text-[#F5F5F5]">STUDIO</span>
            <span
              className="block text-[#3BEA3B]"
              style={{ textShadow: "0 0 100px rgba(59,234,59,0.28)" }}
            >
              MX.
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div style={enter(300)}>
          <p
            className="font-mono uppercase mb-6"
            style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.35)" }}
          >
            Diseño&nbsp;&nbsp;·&nbsp;&nbsp;Fotografía&nbsp;&nbsp;·&nbsp;&nbsp;Video&nbsp;&nbsp;·&nbsp;&nbsp;Branding
          </p>
          <p
            className="font-body leading-relaxed max-w-md"
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "#777" }}
          >
            Creamos experiencias visuales que conectan marcas con personas.
            Desde la conceptualización hasta la entrega final.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mt-10" style={enter(460)}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono font-semibold transition-all duration-200 active:scale-95"
            style={{
              background:    "#3BEA3B",
              color:         "#080808",
              padding:       "0.85rem 1.8rem",
              fontSize:      "0.72rem",
              letterSpacing: "0.12em",
              boxShadow:     "0 4px 24px rgba(59,234,59,0.25)",
            }}
            aria-label="Iniciar conversación en WhatsApp"
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 40px rgba(59,234,59,0.45)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(59,234,59,0.25)")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.117 1.528 5.845L.057 23.667a.5.5 0 00.61.61l5.822-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.697-.504-5.238-1.384l-.376-.215-3.893.984.984-3.893-.215-.376A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            INICIAR PROYECTO
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center gap-2 font-mono transition-all duration-200"
            style={{
              border:        "1px solid rgba(59,234,59,0.28)",
              color:         "rgba(59,234,59,0.75)",
              padding:       "0.85rem 1.8rem",
              fontSize:      "0.72rem",
              letterSpacing: "0.12em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,234,59,0.6)"; e.currentTarget.style.color = "#3BEA3B"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(59,234,59,0.28)"; e.currentTarget.style.color = "rgba(59,234,59,0.75)"; }}
          >
            VER SERVICIOS →
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-10 mt-16 pt-8"
          style={{ ...enter(600), borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-headline font-bold text-[#F5F5F5]" style={{ fontSize: "1.6rem" }}>
                {s.num}
              </div>
              <div
                className="font-mono uppercase mt-1"
                style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#555" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden>
        <span className="font-mono" style={{ fontSize: "0.52rem", letterSpacing: "0.2em", color: "rgba(245,245,245,0.18)", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(59,234,59,0.35), transparent)" }} />
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { left: -4px;              opacity: 0; }
          5%   {                          opacity: 1; }
          95%  {                          opacity: 0.5; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
