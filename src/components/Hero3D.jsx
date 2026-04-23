import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei';

function ComplexShape() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#4f7fff" 
          wireframe={true} 
          emissive="#4f7fff" 
          emissiveIntensity={0.5} 
        />
        {/* Inner solid core */}
        <mesh scale={0.8}>
          <icosahedronGeometry args={[2, 0]} />
          <MeshDistortMaterial 
            color="#0a0d18" 
            distort={0.3} 
            speed={2} 
            roughness={0.2} 
            metalness={0.8}
            emissive="#1e3a8a"
            emissiveIntensity={0.2}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#4f7fff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a78bfa" />
        
        <ComplexShape />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
