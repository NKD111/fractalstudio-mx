"use client";

import { useState } from "react";

type Hallazgo = { titulo: string; detalle: string };
type Resultado = {
  estado: "ok" | "protegido" | "sin_respuesta";
  dominio: string;
  url?: string;
  titulo?: string;
  plataforma?: string;
  salud?: number;
  carga?: number;
  movil?: boolean;
  bueno?: Hallazgo[];
  oportunidades?: Hallazgo[];
  mensaje?: string;
};

const WA = "525562123864";

function waLink(dom: string, salud?: number) {
  const txt =
    salud !== undefined
      ? `Hola, acabo de analizar ${dom} en su sitio (salud ${salud}/100) y me gustaría platicar sobre las oportunidades que encontraron.`
      : `Hola, intenté analizar ${dom} en su sitio y me gustaría que lo revisaran a mano.`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;
}

function Anillo({ valor }: { valor: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const lleno = (valor / 100) * circ;
  const color = valor >= 70 ? "#C3DD2E" : valor >= 45 ? "#F2C14E" : "#F2705E";
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${lleno} ${circ}`}
          style={{ transition: "stroke-dasharray 1.1s cubic-bezier(.22,1,.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline text-4xl font-extrabold leading-none" style={{ color }}>
          {valor}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">de 100</span>
      </div>
    </div>
  );
}

function Bloque({
  titulo, nota, items, tono,
}: { titulo: string; nota: string; items: Hallazgo[]; tono: "bien" | "opor" }) {
  if (!items.length) return null;
  const acento = tono === "bien" ? "text-brand-green" : "text-white";
  const punto = tono === "bien" ? "bg-brand-green" : "bg-white/35";
  return (
    <section className="mt-10">
      <h3 className={`font-headline text-xl font-bold ${acento}`}>{titulo}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/40">{nota}</p>
      <ul className="mt-5 space-y-4">
        {items.map((h, i) => (
          <li key={i} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${punto}`} />
            <div>
              <p className="font-semibold text-white/90">{h.titulo}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-white/60">{h.detalle}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AnalizadorCliente() {
  const [sitio, setSitio] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [res, setRes] = useState<Resultado | null>(null);

  async function analizar(e: React.FormEvent) {
    e.preventDefault();
    if (!sitio.trim() || cargando) return;
    setCargando(true);
    setError(null);
    setRes(null);
    try {
      const r = await fetch("/api/analiza", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sitio }),
      });
      const data = await r.json();
      if (!r.ok) setError(data.error || "No pudimos completar el análisis.");
      else setRes(data);
    } catch {
      setError("Se interrumpió la conexión. Inténtalo otra vez.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24 md:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green">
        Herramienta gratuita
      </p>
      <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight md:text-6xl">
        ¿Cómo está tu sitio web <span className="text-brand-green">hoy</span>?
      </h1>
      <p className="mt-5 max-w-xl text-white/60">
        Escribe la dirección de tu negocio y te decimos en un minuto qué tienes bien resuelto
        y qué oportunidades hay. Sin registro y sin costo.
      </p>

      <form onSubmit={analizar} className="mt-10 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          value={sitio}
          onChange={(e) => setSitio(e.target.value)}
          placeholder="minegocio.com.mx"
          aria-label="Dirección de tu sitio web"
          className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-4 font-mono text-base text-white placeholder:text-white/30 outline-none transition focus:border-brand-green/70"
        />
        <button
          type="submit"
          disabled={cargando}
          className="rounded-lg bg-brand-green px-8 py-4 font-headline font-bold text-brand-dark transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
        >
          {cargando ? "Analizando…" : "Analizar"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[#F2705E]">{error}</p>}

      {cargando && (
        <p className="mt-8 font-mono text-sm text-white/45">
          Abriendo tu sitio y revisando velocidad, celular, contacto y presentación…
        </p>
      )}

      {res && res.estado !== "ok" && (
        <div className="mt-12 rounded-xl border border-white/12 bg-white/[0.03] p-8">
          <h2 className="font-headline text-2xl font-bold">{res.dominio}</h2>
          <p className="mt-3 leading-relaxed text-white/65">{res.mensaje}</p>
          <a
            href={waLink(res.dominio)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-lg bg-brand-green px-7 py-3.5 font-headline font-bold text-brand-dark transition hover:brightness-110"
          >
            Que lo revisen a mano
          </a>
        </div>
      )}

      {res && res.estado === "ok" && (
        <div className="mt-14">
          <div className="flex flex-col items-start gap-7 rounded-xl border border-white/12 bg-white/[0.03] p-8 sm:flex-row sm:items-center">
            <Anillo valor={res.salud ?? 0} />
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-wider text-white/40">
                Salud del sitio
              </p>
              <h2 className="mt-1 break-words font-headline text-2xl font-bold">{res.dominio}</h2>
              <p className="mt-2 text-sm text-white/55">
                {res.plataforma} · carga en {res.carga}s ·{" "}
                {res.movil ? "se adapta a celular" : "sin versión para celular"}
              </p>
            </div>
          </div>

          <Bloque
            tono="bien"
            titulo="Lo que ya tienes bien"
            nota="Esta base ya está resuelta, que suele ser lo más difícil"
            items={res.bueno ?? []}
          />
          <Bloque
            tono="opor"
            titulo="Oportunidades"
            nota="Lo que hoy se espera de un sitio y a este le falta"
            items={res.oportunidades ?? []}
          />

          <div className="mt-14 rounded-xl border border-brand-green/25 bg-brand-green/[0.06] p-8">
            <h3 className="font-headline text-xl font-bold">¿Te lo dejamos así?</h3>
            <p className="mt-2.5 leading-relaxed text-white/65">
              Podemos preparar una muestra sin costo ni compromiso de cómo se vería tu sitio
              resolviendo estos puntos, sobre tu mismo contenido y tu misma marca.
            </p>
            <a
              href={waLink(res.dominio, res.salud)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-brand-green px-7 py-3.5 font-headline font-bold text-brand-dark transition hover:brightness-110"
            >
              Quiero mi muestra gratis
            </a>
          </div>

          <p className="mt-8 text-xs leading-relaxed text-white/35">
            Este análisis revisa lo que es visible públicamente en tu página de inicio. No sustituye
            una revisión a fondo, pero sí da un panorama honesto de dónde estás parado.
          </p>
        </div>
      )}
    </div>
  );
}
