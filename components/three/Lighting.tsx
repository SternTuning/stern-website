'use client';

import { Environment } from '@react-three/drei';

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.08} />
      {/* Key light — strong from front-side, like a showroom spotlight */}
      <directionalLight
        position={[6, 8, 10]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0002}
      />
      {/* Fill — softer from the other side */}
      <directionalLight position={[-8, 5, 6]} intensity={0.6} />
      {/* Rim / back light — separates car from background */}
      <directionalLight position={[-4, 6, -12]} intensity={1.2} color="#e8e8e8" />
      <directionalLight position={[5, 4, -10]} intensity={0.8} color="#ffffff" />
      {/* Subtle top light for hood/roof definition */}
      <pointLight position={[0, 15, 2]} intensity={0.4} distance={40} decay={2} />
      <pointLight position={[-3, 3, 5]} intensity={0.3} distance={25} color="#fff8f0" />
      <Environment
        preset="night"
        environmentIntensity={0.6}
        background={false}
      />
    </>
  );
}
