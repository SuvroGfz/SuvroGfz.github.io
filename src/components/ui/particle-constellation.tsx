import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const COUNT = 1800;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, basePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, basePositions: positions.slice() };
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
    const t = state.clock.elapsedTime;
    if (!pointsRef.current) return;

    // Smooth rotation toward mouse position
    pointsRef.current.rotation.y +=
      (mouse.current.x * 0.5 - pointsRef.current.rotation.y) * 0.03;
    pointsRef.current.rotation.x +=
      (-mouse.current.y * 0.3 - pointsRef.current.rotation.x) * 0.03;

    // Slow base drift
    pointsRef.current.rotation.z = t * 0.02;

    // Gentle breathing on Z axis
    const geo = pointsRef.current.geometry;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      arr[ix + 2] =
        basePositions[ix + 2] + Math.sin(t * 0.6 + basePositions[ix] * 0.3) * 0.15;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={"#22d3ee"}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NebulaOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial
        color={"#a855f7"}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

interface Props {
  className?: string;
}

export function ParticleConstellation({ className }: Props) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <NebulaOrb />
        <Particles />
      </Canvas>
    </div>
  );
}
