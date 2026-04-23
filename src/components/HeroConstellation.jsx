import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NetworkConstellation() {
  const groupRef = useRef();

  // Generate random points and connect those that are close to each other
  const { points, linePositions } = useMemo(() => {
    const particleCount = 400; // Limit for performance
    const radius = 10;
    const pts = [];

    // Random points in sphere
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 2;
      const z = (Math.random() - 0.5) * radius * 2;
      // Keep only points roughly inside a sphere
      if (Math.sqrt(x*x + y*y + z*z) < radius) {
        pts.push(new THREE.Vector3(x, y, z));
      }
    }

    const lines = [];
    const connectionRadius = 1.8;

    // Connect close points
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dist = pts[i].distanceTo(pts[j]);
        if (dist < connectionRadius) {
          lines.push(pts[i].x, pts[i].y, pts[i].z);
          lines.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    const pointsGeo = new THREE.BufferGeometry().setFromPoints(pts);
    
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));

    return { points: pointsGeo, linePositions: linesGeo };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={points}>
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
      </points>
      <lineSegments geometry={linePositions}>
        <lineBasicMaterial color="#4f7fff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function HeroConstellation() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020204] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={['#020204', 5, 20]} />
        <NetworkConstellation />
      </Canvas>
    </div>
  );
}
