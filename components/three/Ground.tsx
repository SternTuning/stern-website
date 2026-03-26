'use client';

import { MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

export function Ground({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        mirror={0.45}
        blur={isMobile ? [140, 60] : [200, 80]}
        resolution={isMobile ? 256 : 512}
        mixBlur={0.85}
        mixStrength={isMobile ? 32 : 38}
        roughness={0.8}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#080808"
        metalness={0.6}
      />
    </mesh>
  );
}
