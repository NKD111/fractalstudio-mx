"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    /* Animate progress 0→100 in ~1.1s */
    const DURATION = 1100;
    let start: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(((ts - start) / DURATION) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(step);
      } else {
        /* Brief hold then slide out */
        setTimeout(() => {
          setPhase("out");
          setTimeout(() => setPhase("done"), 650);
        }, 80);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      role="presentation"
      style={{
        position:   "fixed",
        inset:      0,
        background: "#080808",
        zIndex:     99990,
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform:  phase === "out" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform",
      }}
    >
      {/* Logo mark */}
      <div style={{
        width:          64,
        height:         64,
        border:         "1px solid rgba(59,234,59,0.25)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        marginBottom:   28,
        boxShadow:      `0 0 ${Math.round(progress * 0.3)}px rgba(59,234,59,0.15)`,
        transition:     "box-shadow 100ms",
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="4" y="4" width="24" height="24" stroke="#3BEA3B" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M11 11 L11 21 M11 11 L19 11 M11 16 L17 16"
            stroke="#3BEA3B" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{
        width:      180,
        height:     1,
        background: "rgba(255,255,255,0.06)",
        position:   "relative",
        overflow:   "hidden",
      }}>
        <div style={{
          position:   "absolute",
          left:       0,
          top:        0,
          height:     "100%",
          width:      `${progress}%`,
          background: "#3BEA3B",
          boxShadow:  "0 0 8px rgba(59,234,59,0.6)",
        }} />
      </div>

      {/* Label */}
      <p style={{
        fontFamily:    "var(--font-jetbrains-mono, monospace)",
        fontSize:      "0.54rem",
        letterSpacing: "0.22em",
        color:         "rgba(245,245,245,0.2)",
        textTransform: "uppercase",
        marginTop:     16,
      }}>
        FRACTAL STUDIO MX
      </p>
    </div>
  );
}
