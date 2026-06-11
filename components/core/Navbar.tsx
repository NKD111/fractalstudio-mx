"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "#servicios",  label: "Servicios"  },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#proceso",    label: "Proceso"    },
  { href: "#contacto",   label: "Contacto"   },
];

const WA_LINK = "https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20iniciar%20un%20proyecto%20con%20Fractal%20Studio%20MX.";

/* Wordmark: 'Fractal' en tinta, 'Studio' en voltage — el split es el logo */
function Wordmark() {
  return (
    <span className="font-ui" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.01em", lineHeight: 1 }}>
      <span style={{ color: "var(--ink)" }}>Fractal</span>
      <span style={{ color: "var(--voltage)" }}>Studio</span>
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className="absolute top-0 left-0 right-0 z-50"
        style={{ background: "transparent" }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1440, padding: "28px 50px" }}
        >
          {/* Wordmark + mark icon */}
          <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Fractal Studio MX — Inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt=""
              aria-hidden
              width={26}
              height={26}
              style={{ display: "block", width: 26, height: 26, objectFit: "contain" }}
            />
            <Wordmark />
          </Link>

          {/* Right: nav links (desktop) + Menu/mark */}
          <div className="flex items-center" style={{ gap: 40 }}>
            <nav aria-label="Navegación principal" className="hidden md:flex items-center" style={{ gap: 32 }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-ui editorial-navlink"
                  style={{ fontSize: 14, fontWeight: 350, color: "var(--ink)", textDecoration: "none" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Menu label + voltage '||' mark (mobile toggle) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="flex items-center gap-2.5"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <span className="font-ui md:hidden" style={{ fontSize: 14, fontWeight: 350, color: "var(--ink)" }}>
                {menuOpen ? "Cerrar" : "Menú"}
              </span>
              <span aria-hidden className="flex items-center gap-[3px]">
                <span style={{ width: 2, height: 14, background: "var(--voltage)", display: "block" }} />
                <span style={{ width: 2, height: 14, background: "var(--voltage)", display: "block" }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — linen full-bleed */}
      <div
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 flex flex-col items-start justify-center md:hidden"
        style={{
          background:  "var(--linen)",
          padding:     "0 50px",
          gap:         18,
          opacity:     menuOpen ? 1 : 0,
          visibility:  menuOpen ? "visible" : "hidden",
          transition:  "opacity 350ms ease, visibility 350ms ease",
        }}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-display"
            style={{
              fontSize:      "clamp(2.5rem, 13vw, 4.5rem)",
              fontWeight:    500,
              lineHeight:    0.95,
              letterSpacing: "-0.02em",
              color:         "var(--ink)",
              textDecoration:"none",
              transform:     menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity:       menuOpen ? 1 : 0,
              transition:    `transform 450ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms, opacity 450ms ease ${i * 60}ms`,
            }}
          >
            {item.label}
          </a>
        ))}

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="font-ui"
          style={{
            marginTop:     24,
            background:    "var(--voltage)",
            color:         "var(--ink)",
            padding:       "18px 44px",
            borderRadius:  10,
            fontSize:      14,
            fontWeight:    600,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            textDecoration:"none",
            boxShadow:     "rgba(16,94,29,0.45) 1px 8px 20px 0px, rgba(18,146,39,0.25) 1px 8px 20px 0px",
          }}
        >
          Iniciar proyecto →
        </a>
      </div>
    </>
  );
}
