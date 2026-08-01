"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

/**
 * Stylized Fujifilm X-T4 + XF 18-55mm f/2.8-4 R LM OIS, assembled from Three.js
 * primitives. Not photorealistic — a good real model would require a proper
 * GLTF/GLB asset (drop one in and swap `<Fuji />` for `<primitive object={gltf.scene}/>`).
 * OrbitControls let visitors drag to rotate; auto-rotate turns while idle.
 */
export function CameraViewer() {
  return (
    <div className="camera-viewer">
      <Canvas
        camera={{ position: [3.4, 1.6, 4.2], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[6, 8, 5]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-5, 3, -4]} intensity={0.35} />
          <spotLight
            position={[0, 6, 2]}
            angle={0.6}
            penumbra={0.8}
            intensity={0.6}
            color="#a8ffe0"
          />

          <Fuji />

          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.55}
            scale={8}
            blur={2.4}
            far={4}
          />
          <Environment preset="studio" />

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={3.5}
            maxDistance={7}
            minPolarAngle={Math.PI / 3.4}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate
            autoRotateSpeed={0.9}
            dampingFactor={0.08}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ---------- The camera itself ---------- */

const BODY_COLOR = "#0d0d0f";
const BODY_GRIP = "#050506";
const METAL = "#a9adb2";
const METAL_DARK = "#464a50";
const LENS_BLACK = "#111114";
const RED = "#d43636";

function Fuji() {
  const group = useRef<Group>(null);

  // A very light idle bob so the whole thing feels alive even when the user
  // has damped OrbitControls to a stop.
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.9) * 0.02;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <Body />
      <Lens />
    </group>
  );
}

function Body() {
  return (
    <group>
      {/* Main body slab */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.35, 0.75]} />
        <meshStandardMaterial
          color={BODY_COLOR}
          roughness={0.55}
          metalness={0.15}
        />
      </mesh>

      {/* Textured grip on the right, sticking forward a bit */}
      <mesh castShadow receiveShadow position={[-0.95, -0.05, 0.18]}>
        <boxGeometry args={[0.5, 1.25, 1.05]} />
        <meshStandardMaterial
          color={BODY_GRIP}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Prism / EVF hump */}
      <mesh castShadow receiveShadow position={[0.15, 0.9, 0]}>
        <boxGeometry args={[0.75, 0.45, 0.75]} />
        <meshStandardMaterial
          color={BODY_COLOR}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Hot-shoe */}
      <mesh castShadow position={[0.15, 1.17, 0]}>
        <boxGeometry args={[0.32, 0.05, 0.42]} />
        <meshStandardMaterial color={METAL_DARK} roughness={0.4} metalness={0.9} />
      </mesh>

      {/* Top-plate dials (three, milled aluminum) */}
      <Dial position={[-0.75, 0.78, 0]} />
      <Dial position={[0.72, 0.78, -0.18]} />
      <Dial position={[0.72, 0.78, 0.18]} radius={0.14} />

      {/* Shutter button */}
      <mesh castShadow position={[-0.75, 0.88, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 24]} />
        <meshStandardMaterial color={METAL} roughness={0.35} metalness={0.85} />
      </mesh>

      {/* Rear LCD panel — visible edge when rotated */}
      <mesh position={[0.15, 0, -0.385]}>
        <boxGeometry args={[1.8, 1.1, 0.02]} />
        <meshStandardMaterial color="#111" roughness={0.15} metalness={0.25} />
      </mesh>

      {/* Red badge on the front (Fuji signature) */}
      <mesh position={[-0.85, 0.55, 0.376]}>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <meshStandardMaterial
          color={RED}
          roughness={0.4}
          metalness={0.2}
          emissive={RED}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Strap lugs */}
      <StrapLug position={[-1.24, 0.55, 0]} />
      <StrapLug position={[1.24, 0.55, 0]} />
    </group>
  );
}

function Dial({
  position,
  radius = 0.18,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, 0.16, 32]} />
        <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* knurling suggestion — a slightly darker ring on top */}
      <mesh position={[0, 0.081, 0]}>
        <cylinderGeometry args={[radius * 0.85, radius * 0.85, 0.005, 32]} />
        <meshStandardMaterial color={METAL_DARK} roughness={0.6} metalness={0.6} />
      </mesh>
    </group>
  );
}

function StrapLug({ position }: { position: [number, number, number] }) {
  return (
    <mesh castShadow position={position}>
      <torusGeometry args={[0.09, 0.03, 12, 24]} />
      <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.9} />
    </mesh>
  );
}

function Lens() {
  // Lens sits forward of the body along +Z.
  return (
    <group position={[0.15, -0.05, 0.55]}>
      {/* Mount ring flush with body */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 48]} />
        <meshStandardMaterial color={METAL_DARK} roughness={0.35} metalness={0.85} />
      </mesh>

      {/* Barrel */}
      <mesh castShadow position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.55, 48]} />
        <meshStandardMaterial color={LENS_BLACK} roughness={0.6} metalness={0.15} />
      </mesh>

      {/* Zoom ring */}
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.22, 48]} />
        <meshStandardMaterial color={"#1a1a1c"} roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Focus ring (thinner, closer to the front) */}
      <mesh position={[0, 0, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.51, 0.51, 0.1, 48]} />
        <meshStandardMaterial color={"#242427"} roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Front barrel (holds the glass) */}
      <mesh castShadow position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 48]} />
        <meshStandardMaterial color={LENS_BLACK} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Front element — dark glass, subtly reflective */}
      <mesh position={[0, 0, 0.92]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 48]} />
        <meshStandardMaterial
          color={"#050810"}
          roughness={0.05}
          metalness={0.65}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Front rim (silver highlight) */}
      <mesh position={[0, 0, 0.93]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.015, 12, 48]} />
        <meshStandardMaterial color={METAL} roughness={0.25} metalness={0.9} />
      </mesh>
    </group>
  );
}
