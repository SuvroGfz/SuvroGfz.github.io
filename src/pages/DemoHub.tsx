import { Link } from "react-router-dom";

const demos = [
  {
    id: 1,
    path: "/demo/1",
    title: "Crystal Mesh Hero",
    subtitle: "Interactive Morphing Geometry",
    description:
      "A morphing icosahedron with distort material, wireframe overlay, and mouse-reactive rotation. Features bloom glow and glass-like translucency — the ultimate hero centerpiece.",
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    accent: "cyan",
  },
  {
    id: 2,
    path: "/demo/2",
    title: "Particle Constellation",
    subtitle: "Connected Network + Mouse Magnetism",
    description:
      "Floating particles that connect with proximity lines forming a constellation network. Particles react to your cursor with magnetic attraction/repulsion and drift organically.",
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    accent: "violet",
  },
  {
    id: 3,
    path: "/demo/3",
    title: "Antigravity Cards",
    subtitle: "Levitating 3D Tilt + Dynamic Shadows",
    description:
      "Cards that float in zero gravity with staggered timing, 3D mouse-tracking tilt, dynamic shadows that respond to float height, and glowing borders. Skills/About section showcase.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "emerald",
  },
  {
    id: 4,
    path: "/demo/4",
    title: "Aurora Glass",
    subtitle: "Flowing Gradients + Deep Glassmorphism",
    description:
      "Animated aurora gradient blobs flowing organically behind layered glass panels. Features shine-sweep hover effects, glow dividers, and premium depth with refraction-style borders.",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    accent: "pink",
  },
  {
    id: 5,
    path: "/demo/5",
    title: "Scroll 3D Reveals",
    subtitle: "Perspective Entrance + Mouse Parallax",
    description:
      "Content sections that rotate in from 3D perspective on scroll. Multi-layer mouse parallax creates depth. 3D text shadows, glowing timeline, and cinematic section transitions.",
    gradient: "from-amber-500 via-yellow-500 to-lime-500",
    accent: "amber",
  },
];

const DemoHub = () => {
  return (
    <div className="min-h-screen bg-[hsl(240,45%,5%)] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 cosmic-backdrop" />
        <div className="absolute inset-0 stars-layer pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            to="/"
            className="inline-block mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:bg-white/10 transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            3D Effect{" "}
            <span className="text-gradient">Showcase</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Browse 5 different 3D effect combinations. Pick your favorites and
            mix-and-match to create your perfect portfolio design.
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              to={demo.path}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 overflow-hidden transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06] hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(100,200,255,0.3)]"
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${demo.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              {/* Demo number */}
              <div className="text-6xl font-black text-white/[0.04] absolute top-4 right-4 group-hover:text-white/[0.08] transition-colors">
                {demo.id}
              </div>

              <div className="relative">
                <h2 className="text-2xl font-bold mb-1 group-hover:text-gradient transition-colors duration-300">
                  {demo.title}
                </h2>
                <p className="text-sm text-white/50 mb-4 font-medium">
                  {demo.subtitle}
                </p>
                <p className="text-sm text-white/40 leading-relaxed mb-6">
                  {demo.description}
                </p>
                <div className="flex items-center text-sm text-white/50 group-hover:text-white/80 transition-colors">
                  <span>View Demo</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}

          {/* "Mix & Match" info card */}
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 flex flex-col justify-center items-center text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold mb-2 text-white/80">
              Mix & Match
            </h3>
            <p className="text-sm text-white/40">
              After viewing all demos, tell me which effects you want to combine.
              I'll integrate your favorites into the final design!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoHub;
