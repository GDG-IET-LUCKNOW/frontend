"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import { Code2, Database, Globe, Smartphone, Cloud, Triangle, Cpu, Layout } from "lucide-react";

const ICONS = [
  { image: "/bubbles/htmlBub.png" },
  { image: "/bubbles/jsBub.png" },
  { image: "/bubbles/nextBub.png" },
  { image: "/bubbles/pythonbub.png" },
  { image: "/bubbles/reactbub.png" },
];

function Bubble({ position, image, size = 1 }: any) {
  const rigidRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);

  const zPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered || dragging) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }

    if (rigidRef.current) {
      const p = rigidRef.current.translation();

      if (dragging) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(state.pointer, state.camera);
        const intersect = new THREE.Vector3();
        raycaster.ray.intersectPlane(zPlane, intersect);

        const dir = new THREE.Vector3().subVectors(intersect, p);
        rigidRef.current.setLinvel({ x: dir.x * 20, y: dir.y * 20, z: 0 }, true);
      } else {
        // Pure chaotic wandering (relying on container bounds to keep them inside)
        const wanderForce = new THREE.Vector3(
          (Math.random() - 0.5) * 8.0 * size * size,
          (Math.random() - 0.5) * 8.0 * size * size,
          0
        );
        rigidRef.current.applyImpulse(wanderForce, true);
      }
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);

    // Slingshot release
    if (rigidRef.current) {
      rigidRef.current.applyImpulse({
        x: (Math.random() - 0.5) * 80, // Super aggressive manual flick
        y: (Math.random() - 0.5) * 80,
        z: 0
      }, true);
    }
  };

  return (
    <RigidBody
      ref={rigidRef}
      position={position}
      colliders="ball"
      type="dynamic"
      linearDamping={0.8}
      angularDamping={0.8}
      restitution={1.2}
      friction={0}
      canSleep={false}
      enabledTranslations={[true, true, false]}
      enabledRotations={[false, false, false]}
    >
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        scale={[size, size, size]}
      >
        <sphereGeometry args={[1, 64, 64]} />
        {/* Invisible hit box to catch pointer events over the sphere bounds properly */}
        <meshBasicMaterial transparent opacity={0} depthWrite={false} color="#ffffff" />
        <Html center transform distanceFactor={15} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
          <div
            className={`transition-all duration-300 pointer-events-none drop-shadow-2xl ${hovered || dragging ? "scale-105 drop-shadow-[0_20px_50px_rgba(255,255,255,0.4)]" : "scale-100"
              }`}
          >
            <img src={image} alt="tech bubble" className="w-[130px] h-[130px] object-contain select-none" draggable={false} />
          </div>
        </Html>
      </mesh>
    </RigidBody>
  );
}

const InnerScene = ({ bubbles }: { bubbles: any[] }) => {
  const { viewport } = useThree();

  return (
    <Physics gravity={[0, 0, 0]}>
      <group position={[0, 0, 0]}>
        {bubbles.map((props: any, i: number) => (
          <Bubble key={i} {...props} />
        ))}
      </group>

      <RigidBody type="fixed" restitution={1.2}>
        {/* Floor */}
        <CuboidCollider position={[0, -viewport.height / 2 - 1, 0]} args={[viewport.width / 2, 1, 12]} />
        {/* Ceiling */}
        <CuboidCollider position={[0, viewport.height / 2 + 1, 0]} args={[viewport.width / 2, 1, 12]} />
        {/* Left */}
        <CuboidCollider position={[-viewport.width / 2 - 1, 0, 0]} args={[1, viewport.height / 2, 12]} />
        {/* Right */}
        <CuboidCollider position={[viewport.width / 2 + 1, 0, 0]} args={[1, viewport.height / 2, 12]} />
      </RigidBody>
    </Physics>
  );
};

export function BubbleScene() {
  const bubbles = useMemo(() => {
    return ICONS.map((item, i) => {
      // Spawn in a wide circle to prevent perfect overlap freeze
      const angle = (i / ICONS.length) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const pX = Math.cos(angle) * radius;
      const pY = Math.sin(angle) * radius;
      const pZ = 0; // Exactly zero, forces 2D collisions

      return {
        ...item,
        position: [pX, pY, pZ],
        size: 1.3 + Math.random() * 0.5,
      };
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
        <ambientLight intensity={1} />
        <Environment preset="studio" />

        <InnerScene bubbles={bubbles} />
      </Canvas>
    </div>
  );
}
