import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Vignette to keep text legible over site-wide particle background */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.4)_70%,hsl(var(--background)/0.7)_100%)]" />

      {/* Glassmorphism content container */}
      <div className="relative z-10 mx-4 md:mx-6 max-w-4xl w-full animate-fade-in-up">
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-6 py-10 md:px-12 md:py-14 text-center shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
          {/* Neon edge glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary/20" />
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50 blur-2xl -z-10" />

          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-sm font-medium text-muted-foreground">
              👋 Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
            Hi, I'm <span className="text-gradient">Gazi Fardin Zafor Suvro</span>
          </h1>

          <p className="text-lg md:text-2xl text-foreground/90 mb-3">
            Computer Science Graduate | Full-Stack Developer
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Recent CS graduate from BUET with a passion for building innovative web
            applications and machine learning solutions. 2nd Runners Up at Therap
            Javafest 2024.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-10">
            <Button size="lg" className="tech-gradient glow-effect" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 backdrop-blur hover:bg-white/10"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/60 hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href="/resume.pdf" download="Gazi_Fardin_Resume.pdf">
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex gap-4 justify-center">
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="w-6 h-10 border-2 border-primary/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
