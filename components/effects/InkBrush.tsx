'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { brushDraw } from '@/lib/animations';

interface InkBrushProps {
  type?: 'horizontal' | 'vertical' | 'enso' | 'splat';
  color?: string;
  className?: string;
  animate?: boolean;
}

export default function InkBrush({
  type = 'horizontal',
  color = 'var(--charcoal)',
  className = '',
  animate = true,
}: InkBrushProps) {
  // SVG path for a raw, hand-drawn horizontal brush stroke
  const horizontalPath = "M10,25 C80,21 160,28 240,23 C320,18 400,26 480,24 C560,22 640,25 720,23 C800,21 880,26 950,22 C965,21 980,24 990,25";
  
  // SVG path for a vertical hand-drawn brush stroke
  const verticalPath = "M25,10 C21,80 28,160 23,240 C18,320 26,400 24,480 C22,560 25,640 23,720 C21,800 26,880 22,950";

  // SVG path for a partial Enso calligraphy ring (one breath stroke)
  const ensoPath = "M 80, 20 A 60,60 0 1,1 25,35 C 15,48 10,65 15,80 C 22,100 45,115 70,110 C 92,105 108,80 100,55";

  const renderStroke = () => {
    switch (type) {
      case 'horizontal':
        return (
          <svg viewBox="0 0 1000 50" preserveAspectRatio="none" className={className} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'block' }}>
            <motion.path
              d={horizontalPath}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              variants={animate ? brushDraw : undefined}
              initial={animate ? "hidden" : undefined}
              whileInView={animate ? "show" : undefined}
              viewport={{ once: false, margin: "-100px" }}
              style={{
                strokeDasharray: "15, 2, 8, 3",
                filter: "blur(0.4px)",
              }}
            />
          </svg>
        );

      case 'vertical':
        return (
          <svg viewBox="0 0 50 1000" preserveAspectRatio="none" className={className} style={{ width: '100%', height: '100%' }}>
            <motion.path
              d={verticalPath}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              variants={animate ? brushDraw : undefined}
              initial={animate ? "hidden" : undefined}
              whileInView={animate ? "show" : undefined}
              viewport={{ once: false, margin: "-100px" }}
              style={{
                strokeDasharray: "12, 3, 6, 2",
                filter: "blur(0.4px)",
              }}
            />
          </svg>
        );

      case 'enso':
        return (
          <svg 
            viewBox="-20 -20 160 160" 
            className={className} 
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          >
            <motion.path
              d={ensoPath}
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
              variants={animate ? brushDraw : undefined}
              initial={animate ? "hidden" : undefined}
              whileInView={animate ? "show" : undefined}
              viewport={{ once: false }}
              style={{
                strokeDasharray: "100, 5, 20, 2",
                filter: "blur(0.5px)",
              }}
            />
          </svg>
        );

      case 'splat':
        return (
          <svg viewBox="0 0 100 100" className={className} style={{ width: '100%', height: '100%' }}>
            <g fill={color} opacity="0.85" style={{ filter: "blur(0.5px)" }}>
              {/* Central drop */}
              <circle cx="50" cy="50" r="16" />
              {/* Bleeding nodes */}
              <circle cx="34" cy="42" r="5" />
              <circle cx="68" cy="54" r="6" />
              <circle cx="55" cy="72" r="4" />
              <circle cx="42" cy="30" r="3" />
              {/* Splatters */}
              <circle cx="20" cy="55" r="1.5" />
              <circle cx="78" cy="38" r="2" />
              <circle cx="62" cy="80" r="1.5" />
              <circle cx="30" cy="78" r="2.5" />
              <circle cx="48" cy="22" r="1" />
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return renderStroke();
}
