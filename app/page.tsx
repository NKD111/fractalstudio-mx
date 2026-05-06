import Navbar         from "@/components/core/Navbar";
import Footer         from "@/components/core/Footer";
import Hero           from "@/components/sections/Hero";
import Services       from "@/components/sections/Services";
import Portfolio      from "@/components/sections/Portfolio";
import Contact        from "@/components/sections/Contact";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
