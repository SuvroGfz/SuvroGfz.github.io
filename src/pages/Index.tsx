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
    <div className="relative min-h-screen bg-background">
      {/* Site-wide interactive 3D background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleConstellation className="!absolute inset-0" />
      </div>

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
