"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    /* Animate progress 0→100 in ~380ms — fast enough for elite feel, LCP-friendly */
    const DURATION = 380;
    let start: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(((ts - start) / DURATION) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(step);
      } else {
        /* Minimal hold then slide out */
        setTimeout(() => {
          setPhase("out");
          setTimeout(() => setPhase("done"), 360);
        }, 30);
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
        transition: "transform 0.36s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform",
      }}
    >
      {/* Logo mark */}
      <div style={{
        width:       64,
        height:      64,
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
        marginBottom: 28,
        boxShadow:   `0 0 ${Math.round(progress * 0.5)}px rgba(59,234,59,0.22)`,
        transition:  "box-shadow 100ms",
      }}>
        <svg width="64" height="64" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="1.5" y="1.5" width="29" height="29" stroke="#3BEA3B" strokeWidth="0.75" strokeOpacity="0.3" fill="none"/>
          <polygon points="16,2 30,16 16,30 2,16" stroke="#3BEA3B" strokeWidth="1.2" strokeOpacity="0.7" fill="none"/>
          <rect x="9" y="9" width="14" height="14" stroke="#3BEA3B" strokeWidth="1" strokeOpacity="0.55" fill="none"/>
          <rect x="13.5" y="13.5" width="5" height="5" fill="#3BEA3B"/>
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
