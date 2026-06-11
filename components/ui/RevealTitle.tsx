"use client";

import { useEffect, useRef, useState } from "react";

/* ── Section title reveal — cada línea sube desde su máscara con stagger ──
   Mantiene el markup/estética de los h2 existentes; solo añade la entrada. */

export interface RevealLine {
  text:    string;
  accent?: boolean; // verde #3BEA3B
}

export default function RevealTitle({
  lines,
  fontSize = "clamp(2.5rem, 6vw, 5rem)",
  as: Tag = "h2",
}: {
  lines: RevealLine[];
  fontSize?: string;
  as?: "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVis(true); return; }

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className="font-headline font-extrabold leading-[0.88] tracking-[-0.03em]"
      style={{ fontSize }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="block"
          style={{ overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <span
            className="block"
            style={{
              color:      line.accent ? "#3BEA3B" : "#F5F5F5",
              transform:  vis ? "translateY(0) skewY(0deg)" : "translateY(105%) skewY(2.5deg)",
              transition: `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${i * 110}ms`,
              willChange: "transform",
            }}
          >
            {line.text}
          </span>
        </span>
      ))}
    </Tag>
  );
}
