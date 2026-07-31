"use client";

import { useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   CRUCES — marcas de registro girando, en lima.
   Referencia deliberada: las cruces de registro de imprenta y las marcas de
   encuadre de un visor de cámara. Es un guiño al oficio (imprenta + foto +
   video), no decoración al azar. Van sueltas en el fondo, nunca sobre texto.
   ──────────────────────────────────────────────────────────────────────────── */

type Cruz = {
  x: number;      // % del ancho
  y: number;      // % del alto
  tam: number;    // px
  giro: number;   // segundos por vuelta
  op: number;
  sentido: 1 | -1;
  deriva: number; // segundos del flote vertical
};

const CRUCES: Cruz[] = [
  { x: 8,  y: 18, tam: 26, giro: 34, op: 0.30, sentido:  1, deriva: 17 },
  { x: 92, y: 26, tam: 16, giro: 22, op: 0.20, sentido: -1, deriva: 13 },
  { x: 78, y: 72, tam: 34, giro: 46, op: 0.24, sentido:  1, deriva: 21 },
  { x: 16, y: 82, tam: 20, giro: 28, op: 0.18, sentido: -1, deriva: 15 },
  { x: 50, y: 8,  tam: 13, giro: 19, op: 0.14, sentido:  1, deriva: 11 },
  { x: 34, y: 55, tam: 11, giro: 25, op: 0.12, sentido: -1, deriva: 19 },
];

export default function CrucesLima({ densidad = 1 }: { densidad?: number }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const lista = CRUCES.slice(0, Math.max(1, Math.round(CRUCES.length * densidad)));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {lista.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.tam,
            height: c.tam,
            marginLeft: -c.tam / 2,
            marginTop: -c.tam / 2,
            opacity: c.op,
            willChange: reduce ? undefined : "transform",
            animation: reduce
              ? undefined
              : `cruzFlota ${c.deriva}s ease-in-out ${-i * 2}s infinite`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            style={{
              animation: reduce
                ? undefined
                : `cruzGira ${c.giro}s linear ${-i * 3}s infinite ${c.sentido === -1 ? "reverse" : "normal"}`,
            }}
          >
            <path
              d="M12 1v22M1 12h22"
              stroke="#C3DD2E"
              strokeWidth="1.1"
              strokeLinecap="square"
              fill="none"
            />
            <circle cx="12" cy="12" r="5.5" stroke="#C3DD2E" strokeWidth="0.85" fill="none" opacity="0.55" />
          </svg>
        </div>
      ))}

      <style jsx global>{`
        @keyframes cruzGira {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes cruzFlota {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}
