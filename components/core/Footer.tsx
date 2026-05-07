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
              <div className="w-6 h-6 flex-shrink-0" aria-hidden>
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <rect x="1.5" y="1.5" width="29" height="29" stroke="#3BEA3B" strokeWidth="0.75" strokeOpacity="0.3" fill="none"/>
                  <polygon points="16,2 30,16 16,30 2,16" stroke="#3BEA3B" strokeWidth="1.2" strokeOpacity="0.7" fill="none"/>
                  <rect x="9" y="9" width="14" height="14" stroke="#3BEA3B" strokeWidth="1" strokeOpacity="0.55" fill="none"/>
                  <rect x="13.5" y="13.5" width="5" height="5" fill="#3BEA3B"/>
                </svg>
              </div>
              <span
                className="font-headline font-bold text-[#F5F5F5]"
                style={{ fontSize: "0.75rem", letterSpacing: "0.18em" }}
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
              style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.5)" }}
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
                  className="font-body text-sm transition-colors duration-200 hover:text-[#3BEA3B]"
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
              style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(245,245,245,0.5)" }}
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
            style={{ fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(245,245,245,0.5)" }}
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
                className="font-mono uppercase transition-colors duration-200 hover:text-[#3BEA3B]"
                style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "#888" }}
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
