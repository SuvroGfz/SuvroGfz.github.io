import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Tracks normalized mouse position across the viewport */
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  if (typeof window !== "undefined") {
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

  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const colorA = useMemo(() => new THREE.Color("#10b981"), []); // emerald
  const colorB = useMemo(() => new THREE.Color("#06b6d4"), []); // teal-cyan
  const scratchColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    /* colour shift: emerald ↔ teal */
    const blend = (Math.sin(t * 0.4) + 1) / 2;
    scratchColor.copy(colorA).lerp(colorB, blend);
    if (matRef.current) {
      matRef.current.color = scratchColor;
      matRef.current.distort = 0.3 + 0.15 * (Math.sin(t * 0.8) + 1);
    }

    /* mouse-reactive rotation */
    euler.set(mouse.current.y * 0.4, mouse.current.x * 0.4, 0, "XYZ");
    targetQuat.setFromEuler(euler);
    meshRef.current.quaternion.slerp(targetQuat, 0.05);
    wireRef.current.quaternion.copy(meshRef.current.quaternion);

    /* ambient vertical bob */
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
          color="#10b981"
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

/** Full scene with lights + post-processing */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#10b981" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#06b6d4" />

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

/** The full-canvas crystal mesh component for the hero section */
export default function HeroMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
