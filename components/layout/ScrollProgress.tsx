'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '@/hooks/useScroll';

export default function ScrollProgress() {
  const { scrollProgress } = useScroll();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          width: `${scrollProgress}%`,
          height: '100%',
          backgroundColor: 'var(--crimson)',
          boxShadow: '0 1px 4px rgba(140, 29, 24, 0.4)',
        }}
      />
    </div>
  );
}
