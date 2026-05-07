"use client";

import { useEffect, useRef, useState } from "react";

/* ── Magnetic Button wrapper ──────────────────────────────────────────────── */
function Magnetic({
  children,
  strength = 0.28,
  className = "",
  style = {},
  ...rest
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  [k: string]: unknown;
}) {
  const el = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = el.current!.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * strength;
    const y = (e.clientY - r.top  - r.height / 2) * strength;
    el.current!.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => {
    if (el.current) el.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={el}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 400ms cubic-bezier(0.2,0,0,1)", display: "inline-flex", ...style }}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  );
}

/* ── Split-text character reveal ──────────────────────────────────────────── */
function SplitWord({
  word,
  color,
  baseDelay,
}: {
  word: string;
  color?: string;
  baseDelay: number;
}) {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className="block"
      style={{ color: color || "#F5F5F5", overflow: "hidden", whiteSpace: "nowrap" }}
      aria-hidden
    >
      {word.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display:    "inline-block",
            opacity:    vis ? 1 : 0,
            transform:  vis ? "translateY(0)" : "translateY(110%)",
            transition: `opacity 0.5s ease ${baseDelay + i * 28}ms, transform 0.65s cubic-bezier(0.2,0,0,1) ${baseDelay + i * 28}ms`,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/* ── Animated counter ─────────────────────────────────────────────────────── */
function Counter({
  target,
  prefix = "",
  suffix = "",
  active,
  duration = 1600,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return (
    <span>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ── WA Link ──────────────────────────────────────────────────────────────── */
const WA_LINK =
  "https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Fractal%20Studio%20MX.";

const STATS = [
  { prefix: "+", target: 120, suffix: "",  label: "Proyectos entregados" },
  { prefix: "+", target: 50,  suffix: "",  label: "Clientes satisfechos"  },
  { prefix: "",  target: 5,   suffix: "+", label: "Años de experiencia"   },
];

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef      = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLDivElement>(null);
  const subtitleRef   = useRef<HTMLDivElement>(null);

  /* Stats counter trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* Parallax on scroll */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (headlineRef.current)
        headlineRef.current.style.transform = `translateY(${y * 0.22}px)`;
      if (subtitleRef.current)
        subtitleRef.current.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Fade-in for non-headline elements */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    ready ? 1 : 0,
    transform:  ready ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section
      id="inicio"
      aria-label="Inicio"
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-[#080808]"
    >
      {/* Grid bg */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        opacity:         0.025,
        backgroundImage: "linear-gradient(rgba(59,234,59,1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,234,59,1) 1px,transparent 1px)",
        backgroundSize:  "64px 64px",
      }} />

      {/* Radial glow */}
      <div aria-hidden className="absolute pointer-events-none" style={{
        top: "40%", left: "20%",
        width: "55vw", height: "55vw", maxWidth: 720,
        borderRadius: "50%",
        transform: "translate(-30%,-50%)",
        background: "radial-gradient(ellipse,rgba(59,234,59,0.07) 0%,transparent 68%)",
      }} />

      {/* Second subtle glow bottom-right */}
      <div aria-hidden className="absolute pointer-events-none" style={{
        bottom: "10%", right: "5%",
        width: "30vw", height: "30vw", maxWidth: 400,
        borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(59,234,59,0.04) 0%,transparent 70%)",
      }} />

      {/* Scan line */}
      <div aria-hidden className="absolute top-0 bottom-0 pointer-events-none z-10" style={{
        width:      2,
        background: "linear-gradient(to bottom,transparent 0%,rgba(59,234,59,0.85) 35%,#3BEA3B 50%,rgba(59,234,59,0.85) 65%,transparent 100%)",
        boxShadow:  "0 0 18px #3BEA3B,0 0 50px rgba(59,234,59,0.25)",
        animation:  "scanLine 4.5s ease-in-out infinite",
      }} />

      <div className="relative z-1 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* HUD label */}
        <div className="flex items-center gap-3 mb-8" style={fade(0)}>
          <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
          <span className="font-mono uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.45)" }}>
            CDMX // ESTUDIO CREATIVO
          </span>
        </div>

        {/* Headline — split text + parallax */}
        <div ref={headlineRef} style={{ willChange: "transform" }}>
          <h1
            className="font-headline font-extrabold leading-[0.87] tracking-[-0.04em] mb-8"
            style={{ fontSize: "clamp(2rem,9vw,8.5rem)" }}
          >
            <span className="sr-only">Fractal Studio MX</span>
            <SplitWord word="FRACTAL" baseDelay={80}  />
            <SplitWord word="STUDIO"  baseDelay={220} />
            <SplitWord word="MX."     baseDelay={360} color="#3BEA3B" />
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} style={{ willChange: "transform" }}>
          <div style={fade(520)}>
            <p className="font-mono uppercase mb-5" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.35)" }}>
              Diseño&nbsp;&nbsp;·&nbsp;&nbsp;Fotografía&nbsp;&nbsp;·&nbsp;&nbsp;Video&nbsp;&nbsp;·&nbsp;&nbsp;Branding
            </p>
            <p className="font-body leading-relaxed max-w-md" style={{ fontSize: "clamp(0.9rem,1.1vw,1.05rem)", color: "#777" }}>
              Creamos experiencias visuales que conectan marcas con personas.
              Desde la conceptualización hasta la entrega final.
            </p>
          </div>
        </div>

        {/* CTAs — magnetic */}
        <div className="flex flex-wrap items-center gap-4 mt-10" style={fade(680)}>
          <Magnetic
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Iniciar conversación en WhatsApp"
            className="items-center gap-3 font-mono font-semibold active:scale-95"
            style={{
              background:    "#3BEA3B",
              color:         "#080808",
              padding:       "0.85rem 1.8rem",
              fontSize:      "0.72rem",
              letterSpacing: "0.12em",
              boxShadow:     "0 4px 24px rgba(59,234,59,0.25)",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 40px rgba(59,234,59,0.5)")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(59,234,59,0.25)")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.117 1.528 5.845L.057 23.667a.5.5 0 00.61.61l5.822-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.697-.504-5.238-1.384l-.376-.215-3.893.984.984-3.893-.215-.376A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            INICIAR PROYECTO
          </Magnetic>

          <Magnetic
            href="#servicios"
            className="items-center gap-2 font-mono"
            style={{
              border:        "1px solid rgba(59,234,59,0.28)",
              color:         "rgba(59,234,59,0.75)",
              padding:       "0.85rem 1.8rem",
              fontSize:      "0.72rem",
              letterSpacing: "0.12em",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,234,59,0.6)";
              (e.currentTarget as HTMLElement).style.color = "#3BEA3B";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,234,59,0.28)";
              (e.currentTarget as HTMLElement).style.color = "rgba(59,234,59,0.75)";
            }}
          >
            VER SERVICIOS →
          </Magnetic>
        </div>

        {/* Stats with counter animation */}
        <div
          ref={statsRef}
          className="flex flex-wrap gap-10 mt-16 pt-8"
          style={{ ...fade(850), borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-headline font-bold text-[#F5F5F5]" style={{ fontSize: "1.7rem" }}>
                <Counter
                  prefix={s.prefix}
                  target={s.target}
                  suffix={s.suffix}
                  active={statsVisible}
                />
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
        <div className="w-px h-8 scroll-line-indicator" style={{
          background: "linear-gradient(to bottom, rgba(59,234,59,0.35), transparent)",
        }} />
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { left: -4px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.5; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
