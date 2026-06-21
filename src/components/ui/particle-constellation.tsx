import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const STAR_COUNT = 3500;
const GALAXY_COUNT = 4000;

/** Distant twinkling starfield filling the whole sky */
function Starfield() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#a5b4fc"), // indigo
      new THREE.Color("#7dd3fc"), // sky
      new THREE.Color("#f9a8d4"), // pink
      new THREE.Color("#fde68a"), // gold
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 0.06 + 0.015;
    }
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.01;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.75 + Math.sin(t * 1.5) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={STAR_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Spiral galaxy of nebula particles */
function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(GALAXY_COUNT * 3);
    const colors = new Float32Array(GALAXY_COUNT * 3);

    const inside = new THREE.Color("#a855f7"); // violet core
    const outside = new THREE.Color("#22d3ee"); // cyan arms
    const tip = new THREE.Color("#ec4899"); // pink edges

    const branches = 4;
    const radius = 9;
    const spin = 1.2;
    const randomness = 0.45;
    const randomnessPower = 3;

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const r = Math.pow(Math.random(), 1.6) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const rx =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const ry =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r *
        0.3;
      const rz =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz;

      const mixed = inside.clone().lerp(outside, r / radius);
      mixed.lerp(tip, Math.pow(r / radius, 3) * 0.6);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    return { positions, colors };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.06;
    pointsRef.current.rotation.x +=
      (-mouse.current.y * 0.4 - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.z +=
      (mouse.current.x * 0.3 - pointsRef.current.rotation.z) * 0.02;
  });

  return (
    <points ref={pointsRef} position={[0, -1, -2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={GALAXY_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={GALAXY_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Shooting star streaks */
function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null!);
  const stars = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        offset: i * 4,
        speed: 0.6 + Math.random() * 0.4,
        y: 4 + Math.random() * 4,
        z: -5 - Math.random() * 4,
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const s = stars[i];
      const cycle = ((t * s.speed + s.offset) % 12) - 6;
      child.position.set(cycle, s.y - cycle * 0.25, s.z);
      (child as THREE.Mesh).rotation.z = Math.PI / 6;
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1.6, 0.02]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

interface Props {
  className?: string;
}

export function ParticleConstellation({ className }: Props) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas
        camera={{ position: [0, 2, 12], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.8]}
      >
        <ambientLight intensity={0.3} />
        <Starfield />
        <Galaxy />
        <ShootingStars />
      </Canvas>
    </div>
  );
}
