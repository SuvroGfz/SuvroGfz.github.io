import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlowDivider from "@/components/GlowDivider";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Aurora gradient backdrop */}
      <div className="fixed inset-0 z-0 aurora-backdrop" aria-hidden />

      {/* CSS twinkling star layers */}
      <div className="fixed inset-0 z-0 stars-layer pointer-events-none" aria-hidden />
      <div className="fixed inset-0 z-0 stars-layer-2 pointer-events-none" aria-hidden />
      <div className="fixed inset-0 z-0 stars-layer-3 pointer-events-none" aria-hidden />

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
        <GlowDivider />
        <About />
        <GlowDivider />
        <Experience />
        <GlowDivider />
        <Skills />
        <GlowDivider />
        <Projects />
        <GlowDivider />
        <Contact />
        <GlowDivider />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
