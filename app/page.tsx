import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { EngineeringPanel } from "@/components/sections/EngineeringPanel";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <AmbientGlow />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <EngineeringPanel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
