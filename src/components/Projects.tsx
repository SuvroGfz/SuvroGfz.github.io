import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AntigravityCard from "@/components/AntigravityCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  demo?: string;
  linkedin?: string;
  wip?: boolean;
}

const projects: Project[] = [
  {
    title: "PetPalok 🏆",
    description:
      "2nd Runners Up at Therap Javafest 2024. A comprehensive Pet Community Web-App with pet profiles, marketplace with AI price prediction, community groups, real-time chat, and vet appointment scheduling.",
    tags: ["Java Spring Boot", "React", "MongoDB", "Python", "TensorFlow", "Socket.IO"],
    github: "https://github.com/Sakib-Sobaha/Pet-Palok-Frontend",
    live: "https://pet-palok.vercel.app/",
  },
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
    title: "MediaSynergy",
    description:
      "Social media management platform for content creation, scheduling, and analytics across multiple platforms. Features business community networking and performance tracking via Facebook Graph API.",
    tags: ["React", "Node.js", "MongoDB", "Ayrshare API", "Facebook Graph API"],
    github: "https://github.com/NajmusSakibRashid/Media-Synergy-Front-End",
  },
  {
    title: "Multi-Agent Band 🤖🎵",
    description:
      "AI-powered multi-agent food delivery orchestration system built for the LabLab.ai Band of Agents Hackathon. Features 7 autonomous agents (Orchestrator, Kitchen Sentinel, 3 Rider Twins, Self-Healer, Customer Agent) communicating in real-time through Band AI chat rooms. Includes a 4-phase delivery simulation with live disruption handling, self-healing rider swaps, and a full-stack dashboard with interactive agent conversation visualization.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Band AI", "Vite", "SSE", "Multi-Agent Systems"],
    github: "https://github.com/SuvroGfz/multi-agent-band",
    wip: true,
  },
  {
    title: "VendorGhost 🛡️",
    description:
      "Autonomous vendor risk intelligence platform built for the Bright Data AI Agents Hackathon (lablab.ai). Features 6 parallel intelligence modules (Subdomain Scanner, Breach Checker, Job Posting Analyzer, Shodan Scanner, News Scanner, Trust Page Scraper) orchestrated via LangGraph. Includes real-time SSE dashboard, LLM-powered risk scoring (Claude Sonnet 4) with downloadable PDF reports, RAG chat over evidence, vendor monitoring with Telegram alerts, and Supabase auth with Row Level Security.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "LangGraph", "LangChain", "Claude AI", "Bright Data", "Supabase", "Shodan", "Docker"],
    github: "https://github.com/Sakib-Sobaha/VendorGhost",
  },
  {
    title: "Dhaka Dour — Dour Bhai Dour! 🏃",
    description:
      "A high-speed 3D endless runner inspired by Temple Run, set in Dhaka. Features a pursuing villain entity with distance-based chase mechanics, lane switching, jumping, crouching, real-time physics, coin collection, difficulty levels (Easy/Medium/Hard), and pause/resume with localStorage persistence.",
    tags: ["React", "Three.js", "React Three Fiber", "Rapier Physics", "Zustand", "Vite", "WebGL"],
    github: "https://github.com/SuvroGfz/dhaka-dour",
    wip: true,
  },
  {
    title: "PromptForge ⚡",
    description:
      "A Chrome Extension (Manifest V3) with a Python FastAPI backend that transforms selected text on any webpage into structured, optimized AI prompts. Users select text, click a floating \"Forge Prompt\" button, and the extension auto-analyzes the content (suggesting an AI role and goal), then generates a well-structured prompt via a guided form UI. Optionally enhanced by Google Gemini AI for prompt refinement.",
    tags: ["JavaScript", "Chrome Extension MV3", "Python", "FastAPI", "Google Gemini API", "Pydantic", "HTML/CSS"],
    github: "https://github.com/SuvroGfz/prompt-forge-extension",
    wip: true,
  },
  {
    title: "Quizora 🧠",
    description:
      "A modern, gamified, AI-powered quiz application for students and educators. Teachers can instantly generate high-quality, curriculum-aligned MCQ quizzes using Google's Gemini AI — customizable by subject, class level, exam standard, language medium, and focus topic. Students get an engaging, timed quiz-taking experience with instant scoring, detailed result breakdowns, and a visual performance map.",
    tags: ["React", "TypeScript", "Vite", "Node.js", "Express", "Google Gemini AI", "Firebase", "Firestore", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/SuvroGfz/quizora",
    live: "https://quizora-beta.vercel.app/",
    wip: true,
  },
  {
    title: "Tuition Monitor 📚",
    description:
      "A full-stack tuition management platform for private tutors, combining a React Native (Expo) mobile app with a Next.js web viewer. Tutors can manage students, subjects, tuition schedules, and session logs locally on their device using an offline-first architecture. Tuition data can be shared with guardians/students via time-limited shareable web links powered by Supabase.",
    tags: ["React Native", "Expo", "TypeScript", "Next.js", "Supabase", "Tailwind CSS", "Expo Router"],
    github: "https://github.com/SuvroGfz/tuition-monitor",
    wip: true,
  },
  {
    title: "Energy Usage Prediction",
    description:
      "Smart grid optimization using machine learning for short and long-term energy forecasting. Implemented LSTM with NNPSO for enhanced performance, tested against GRU, N-BEATS, and ARIMA models.",
    tags: ["Python", "LSTM", "Machine Learning", "Time Series"],
    github: "https://www.kaggle.com/code/gfzthenoob/load-prediction",
  },
  {
    title: "Foodies",
    description:
      "Complete online food ordering and delivery platform connecting users, restaurants, and riders. Features seamless order management, restaurant menus, and real-time delivery tracking.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    github: "https://github.com/SuvroGfz/FOODIES",
  },
  {
    title: "Freeway Rush",
    description:
      "Dynamic running game built with Unity Engine. Navigate bustling roads, avoid obstacles, and test your reflexes in this engaging mobile game experience.",
    tags: ["Unity", "C#", "Blender", "Game Development"],
    github: "https://github.com/SuvroGfz/FreewayRush",
    demo: "https://www.facebook.com/share/v/1DriSRfksR/",
  },
  {
    title: "Football Database Management",
    description:
      "Java-based football player and club management system with networking features. Supports player trading, club operations, and comprehensive search functionality using OOP principles.",
    tags: ["Java", "JavaFX", "Threading", "Networking"],
    github: "https://github.com/SuvroGfz/Football-DBMS-javafx.git",
    demo: "https://www.facebook.com/suvro.gfg20/videos/1089585075179418",
  },
  {
    title: "Snakes and Ladders",
    description:
      "Classic snakes and ladders board game built using the iGraphics library of C with custom graphics designed in Photoshop.",
    tags: ["C", "iGraphics", "Photoshop", "Game Development"],
    github: "https://github.com/SuvroGfz/igraphics-snakes-and-ladders.git",
    demo: "https://www.facebook.com/suvro.gfg20/videos/1409330262746418",
  },
];

