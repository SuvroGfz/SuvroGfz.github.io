import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-5xl mx-auto animate-fade-in-up">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground mb-4">
            👋 Welcome to my portfolio
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="text-gradient">Gazi Fardin Zafor Suvro</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Computer Science Graduate | Full-Stack Developer
        </p>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Recent CS graduate from BUET with passion for building innovative web applications 
          and machine learning solutions. 2nd Runners Up at Therap Javafest 2024.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button size="lg" className="tech-gradient glow-effect">
            <a href="#projects">View My Work</a>
          </Button>
          <Button size="lg" variant="secondary">
            <a href="#contact">Get In Touch</a>
          </Button>
          <Button size="lg" variant="outline" className="border-primary hover:bg-primary hover:text-primary-foreground">
            <a href="/resume.pdf" download="Gazi_Fardin_Resume.pdf">Download Resume</a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center">
          <a 
            href="https://github.com/SuvroGfz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-card hover:bg-secondary border border-border rounded-lg transition-all hover:scale-110 hover:glow-effect"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://linkedin.com/in/gazi-fardin-zafor-suvro-a755bb2a7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-card hover:bg-secondary border border-border rounded-lg transition-all hover:scale-110 hover:glow-effect"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="mailto:gazisn870@gmail.com"
            className="p-3 bg-card hover:bg-secondary border border-border rounded-lg transition-all hover:scale-110 hover:glow-effect"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
