import { useRef, useState, useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface SkillCategory {
  title: string;
  skills: string[];
  floatDuration: string;
  floatDelay: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C/C++", "Java", "Python", "JavaScript", "C#", "PHP", "HTML/CSS"],
    floatDuration: "5s",
    floatDelay: "0s",
  },
  {
    title: "Frameworks",
    skills: ["React", "React Native", "Spring Boot", "Node.js", "JavaFX"],
    floatDuration: "6s",
    floatDelay: "0.8s",
  },
  {
    title: "Database & ML",
    skills: ["MongoDB", "MySQL", "TensorFlow", "MATLAB"],
    floatDuration: "7s",
    floatDelay: "1.6s",
  },
  {
    title: "Tools",
    skills: ["Git", "Unity", "Blender", "VS Code", "Postman"],
    floatDuration: "5.5s",
    floatDelay: "2.4s",
  },
];

interface InfoCard {
  icon: string;
  title: string;
  description: string;
  floatDuration: string;
  floatDelay: string;
}

const infoCards: InfoCard[] = [
  {
    icon: "💎",
    title: "Clean Code",
    description:
      "Writing elegant, maintainable code that reads like well-crafted prose.",
    floatDuration: "6.5s",
    floatDelay: "0.4s",
  },
  {
    icon: "🧩",
    title: "Problem Solver",
    description:
      "Breaking down complex challenges into simple, composable solutions.",
    floatDuration: "5.8s",
    floatDelay: "1.2s",
  },
  {
    icon: "🚀",
    title: "Fast Learner",
    description:
      "Rapidly adapting to new technologies and turning concepts into reality.",
    floatDuration: "7.2s",
    floatDelay: "2s",
  },
];

/* ------------------------------------------------------------------ */
/*  Inline keyframe styles (injected once)                             */
/* ------------------------------------------------------------------ */

const keyframeCSS = `
@keyframes ag-float {
  0%   { transform: translateY(0px)    rotateX(0deg)   rotateY(0deg);   }
  25%  { transform: translateY(-10px)  rotateX(2deg)   rotateY(-2deg);  }
  50%  { transform: translateY(-15px)  rotateX(-3deg)  rotateY(3deg);   }
  75%  { transform: translateY(-7px)   rotateX(1deg)   rotateY(-1deg);  }
  100% { transform: translateY(0px)    rotateX(0deg)   rotateY(0deg);   }
}

@keyframes ag-shadow {
  0%   { box-shadow: 0 8px 24px rgba(0,0,0,0.35); }
  25%  { box-shadow: 0 16px 40px rgba(0,0,0,0.22); }
  50%  { box-shadow: 0 24px 56px rgba(0,0,0,0.15); }
  75%  { box-shadow: 0 12px 32px rgba(0,0,0,0.28); }
  100% { box-shadow: 0 8px 24px rgba(0,0,0,0.35); }
}
`;

/* ------------------------------------------------------------------ */
/*  Antigravity Card wrapper                                           */
/* ------------------------------------------------------------------ */

interface AntigravityCardProps {
  floatDuration: string;
  floatDelay: string;
  children: React.ReactNode;
  className?: string;
}

function AntigravityCard({
  floatDuration,
  floatDelay,
  children,
  className = "",
}: AntigravityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Max ±15 deg
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((centerY - y) / centerY) * 15;
      setTilt({ rotateX, rotateY });
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: "800px",
        /* Float & shadow run via CSS animation; tilt overlaid via inline transform */
        animation: isHovered
          ? "none"
          : `ag-float ${floatDuration} ease-in-out ${floatDelay} infinite, ag-shadow ${floatDuration} ease-in-out ${floatDelay} infinite`,
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : undefined,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease",
        boxShadow: isHovered
          ? "0 0 20px hsl(var(--primary) / 0.3), 0 20px 50px rgba(0,0,0,0.18)"
          : undefined,
        willChange: "transform, box-shadow",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Demo Page                                                     */
/* ------------------------------------------------------------------ */

export default function Demo3AntigravityCards() {
  return (
    <>
      {/* Inject keyframes */}
      <style>{keyframeCSS}</style>

      <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {/* Ambient cosmic glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/demos"
            className="group mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-[hsl(var(--primary))]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>{" "}
            Back to Demos
          </Link>

          {/* Title banner */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h1 className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Demo 3: Antigravity Cards
            </h1>
            <p className="mt-3 text-muted-foreground">
              Cards levitating in zero gravity — 3D tilt · dynamic shadows ·
              staggered rhythms
            </p>
          </motion.div>

          {/* ---- Skill Cards Grid ---- */}
          <section className="mb-20">
            <h2 className="mb-8 text-center text-lg font-medium tracking-wide text-muted-foreground uppercase">
              Skills &amp; Technologies
            </h2>

            <div className="grid gap-8 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <AntigravityCard
                  key={cat.title}
                  floatDuration={cat.floatDuration}
                  floatDelay={cat.floatDelay}
                >
                  <Card className="border-white/10 bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">
                        {cat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="cursor-default border-white/15 bg-white/[0.06] text-xs text-[hsl(var(--foreground)/0.8)] transition-all duration-200 hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--primary))] hover:text-white"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AntigravityCard>
              ))}
            </div>
          </section>

          {/* ---- About Info Cards ---- */}
          <section>
            <h2 className="mb-8 text-center text-lg font-medium tracking-wide text-muted-foreground uppercase">
              About Me
            </h2>

            <div className="grid gap-8 sm:grid-cols-3">
              {infoCards.map((info) => (
                <AntigravityCard
                  key={info.title}
                  floatDuration={info.floatDuration}
                  floatDelay={info.floatDelay}
                >
                  <Card className="border-white/10 bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden text-center">
                    <CardHeader>
                      <div className="mx-auto mb-2 text-4xl">{info.icon}</div>
                      <CardTitle className="text-base font-semibold text-[hsl(var(--foreground))]">
                        {info.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                </AntigravityCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
