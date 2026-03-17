'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Preload } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Group } from 'three';
import { CarModel, preloadCarModel } from './CarModel';
import { Ground } from './Ground';
import { Lighting } from './Lighting';

const DEFAULT_MODEL = '/models/c43.glb';
preloadCarModel(DEFAULT_MODEL);

const PARALLAX_SMOOTH = 0.06;
const PARALLAX_DEG = 3;

const SCROLL_SPIN_RAD = Math.PI / 7; // ~25° total rotation as user scrolls through hero

function Scene({
  scrollProgress,
  mouseParallax,
  isHovering,
  isInView,
}: {
  scrollProgress: number;
  mouseParallax: { x: number; y: number };
  isHovering: boolean;
  isInView: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const camPos = useRef({ x: 0, y: 5, z: 12 });
  const smoothParallax = useRef({ x: 0, y: 0 });
  const idleY = useRef(0);

  useFrame(() => {
    if (!isInView || !groupRef.current) return;
    // Very slow, calm idle when not hovering — elegant ~1 full turn per 3+ minutes
    if (!isHovering) idleY.current += 0.00035;
    // Single continuous rotation: scroll + idle (no formula switch so no teleport)
    groupRef.current.rotation.y = scrollProgress * SCROLL_SPIN_RAD + idleY.current;
  });

  useFrame(() => {
    if (!isInView) return;
    smoothParallax.current.x += (mouseParallax.x - smoothParallax.current.x) * PARALLAX_SMOOTH;
    smoothParallax.current.y += (mouseParallax.y - smoothParallax.current.y) * PARALLAX_SMOOTH;
    const azimuth = smoothParallax.current.x * (PARALLAX_DEG * (Math.PI / 180));
    const polarOffset = smoothParallax.current.y * 0.015;
    const distance = 11 + scrollProgress * 5;
    const height = 5 + scrollProgress * 3 + polarOffset;
    const x = Math.sin(azimuth) * distance;
    const z = Math.cos(azimuth) * distance;
    camPos.current = { x, y: height, z };
    camera.position.lerp(camPos.current as any, 0.04);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={45} />
      <fog attach="fog" args={['#050505', 20, 55]} />
      <Lighting />
      <Ground />
      <group ref={groupRef} position={[0, 0, 0]}>
        <CarModel modelUrl={DEFAULT_MODEL} />
      </group>
      <Preload all />
    </>
  );
}

function CarShowroomInner({
  scrollProgress,
  mouseParallax,
  isHovering,
  isInView,
}: {
  scrollProgress: number;
  mouseParallax: { x: number; y: number };
  isHovering: boolean;
  isInView: boolean;
}) {
  return (
    <Scene
      scrollProgress={scrollProgress}
      mouseParallax={mouseParallax}
      isHovering={isHovering}
      isInView={isInView}
    />
  );
}

export function CarShowroom({
  scrollProgress = 0,
  mouseParallax = { x: 0, y: 0 },
  isHovering = false,
  isInView = true,
}: {
  scrollProgress?: number;
  mouseParallax?: { x: number; y: number };
  isHovering?: boolean;
  isInView?: boolean;
}) {
  return (
    <Canvas
      frameloop={isInView ? 'always' : 'never'}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: 4 /* ACESFilmicToneMapping */,
        toneMappingExposure: 1.1,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <CarShowroomInner
          scrollProgress={scrollProgress}
          mouseParallax={mouseParallax}
          isHovering={isHovering}
          isInView={isInView}
        />
      </Suspense>
    </Canvas>
  );
}
