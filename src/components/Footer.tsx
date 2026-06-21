import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-section-bg/60 backdrop-blur-sm border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gradient mb-2">Suvro</h3>
            <p className="text-muted-foreground">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
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

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© {currentYear} Gazi Fardin Zafor Suvro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
