"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   SONIDO — sintetizado con Web Audio, cero archivos que descargar.
   Decisiones deliberadas:
   · Arranca APAGADO. El sonido automático en una web es agresivo y en 2026 los
     navegadores además bloquean el audio hasta que el usuario interactúa.
   · Interruptor visible y persistente (localStorage), no un truco escondido.
   · Los tonos son cortos, secos y graves: mesa de mezclas, no videojuego.
   ──────────────────────────────────────────────────────────────────────────── */

let ctx: AudioContext | null = null;
let activo = false;

function contexto(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Tono corto con envolvente exponencial: nunca chasquea. */
function tono(freq: number, dur: number, vol: number, tipo: OscillatorType = "sine", desliz = 0) {
  const c = contexto();
  if (!c || !activo) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gan = c.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, t);
  if (desliz) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + desliz), t + dur);
  gan.gain.setValueAtTime(0.0001, t);
  gan.gain.exponentialRampToValueAtTime(vol, t + 0.006);
  gan.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gan).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Ruido filtrado: el "tick" mecánico del hover. */
function chasquido(vol = 0.05) {
  const c = contexto();
  if (!c || !activo) return;
  const t = c.currentTime;
  const largo = Math.floor(c.sampleRate * 0.035);
  const buf = c.createBuffer(1, largo, c.sampleRate);
  const datos = buf.getChannelData(0);
  for (let i = 0; i < largo; i++) datos[i] = (Math.random() * 2 - 1) * (1 - i / largo) ** 3;
  const src = c.createBufferSource();
  src.buffer = buf;
  const filtro = c.createBiquadFilter();
  filtro.type = "bandpass";
  filtro.frequency.value = 2400;
  filtro.Q.value = 1.4;
  const gan = c.createGain();
  gan.gain.value = vol;
  src.connect(filtro).connect(gan).connect(c.destination);
  src.start(t);
}

export const sfx = {
  hover:  () => chasquido(0.04),
  click:  () => { tono(320, 0.09, 0.10, "triangle", -110); chasquido(0.05); },
  reveal: () => tono(180, 0.30, 0.045, "sine", 60),
};

export default function Sonido() {
  const [on, setOn] = useState(false);
  const montado = useRef(false);

  useEffect(() => {
    const guardado = localStorage.getItem("fractal-sonido") === "1";
    setOn(guardado);
    activo = guardado;
    montado.current = true;
  }, []);

  useEffect(() => {
    if (!montado.current) return;
    activo = on;
    localStorage.setItem("fractal-sonido", on ? "1" : "0");
    if (on) {
      contexto();
      tono(420, 0.12, 0.07, "sine", 180); // confirmación al encender
    }
  }, [on]);

  /* Se engancha a todo lo interactivo sin tocar cada componente. */
  useEffect(() => {
    const esInteractivo = (t: EventTarget | null) =>
      t instanceof Element && t.closest("a,button,[role=button],input,summary");
    const onOver = (e: Event) => { if (esInteractivo(e.target)) sfx.hover(); };
    const onDown = (e: Event) => { if (esInteractivo(e.target)) sfx.click(); };
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const alternar = useCallback(() => setOn((v) => !v), []);

  return (
    <button
      onClick={alternar}
      aria-pressed={on}
      aria-label={on ? "Desactivar sonido de la interfaz" : "Activar sonido de la interfaz"}
      title={on ? "Sonido activado" : "Sonido desactivado"}
      className="fixed bottom-6 left-6 z-[60] flex h-11 w-11 items-center justify-center transition-colors"
      style={{
        border: `1px solid rgba(195,221,46,${on ? 0.55 : 0.22})`,
        background: on ? "rgba(195,221,46,0.08)" : "rgba(8,8,8,0.65)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Barras de ecualizador: llenas cuando está encendido, planas cuando no. */}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        {[
          { x: 3,  h: on ? 8  : 2 },
          { x: 8,  h: on ? 16 : 2 },
          { x: 13, h: on ? 11 : 2 },
          { x: 18, h: on ? 5  : 2 },
        ].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={12 - b.h / 2}
            width="2.4"
            height={b.h}
            rx="0.4"
            fill="#C3DD2E"
            opacity={on ? 0.95 : 0.42}
            style={{ transition: "all 260ms cubic-bezier(0.2,0,0,1)" }}
          />
        ))}
      </svg>
    </button>
  );
}
