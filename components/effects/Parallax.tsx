'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number; // 0.1 means moves at 10% scroll speed, negative values move opposite direction
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function Parallax({
  children,
  offset = 0.2,
  className = '',
  id,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll position relative to the element's container viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to vertical displacement
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${offset * 100}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ y, ...style }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}
