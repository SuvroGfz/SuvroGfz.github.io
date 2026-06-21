import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll";
import HeroMesh from "@/components/HeroMesh";

const Hero = () => {
  return (
    <section
      id="home"
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden"
      )}
    >
      {/* Crystal Mesh 3D Icosahedron — full-section backdrop */}
      <div className="absolute inset-0 z-0">
        <HeroMesh />
      </div>

      {/* Radial gradient glow behind mesh */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(160 84% 39% / 0.12) 0%, hsl(189 95% 43% / 0.06) 40%, transparent 70%)",
        }}
      />

      {/* Floating decorative elements */}
      <span
        className="absolute top-[15%] left-[10%] z-[2] w-3 h-3 rounded-sm pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #10b981, #06b6d4)",
          animation: "float-decor 6s ease-in-out infinite",
        }}
      />
      <span
        className="absolute top-[25%] right-[12%] z-[2] w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #10b981, #06b6d4)",
          animation: "float-decor 7s ease-in-out 1s infinite",
        }}
      />
      <span
        className="absolute bottom-[20%] left-[18%] z-[2] w-2.5 h-2.5 rounded-sm pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #10b981, #06b6d4)",
          animation: "float-decor 5.5s ease-in-out 0.5s infinite",
        }}
      />

      {/* Hero text overlay */}
      <div className="relative z-10 pointer-events-none text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl font-medium text-emerald-200/60 mb-3 tracking-wide"
        >
          👋 Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wide select-none leading-tight"
          style={{
            color: "#d1fae5",
            textShadow: `
              0 1px 0 #0d9f6e,
              0 2px 0 #0c9063,
              0 3px 0 #0b8158,
              0 4px 0 #0a724d,
              0 5px 0 #096342,
              0 6px 0 #085437,
              0 7px 0 #07452c,
              0 8px 0 #063621,
              0 0 20px rgba(16,185,129,0.6),
              0 0 40px rgba(16,185,129,0.35),
              0 0 80px rgba(16,185,129,0.15),
              0 12px 30px rgba(0,0,0,0.5)
            `,
          }}
        >
          Gazi Fardin Zafor Suvro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg md:text-xl font-medium text-emerald-100/70 tracking-wide"
          style={{
            animation: "subtle-glow 3s ease-in-out infinite",
          }}
        >
          Computer Science Graduate | Full-Stack Developer
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="mt-8 flex flex-wrap gap-3 md:gap-4 justify-center pointer-events-auto"
        >
          <Button size="lg" className="tech-gradient glow-effect" onClick={() => scrollToSection('projects')}>
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 backdrop-blur hover:bg-white/10"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/60 hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a href="./resume.pdf" download="Gazi_Fardin_Resume.pdf">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="mt-6 flex gap-4 justify-center pointer-events-auto"
        >
          <a
            href="https://github.com/SuvroGfz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/60 rounded-lg transition-all hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/gazi-fardin-zafor-suvro-a755bb2a7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/60 rounded-lg transition-all hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:gazisn870@gmail.com"
            aria-label="Email"
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/60 rounded-lg transition-all hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-1 pointer-events-auto"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest text-emerald-200/40 font-medium">
            Scroll
          </span>
          <ChevronDown
            className="w-5 h-5 text-primary/70 animate-bounce"
            strokeWidth={2.5}
          />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
