"use client";

/* ────────────────────────────────────────────────────────────────────────────
   CLIENTES — banda de logos reales en marquesina infinita.
   Todos en blanco monocromo y a la misma altura óptica: así se leen como una
   lista de credenciales y no como una fiesta de colores ajenos peleándose.
   Los logos van al 45% de opacidad y suben a 100% al pasar el cursor — la marca
   del cliente nunca compite con la de Fractal, pero se deja examinar.
   ──────────────────────────────────────────────────────────────────────────── */

const CLIENTES = [
  { id: "apapacho",   nombre: "Simple Apapacho",   w: 75  },
  { id: "toowell",    nombre: "TooWell Studio",     w: 223 },
  { id: "hb",         nombre: "HB Ingeniería",      w: 404 },
  { id: "uribe",      nombre: "Uribe Ingenieros",   w: 199 },
  { id: "barrita",    nombre: "Barrita de Mar",     w: 119 },
  { id: "argentalia", nombre: "Argentalia",         w: 178 },
  { id: "profusa",    nombre: "Profusa",            w: 261 },
  { id: "gce",        nombre: "Grupo GCE",          w: 209 },
  { id: "kuri",       nombre: "Kuri Ortodoncia",    w: 98  },
  { id: "brujula",    nombre: "Brújula de Milagros", w: 245 },
];

function Fila({ duplicado = false }: { duplicado?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={duplicado}>
      {CLIENTES.map((c) => (
        <div key={c.id} className="mx-9 flex shrink-0 items-center md:mx-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/clientes/${c.id}.png`}
            alt={duplicado ? "" : c.nombre}
            width={c.w}
            height={96}
            loading="lazy"
            decoding="async"
            className="h-7 w-auto opacity-45 transition-opacity duration-300 hover:opacity-100 md:h-9"
          />
        </div>
      ))}
    </div>
  );
}

export default function Clientes() {
  return (
    <section
      aria-label="Marcas con las que hemos trabajado"
      className="relative overflow-hidden border-y py-14 md:py-20"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#080808" }}
    >
      <div className="mx-auto mb-10 max-w-7xl px-6 md:px-12">
        <div className="flex items-center gap-3">
          <span className="block h-px w-5 bg-[#C3DD2E] opacity-50" />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: "rgba(195,221,46,0.45)" }}
          >
            Marcas que ya confiaron
          </span>
        </div>
      </div>

      <div className="marquee-clientes flex w-max">
        <Fila />
        <Fila duplicado />
      </div>

      {/* Desvanecido en los extremos: la banda se siente infinita, no cortada. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40"
        style={{ background: "linear-gradient(90deg,#080808,transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
        style={{ background: "linear-gradient(270deg,#080808,transparent)" }}
      />

      <style jsx global>{`
        @keyframes correClientes {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-clientes {
          animation: correClientes 46s linear infinite;
          will-change: transform;
        }
        .marquee-clientes:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-clientes { animation: none; }
        }
      `}</style>
    </section>
  );
}
