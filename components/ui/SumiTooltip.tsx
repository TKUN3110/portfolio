'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SumiTooltipProps {
  children: React.ReactNode;
  translation?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function SumiTooltip({ children, translation, disabled, style }: SumiTooltipProps) {
  const [hovered, setHovered] = useState(false);

  if (!translation || disabled) return <>{children}</>;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              marginBottom: '8px',
              padding: '6px 10px',
              backgroundColor: 'var(--charcoal)',
              color: 'var(--parchment)',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              borderRadius: '2px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              zIndex: 9999,
              pointerEvents: 'none',
              border: '1px solid rgba(245,239,225,0.15)',
            }}
          >
            {translation}
            {/* Tooltip triangle */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid var(--charcoal)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
