import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  linkedin?: string;
}

const projects: Project[] = [
  {
    title: "WakeMeUp 📍",
    description:
      "A smart location-based alarm app that alerts you when you're near your destination — perfect for bus, train, and daily commuters. Set a location on the map, choose an alarm tone, and relax. Runs in the background, even when screen is locked.",
    tags: ["React Native", "Expo", "TypeScript", "Expo Router", "Expo Location", "Expo AV"],
    github: "https://github.com/SuvroGfz/wake-me-up",
    linkedin:
      "https://www.linkedin.com/feed/update/urn:li:activity:7397610367373336576/",
  },
  {
    title: "PetPalok 🏆",
    description:
      "2nd Runners Up at Therap Javafest 2024. A comprehensive Pet Community Web-App with pet profiles, marketplace with AI price prediction, community groups, real-time chat, and vet appointment scheduling.",
    tags: ["Java Spring Boot", "React", "MongoDB", "Python", "TensorFlow", "Socket.IO"],
    github: "https://github.com/SuvroGfz",
  },
  {
    title: "MediaSynergy",
    description:
      "Social media management platform for content creation, scheduling, and analytics across multiple platforms. Features business community networking and performance tracking via Facebook Graph API.",
    tags: ["React", "Node.js", "MongoDB", "Ayrshare API"],
    github: "https://github.com/SuvroGfz",
  },
  {
    title: "Energy Usage Prediction",
    description:
      "Smart grid optimization using machine learning for short and long-term energy forecasting. Implemented LSTM with NNPSO for enhanced performance, tested against GRU, N-BEATS, and ARIMA models.",
    tags: ["Python", "LSTM", "Machine Learning", "Time Series"],
    github: "https://github.com/SuvroGfz",
  },
  {
    title: "Foodies",
    description:
      "Complete online food ordering and delivery platform connecting users, restaurants, and riders. Features seamless order management, restaurant menus, and real-time delivery tracking.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    github: "https://github.com/SuvroGfz",
  },
  {
    title: "Freeway Rush",
    description:
      "Dynamic running game built with Unity Engine. Navigate bustling roads, avoid obstacles, and test your reflexes in this engaging mobile game experience.",
    tags: ["Unity", "C#", "Blender", "Game Development"],
    github: "https://github.com/SuvroGfz",
  },
  {
    title: "Football Database Management",
    description:
      "Java-based football player and club management system with networking features. Supports player trading, club operations, and comprehensive search functionality using OOP principles.",
    tags: ["Java", "JavaFX", "Threading", "Networking"],
    github: "https://github.com/SuvroGfz",
  },
];

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  });
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative"
    >
      {/* Outer neon glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-primary/40 group-hover:to-accent/40 group-hover:opacity-100" />

      <div
        className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-7 overflow-hidden transition-colors duration-300 group-hover:border-primary/40"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Animated cursor-follow glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(400px circle at ${gx} ${gy}, hsl(var(--primary) / 0.18), transparent 50%)`
            ),
          }}
        />

        <div style={{ transform: "translateZ(40px)" }} className="relative">
          <h3 className="text-2xl font-semibold tracking-tight mb-3 group-hover:text-gradient transition-colors">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="border-white/10 bg-white/5 text-foreground/80 backdrop-blur-sm font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-white/15 bg-transparent hover:bg-primary/10 hover:border-primary hover:text-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            {project.linkedin && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/15 bg-transparent hover:bg-accent/10 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_hsl(var(--accent)/0.5)] transition-all"
                asChild
              >
                <a href={project.linkedin} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative section-padding bg-section-bg/40 backdrop-blur-sm overflow-hidden"
    >
      {/* Subtle ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.06),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A showcase of my development journey and achievements
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, index) => (
            <TiltCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
