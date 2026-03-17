'use client';

import { useGLTF } from '@react-three/drei';
import { Component, useMemo } from 'react';
import * as THREE from 'three';

// Normalize so the car's largest dimension is this many units (fills the frame).
const TARGET_SIZE = 8;

function LoadedCar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const s = scene.clone();
    const box = new THREE.Box3().setFromObject(s);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? TARGET_SIZE / maxDim : 1;
    // Place car on ground (y = -0.5): offset so bottom of scaled model sits on floor
    const groundY = -0.5;
    const positionY = groundY - box.min.y * scale;
    s.traverse((child) => {
      if ('castShadow' in child) (child as { castShadow: boolean }).castShadow = true;
      if ('receiveShadow' in child) (child as { receiveShadow: boolean }).receiveShadow = true;
    });
    return { scene: s, scale, positionY };
  }, [scene]);

  return (
    <primitive
      object={cloned.scene}
      scale={cloned.scale}
      position={[0, cloned.positionY, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function PlaceholderCar() {
  return (
    <mesh castShadow>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#333" wireframe />
    </mesh>
  );
}

class CarModelErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function CarModel({ modelUrl }: { modelUrl: string | null }) {
  if (!modelUrl) return <PlaceholderCar />;
  return (
    <CarModelErrorBoundary fallback={<PlaceholderCar />}>
      <LoadedCar url={modelUrl} />
    </CarModelErrorBoundary>
  );
}

export function preloadCarModel(url: string) {
  useGLTF.preload(url);
}
