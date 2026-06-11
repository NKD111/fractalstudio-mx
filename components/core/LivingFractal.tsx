"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   LIVING FRACTAL — entidad generativa persistente.
   Canvas fijo que acompaña el scroll: muta de forma, posición, escala y
   opacidad según la sección visible. Verde #C3DD2E sobre obsidiana.
   ─ knot      → hero       (trefoil orbitando, grande, respira)
   ─ aperture  → servicios  (anillos contra-rotando, tipo lente)
   ─ spiral    → portafolio (espiral en expansión)
   ─ stream    → proceso    (río vertical de partículas)
   ─ wave      → testimonios(onda horizontal serena)
   ─ pulse     → contacto   (núcleo condensado pulsante)
   ═══════════════════════════════════════════════════════════════════════════ */

type Shape = "knot" | "aperture" | "spiral" | "stream" | "wave" | "pulse";

interface SectionState {
  id:      string;
  shape:   Shape;
  x:       number;  // anchor en fracción de viewport
  y:       number;
  scale:   number;  // fracción de min(W,H)
  opacity: number;
  spin:    number;  // velocidad angular global
}

const STATES: SectionState[] = [
  { id: "inicio",      shape: "knot",     x: 0.74, y: 0.50, scale: 0.46, opacity: 0.50, spin: 0.10 },
  { id: "servicios",   shape: "aperture", x: 0.88, y: 0.42, scale: 0.22, opacity: 0.30, spin: 0.22 },
  { id: "portafolio",  shape: "spiral",   x: 0.10, y: 0.52, scale: 0.24, opacity: 0.26, spin: 0.16 },
  { id: "proceso",     shape: "stream",   x: 0.87, y: 0.50, scale: 0.26, opacity: 0.28, spin: 0.08 },
  { id: "testimonios", shape: "wave",     x: 0.12, y: 0.40, scale: 0.20, opacity: 0.22, spin: 0.12 },
  { id: "contacto",    shape: "pulse",    x: 0.50, y: 0.34, scale: 0.30, opacity: 0.32, spin: 0.14 },
];

const SHAPE_IDX: Record<Shape, number> = {
  knot: 0, aperture: 1, spiral: 2, stream: 3, wave: 4, pulse: 5,
};

