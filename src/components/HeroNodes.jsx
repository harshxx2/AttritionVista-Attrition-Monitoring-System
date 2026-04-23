import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Trail, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function NetworkCore() {
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Outer Wireframe Core */}
      <mesh>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe={true} 
          transparent 
          opacity={0.3} 
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Inner Dense Core */}
      <mesh scale={0.8}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial 
          color="#0f172a" 
          roughness={0.1}
          metalness={0.8}
          emissive="#1e3a8a"
          emissiveIntensity={0.2}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

function OrbitingNode({ radius, speed, offset, size, color }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    // Calculate orbital position
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.5) * (radius * 0.3);
    }
  });

  return (
    <group ref={ref}>
      <Trail width={2} length={8} color={new THREE.Color(color)} attenuation={(t) => t * t}>
        <Sphere args={[size, 16, 16]}>
          <meshBasicMaterial color={color} />
        </Sphere>
      </Trail>
      {/* Glow */}
      <Sphere args={[size * 2, 16, 16]}>
         <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Sphere>
    </group>
  );
}

export default function HeroNodes() {
  // Generate random stable orbits
  const orbits = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      radius: 3.5 + Math.random() * 2,
      speed: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
      offset: Math.random() * Math.PI * 2,
      size: Math.random() * 0.1 + 0.05,
      color: ['#3b82f6', '#10b981', '#f43f5e', '#a855f7'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  return (
    <div className="w-full h-[500px] lg:h-[700px] relative">
      {/* Absolute ambient light leaks behind canvas */}
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#05050A', 5, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f7fff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <NetworkCore />
          {orbits.map((orbit) => (
            <OrbitingNode key={orbit.id} {...orbit} />
          ))}
        </Float>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
