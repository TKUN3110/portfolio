'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InkStrokeIntroProps {
  onComplete?: () => void;
}

export default function InkStrokeIntro({ onComplete }: InkStrokeIntroProps) {
  const [isDrawDone, setIsDrawDone] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Stage 1: The stroke draws (takes 0.8s)
    const drawTimer = setTimeout(() => {
      setIsDrawDone(true);
    }, 700);

    // Stage 2: The split completes (takes 0.9s after drawing, total 1.6s)
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
      if (onComplete) onComplete();
    }, 1600);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  if (isUnmounted) return null;

  // Path across the screen center
  const strokePath = "M-50,60 C250,55 450,65 650,58 C850,50 1050,62 1250,60";

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          overflow: 'hidden',
          pointerEvents: isDrawDone ? 'none' : 'auto', // disable interaction once splitting starts
        }}
      >
        {/* SVG Filter Definition for the Ink Bleed (anisotropic noise for brush fiber warp) */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="ink-bleed-heavy">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.07" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Top Half Panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={isDrawDone ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50.5%', // overlap slightly to prevent gap rendering issues
            backgroundColor: 'var(--parchment)',
            zIndex: 100,
          }}
        />

        {/* Bottom Half Panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={isDrawDone ? { y: '100%' } : { y: 0 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50.5%', // overlap slightly
            backgroundColor: 'var(--parchment)',
            zIndex: 100,
          }}
        />

        {/* Brush Stroke Centerpiece */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={isDrawDone ? { opacity: 0, scaleY: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '120px',
            transform: 'translateY(-50%)',
            zIndex: 101,
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Background trace glow for sumi-e thickness */}
            <motion.path
              d={strokePath}
              fill="none"
              stroke="var(--charcoal)"
              strokeWidth="50"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{
                filter: 'url(#ink-bleed-heavy)',
                opacity: 0.95,
              }}
            />
            {/* Core darker paint stroke path */}
            <motion.path
              d={strokePath}
              fill="none"
              stroke="#0f0f0f"
              strokeWidth="32"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.65, ease: 'easeInOut', delay: 0.05 }}
              style={{
                filter: 'url(#ink-bleed-heavy)',
                opacity: 1,
              }}
            />
            {/* Faint crimson undertone brush stroke (artistic touch) */}
            <motion.path
              d={strokePath}
              fill="none"
              stroke="var(--crimson)"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
              style={{
                filter: 'url(#ink-bleed-heavy)',
                opacity: 0.4,
              }}
            />
          </svg>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
