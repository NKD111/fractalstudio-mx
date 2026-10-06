"use client";

import { useEffect, useRef } from "react";

/* ── Hero ─────────────────────────────────────────────────────────────────────
   2026-10-05 (NKD): el hero es el video de motion graphics de Fractal, limpio:
   sin texto encima, sin velos, sin audio. El video ya trae la marca, los servicios
   y el llamado a la acción; cualquier capa encima le restaría.

   - Escritorio: 16:9 (hero-fractal.mp4, 8 MB). Celular: 9:16 (hero-fractal-m.mp4, 2.8 MB).
   - object-contain sobre obsidiana #080808: el fondo del video es el mismo color,
     así que nunca se recorta un título y las franjas sobrantes no se notan.
   - El titular real queda para buscadores y lectores de pantalla (sr-only).
   - Si el navegador bloquea el autoplay, se reintenta al primer toque/scroll. */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => { v.play().catch(() => {}); };
    play();
    window.addEventListener("touchstart", play, { once: true, passive: true });
    window.addEventListener("scroll", play, { once: true, passive: true });
    return () => {
      window.removeEventListener("touchstart", play);
      window.removeEventListener("scroll", play);
    };
  }, []);

  return (
    <section
      id="inicio"
      aria-label="Inicio"
      className="relative w-full h-dvh overflow-hidden bg-[#080808]"
    >
      <h1 className="sr-only">
        Fractal Studio MX — estudio creativo en CDMX: fotografía, video, diseño, branding, sitios web e inteligencia artificial.
      </h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/reel/hero-fractal-poster.jpg"
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain"
      >
        <source src="/reel/hero-fractal-m.mp4" media="(max-width: 760px) and (orientation: portrait)" type="video/mp4" />
        <source src="/reel/hero-fractal.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
