"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import RevealTitle from "@/components/ui/RevealTitle";

const WA_LINK =
  "https://wa.me/525562123864?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20con%20Fractal%20Studio%20MX.";

const INFO = [
  { label: "Teléfono",  value: "+52 55 6212 3864",          href: "tel:+525562123864" },
  { label: "Email",     value: "hola@fractalstudio.com.mx", href: "mailto:hola@fractalstudio.com.mx" },
  { label: "Ubicación", value: "Ciudad de México, CDMX",    href: "https://maps.google.com/?q=Ciudad+de+Mexico" },
  { label: "WhatsApp",  value: "+52 55 6212 3864",          href: WA_LINK },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = data.get("nombre");
    const email = data.get("email");
    const mensaje = data.get("mensaje");
    const subject = encodeURIComponent(`Contacto desde fractalstudio.com.mx — ${nombre}`);
    const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
    window.location.href = `mailto:hola@fractalstudio.com.mx?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--mist)",
    padding: "12px 0",
    color: "var(--ink)",
    fontFamily: "var(--font-ui)",
    fontSize: 18,
    letterSpacing: "-0.36px",
    width: "100%",
    outline: "none",
    transition: "border-color 220ms",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-ui)",
    fontSize: 11,
    letterSpacing: "0.06em",
    color: "var(--sage)",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 8,
  };

  return (
    <section id="contacto" style={{ background: "var(--linen)" }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "100px 50px 120px" }}>

        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: 70 }}>
          <RevealTitle lines={[{ text: "Hablemos" }, { text: "de tu proyecto.", accent: true }]} />
          <p className="font-ui" style={{ fontSize: 11, letterSpacing: "0.11px", textTransform: "uppercase", color: "var(--sage)", fontWeight: 350 }}>
            Contacto — 05
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div role="status" aria-live="polite" style={{ paddingTop: 8 }}>
                <p className="font-display" style={{ fontSize: "2rem", fontWeight: 400, color: "var(--ink)", margin: 0 }}>Mensaje enviado.</p>
                <p className="font-ui" style={{ fontSize: 16, color: "var(--sage)", marginTop: 12 }}>Te contactaremos en menos de 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: 32 }}>
                <div>
                  <label htmlFor="nombre" style={labelStyle}>Nombre *</label>
                  <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre o empresa" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--voltage)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--mist)")} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input id="email" name="email" type="email" required placeholder="correo@empresa.com" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--voltage)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--mist)")} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="mensaje" style={labelStyle}>Mensaje *</label>
                  <textarea id="mensaje" name="mensaje" required rows={4} placeholder="Cuéntanos sobre tu proyecto, presupuesto y tiempos..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--voltage)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--mist)")} aria-required="true" />
                </div>
                <button type="submit" className="voltage-cta font-ui" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  Enviar mensaje →
                </button>
              </form>
            )}
          </div>

          {/* Contact info — editorial list */}
          <div className="lg:col-span-5 flex flex-col">
            {INFO.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group"
                style={{ borderTop: "1px solid var(--mist)", padding: "24px 0", textDecoration: "none", display: "block" }}
                aria-label={`${label}: ${value}`}
              >
                <span className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--sage)", display: "block", marginBottom: 6 }}>
                  {label}
                </span>
                <span className="font-display editorial-navlink" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", fontWeight: 400, color: "var(--ink)" }}>
                  {value}
                </span>
              </a>
            ))}
            <div style={{ borderTop: "1px solid var(--mist)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
