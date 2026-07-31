"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   DECODED — el texto se resuelve carácter por carácter desde ruido.
   No es el efecto "hacker" de siempre: el ruido usa el mismo alfabeto de la
   marca (mayúsculas y dígitos, sin símbolos) y cada letra se ancla en cuanto
   llega a su valor, así que el titular ya se lee desde el primer tercio.

   Blindajes que importan:
   · Arranca con el TEXTO REAL. Si el JavaScript falla o nunca corre, el
     titular igual se lee. Nunca hay un hero en blanco.
   · El avance se calcula por RELOJ, no por número de cuadros. Los navegadores
     estrangulan los temporizadores en pestañas de fondo; con tiempo real, al
     volver a la pestaña el texto aparece resuelto en vez de quedarse trabado.
   · Tope duro de duración: pase lo que pase, termina.
   ──────────────────────────────────────────────────────────────────────────── */

const RUIDO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function Decoded({
  texto,
  className = "",
  style = {},
  retraso = 0,
  duracion = 900,
  color,
}: {
  texto: string;
  className?: string;
  style?: React.CSSProperties;
  retraso?: number;
  duracion?: number;
  color?: string;
}) {
  const [salida, setSalida] = useState(texto);
  const [listo, setListo] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = texto.split("");
    const t0 = performance.now() + retraso;
    setListo(false);

    const paso = (ahora: number) => {
      const t = (ahora - t0) / duracion;
      if (t >= 1) {
        setSalida(texto);
        setListo(true);
        return;
      }
      if (t >= 0) {
        // Cada carácter se resuelve escalonado de izquierda a derecha.
        setSalida(
          chars
            .map((c, i) => {
              if (c === " ") return " ";
              const umbral = (i + 1) / (chars.length + 1);
              return t >= umbral ? c : RUIDO[Math.floor(Math.random() * RUIDO.length)];
            })
            .join("")
        );
      }
      raf.current = requestAnimationFrame(paso);
    };
    raf.current = requestAnimationFrame(paso);

    // Red de seguridad: si el navegador estranguló todo, se resuelve igual.
    const tope = setTimeout(() => {
      setSalida(texto);
      setListo(true);
      if (raf.current) cancelAnimationFrame(raf.current);
    }, retraso + duracion + 1200);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      clearTimeout(tope);
    };
  }, [texto, retraso, duracion]);

  return (
    <span
      className={className}
      style={{
        display: "block",
        whiteSpace: "nowrap",
        color: color || "inherit",
        // El ruido va apagado y el texto resuelto entra en foco: refuerza la lectura.
        opacity: listo ? 1 : 0.68,
        transition: "opacity 420ms cubic-bezier(0.2,0,0,1)",
        ...style,
      }}
      aria-hidden
    >
      {salida}
    </span>
  );
}
