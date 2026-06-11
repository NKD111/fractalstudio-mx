"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Only on pointer-fine devices (desktop) */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let hovering = false;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    /* Attach hover detection to all interactive elements */
    const onIn  = () => { hovering = true;  };
    const onOut = () => { hovering = false; };

    const bindAll = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label")
        .forEach((el) => {
          el.addEventListener("mouseenter", onIn,  { passive: true });
          el.addEventListener("mouseleave", onOut, { passive: true });
        });
    };

    bindAll();
    const bindInterval = setInterval(bindAll, 3000);

    const tick = () => {
      /* Dot — instant */
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;

      /* Ring — lerp */
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      const size = hovering ? 52 : 32;
      ring.style.width  = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate(${rx - size / 2}px,${ry - size / 2}px)`;
      ring.style.borderColor = hovering
        ? "#C3DD2E"
        : "rgba(245,245,245,0.35)";
      ring.style.background = hovering
        ? "rgba(195,221,46,0.06)"
        : "transparent";

      raf = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("custom-cursor-active");
    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearInterval(bindInterval);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         8,
          height:        8,
          borderRadius:  "50%",
          background:    "#C3DD2E",
          pointerEvents: "none",
          zIndex:        99999,
          mixBlendMode:  "difference",
          willChange:    "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         32,
          height:        32,
          borderRadius:  "50%",
          border:        "1px solid rgba(245,245,245,0.35)",
          pointerEvents: "none",
          zIndex:        99998,
          willChange:    "transform",
          transition:    "width 220ms ease, height 220ms ease, border-color 220ms ease, background 220ms ease",
        }}
      />
    </>
  );
}
