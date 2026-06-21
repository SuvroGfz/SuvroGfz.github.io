import { useRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  3D Scene Components                                                */
/* ------------------------------------------------------------------ */

/** Tracks normalized mouse position across the viewport */
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  if (typeof window !== "undefined") {
    // We attach once; fine for a single‑page demo
    window.addEventListener(
      "mousemove",
      (e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      },
      { passive: true }
    );
  }

  return mouse;
}

/** The morphing icosahedron + wireframe overlay */
function CrystalMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null!);
  const mouse = useMousePosition();

  // Scratch objects so we don't allocate every frame
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const colorA = useMemo(() => new THREE.Color("#00d4ff"), []);
  const colorB = useMemo(() => new THREE.Color("#7c3aed"), []);
  const scratchColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    /* ---------- colour shift ---------- */
    const blend = (Math.sin(t * 0.4) + 1) / 2;
    scratchColor.copy(colorA).lerp(colorB, blend);
    if (matRef.current) {
      matRef.current.color = scratchColor;
      // oscillate distort between 0.3 and 0.6
      matRef.current.distort = 0.3 + 0.15 * (Math.sin(t * 0.8) + 1);
    }

    /* ---------- mouse‑reactive rotation ---------- */
    euler.set(mouse.current.y * 0.4, mouse.current.x * 0.4, 0, "XYZ");
    targetQuat.setFromEuler(euler);
    meshRef.current.quaternion.slerp(targetQuat, 0.05);
    wireRef.current.quaternion.copy(meshRef.current.quaternion);

    /* ---------- ambient vertical bob ---------- */
    const bob = Math.sin(t * 0.6) * 0.25;
    meshRef.current.position.y = bob;
    wireRef.current.position.y = bob;
  });

  return (
    <group>
      {/* Main crystal */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 4]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#00d4ff"
          transparent
          opacity={0.55}
          roughness={0.15}
          metalness={0.8}
          distort={0.4}
          speed={2.5}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef} scale={1.02}>
        <icosahedronGeometry args={[1.8, 4]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Scene wrapper — lights, postprocessing, camera */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#7c3aed" />

      <CrystalMesh />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating decorative elements (CSS-animated)                        */
/* ------------------------------------------------------------------ */

const floaters: { id: number; size: number; top: string; left: string; delay: string; duration: string; shape: "diamond" | "circle" }[] = [
  { id: 1, size: 10, top: "18%", left: "12%", delay: "0s", duration: "6s", shape: "diamond" },
  { id: 2, size: 8, top: "72%", left: "82%", delay: "1.5s", duration: "7s", shape: "circle" },
  { id: 3, size: 12, top: "35%", left: "88%", delay: "3s", duration: "5.5s", shape: "diamond" },
];

function FloatingDecor() {
  return (
    <>
      {floaters.map((f) => (
        <span
          key={f.id}
          className="absolute pointer-events-none"
          style={{
            top: f.top,
            left: f.left,
            width: f.size,
            height: f.size,
            background:
              f.shape === "diamond"
                ? "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)"
                : "radial-gradient(circle, #00d4ff 0%, #7c3aed 100%)",
            borderRadius: f.shape === "circle" ? "50%" : "2px",
            transform: f.shape === "diamond" ? "rotate(45deg)" : undefined,
            opacity: 0.7,
            animation: `floatDecor ${f.duration} ease-in-out ${f.delay} infinite`,
          }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function Demo1CrystalMesh() {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        "bg-[#0a0a1a]"
      )}
    >
      {/* ---- Inline keyframes ---- */}
      <style>{`
        @keyframes floatDecor {
          0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.7; }
          50%      { transform: translateY(-20px) rotate(45deg); opacity: 1; }
        }
        @keyframes subtleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2); }
          50%      { text-shadow: 0 0 30px rgba(0,212,255,0.7), 0 0 60px rgba(0,212,255,0.35); }
        }
      `}</style>

      {/* ---- Radial glow behind mesh ---- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)",
        }}
      />

      {/* ---- Back link ---- */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-30"
      >
        <Link
          to="/demos"
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            "text-cyan-300/80 hover:text-cyan-200 transition-colors duration-200"
          )}
        >
          ← Back to Demos
        </Link>
      </motion.div>

      {/* ---- Title banner ---- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-30"
      >
        <h2
          className={cn(
            "text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold",
            "text-cyan-400/70 bg-cyan-400/5 border border-cyan-400/10",
            "px-5 py-2 rounded-full backdrop-blur-sm"
          )}
        >
          Demo 1: Crystal Mesh Hero
        </h2>
      </motion.div>

      {/* ---- 3D Canvas ---- */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* ---- Floating decorations ---- */}
      <FloatingDecor />

      {/* ---- Hero Text Overlay ---- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-widest"
          style={{
            color: "#e0f7ff",
            textShadow: `
              0 1px 0 #00c8f0,
              0 2px 0 #00b8e0,
              0 3px 0 #00a8d0,
              0 4px 0 #0098c0,
              0 5px 0 #0088b0,
              0 6px 0 #0078a0,
              0 7px 0 #006890,
              0 8px 0 #005880,
              0 0 20px rgba(0,212,255,0.6),
              0 0 40px rgba(0,212,255,0.35),
              0 0 80px rgba(0,212,255,0.15),
              0 12px 30px rgba(0,0,0,0.5)
            `,
          }}
        >
          SUVRO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-4 text-sm sm:text-base md:text-lg font-medium tracking-wide text-cyan-100/70"
          style={{
            animation: "subtleGlow 3s ease-in-out infinite",
          }}
        >
          Computer Science Graduate | Full-Stack Developer
        </motion.p>
      </div>
    </div>
  );
}
