const PHONE = "+52 55 6212 3864";
const EMAIL = "hola@fractalstudio.com.mx";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t pt-16 pb-8"
      style={{ background: "#040404", borderColor: "rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt=""
                aria-hidden
                width={28}
                height={28}
                style={{
                  display:      "block",
                  width:        28,
                  height:       28,
                  objectFit:    "contain",
                  mixBlendMode: "screen",
                  flexShrink:   0,
                }}
              />
              <span
                className="font-headline font-bold text-[#F5F5F5]"
                style={{ fontSize: "0.9375rem", letterSpacing: "0.18em" }}
              >
                FRACTAL STUDIO MX
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-[240px]" style={{ color: "#888" }}>
              Agencia creativa en CDMX. Diseño, fotografía, video y branding para marcas que quieren destacar.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3
              className="font-mono uppercase mb-5"
              style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.5)" }}
            >
              Navegación
            </h3>
            <nav aria-label="Pie de página" className="flex flex-col gap-3">
              {[
                { href: "#servicios",  label: "Servicios"  },
                { href: "#portafolio", label: "Portafolio" },
                { href: "#contacto",   label: "Contacto"   },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm transition-colors duration-200 hover:text-[#C3DD2E]"
                  style={{ color: "#888" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div>
            <h3
              className="font-mono uppercase mb-5"
              style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.5)" }}
            >
              Contacto
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="font-body text-sm transition-colors duration-200 hover:text-[#F5F5F5]"
                style={{ color: "#888" }}
                aria-label={`Llamar al ${PHONE}`}
              >
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="font-body text-sm transition-colors duration-200 hover:text-[#F5F5F5]"
                style={{ color: "#888" }}
              >
                {EMAIL}
              </a>
              <span className="font-body text-sm" style={{ color: "#888" }}>
                Ciudad de México, CDMX
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <p
            aria-hidden="true"
            className="font-mono"
            style={{ fontSize: "0.725rem", letterSpacing: "0.1em", color: "rgba(245,245,245,0.5)" }}
          >
            © {new Date().getFullYear()} Fractal Studio MX. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: "https://www.instagram.com/fractalstudiomx", label: "Instagram" },
              { href: "https://www.facebook.com/fractalstudiomx",  label: "Facebook"  },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} de Fractal Studio MX`}
                className="font-mono uppercase transition-colors duration-200 hover:text-[#C3DD2E]"
                style={{ fontSize: "0.725rem", letterSpacing: "0.12em", color: "#888" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
