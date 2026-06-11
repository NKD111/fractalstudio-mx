import Navbar        from "@/components/core/Navbar";
import Footer        from "@/components/core/Footer";
import Hero          from "@/components/sections/Hero";
import Services      from "@/components/sections/Services";
import Portfolio     from "@/components/sections/Portfolio";
import Process       from "@/components/sections/Process";
import Testimonials  from "@/components/sections/Testimonials";
import Contact       from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* ── Layout — broadsheet editorial, lectura top-to-bottom.
           Sin divisores: el espacio en blanco (80–120px) es el divisor. ── */}
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
