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
      {isMobile ? (
        <meshStandardMaterial color="#070707" roughness={0.72} metalness={0.18} />
      ) : (
        <MeshReflectorMaterial
          mirror={0.4}
          blur={[180, 70]}
          resolution={384}
          mixBlur={0.85}
          mixStrength={34}
          roughness={0.82}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#080808"
          metalness={0.55}
        />
      )}
    </mesh>
  );
}
