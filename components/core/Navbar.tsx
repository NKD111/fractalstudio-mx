"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "#servicios",  label: "SERVICIOS"  },
  { href: "#portafolio", label: "PORTAFOLIO" },
  { href: "#contacto",   label: "CONTACTO"   },
];

const WA_LINK = "https://wa.me/525562123864?text=Hola%2C%20me%20interesa%20iniciar%20un%20proyecto%20con%20Fractal%20Studio%20MX.";
const PHONE      = "+52 55 6212 3864";
const PHONE_HREF = "tel:+525562123864";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          height:           72,
          background:       scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter:   scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          borderBottom:     `1px solid ${scrolled ? "rgba(59,234,59,0.07)" : "transparent"}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline flex-shrink-0"
            aria-label="Fractal Studio MX — Inicio"
          >
            <div
              className="w-7 h-7 flex items-center justify-center flex-shrink-0"
              style={{ border: "1px solid rgba(59,234,59,0.45)" }}
            >
              <div className="w-3 h-3 bg-[#3BEA3B]" aria-hidden />
            </div>
            <span className="font-headline font-bold text-[#F5F5F5] whitespace-nowrap"
              style={{ fontSize: "0.78rem", letterSpacing: "0.18em" }}>
              FRACTAL STUDIO
            </span>
          </Link>

          {/* Phone — visible solo desktop grande */}
          <a
            href={PHONE_HREF}
            className="hidden lg:flex items-center gap-2 transition-colors duration-200 hover:text-[#3BEA3B]"
            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(245,245,245,0.35)" }}
            aria-label={`Llamar al ${PHONE}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12 19.79 19.79 0 012 3.18a2 2 0 012-2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {PHONE}
          </a>

          {/* Nav links — desktop */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-200 hover:text-[#F5F5F5]"
                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.68rem", letterSpacing: "0.13em", color: "rgba(245,245,245,0.45)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA — desktop */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200 hover:bg-[rgba(59,234,59,0.06)]"
            style={{
              border:      "1px solid rgba(59,234,59,0.38)",
              color:       "#3BEA3B",
              fontFamily:  "var(--font-jetbrains-mono)",
              fontSize:    "0.66rem",
              letterSpacing: "0.13em",
            }}
          >
            INICIAR PROYECTO
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                className="block bg-[#3BEA3B] transition-all duration-300 origin-center"
                style={{
                  height: 1,
                  width: menuOpen && i === 1 ? 0 : menuOpen ? 20 : i === 1 ? 14 : 20,
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(4px, 4px)"
                    : menuOpen && i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
        style={{
          background:  "rgba(8,8,8,0.97)",
          backdropFilter: "blur(24px)",
          opacity:     menuOpen ? 1 : 0,
          visibility:  menuOpen ? "visible" : "hidden",
          transition:  "opacity 300ms ease, visibility 300ms ease",
        }}
      >
        {/* HUD corners */}
        {(["tl","tr","bl","br"] as const).map((pos) => (
          <span key={pos} aria-hidden className="absolute w-5 h-5" style={{
            top:    pos.includes("t") ? 24 : "auto",
            bottom: pos.includes("b") ? 24 : "auto",
            left:   pos.includes("l") ? 24 : "auto",
            right:  pos.includes("r") ? 24 : "auto",
            borderTop:    pos.includes("t") ? "1px solid rgba(59,234,59,0.2)" : "none",
            borderBottom: pos.includes("b") ? "1px solid rgba(59,234,59,0.2)" : "none",
            borderLeft:   pos.includes("l") ? "1px solid rgba(59,234,59,0.2)" : "none",
            borderRight:  pos.includes("r") ? "1px solid rgba(59,234,59,0.2)" : "none",
          }} />
        ))}

        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-headline font-bold text-[#F5F5F5] hover:text-[#3BEA3B] transition-colors"
            style={{
              fontSize:         "clamp(2rem, 8vw, 3.5rem)",
              letterSpacing:    "-0.02em",
              transform:        menuOpen ? "translateX(0)" : "translateX(-20px)",
              transition:       `color 200ms, transform 400ms ease ${i * 60}ms`,
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
          className="mt-2 px-8 py-3"
          style={{
            border:       "1px solid rgba(59,234,59,0.4)",
            color:        "#3BEA3B",
            fontFamily:   "var(--font-jetbrains-mono)",
            fontSize:     "0.7rem",
            letterSpacing:"0.14em",
          }}
        >
          INICIAR PROYECTO
        </a>

        <a
          href={PHONE_HREF}
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(245,245,245,0.25)" }}
        >
          {PHONE}
        </a>
      </div>
    </>
  );
}
