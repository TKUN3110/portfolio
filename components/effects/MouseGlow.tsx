'use client';

import React, { useEffect, useRef } from 'react';
import { useMouse } from '@/hooks/useMouse';

interface InkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  opacity: number;
  color: string;
}

export default function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMouse();
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: InkParticle[] = [];
    let animationFrameId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const addParticle = (x: number, y: number, speed: number) => {
      // Very occasional and faint particles for mouse moving to keep it minimized
      if (Math.random() > 0.4) return; 

      const isRed = Math.random() > 0.98;
      const baseColor = isRed ? '140, 29, 24' : '28, 28, 28';
      
      // Maximum 1 particle per step to minimize density
      particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * (speed * 0.05 + 0.2),
        vy: (Math.random() - 0.5) * (speed * 0.05 + 0.2) - 0.1, // very slight upward float
        size: Math.random() * 1 + 1,
        maxSize: Math.random() * 5 + 6 + (speed * 0.2), // much smaller bleed limit
        opacity: Math.random() * 0.12 + 0.08, // extremely faint opacity (0.08 to 0.2)
        color: baseColor,
      });
    };

    // Listen to mousemove directly to capture high frequency coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const last = lastMouseRef.current;
      
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const dt = now - last.time;
      const speed = dt > 0 ? dist / dt * 10 : 0;

      // Add particles if mouse moved
      if (dist > 4) {
        // Interpolate fewer points for a lighter trail
        const steps = Math.min(Math.floor(dist / 12), 3);
        for (let i = 0; i <= steps; i++) {
          const t = steps > 0 ? i / steps : 1;
          const interX = last.x + dx * t;
          const interY = last.y + dy * t;
          addParticle(interX, interY, speed);
        }
      }

      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    // Click triggers a small, subtle splash of ink
    const handleMouseClick = (e: MouseEvent) => {
      const particleCount = Math.floor(Math.random() * 4) + 6; // 6 to 9 tiny particles
      const isRed = Math.random() > 0.85;
      const baseColor = isRed ? '140, 29, 24' : '28, 28, 28';

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1; // slow speed dispersion
        const size = Math.random() * 1.5 + 1;
        const maxSize = Math.random() * 8 + 8; // small, subtle splat size

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2,
          size: size,
          maxSize: maxSize,
          opacity: Math.random() * 0.18 + 0.12, // subtle opacity
          color: baseColor,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    const updateAndDraw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Particle physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Slow ink bleed expansion
        p.size += (p.maxSize - p.size) * 0.05;
        // Fade out
        p.opacity -= 0.007;

        if (p.opacity <= 0) {
          particles.splice(idx, 1);
          return;
        }

        // Draw bleeding ink watercolor spot
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.globalCompositeOperation = 'multiply'; // Bleeds organically into paper background

        // Radial gradient to simulate feathering edges
        const grad = ctx.createRadialGradient(p.x, p.y, p.size * 0.1, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(${p.color}, 0.7)`);
        grad.addColorStop(0.3, `rgba(${p.color}, 0.35)`);
        grad.addColorStop(0.7, `rgba(${p.color}, 0.08)`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 49,
      }}
    />
  );
}
