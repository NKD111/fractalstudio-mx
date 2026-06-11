"use client";

import { useState, useEffect } from "react";

const WA_LINK =
  "https://wa.me/525562123864?text=Hola%20Mariana%2C%20vengo%20del%20sitio%20web%20de%20Fractal%20Studio%20MX%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios%20%F0%9F%9A%80";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
        transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Tooltip */}
      {hovered && (
        <span
          className="font-body text-sm font-medium text-[#F5F5F5] shadow-xl whitespace-nowrap"
          style={{
            background:   "#111111",
            border:       "1px solid rgba(255,255,255,0.08)",
            padding:      "0.5rem 1rem",
          }}
        >
          ¡Chatea con nosotros!
        </span>
      )}

      {/* Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Fractal Studio MX"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-[#C3DD2E] active:scale-95 transition-all duration-200"
        style={{
          boxShadow: hovered
            ? "0 4px 40px rgba(195,221,46,0.6)"
            : "0 4px 24px rgba(195,221,46,0.35)",
        }}
      >
        {/* Ping ring */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[#C3DD2E] opacity-30"
          style={{ animation: "wa-ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
        />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.117 1.528 5.845L.057 23.667a.5.5 0 00.61.61l5.822-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.697-.504-5.238-1.384l-.376-.215-3.893.984.984-3.893-.215-.376A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>

      <style>{`
        @keyframes wa-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
