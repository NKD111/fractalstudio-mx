import Navbar        from "@/components/core/Navbar";
import Footer        from "@/components/core/Footer";
import Hero          from "@/components/sections/Hero";
import Services      from "@/components/sections/Services";
import Portfolio     from "@/components/sections/Portfolio";
import Process       from "@/components/sections/Process";
import Testimonials  from "@/components/sections/Testimonials";
import Contact       from "@/components/sections/Contact";
import CustomCursor  from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <>
      {/* ── Overlays (render order matters) ── */}
      <LoadingScreen />
      <CustomCursor />

      {/* ── Layout ── */}
      <Navbar />
      <main id="main-content">
        <Hero />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,234,59,0.14) 30%, rgba(59,234,59,0.14) 70%, transparent)" }} />
        <Services />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)" }} />
        <Portfolio />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,234,59,0.14) 30%, rgba(59,234,59,0.14) 70%, transparent)" }} />
        <Process />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)" }} />
        <Testimonials />
        <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,234,59,0.14) 30%, rgba(59,234,59,0.14) 70%, transparent)" }} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
