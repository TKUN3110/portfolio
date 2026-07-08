'use client';

import React, { useEffect, useRef } from 'react';
import { PETAL_CONFIG as C } from '@/data/petals.config';

interface Petal {
  x: number;
  y: number;
  r: number;
  d: number;
  sway: number;
  swaySpeed: number;
  rotation: number;
  rotationSpeed: number;
  baseOpacity: number;
  color: string;
}

// Linear interpolation helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));

export default function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef  = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];

    // ── Shared state across frames ────────────────────────────────────────────
    let scrollFactor = 0; // 0 = top, 1 = fully scrolled past hero
    let burstFactor  = 0; // 0 = calm, 1 = peak burst
    let burstDecay   = false;

    // ── Resize ────────────────────────────────────────────────────────────────
    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ── Petal factory — settings interpolated by current scrollFactor ─────────
    const createPetal = (isInitial = false, boosted = false): Petal => {
      const t  = scrollFactor;
      const bt = boosted ? 0 : t; // burst petals always use top-of-page richness

      const opMin = lerp(C.opacityTop[0],     C.opacityBottom[0],     bt);
      const opMax = lerp(C.opacityTop[1],     C.opacityBottom[1],     bt);
      const pkMin = lerp(C.alphaPinkTop[0],   C.alphaPinkBottom[0],   bt);
      const pkMax = lerp(C.alphaPinkTop[1],   C.alphaPinkBottom[1],   bt);
      const rdMin = lerp(C.alphaRedTop[0],    C.alphaRedBottom[0],    bt);
      const rdMax = lerp(C.alphaRedTop[1],    C.alphaRedBottom[1],    bt);

      const base   = Math.random() * (opMax - opMin) + opMin;
      const isPink = Math.random() > 0.3;
      const alpha  = isPink
        ? Math.random() * (pkMax - pkMin) + pkMin
        : Math.random() * (rdMax - rdMin) + rdMin;

      const sizeRange = C.sizeMax - C.sizeMin;
      const speedRange = C.fallSpeedMax - C.fallSpeedMin;

      return {
        x:             Math.random() * canvas.width,
        y:             isInitial ? Math.random() * canvas.height : -20,
        r:             Math.random() * sizeRange + C.sizeMin,
        d:             Math.random() * speedRange + C.fallSpeedMin,
        sway:          Math.random() * Math.PI * 2,
        swaySpeed:     Math.random() * 0.02 + 0.005,
        rotation:      Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        baseOpacity:   base,
        color: isPink
          ? `rgba(232, 143, 143, ${alpha})`
          : `rgba(140, 29,  24,  ${alpha})`,
      };
    };

    // Initial population at full density (top settings)
    for (let i = 0; i < C.countTop; i++) {
      petals.push(createPetal(true));
    }

    // ── Scroll listener ───────────────────────────────────────────────────────
    const handleScroll = () => {
      scrollFactor = Math.min(1, window.scrollY / C.scrollFadeDistance);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Burst scheduler ───────────────────────────────────────────────────────
    let burstTimeout: ReturnType<typeof setTimeout>;

    const scheduleBurst = () => {
      const range = C.burstIntervalMax - C.burstIntervalMin;
      const delay = C.burstIntervalMin + Math.random() * range;
      burstTimeout = setTimeout(() => {
        const count = Math.floor(C.burstExtra * (1 - scrollFactor * C.burstScrollReduction));
        for (let i = 0; i < count; i++) {
          petals.push(createPetal(false, true));
        }
        burstFactor = 1;
        burstDecay  = true;
        scheduleBurst();
      }, delay);
    };
    scheduleBurst();

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.vx = e.clientX - m.lastX;
      m.vy = e.clientY - m.lastY;
      m.x  = e.clientX;
      m.y  = e.clientY;
      m.lastX = e.clientX;
      m.lastY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      mouse.vx *= 0.95;
      mouse.vy *= 0.95;

      // Burst decay
      if (burstDecay && burstFactor > 0) {
        burstFactor = Math.max(0, burstFactor - C.burstDecayRate);
        if (burstFactor === 0) burstDecay = false;
      }

      // Effective petal cap: lerps between top and bottom counts + burst extra
      const effectiveCap =
        Math.round(lerp(C.countTop, C.countBottom, scrollFactor)) +
        Math.floor(C.burstExtra * burstFactor * (1 - scrollFactor * C.burstScrollReduction));

      const burstBoost = 1 + burstFactor * C.burstBoostMultiplier;

      petals.forEach((p, idx) => {
        // Physics
        p.y        += p.d * 1.2 + C.fallBaseVelocity;
        p.sway     += p.swaySpeed;
        p.x        += Math.sin(p.sway) * C.swayAmplitude + (p.d - 0.5) * 0.5;
        p.rotation += p.rotationSpeed;

        // Mouse repulsion
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < C.mouseRepelRadius) {
          const force = (C.mouseRepelRadius - dist) / C.mouseRepelRadius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * C.mouseRepelForce;
          p.y += Math.sin(angle) * force * (C.mouseRepelForce * 0.6);
          p.x += mouse.vx * force * C.mouseVelocityFactor;
          p.y += mouse.vy * force * (C.mouseVelocityFactor * 0.67);
        }

        // Out of bounds: replenish up to cap, remove surplus
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          if (idx < effectiveCap) {
            petals[idx] = createPetal(false, burstFactor > 0.5);
          } else {
            petals.splice(idx, 1);
            return;
          }
        }

        const finalAlpha = Math.min(1, p.baseOpacity * burstBoost);
        if (finalAlpha < 0.01) return;

        // Draw petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = finalAlpha;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.r, -p.r * 1.5, -p.r * 1.5, p.r * 0.5, 0, p.r * 1.5);
        ctx.bezierCurveTo(p.r * 1.5, p.r * 0.5, p.r, -p.r * 1.5, 0, 0);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Vein
        ctx.beginPath();
        ctx.moveTo(0, -p.r * 0.4);
        ctx.lineTo(0, p.r * 0.9);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(burstTimeout);
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
        zIndex: 50,
      }}
    />
  );
}
