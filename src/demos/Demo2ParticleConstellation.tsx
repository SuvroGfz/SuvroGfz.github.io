import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";

/* ─────────────────────────────── constants ────────────────────────────── */

const PARTICLE_COUNT = 200;
const SPHERE_RADIUS = 8;
const CONNECTION_DISTANCE = 2.5;
const MOUSE_RADIUS = 3;
const MOUSE_REPEL_STRENGTH = 0.04;

const PALETTE = [
  new THREE.Color("#22d3ee"), // cyan
  new THREE.Color("#a855f7"), // violet
  new THREE.Color("#ec4899"), // pink
  new THREE.Color("#ffffff"), // white
];

/* ────────────────────── helper: random point in sphere ────────────────── */

function randomInSphere(radius: number): [number, number, number] {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.cbrt(Math.random());
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

/* ────────────────── per-particle drift metadata ──────────────────────── */

interface ParticleData {
  basePos: THREE.Vector3;
  speed: THREE.Vector3; // sin-wave speed per axis
  phase: THREE.Vector3; // sin-wave phase offset per axis
  amplitude: THREE.Vector3;
}

function buildParticleData(): ParticleData[] {
  const data: ParticleData[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const [x, y, z] = randomInSphere(SPHERE_RADIUS);
    data.push({
      basePos: new THREE.Vector3(x, y, z),
      speed: new THREE.Vector3(
        0.15 + Math.random() * 0.35,
        0.15 + Math.random() * 0.35,
        0.15 + Math.random() * 0.35
      ),
      phase: new THREE.Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ),
      amplitude: new THREE.Vector3(
        0.3 + Math.random() * 0.5,
        0.3 + Math.random() * 0.5,
        0.3 + Math.random() * 0.5
      ),
    });
  }
  return data;
}

/* ───────────────────── 3-D Mouse tracker component ───────────────────── */

function useMouseWorld() {
  const mouse3D = useRef(new THREE.Vector3(0, 0, 0));
  const { camera, size } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const ndcX = (e.clientX / size.width) * 2 - 1;
      const ndcY = -(e.clientY / size.height) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      mouse3D.current = camera.position.clone().add(dir.multiplyScalar(dist));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [camera, size]);

  return mouse3D;
}

/* ───────────────────── Particle system + connections ──────────────────── */

function ParticleConstellation() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse3D = useMouseWorld();

  // Build initial state
  const { positions, colors, sizes, particleData } = useMemo(() => {
    const data = buildParticleData();
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = data[i].basePos;
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;

      const c = PALETTE[i % PALETTE.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = 0.04 + Math.random() * 0.04;
    }

    return { positions: pos, colors: col, sizes: sz, particleData: data };
  }, []);

  // Max possible line segments
  const maxLines = PARTICLE_COUNT * 12; // heuristic upper bound
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 2 * 3),
    [maxLines]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxLines * 2 * 3),
    [maxLines]
  );

  // Temp vectors for the frame loop
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  const tmpMouse = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pts = pointsRef.current;
    const lines = linesRef.current;
    if (!pts || !lines) return;

    const posAttr = pts.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    // 1. Update particle positions (drift + mouse repel)
    tmpMouse.copy(mouse3D.current);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const d = particleData[i];
      const i3 = i * 3;

      // Sine-wave drift
      let x =
        d.basePos.x +
        Math.sin(t * d.speed.x + d.phase.x) * d.amplitude.x;
      let y =
        d.basePos.y +
        Math.sin(t * d.speed.y + d.phase.y) * d.amplitude.y;
      let z =
        d.basePos.z +
        Math.sin(t * d.speed.z + d.phase.z) * d.amplitude.z;

      // Mouse repulsion
      tmpA.set(x, y, z);
      const dist = tmpA.distanceTo(tmpMouse);
      if (dist < MOUSE_RADIUS && dist > 0.001) {
        const force =
          MOUSE_REPEL_STRENGTH * (1 - dist / MOUSE_RADIUS);
        tmpA.sub(tmpMouse).normalize().multiplyScalar(force);
        x += tmpA.x;
        y += tmpA.y;
        z += tmpA.z;
      }

      posArr[i3] = x;
      posArr[i3 + 1] = y;
      posArr[i3 + 2] = z;
    }
    posAttr.needsUpdate = true;

    // 2. Connection lines
    const lPosAttr = lines.geometry.attributes
      .position as THREE.BufferAttribute;
    const lColAttr = lines.geometry.attributes
      .color as THREE.BufferAttribute;
    const lPosArr = lPosAttr.array as Float32Array;
    const lColArr = lColAttr.array as Float32Array;

    let seg = 0;
    const cyanR = 0.133,
      cyanG = 0.827,
      cyanB = 0.933;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (seg >= maxLines) break;
      tmpA.set(
        posArr[i * 3],
        posArr[i * 3 + 1],
        posArr[i * 3 + 2]
      );

      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (seg >= maxLines) break;
        tmpB.set(
          posArr[j * 3],
          posArr[j * 3 + 1],
          posArr[j * 3 + 2]
        );
        const d = tmpA.distanceTo(tmpB);
        if (d < CONNECTION_DISTANCE) {
          const alpha = 1 - d / CONNECTION_DISTANCE;
          const idx = seg * 6;

          lPosArr[idx] = tmpA.x;
          lPosArr[idx + 1] = tmpA.y;
          lPosArr[idx + 2] = tmpA.z;
          lPosArr[idx + 3] = tmpB.x;
          lPosArr[idx + 4] = tmpB.y;
          lPosArr[idx + 5] = tmpB.z;

          // Color fades with distance
          lColArr[idx] = cyanR * alpha;
          lColArr[idx + 1] = cyanG * alpha;
          lColArr[idx + 2] = cyanB * alpha;
          lColArr[idx + 3] = cyanR * alpha;
          lColArr[idx + 4] = cyanG * alpha;
          lColArr[idx + 5] = cyanB * alpha;

          seg++;
        }
      }
    }

    // Clear remaining segments
    for (let k = seg; k < maxLines; k++) {
      const idx = k * 6;
      lPosArr[idx] = 0;
      lPosArr[idx + 1] = 0;
      lPosArr[idx + 2] = 0;
      lPosArr[idx + 3] = 0;
      lPosArr[idx + 4] = 0;
      lPosArr[idx + 5] = 0;
      lColArr[idx] = 0;
      lColArr[idx + 1] = 0;
      lColArr[idx + 2] = 0;
      lColArr[idx + 3] = 0;
      lColArr[idx + 4] = 0;
      lColArr[idx + 5] = 0;
    }

    lPosAttr.needsUpdate = true;
    lColAttr.needsUpdate = true;
    lines.geometry.setDrawRange(0, seg * 2);
  });

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

