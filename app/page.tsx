import Navbar        from "@/components/core/Navbar";
import Footer        from "@/components/core/Footer";
import Hero          from "@/components/sections/Hero";
import Services      from "@/components/sections/Services";
import Portfolio     from "@/components/sections/Portfolio";
import Process       from "@/components/sections/Process";
import Testimonials  from "@/components/sections/Testimonials";
import Contact       from "@/components/sections/Contact";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
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
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
