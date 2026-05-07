"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/525562123864?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20con%20Fractal%20Studio%20MX.";

const INFO = [
  { Icon: Phone,         label: "Teléfono",   value: "+52 55 6212 3864",          href: "tel:+525562123864" },
  { Icon: Mail,          label: "Email",      value: "hola@fractalstudio.com.mx", href: "mailto:hola@fractalstudio.com.mx" },
  { Icon: MapPin,        label: "Ubicación",  value: "Ciudad de México, CDMX",    href: "https://maps.google.com/?q=Ciudad+de+Mexico" },
  { Icon: MessageCircle, label: "WhatsApp",   value: "+52 55 6212 3864",          href: WA_LINK },
];

export default function Contact() {
  const [visible,   setVisible]   = useState(false);
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
    const data    = new FormData(e.currentTarget);
    const nombre  = data.get("nombre");
    const email   = data.get("email");
    const mensaje = data.get("mensaje");
    const subject = encodeURIComponent(`Contacto desde fractalstudio.com.mx — ${nombre}`);
    const body    = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
    window.location.href = `mailto:hola@fractalstudio.com.mx?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle = {
    background:    "transparent",
    border:        "1px solid rgba(255,255,255,0.08)",
    padding:       "0.8rem 1rem",
    color:         "#F5F5F5",
    fontFamily:    "var(--font-dm-sans)",
    fontSize:      "0.88rem",
    width:         "100%",
    outline:       "none",
    transition:    "border-color 200ms",
  };

  const labelStyle = {
    fontFamily:    "var(--font-jetbrains-mono)",
    fontSize:      "0.58rem",
    letterSpacing: "0.15em",
    color:         "rgba(245,245,245,0.35)",
    textTransform: "uppercase" as const,
    display:       "block",
    marginBottom:  "0.5rem",
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-[#080808] relative overflow-hidden">
      {/* Ambient */}
      <div
        aria-hidden className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "40vw", height: "40vw", maxWidth: 500,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,234,59,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={ref}
          className="mb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-5 h-px bg-[#3BEA3B] opacity-50" />
            <span className="font-mono uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "rgba(59,234,59,0.4)" }}>
              CONTACTO // 05
            </span>
          </div>
          <h2
            className="font-headline font-extrabold text-[#F5F5F5] leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            HABLEMOS<br />
            <span className="text-[#3BEA3B]">DE TU PROYECTO.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Form ── */}
          <div
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.6s ease 200ms, transform 0.6s ease 200ms",
            }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-start gap-5 p-8"
                style={{ border: "1px solid rgba(59,234,59,0.2)" }}
                role="status"
                aria-live="polite"
              >
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(59,234,59,0.08)", border: "1px solid rgba(59,234,59,0.3)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#3BEA3B" strokeWidth="2" aria-hidden>
                    <path d="M2 8l4 4 8-8" />
                  </svg>
                </div>
                <p className="font-headline font-bold text-xl text-[#F5F5F5]">Mensaje enviado</p>
                <p className="font-body text-sm" style={{ color: "#666" }}>Te contactaremos en menos de 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="nombre" style={labelStyle}>Nombre *</label>
                  <input
                    id="nombre" name="nombre" type="text" required
                    placeholder="Tu nombre o empresa"
                    style={{ ...inputStyle }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(59,234,59,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="correo@empresa.com"
                    style={{ ...inputStyle }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(59,234,59,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" style={labelStyle}>Mensaje *</label>
                  <textarea
                    id="mensaje" name="mensaje" required rows={5}
                    placeholder="Cuéntanos sobre tu proyecto, presupuesto y tiempos..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(59,234,59,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  className="font-mono font-semibold transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background:    "#3BEA3B",
                    color:         "#080808",
                    padding:       "1rem",
                    fontSize:      "0.72rem",
                    letterSpacing: "0.14em",
                    width:         "100%",
                    cursor:        "pointer",
                    border:        "none",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.boxShadow = "0 0 28px rgba(59,234,59,0.35)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.boxShadow = "none")}
                >
                  ENVIAR MENSAJE
                </button>
              </form>
            )}
          </div>

          {/* ── Contact info ── */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.6s ease 350ms, transform 0.6s ease 350ms",
            }}
          >
            {INFO.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 p-5 transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                aria-label={`${label}: ${value}`}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,234,59,0.18)"; (e.currentTarget as HTMLElement).style.background = "rgba(59,234,59,0.015)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Icon size={15} aria-hidden style={{ color: "rgba(245,245,245,0.3)", transition: "color 300ms" }} className="group-hover:text-[#3BEA3B]" />
                </div>
                <div>
                  <div className="font-mono uppercase mb-1" style={{ fontSize: "0.56rem", letterSpacing: "0.12em", color: "rgba(245,245,245,0.28)" }}>
                    {label}
                  </div>
                  <div className="font-body text-sm transition-colors duration-200 group-hover:text-[#F5F5F5]" style={{ color: "rgba(245,245,245,0.55)" }}>
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* WhatsApp CTA destacado */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-3 py-4 font-mono transition-all duration-200"
              style={{
                background:    "rgba(59,234,59,0.05)",
                border:        "1px solid rgba(59,234,59,0.2)",
                color:         "#3BEA3B",
                fontSize:      "0.68rem",
                letterSpacing: "0.14em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,234,59,0.09)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,234,59,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,234,59,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,234,59,0.2)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.117 1.528 5.845L.057 23.667a.5.5 0 00.61.61l5.822-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.697-.504-5.238-1.384l-.376-.215-3.893.984.984-3.893-.215-.376A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              CHAT DIRECTO POR WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
