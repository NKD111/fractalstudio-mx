const PHONE = "+52 55 6212 3864";
const EMAIL = "hola@fractalstudio.com.mx";

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: "var(--ink)", color: "var(--linen)", borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "100px 50px 40px" }}>

        {/* Big editorial sign-off */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" style={{ marginBottom: 80 }}>
          <div className="lg:col-span-7">
            <p className="font-display" style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--linen)", margin: 0 }}>
              <span style={{ color: "var(--linen)" }}>Fractal</span>
              <span style={{ color: "var(--voltage)" }}>Studio</span>
              <span className="font-arch" style={{ fontStyle: "italic", fontWeight: 300, display: "block", fontSize: "0.55em", color: "var(--mist)", marginTop: 12 }}>
                Nacimos para crear.
              </span>
            </p>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2">
            <h3 className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--moss)", marginBottom: 20 }}>Navegación</h3>
            <nav aria-label="Pie de página" className="flex flex-col" style={{ gap: 12 }}>
              {[
                { href: "#servicios",  label: "Servicios"  },
                { href: "#portafolio", label: "Portafolio" },
                { href: "#proceso",    label: "Proceso"    },
                { href: "#contacto",   label: "Contacto"   },
              ].map((link) => (
                <a key={link.href} href={link.href} className="font-ui editorial-navlink" style={{ fontSize: 16, color: "var(--linen)", textDecoration: "none", width: "fit-content" }}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h3 className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--moss)", marginBottom: 20 }}>Contacto</h3>
            <div className="flex flex-col" style={{ gap: 12 }}>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="font-ui editorial-navlink" style={{ fontSize: 16, color: "var(--linen)", textDecoration: "none", width: "fit-content" }} aria-label={`Llamar al ${PHONE}`}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="font-ui editorial-navlink" style={{ fontSize: 16, color: "var(--linen)", textDecoration: "none", width: "fit-content" }}>{EMAIL}</a>
              <span className="font-ui" style={{ fontSize: 16, color: "var(--mist)" }}>Ciudad de México, CDMX</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(250,255,250,0.12)", paddingTop: 32 }}>
          <p aria-hidden className="font-ui" style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--mist)" }}>
            © {new Date().getFullYear()} Fractal Studio MX. Todos los derechos reservados.
          </p>
          <div className="flex items-center" style={{ gap: 28 }}>
            {[
              { href: "https://www.instagram.com/fractalstudiomx", label: "Instagram" },
              { href: "https://www.facebook.com/fractalstudiomx",  label: "Facebook"  },
            ].map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} de Fractal Studio MX`}
                className="font-ui editorial-navlink" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--linen)", textDecoration: "none" }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
