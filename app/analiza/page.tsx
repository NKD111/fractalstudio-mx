import type { Metadata } from "next";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import AnalizadorCliente from "./AnalizadorCliente";

export const metadata: Metadata = {
  title: "Analiza tu sitio web gratis",
  description:
    "Herramienta gratuita de Fractal Studio MX: escribe la dirección de tu negocio y recibe al instante un diagnóstico de tu sitio web — velocidad, experiencia en celular, contacto por WhatsApp, presentación en Google y más.",
  alternates: { canonical: "/analiza" },
  openGraph: {
    title: "Analiza tu sitio web gratis | Fractal Studio MX",
    description:
      "Diagnóstico instantáneo y sin registro: qué tiene bien resuelto tu sitio y qué oportunidades hay.",
    url: "/analiza",
    type: "website",
  },
};

export default function AnalizaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-dark text-white">
        <AnalizadorCliente />
      </main>
      <Footer />
    </>
  );
}
