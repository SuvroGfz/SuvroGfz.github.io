import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ParticleConstellation } from "@/components/ui/particle-constellation";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Cosmic gradient + nebula backdrop */}
      <div className="fixed inset-0 z-0 cosmic-backdrop" aria-hidden />

      {/* CSS twinkling star layers */}
      <div className="fixed inset-0 z-0 stars-layer pointer-events-none" aria-hidden />
      <div className="fixed inset-0 z-0 stars-layer-2 pointer-events-none" aria-hidden />

      {/* Interactive 3D galaxy + starfield */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleConstellation className="!absolute inset-0" />
      </div>

      {/* Subtle vignette for legibility */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.35) 70%, hsl(var(--background) / 0.7) 100%)",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
