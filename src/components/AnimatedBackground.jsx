import React, { useMemo, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const particleColors = [
  'bg-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.6)]',
  'bg-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
  'bg-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.6)]',
  'bg-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.6)]',
  'bg-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
];

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse coordinates for particle interaction
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      return {
        id: i,
        x: baseX,
        y: baseY,
        size: Math.random() * 60 + 20,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 5,
        colorClass: particleColors[Math.floor(Math.random() * particleColors.length)]
      };
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden bg-[#05050A] z-0">
      {/* Background ambient orbs */}
      <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute bottom-[5%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[150px]" />

      {/* Floating Interactive Particles */}
      {particles.map((particle) => (
        <InteractiveParticle 
          key={particle.id} 
          particle={particle} 
          mouseX={smoothX} 
          mouseY={smoothY} 
        />
      ))}
      
      {/* Mesh dot overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDB2MWgxdjFINDB2LThoLTF2LTFIMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay" />
    </div>
  );
}

function InteractiveParticle({ particle, mouseX, mouseY }) {
  const particleRef = useRef(null);
  const xOffset = useMotionValue(0);
  const yOffset = useMotionValue(0);
  
  const springX = useSpring(xOffset, { stiffness: 100, damping: 10 });
  const springY = useSpring(yOffset, { stiffness: 100, damping: 10 });

  useEffect(() => {
    let animationFrame;
    const updateRepel = () => {
      if (!particleRef.current) return;
      const rect = particleRef.current.getBoundingClientRect();
      const pX = rect.left + rect.width / 2;
      const pY = rect.top + rect.height / 2;
      
      const dx = mouseX.get() - pX;
      const dy = mouseY.get() - pY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Repel force radius (250px)
      if (distance < 250) {
        const force = (250 - distance) / 250;
        xOffset.set(-(dx / distance) * force * 150);
        yOffset.set(-(dy / distance) * force * 150);
      } else {
        xOffset.set(0);
        yOffset.set(0);
      }
      animationFrame = requestAnimationFrame(updateRepel);
    };
    updateRepel();
    return () => cancelAnimationFrame(animationFrame);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={particleRef}
      className={`absolute rounded-full blur-[2px] ${particle.colorClass}`}
      style={{
        width: particle.size,
        height: particle.size,
        left: `${particle.x}vw`,
        top: `${particle.y}vh`,
        translateX: springX,
        translateY: springY
      }}
      animate={{
        y: [0, -1000],
        x: [0, Math.random() * 200 - 100],
        opacity: [0, 1, 0],
        rotate: [0, 360]
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: "linear",
      }}
    />
  );
}
