import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const glassPanels = [
  {
    title: "Light Glass",
    description:
      "A subtle, minimal-depth glass layer. Content is visible through a delicate frosted surface that barely tints the aurora beneath.",
    tags: ["Minimal", "Subtle", "Elegant"],
    style: {
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  },
  {
    title: "Deep Glass",
    description:
      "The premium glassmorphism showcase. Multiple layers of light refraction, inner glow edges, and deep shadow produce a convincing floating-panel illusion.",
    tags: ["Premium", "Depth", "Refraction"],
    style: {
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderTop: "1px solid rgba(255,255,255,0.2)",
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
    },
  },
  {
    title: "Frosted Glass",
    description:
      "A heavier frost that obscures more of the background while still letting colour bleed through. Ideal for content-heavy sections requiring readability.",
    tags: ["Frosted", "Opaque", "Readable"],
    style: {
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      border: "1px solid rgba(255,255,255,0.15)",
    },
  },
];

const badges = [
  { label: "Full-Stack", delay: 0 },
  { label: "React", delay: 0.5 },
  { label: "TypeScript", delay: 1 },
];

function GlowDivider() {
  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(6,182,212,0.5), transparent)",
        }}
      />
      <div
        className="h-px w-full mt-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(6,182,212,0.3), transparent)",
          filter: "blur(4px)",
          animation: "glowPulse 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function GlassCard({
  panel,
  index,
}: {
  panel: (typeof glassPanels)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl p-8"
      style={{
        ...panel.style,
        willChange: "transform",
      }}
    >
      {/* Shine sweep element */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "60%",
            height: "100%",
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
            transition: "transform 0.6s ease",
            transform: "translateX(-100%)",
          }}
          className="group-hover:!translate-x-[350%]"
        />
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">{panel.title}</h3>
      <p className="text-white/60 text-sm leading-relaxed mb-5">
        {panel.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {panel.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full text-cyan-300/90"
            style={{
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Demo4AuroraGlass() {
  return (
    <>
      {/* Inline keyframes */}
      <style>{`
        @keyframes auroraBlob1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8vw, 6vh); }
          50% { transform: translate(-4vw, 12vh); }
          75% { transform: translate(-8vw, -4vh); }
        }
        @keyframes auroraBlob2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-10vw, -8vh); }
          50% { transform: translate(6vw, -14vh); }
          75% { transform: translate(10vw, 4vh); }
        }
        @keyframes auroraBlob3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(12vw, -6vh); }
          66% { transform: translate(-6vw, 8vh); }
        }
        @keyframes auroraBlob4 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-6vw, 10vh); }
          40% { transform: translate(8vw, 4vh); }
          60% { transform: translate(4vw, -8vh); }
          80% { transform: translate(-10vw, -2vh); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .shine-sweep::after {
          content: '';
          position: absolute;
          inset: 0;
        }

        .group:hover .shine-child {
          transform: translateX(350%) !important;
        }
      `}</style>

      {/* Aurora background — fixed, full viewport */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "#050510" }}>
        {/* Blob 1 — blue, top-left */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "40%",
            height: "40%",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.30)",
            filter: "blur(120px)",
            willChange: "transform",
            animation: "auroraBlob1 20s ease-in-out infinite",
          }}
        />
        {/* Blob 2 — purple, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "-5%",
            width: "35%",
            height: "35%",
            borderRadius: "50%",
            background: "rgba(168,85,247,0.25)",
            filter: "blur(100px)",
            willChange: "transform",
            animation: "auroraBlob2 25s ease-in-out infinite",
          }}
        />
        {/* Blob 3 — cyan, center-bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "35%",
            width: "30%",
            height: "30%",
            borderRadius: "50%",
            background: "rgba(6,182,212,0.20)",
            filter: "blur(140px)",
            willChange: "transform",
            animation: "auroraBlob3 18s ease-in-out infinite",
          }}
        />
        {/* Blob 4 — pink, top-right */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "10%",
            width: "25%",
            height: "25%",
            borderRadius: "50%",
            background: "rgba(236,72,153,0.15)",
            filter: "blur(100px)",
            willChange: "transform",
            animation: "auroraBlob4 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Navigation */}
        <nav className="px-6 py-5">
          <Link
            to="/demos"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
          >
            <span>←</span>
            <span>Back to Demos</span>
          </Link>
        </nav>

        {/* Title banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-2 pb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Demo 4:{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Aurora Glass
            </span>
          </h1>
          <p className="mt-3 text-white/40 text-sm max-w-lg mx-auto">
            Animated aurora gradient backgrounds with deep glassmorphism, shine-sweep hovers, and glow dividers.
          </p>
        </motion.div>

        {/* ── Hero Section ── */}
        <section className="relative flex flex-col items-center justify-center py-20 px-6">
          {/* Large hero name */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black tracking-widest text-center select-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 80px rgba(56,189,248,0.15)",
            }}
          >
            SUVRO
          </motion.h2>

          {/* Floating glassmorphism badges */}
          <div className="flex gap-4 mt-10 flex-wrap justify-center">
            {badges.map((b) => (
              <motion.span
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + b.delay * 0.2 }}
                className="px-5 py-2 rounded-full text-sm font-medium text-cyan-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  animation: `floatBadge 4s ease-in-out ${b.delay}s infinite`,
                  willChange: "transform",
                }}
              >
                {b.label}
              </motion.span>
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* ── Glass Panels Section ── */}
        <section className="max-w-5xl mx-auto px-6 pb-10">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-lg font-semibold text-white/70 mb-10 tracking-wide uppercase"
          >
            Glassmorphism Depth Showcase
          </motion.h3>
          <div className="grid gap-8 md:grid-cols-3">
            {glassPanels.map((panel, i) => (
              <GlassCard key={panel.title} panel={panel} index={i} />
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* ── Feature Highlight Section ── */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl p-10 text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Shine sweep */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "60%",
                  height: "100%",
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                  transition: "transform 0.6s ease",
                  transform: "translateX(-100%)",
                }}
                className="group-hover:!translate-x-[350%]"
              />
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #38bdf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Aurora Effect
            </h3>
            <p className="text-white/50 leading-relaxed max-w-xl mx-auto text-sm">
              Four colour blobs drift through the viewport on independent
              animation cycles, producing an ever-shifting aurora borealis.
              Layered glassmorphism panels let the light bleed through while
              maintaining text legibility. Hover any panel to trigger the
              diagonal shine sweep — a subtle but unmistakable mark of premium
              UI craft.
            </p>

            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              {["Framer Motion", "CSS Blur", "GPU Accelerated", "Zero JS Paint"].map(
                (t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full text-purple-300/80"
                    style={{
                      background: "rgba(168,85,247,0.1)",
                      border: "1px solid rgba(168,85,247,0.2)",
                    }}
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </section>

        {/* Footer spacer */}
        <div className="h-20" />
      </div>
    </>
  );
}
