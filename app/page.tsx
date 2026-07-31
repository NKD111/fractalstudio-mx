import Navbar        from "@/components/core/Navbar";
import Footer        from "@/components/core/Footer";
import Hero          from "@/components/sections/Hero";
import Services      from "@/components/sections/Services";
import Portfolio     from "@/components/sections/Portfolio";
import Process       from "@/components/sections/Process";
import Testimonials  from "@/components/sections/Testimonials";
import Contact       from "@/components/sections/Contact";
import Clientes      from "@/components/sections/Clientes";
import Showreel      from "@/components/sections/Showreel";
import CustomCursor  from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LivingFractal from "@/components/core/LivingFractal";
import Sonido        from "@/components/ui/Sonido";

export default function Home() {
  return (
    <>
      {/* ── Overlays (render order matters) ── */}
      <LoadingScreen />
      <CustomCursor />
      <LivingFractal />
      <Sonido />

      {/* ── Layout ── */}
      <Navbar />
      <main id="main-content">
        <Hero />
        <Clientes />
        <Services />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)" }} />
        <Portfolio />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(195,221,46,0.14) 30%, rgba(195,221,46,0.14) 70%, transparent)" }} />
        <Process />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)" }} />
        <Testimonials />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(195,221,46,0.14) 30%, rgba(195,221,46,0.14) 70%, transparent)" }} />
        <Contact />
        <Showreel />
      </main>
      <Footer />
    </>
  );
}
