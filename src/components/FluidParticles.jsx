import React from 'react';

/**
 * Global Nebula Background — Pure CSS
 * A non-noisy, ambient, and premium background that spans the entire application.
 * Uses very large, high-blur elements for a sophisticated 'Data Cloud' feel.
 */

const nebulaData = [
  { color: '0, 210, 255',   size: '80vw', left: '-10%', top: '-10%', animName: 'nebula1', dur: '40s' },
  { color: '157, 80, 187',  size: '90vw', left: '40%',  top: '10%',  animName: 'nebula2', dur: '50s' },
  { color: '167, 139, 250', size: '70vw', left: '20%',  top: '50%',  animName: 'nebula3', dur: '45s' },
  { color: '45, 212, 191',  size: '80vw', left: '60%',  top: '70%',  animName: 'nebula4', dur: '55s' },
];

const keyframesCSS = `
  @keyframes nebula1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(100px, 50px) rotate(5deg)} }
  @keyframes nebula2 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(-100px, 80px) rotate(-5deg)} }
  @keyframes nebula3 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(50px, -100px) rotate(3deg)} }
  @keyframes nebula4 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(-80px, -50px) rotate(-3deg)} }
`;

export default function FluidParticles() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <style>{keyframesCSS}</style>
      <div className="absolute inset-0 bg-[#02040a] -z-10" />
      {nebulaData.map((nebula, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: nebula.size,
            height: nebula.size,
            left: nebula.left,
            top: nebula.top,
            borderRadius: '100%',
            background: `radial-gradient(circle at center, rgba(${nebula.color}, 0.15) 0%, rgba(${nebula.color}, 0.05) 50%, transparent 80%)`,
            animation: `${nebula.animName} ${nebula.dur} ease-in-out infinite`,
            filter: 'blur(150px)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
