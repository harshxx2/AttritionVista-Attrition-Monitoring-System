import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * InteractiveButton Component v2.5
 * Premium, highly interactive button with Magnetic Mouse Tracking.
 * Features:
 * - Magnetic effect (translation towards cursor)
 * - Tactile scale-down (whileTap)
 * - Internal shimmer/glow
 */

export default function InteractiveButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon: Icon,
  type = 'button'
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-gradient-to-r from-accent to-secondary text-bg shadow-[0_0_30px_rgba(0,210,255,0.2)]',
    secondary: 'bg-white/[0.03] border border-white/10 text-white/80 hover:border-accent/40',
    outline: 'bg-transparent border border-accent/30 text-accent hover:bg-accent/10',
    ghost: 'bg-transparent text-white/40 hover:text-white hover:bg-white/5'
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className={`
        relative px-8 py-3 rounded-2xl font-black text-[11px] 
        uppercase tracking-[0.2em] flex items-center justify-center gap-3 
        transition-colors duration-300 backdrop-blur-xl 
        ${variants[variant]} 
        ${className}
      `}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
      </div>
      
      <span className="relative z-10">{children}</span>
      {Icon && <Icon className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />}
    </motion.button>
  );
}
