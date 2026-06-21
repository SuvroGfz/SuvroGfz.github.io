import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ──────────────────────────── data ──────────────────────────── */

const skillCards = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs"],
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "Docker", "GitHub Actions", "Linux"],
    gradient: "from-amber-500/20 to-orange-600/20",
  },
];

const timelineData = [
  {
    year: "2025",
    title: "Associate Software Engineer at Therap BD LTD",
    desc: "Building enterprise healthcare solutions with Java and modern web technologies.",
  },
  {
    year: "2024",
    title: "2nd Runners Up — Therap Javafest (PetPalok)",
    desc: "Competed nationally, delivering a full-stack pet-care platform in 24 hours.",
  },
  {
    year: "2024",
    title: "Graduated from BUET — CGPA 3.54",
    desc: "B.Sc. in Computer Science & Engineering from Bangladesh University of Engineering and Technology.",
  },
];

const projectCards = [
  {
    title: "PetPalok",
    desc: "A comprehensive pet-care platform connecting pet owners with veterinarians and services.",
    tags: ["Java", "Spring Boot", "React"],
  },
  {
    title: "Portfolio v3",
    desc: "This immersive 3D portfolio site built with Framer Motion and cinematic scroll effects.",
    tags: ["React", "TypeScript", "Framer Motion"],
  },
  {
    title: "DevBoard",
    desc: "Real-time collaborative dashboard for developer teams with Kanban and analytics.",
    tags: ["Next.js", "Socket.io", "Prisma"],
  },
  {
    title: "CloudSync",
    desc: "File synchronisation tool with end-to-end encryption and cross-platform support.",
    tags: ["Node.js", "AWS S3", "Electron"],
  },
];

/* ──────────────────────── glow divider ──────────────────────── */

function GlowDivider() {
  return (
    <motion.div
      className="relative mx-auto my-20 h-[2px] w-3/4 max-w-3xl"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-md opacity-70" />
    </motion.div>
  );
}

/* ──────────────────── component ──────────────────── */

