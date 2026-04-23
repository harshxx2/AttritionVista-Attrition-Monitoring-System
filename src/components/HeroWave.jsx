import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FlowingWave() {
  const meshRef = useRef();

  // Create a plane geometry and extract its position array
  const { geometry, positions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(25, 25, 100, 100);
    // Rotate to lie flat on the XZ plane
    geo.rotateX(-Math.PI / 2);
    return {
      geometry: geo,
      positions: geo.attributes.position.array
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pos = meshRef.current.geometry.attributes.position;
    
    // Create a beautiful flowing sine wave effect across the vertex grid
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        // Combine intersecting sine waves to create fluid organic ripples
        const y = Math.sin(x * 0.4 + time * 0.8) * 0.5 + Math.cos(z * 0.3 + time * 0.6) * 0.5;
        pos.setY(i, y);
    }
    
    pos.needsUpdate = true;
    
    // Gently rotate the whole object over time
    meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial 
        size={0.04} 
        color="#3b82f6" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroWave() {
  return (
    <div className="absolute inset-x-0 bottom-[-20%] h-[80vh] z-0 pointer-events-none mix-blend-screen opacity-80">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <fog attach="fog" args={['#05050A', 3, 12]} />
        <FlowingWave />
      </Canvas>
      {/* Soft gradient fade so the wave disappears smoothly at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#05050A_80%)]" />
    </div>
  );
}