const Projects = () => {
  const durations = ["5s", "6s", "7s", "5.5s", "6.5s", "5.8s", "7.2s", "6.2s"];
  const delays = ["0s", "0.8s", "1.6s", "2.4s", "0.4s", "1.2s", "2s", "0.6s"];

  return (
    <section
      id="projects"
      className="relative section-padding bg-section-bg/60 backdrop-blur-sm overflow-hidden"
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

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <AntigravityCard
              key={project.title}
              floatDuration={durations[index % durations.length]}
              floatDelay={delays[index % delays.length]}
              index={index}
            >
              <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  {project.wip && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-400/40 bg-amber-500/15 text-amber-300 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      WIP
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300 backdrop-blur-sm font-normal hover:border-emerald-400/40 hover:bg-emerald-500/20 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-auto pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-[100px] border-white/15 bg-transparent hover:bg-primary/10 hover:border-primary hover:text-primary transition-all"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.live && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[100px] border-white/15 bg-transparent hover:bg-accent/10 hover:border-accent hover:text-accent transition-all"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live App
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[100px] border-white/15 bg-transparent hover:bg-accent/10 hover:border-accent hover:text-accent transition-all"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.linkedin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[100px] border-white/15 bg-transparent hover:bg-accent/10 hover:border-accent hover:text-accent transition-all"
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
            </AntigravityCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