export default function Demo5Scroll3DReveals() {
  /* ── mouse parallax ref ── */
  const mouseRef = useRef({ x: 0, y: 0 });
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 → 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x: nx, y: ny };
    };

    const animate = () => {
      const { x, y } = mouseRef.current;
      if (layer1.current)
        layer1.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      if (layer2.current)
        layer2.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      if (layer3.current)
        layer3.current.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* ── scroll progress bar ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div className="relative min-h-screen bg-[var(--background,#0a0a1a)] text-white overflow-x-hidden">
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        style={{ scaleX }}
      />

      {/* ─── nav ─── */}
      <nav className="sticky top-0 z-40 flex items-center gap-4 px-6 py-4 backdrop-blur-lg bg-black/30 border-b border-white/5">
        <Link
          to="/demos"
          className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          ← Back to Demos
        </Link>
        <span className="text-white/30">|</span>
        <span className="text-sm text-white/50 tracking-wide">
          Demo 5 — Scroll 3D Reveals
        </span>
      </nav>

      {/* ─── title banner ─── */}
      <motion.section
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Demo 5: Scroll 3D Reveals
        </h1>
        <p className="mt-4 max-w-xl text-white/50 text-lg">
          Every section enters the viewport with its own cinematic 3D animation.
          Scroll down&nbsp;↓
        </p>
      </motion.section>

      {/* ═══════════ SECTION 1 — Hero with Mouse Parallax ═══════════ */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden select-none">
        {/* Layer 1 — background circles */}
        <div
          ref={layer1}
          className="pointer-events-none absolute inset-0 will-change-transform"
          aria-hidden
        >
          <div className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-cyan-600/30 to-transparent blur-3xl" />
          <div className="absolute bottom-[20%] right-[12%] w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/25 to-transparent blur-3xl" />
          <div className="absolute top-[50%] left-[55%] w-60 h-60 rounded-full bg-gradient-to-br from-pink-600/20 to-transparent blur-3xl" />
        </div>

        {/* Layer 2 — name */}
        <div
          ref={layer2}
          className="pointer-events-none relative z-10 will-change-transform"
        >
          <h2
            className="text-[8rem] md:text-[12rem] font-black tracking-tighter leading-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px rgba(255,255,255,0.12)",
              textShadow:
                "0 0 60px rgba(6,182,212,0.35), 0 0 120px rgba(168,85,247,0.2), 4px 4px 0 rgba(6,182,212,0.15)",
            }}
          >
            SUVRO
          </h2>
        </div>

        {/* Layer 3 — floating shapes */}
        <div
          ref={layer3}
          className="pointer-events-none absolute inset-0 z-20 will-change-transform"
          aria-hidden
        >
          {/* triangle */}
          <div
            className="absolute top-[25%] left-[20%]"
            style={{
              width: 0,
              height: 0,
              borderLeft: "18px solid transparent",
              borderRight: "18px solid transparent",
              borderBottom: "32px solid rgba(6,182,212,0.5)",
              filter: "drop-shadow(0 0 8px rgba(6,182,212,0.6))",
            }}
          />
          {/* diamond */}
          <div
            className="absolute top-[40%] right-[15%] w-6 h-6 rotate-45 bg-purple-400/50"
            style={{
              boxShadow: "0 0 12px rgba(168,85,247,0.6)",
            }}
          />
          {/* triangle 2 */}
          <div
            className="absolute bottom-[30%] left-[60%]"
            style={{
              width: 0,
              height: 0,
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderBottom: "24px solid rgba(236,72,153,0.5)",
              filter: "drop-shadow(0 0 8px rgba(236,72,153,0.6))",
            }}
          />
          {/* small diamond */}
          <div
            className="absolute top-[60%] left-[30%] w-4 h-4 rotate-45 bg-cyan-400/40"
            style={{ boxShadow: "0 0 10px rgba(6,182,212,0.5)" }}
          />
          {/* another triangle */}
          <div
            className="absolute top-[18%] right-[35%]"
            style={{
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "18px solid rgba(168,85,247,0.45)",
              filter: "drop-shadow(0 0 6px rgba(168,85,247,0.5))",
            }}
          />
          {/* diamond */}
          <div
            className="absolute bottom-[22%] right-[40%] w-5 h-5 rotate-45 bg-pink-400/40"
            style={{ boxShadow: "0 0 10px rgba(236,72,153,0.5)" }}
          />
        </div>

        {/* scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>SCROLL</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </section>

      <GlowDivider />

      {/* ═══════════ SECTION 2 — Skills Cards Rotating In ═══════════ */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Skills &amp; Expertise
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ perspective: "1200px" }}
        >
          {skillCards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${card.gradient} backdrop-blur-xl p-8 shadow-lg`}
              initial={{
                opacity: 0,
                rotateY: -45,
                x: -100,
                z: -200,
              }}
              whileInView={{
                opacity: 1,
                rotateY: 0,
                x: 0,
                z: 0,
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-white/90">
                {card.title}
              </h3>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-white/60 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowDivider />

      {/* ═══════════ SECTION 3 — Timeline with Glowing Orbs ═══════════ */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Journey
        </motion.h2>

        <div className="relative" style={{ perspective: "1200px" }}>
          {/* gradient line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, #06b6d4, #a855f7, #ec4899)",
              boxShadow: "0 0 12px rgba(6,182,212,0.4)",
            }}
          />

          <div className="space-y-16">
            {timelineData.map((entry, i) => (
              <div key={i} className="relative pl-16">
                {/* glowing orb */}
                <div
                  className="absolute left-[18px] top-2 w-4 h-4 rounded-full bg-cyan-400"
                  style={{
                    boxShadow:
                      "0 0 20px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.5)",
                  }}
                />

                <motion.div
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6"
                  initial={{ opacity: 0, rotateY: 30, x: 60 }}
                  whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <span className="inline-block text-xs font-mono tracking-wider text-cyan-400 mb-2">
                    {entry.year}
                  </span>
                  <h3 className="text-lg font-semibold text-white/90 mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {entry.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      {/* ═══════════ SECTION 4 — Project Cards Flipping In ═══════════ */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ perspective: "1200px" }}
        >
          {projectCards.map((proj, i) => (
            <motion.div
              key={proj.title}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 cursor-default transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              <h3 className="text-xl font-semibold text-white/90 mb-2 group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <GlowDivider />

      {/* ═══════════ SECTION 5 — Contact Section ═══════════ */}
      <section className="px-6 py-24 max-w-2xl mx-auto">
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-center text-white/40 text-sm mb-8">
            Have a project in mind? Let's make something amazing.
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-xs text-white/40 mb-1 tracking-wide">
                NAME
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1 tracking-wide">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1 tracking-wide">
                MESSAGE
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project…"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 transition-all"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      {/* footer spacer */}
      <div className="h-24" />
    </div>
  );
}
