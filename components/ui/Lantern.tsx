'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LanternProps {
  character?: string;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Lantern({
  character = "侍", // Default character: Samurai
  glowColor = "rgba(255, 183, 3, 0.25)",
  className = "",
  style,
}: LanternProps) {
  return (
    <div 
      className={`clickable ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        transformOrigin: 'top center',
        ...style
      }}
    >
      {/* Swaying Animation Wrapper */}
      <motion.div
        animate={{
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Glow halo behind body */}
        <motion.div
          variants={{
            initial: { scale: 0.95, opacity: 0.7 },
            hover: { scale: 1.25, opacity: 1 },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: '25px',
            width: '75px',
            height: '90px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Hanging rope/hook */}
        <svg width="6" height="30" viewBox="0 0 6 30" fill="none" style={{ zIndex: 1 }}>
          <line x1="3" y1="0" x2="3" y2="30" stroke="var(--charcoal)" strokeWidth="1.5" />
        </svg>

        {/* Lantern Body */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Top Cap */}
          <div 
            style={{
              width: '32px',
              height: '5px',
              backgroundColor: 'var(--charcoal)',
              borderRadius: '1px',
            }}
          />

          {/* Paper Bulb */}
          <div 
            style={{
              width: '54px',
              height: '80px',
              backgroundColor: 'var(--crimson)',
              borderRadius: '24px / 12px',
              border: '2px solid var(--charcoal)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.25), inset 5px 0 10px rgba(255,255,255,0.15), 0 5px 15px rgba(140,29,24,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Horizontal accordion folds */}
            <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '1.5px', background: 'rgba(28,28,28,0.25)' }} />
            <div style={{ position: 'absolute', top: '30px', left: 0, width: '100%', height: '1.5px', background: 'rgba(28,28,28,0.25)' }} />
            <div style={{ position: 'absolute', top: '45px', left: 0, width: '100%', height: '1.5px', background: 'rgba(28,28,28,0.25)' }} />
            <div style={{ position: 'absolute', top: '60px', left: 0, width: '100%', height: '1.5px', background: 'rgba(28,28,28,0.25)' }} />

            {/* Kanji Character */}
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--parchment)',
                zIndex: 3,
                textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                userSelect: 'none',
              }}
            >
              {character}
            </span>
          </div>

          {/* Bottom Weight/Ring */}
          <div 
            style={{
              width: '26px',
              height: '8px',
              backgroundColor: 'var(--charcoal)',
              borderRadius: '0 0 2px 2px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Hanging tassel */}
            <div 
              style={{
                width: '3px',
                height: '18px',
                backgroundColor: 'var(--crimson)',
                marginTop: '8px',
                borderRadius: '1px',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