/* Posición de una partícula (param p ∈ [0,1)) en cada forma, espacio unitario */
function shapePoint(shape: number, p: number, T: number, out: { x: number; y: number }) {
  switch (shape) {
    case 0: { // knot — trefoil 2D
      const a = p * Math.PI * 2 + T * 0.05;
      out.x = (Math.sin(a) + 0.62 * Math.sin(2 * a + T * 0.33)) / 1.62;
      out.y = (Math.cos(a) - 0.62 * Math.cos(2 * a - T * 0.27)) / 1.62;
      break;
    }
    case 1: { // aperture — dos anillos contra-rotando
      const inner = p < 0.5;
      const q     = inner ? p * 2 : (p - 0.5) * 2;
      const r     = inner
        ? 0.52 + 0.05 * Math.sin(T * 1.1 + q * Math.PI * 4)
        : 0.88 + 0.04 * Math.sin(T * 0.9 - q * Math.PI * 4);
      const ang = q * Math.PI * 2 + (inner ? T * 0.5 : -T * 0.35);
      out.x = Math.cos(ang) * r;
      out.y = Math.sin(ang) * r;
      break;
    }
    case 2: { // spiral
      const r   = 0.14 + 0.86 * p;
      const ang = p * Math.PI * 5 + T * 0.4;
      out.x = Math.cos(ang) * r;
      out.y = Math.sin(ang) * r;
      break;
    }
    case 3: { // stream — flujo vertical
      const flow = (p * 1.9 + T * 0.07) % 1.9;
      out.y = flow - 0.95;
      out.x = 0.34 * Math.sin(p * 23 + T * 0.8 + out.y * 2.4)
            + 0.10 * Math.sin(p * 71 + T * 1.4);
      break;
    }
    case 4: { // wave
      out.x = (p * 2 - 1) * 1.05;
      out.y = 0.30 * Math.sin(p * Math.PI * 6 + T * 0.9)
            + 0.10 * Math.sin(p * 29 + T * 1.5);
      break;
    }
    default: { // pulse — núcleo respirando
      const ang = p * Math.PI * 2 + T * 0.18;
      const r   = 0.50 + 0.13 * Math.sin(T * 1.7 + p * Math.PI * 6);
      out.x = Math.cos(ang) * r;
      out.y = Math.sin(ang) * r;
    }
  }
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function LivingFractal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, mobile = false;
    let raf = 0;
    let running = true;

    /* Partículas: posición actual (easing hacia target) + fase de twinkle */
    let N = 150;
    let px: Float32Array, py: Float32Array, params: Float32Array, tw: Float32Array;

    const initParticles = () => {
      N = mobile ? 70 : 150;
      px = new Float32Array(N);
      py = new Float32Array(N);
      params = new Float32Array(N);
      tw = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        params[i] = i / N;
        tw[i] = (i * 0.61803398875) % 1; // golden ratio — twinkle desfasado
        px[i] = 0; py[i] = 0;
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = window.innerWidth;
      H = window.innerHeight;
      mobile = W < 768;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };
    resize();

    /* Offsets de secciones (recalculados en resize/scroll perezoso) */
    let bounds: { top: number; height: number }[] = [];
    const measure = () => {
      bounds = STATES.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { top: 0, height: 1 };
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      });
    };
    measure();

    /* Mouse parallax sutil (solo desktop) */
    let mx = 0, my = 0, smx = 0, smy = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / W - 0.5) * 26;
      my = (e.clientY / H - 0.5) * 18;
    };
    if (!mobile) window.addEventListener("mousemove", onMouse, { passive: true });

    /* Estado interpolado según el centro del viewport */
    const cur = { x: 0.74, y: 0.5, scale: 0.46, opacity: 0, spin: 0.1, shapeA: 0, shapeB: 0, mix: 0 };

    const computeTarget = () => {
      const focus = window.scrollY + H * 0.5;
      let i = 0;
      for (let k = 0; k < bounds.length; k++) {
        if (focus >= bounds[k].top) i = k;
      }
      const b = bounds[i];
      const u = Math.min(Math.max((focus - b.top) / b.height, 0), 1);

      const A = STATES[i];
      const isLast = i === STATES.length - 1;
      const B = isLast ? A : STATES[i + 1];

      /* Blend solo en el último 30% de la sección */
      let t = 0;
      if (!isLast && u > 0.7) t = smoothstep((u - 0.7) / 0.3);

      return { A, B, t };
    };

    const target = { x: 0.74, y: 0.5, scale: 0.46, opacity: 0.5, spin: 0.1, shapeA: 0, shapeB: 0, mix: 0 };

    const pA = { x: 0, y: 0 };
    const pB = { x: 0, y: 0 };

    let T = 0;
    let last = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      T += dt;

      const { A, B, t } = computeTarget();

      target.x       = lerp(A.x, B.x, t);
      target.y       = lerp(A.y, B.y, t);
      target.scale   = lerp(A.scale, B.scale, t);
      target.opacity = lerp(A.opacity, B.opacity, t) * (mobile ? 0.55 : 1);
      target.spin    = lerp(A.spin, B.spin, t);
      target.shapeA  = SHAPE_IDX[A.shape];
      target.shapeB  = SHAPE_IDX[B.shape];
      target.mix     = t;

      /* easing global del estado */
      cur.x       += (target.x       - cur.x)       * 0.055;
      cur.y       += (target.y       - cur.y)       * 0.055;
      cur.scale   += (target.scale   - cur.scale)   * 0.055;
      cur.opacity += (target.opacity - cur.opacity) * 0.07;
      cur.spin    += (target.spin    - cur.spin)    * 0.05;
      cur.shapeA   = target.shapeA;
      cur.shapeB   = target.shapeB;
      cur.mix     += (target.mix     - cur.mix)     * 0.09;

      smx += (mx - smx) * 0.04;
      smy += (my - smy) * 0.04;

      const cx = cur.x * W + smx;
      const cy = cur.y * H + smy;
      const R  = cur.scale * Math.min(W, H);
      const spinT = T * (0.6 + cur.spin * 4);

      ctx.clearRect(0, 0, W, H);
      if (cur.opacity < 0.01) { raf = requestAnimationFrame(frame); return; }

      ctx.globalCompositeOperation = "lighter";

      /* targets de partículas + easing individual → morphs orgánicos */
      const mixOn = cur.mix > 0.004 && cur.shapeA !== cur.shapeB;
      for (let i = 0; i < N; i++) {
        const p = params[i];
        shapePoint(cur.shapeA, p, spinT, pA);
        let tx = pA.x, ty = pA.y;
        if (mixOn) {
          shapePoint(cur.shapeB, p, spinT, pB);
          tx = lerp(pA.x, pB.x, cur.mix);
          ty = lerp(pA.y, pB.y, cur.mix);
        }
        px[i] += (tx - px[i]) * 0.085;
        py[i] += (ty - py[i]) * 0.085;
      }

      /* trazo continuo a través de la curva */
      ctx.beginPath();
      ctx.moveTo(cx + px[0] * R, cy + py[0] * R);
      for (let i = 1; i < N; i++) {
        ctx.lineTo(cx + px[i] * R, cy + py[i] * R);
      }
      ctx.strokeStyle = `rgba(195,221,46,${0.10 * cur.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      /* partículas con twinkle */
      for (let i = 0; i < N; i++) {
        const x = cx + px[i] * R;
        const y = cy + py[i] * R;
        const tk = 0.45 + 0.55 * Math.sin(T * 2.2 + tw[i] * Math.PI * 2) ** 2;
        const a  = cur.opacity * tk;
        const sz = i % 9 === 0 ? 2.1 : 1.25;

        ctx.beginPath();
        ctx.arc(x, y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(195,221,46,${a})`;
        ctx.fill();

        /* halo en una fracción de partículas */
        if (i % 13 === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(195,221,46,${a * 0.14})`;
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    /* prefers-reduced-motion: un solo frame estático del knot, tenue */
    if (reduced) {
      const cx = 0.74 * W, cy = 0.5 * H, R = 0.42 * Math.min(W, H);
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      const pt = { x: 0, y: 0 };
      for (let i = 0; i <= 140; i++) {
        shapePoint(0, i / 140, 0, pt);
        const x = cx + pt.x * R, y = cy + pt.y * R;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(195,221,46,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
      return;
    }

    raf = requestAnimationFrame(frame);

    const onResize = () => { resize(); measure(); };
    const onVis = () => {
      cancelAnimationFrame(raf); // evita loops duplicados al reanudar
      running = !document.hidden;
      if (running) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    /* re-medición perezosa: layout cambia con fuentes/imágenes */
    const remeasure = setInterval(measure, 2500);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearInterval(remeasure);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        2,
        pointerEvents: "none",
      }}
    />
  );
}