/* ─────────────────────── Scene wrapper (bloom) ───────────────────────── */

function Scene() {
  return (
    <>
      <color attach="background" args={["#050510"]} />
      <ambientLight intensity={0.1} />
      <ParticleConstellation />
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ─────────────── Hero Text Overlay with mouse parallax ───────────────── */

function HeroOverlay() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10"
      style={{
        transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-[clamp(4rem,12vw,10rem)] font-black leading-none tracking-tighter"
        style={{
          background:
            "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 40px rgba(34,211,238,0.35))",
        }}
      >
        SUVRO
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="mt-3 text-lg md:text-xl text-white/60 font-light tracking-widest uppercase"
      >
        Particle Constellation
      </motion.p>
    </div>
  );
}

/* ───────────── Floating glassmorphism info cards ──────────────────────── */

const INFO_CARDS = [
  {
    title: "200 Particles",
    description: "Points adrift in a cosmic sphere",
    icon: "✦",
  },
  {
    title: "Dynamic Connections",
    description: "Distance-based line network",
    icon: "⬡",
  },
  {
    title: "Mouse Reactive",
    description: "Magnetic repulsion on hover",
    icon: "◎",
  },
];

function InfoCards() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4 md:gap-6 flex-wrap justify-center px-4">
      {INFO_CARDS.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.6 + i * 0.15,
            ease: "easeOut",
          }}
          className="relative group"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="rounded-2xl px-5 py-4 min-w-[160px] text-center backdrop-blur-xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(168,85,247,0.06) 100%)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-2xl mb-1">{card.icon}</div>
            <h3
              className="text-sm font-semibold tracking-wide"
              style={{
                background:
                  "linear-gradient(90deg, #22d3ee, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {card.title}
            </h3>
            <p className="text-[11px] text-white/40 mt-1 leading-snug">
              {card.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────── Back link + title banner ──────────────────────── */

function TopBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4">
      <Link
        to="/demos"
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors duration-300 group"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        Back to Demos
      </Link>

      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs md:text-sm text-white/40 font-mono tracking-wider"
      >
        Demo 2: Particle Constellation
      </motion.span>
    </div>
  );
}

/* ────────────────────────── Main Page Export ──────────────────────────── */

export default function Demo2ParticleConstellation() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050510]">
      <TopBar />

      {/* R3F Canvas — fullscreen */}
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene />
      </Canvas>

      <HeroOverlay />
      <InfoCards />
    </div>
  );
}
