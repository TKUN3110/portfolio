'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animate?: boolean;
  delay?: number;
  variant?: 'washi' | 'clean';
}

export default function PaperCard({
  children,
  animate = true,
  delay = 0,
  className = '',
  style,
  variant = 'washi',
  ...props
}: PaperCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isClean = variant === 'clean';

  // Motion values for tracking normalized cursor coordinates inside the card (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map coordinate offsets to subtle degrees of 3D rotation (max 7 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  // Spring physics config for smooth elastic following
  const springConfig = { damping: 22, stiffness: 280, mass: 0.6 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates relative to card center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardContent = (
    <>
      {/* Deckled Edge Paper Scrap Background (only for clean cards) */}
      {isClean && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            filter: 'drop-shadow(0px 8px 20px rgba(28, 28, 28, 0.05))',
            overflow: 'visible',
          }}
        >
          <defs>
            <filter id="paper-torn-edge">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect
            fill="var(--parchment-dark)"
            style={{
              x: 10,
              y: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(100% - 20px)',
              filter: 'url(#paper-torn-edge)',
            }}
          />
        </svg>
      )}

      {/* Subtle Watercolor Splash Bleed Effect behind contents */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 143, 143, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translateZ(-10px)', // push slightly back in 3D
        }}
      />
      
      {/* Decorative Traditional Red/Charcoal Corner Accents (only for washi cards) */}
      {!isClean && (
        <>
          <div 
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              width: '8px',
              height: '8px',
              borderTop: '1.5px solid var(--crimson)',
              borderLeft: '1.5px solid var(--crimson)',
              opacity: 0.6,
              transform: 'translateZ(10px)', // pop slightly forward in 3D
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderBottom: '1.5px solid var(--charcoal)',
              borderRight: '1.5px solid var(--charcoal)',
              opacity: 0.4,
              transform: 'translateZ(10px)', // pop slightly forward in 3D
            }}
          />
        </>
      )}

      {/* Main card content container */}
      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </>
  );

  const containerStyle: any = {
    padding: isClean ? '38px 32px' : '32px 28px',
    position: 'relative',
    borderRadius: isClean ? '8px' : '2px',
    overflow: isClean ? 'visible' : 'hidden', // allow SVG shadow to display
    perspective: 1000,
    transformStyle: 'preserve-3d',
    rotateX: rotateXSpring,
    rotateY: rotateYSpring,
    backgroundColor: isClean ? 'transparent' : 'var(--parchment)',
    boxShadow: isClean ? 'none' : undefined,
    border: isClean ? 'none' : undefined,
    ...style,
  };

  const cardClassName = isClean ? className : `washi-border ${className}`;

  if (animate) {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cardClassName}
        style={containerStyle}
        {...(props as any)}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cardClassName}
      style={containerStyle}
      {...(props as any)}
    >
      {cardContent}
    </motion.div>
  );
}
