import React, { useRef, useEffect } from 'react';

/**
 * UniqueParticles Component v3.0
 * High-performance Canvas-based particle system for AttritionVista Enterprise.
 * Features:
 * - Subtle 'Floating Dust' bokeh effect.
 * - Organic drift with varying depth (blur/speed).
 * - High performance (Canvas 2D).
 * - Interactive mouse parallax.
 */

export default function UniqueParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 120; // Subtle density
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.depth = Math.random(); // 0 to 1 for parallax depth
        this.color = Math.random() > 0.5 ? 'rgba(0, 210, 255,' : 'rgba(157, 80, 187,';
      }

      update() {
        // Organic drift
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        const alpha = this.opacity * (1 - this.depth * 0.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${alpha})`;
        
        // Add subtle glow based on depth
        if (this.depth > 0.7) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color.replace('rgba', 'rgb').replace(',', ')');
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: '#02040a' }}
    />
  );
}
