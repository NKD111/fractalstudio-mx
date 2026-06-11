"use client";

import { useEffect, useRef, useState } from "react";

/* ── Section title — display serif con reveal por máscara (broadsheet) ──
   Cada línea sube desde su máscara con stagger. Tinta obsidiana; el acento
   lima se reserva para un tick, no para el texto. */

export interface RevealLine {
  text:    string;
  accent?: boolean; // italic + voz literaria para contraste editorial
}

export default function RevealTitle({
  lines,
  fontSize = "clamp(2.75rem, 7vw, 6rem)",
  as: Tag = "h2",
  tick = true,
}: {
  lines: RevealLine[];
  fontSize?: string;
  as?: "h2" | "h3";
  tick?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      {tick && (
        <span
          aria-hidden
          style={{
            display: "block", width: 50, height: 2, background: "var(--voltage)",
            marginBottom: 28,
            transform: vis ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      )}
      <Tag
        ref={ref}
        className="font-display"
        style={{ fontSize, fontWeight: 400, lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0 }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block" style={{ overflow: "hidden", paddingBottom: "0.05em", marginBottom: "-0.05em" }}>
            <span
              className={line.accent ? "font-arch" : undefined}
              style={{
                display:    "block",
                fontStyle:  line.accent ? "italic" : "normal",
                fontWeight: line.accent ? 300 : 400,
                transform:  vis ? "translateY(0)" : "translateY(106%)",
                transition: `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 110}ms`,
                willChange: "transform",
              }}
            >
              {line.text}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
