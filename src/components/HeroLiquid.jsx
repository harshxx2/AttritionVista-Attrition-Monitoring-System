import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei';

function LiquidMercury() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.5}>
        <sphereGeometry args={[3, 100, 100]} />
        <MeshDistortMaterial
          color="#0f172a"          // Very dark base color
          emissive="#1e3a8a"       // Dark blue core glow
          emissiveIntensity={0.2}
          roughness={0.1}          // Extremely smooth
          metalness={1}            // Pure metal
          distort={0.4}            // Intensity of organic distortion
          speed={2}                // Speed of liquid ripples
          envMapIntensity={2}      // High reflectivity for the liquid effect
        />
      </mesh>
    </Float>
  );
}

export default function HeroLiquid() {
  return (
    <div className="absolute inset-x-0 bottom-[-30%] h-[120vh] z-0 pointer-events-none opacity-90 overflow-hidden mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Soft immersive lighting to catch the metallic ripples */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#3b82f6" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <pointLight position={[0, -5, 2]} intensity={2} color="#10b981" />
        
        <LiquidMercury />
        {/* Environment map is required for metalness to reflect nicely */}
        <Environment preset="city" />
      </Canvas>
      {/* Heavy frosted glass blur overlay to make it look smooth and luxurious */}
      <div className="absolute inset-0 backdrop-blur-[60px] bg-black/10" />
      {/* Edge gradient to fade out into black smoothly */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020204_80%)]" />
    </div>
  );
}
