import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function DotGlobe() {
  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      {/* 
        Using an Icosahedron with high detail creates a pseudo-Fibonacci 
        sphere of evenly spaced vertex points. 
      */}
      <icosahedronGeometry args={[2.5, 6]} />
      
      <pointsMaterial
        size={0.03}
        color="#4f7fff"
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 mix-blend-screen pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <fog attach="fog" args={['#05050A', 5, 15]} />
        <DotGlobe />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
      {/* Heavy bottom fade gradient so the globe disappears into the abyss */}
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[rgb(5,5,10)] to-transparent pointer-events-none" />
    </div>
  );
}
