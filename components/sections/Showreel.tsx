"use client";

import { useEffect, useRef, useState } from "react";
import CrucesLima from "@/components/ui/CrucesLima";

/* ────────────────────────────────────────────────────────────────────────────
   SHOWREEL — franja de cierre, a sangre completa, antes del footer.
   Es trabajo REAL de clientes en loop infinito, no un render de archivo. Ese es
   justamente el argumento: el sitio no dice que sabemos hacer video, lo enseña.

   Carga diferida por requestIdleCallback y reproducción atada a visibilidad:
   el video no le cuesta nada a quien nunca llega hasta abajo.
   ──────────────────────────────────────────────────────────────────────────── */

const WA =
  "https://wa.me/525562123864?text=Hola%2C%20vi%20su%20trabajo%20en%20el%20sitio%20y%20me%20interesa%20platicar%20un%20proyecto.";

export default function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [cargar, setCargar] = useState(false);

  /* Se pide el video cuando el navegador está ocioso, nunca durante la carga inicial. */
  useEffect(() => {
    const pedir =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ||
      ((cb: () => void) => window.setTimeout(cb, 1800));
    const id = pedir(() => setCargar(true));
    return () => {
      if (typeof id === "number") clearTimeout(id);
    };
  }, []);

  /* Reproduce solo cuando la franja está a la vista. */
  useEffect(() => {
    if (!cargar || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const v = vid.current;
        if (!v) return;
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [cargar]);

  return (
    <section
      ref={ref}
      aria-label="Nuestro trabajo en movimiento"
      className="relative isolate overflow-hidden"
      style={{ background: "#080808" }}
    >
      <div className="relative h-[62svh] min-h-[420px] w-full md:h-[78svh]">
        {cargar ? (
          <video
            ref={vid}
            muted
            loop
            playsInline
            preload="none"
            poster="/reel/poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.62 }}
          >
            <source src="/reel/reel-m.mp4" media="(max-width: 760px)" type="video/mp4" />
            <source src="/reel/reel.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/reel/poster.jpg)", opacity: 0.5 }}
          />
        )}

        {/* Velo: deja respirar la imagen al centro y ancla el texto abajo. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.35) 34%, rgba(8,8,8,0.55) 66%, #080808 100%)",
          }}
        />

        <CrucesLima densidad={0.5} />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 md:px-12 md:pb-20">
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-px w-5 bg-[#C3DD2E] opacity-50" />
            <span
              className="font-mono uppercase"
              style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: "rgba(195,221,46,0.45)" }}
            >
              Trabajo real · sin plantillas
            </span>
          </div>

          <h2
            className="font-headline font-extrabold leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,6vw,5rem)" }}
          >
            ESTO ES LO QUE
            <br />
            <span style={{ color: "#C3DD2E" }}>ENTREGAMOS.</span>
          </h2>

          <p className="mt-6 max-w-lg font-body leading-relaxed" style={{ color: "#999" }}>
            Cada cuadro de este montaje salió de un proyecto que ya está en línea.
            Ninguno es material de archivo.
          </p>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex w-fit items-center gap-3 font-mono font-semibold transition-all active:scale-95"
            style={{
              background: "#C3DD2E",
              color: "#080808",
              padding: "0.85rem 1.8rem",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              boxShadow: "0 4px 24px rgba(195,221,46,0.25)",
            }}
          >
            QUIERO EL MÍO →
          </a>
        </div>
      </div>
    </section>
  );
}
