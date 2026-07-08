'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export default function InkButton({
  children,
  variant = 'primary',
  icon,
  className = '',
  style,
  ...props
}: InkButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      className={`clickable ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: isPrimary ? 'center' : 'center',
        background: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: isPrimary ? '14px 28px' : '12px 24px',
        minWidth: isPrimary ? '180px' : '160px',
        minHeight: '52px',
        overflow: 'visible',
        fontFamily: 'var(--font-serif)',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.13em',
        color: '#171717',
        ...style,
      }}
      {...(props as any)}
    >
      {/* ── Parchment background ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: isPrimary ? '#F5EFE1' : 'transparent',
          backgroundImage: isPrimary
            ? 'radial-gradient(circle at 20% 60%, rgba(201,162,39,0.07) 0%, transparent 65%), radial-gradient(circle at 80% 20%, rgba(178,34,52,0.04) 0%, transparent 60%)'
            : 'none',
          pointerEvents: 'none',
        }}
      />

      {/* ── Outer border ─────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${isPrimary ? '#171717' : '#171717'}`,
          pointerEvents: 'none',
        }}
        variants={{ hover: { borderColor: '#B22234' }, tap: { borderColor: '#B22234' } }}
        transition={{ duration: 0.25 }}
      />

      {/* ── Inner hairline frame (double-border scroll look) ─────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '5px',
          border: '0.75px solid rgba(23,23,23,0.18)',
          pointerEvents: 'none',
        }}
        variants={{ hover: { borderColor: 'rgba(178,34,52,0.4)' } }}
        transition={{ duration: 0.25 }}
      />

      {/* ── Corner bracket ornaments ─────────────────────────────── */}
      {/* Top-left */}
      <svg aria-hidden="true" style={{ position: 'absolute', top: '-1px', left: '-1px', width: '14px', height: '14px', overflow: 'visible', pointerEvents: 'none' }}>
        <motion.path d="M0,10 L0,0 L10,0" fill="none" stroke="#B22234" strokeWidth="1.5" strokeLinecap="square" opacity={0.65} variants={{ hover: { opacity: 1, strokeWidth: 2 } }} transition={{ duration: 0.2 }} />
      </svg>
      {/* Bottom-left */}
      <svg aria-hidden="true" style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '14px', height: '14px', overflow: 'visible', pointerEvents: 'none' }}>
        <motion.path d="M0,4 L0,14 L10,14" fill="none" stroke="#B22234" strokeWidth="1.5" strokeLinecap="square" opacity={0.65} variants={{ hover: { opacity: 1, strokeWidth: 2 } }} transition={{ duration: 0.2 }} />
      </svg>
      {/* Top-right */}
      <svg aria-hidden="true" style={{ position: 'absolute', top: '-1px', right: '-1px', width: '14px', height: '14px', overflow: 'visible', pointerEvents: 'none' }}>
        <motion.path d="M14,10 L14,0 L4,0" fill="none" stroke="#B22234" strokeWidth="1.5" strokeLinecap="square" opacity={0.65} variants={{ hover: { opacity: 1, strokeWidth: 2 } }} transition={{ duration: 0.2 }} />
      </svg>
      {/* Bottom-right */}
      <svg aria-hidden="true" style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '14px', height: '14px', overflow: 'visible', pointerEvents: 'none' }}>
        <motion.path d="M14,4 L14,14 L4,14" fill="none" stroke="#B22234" strokeWidth="1.5" strokeLinecap="square" opacity={0.65} variants={{ hover: { opacity: 1, strokeWidth: 2 } }} transition={{ duration: 0.2 }} />
      </svg>


      {/* ── Hover ink-wash sweep ──────────────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(178,34,52,0.06)',
          scaleX: 0,
          originX: 0,
          pointerEvents: 'none',
        }}
        variants={{ hover: { scaleX: 1 }, tap: { scaleX: 1 } }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* ── Button text ───────────────────────────────────────────── */}
      <motion.span
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#171717',
        }}
        variants={{ hover: { color: '#B22234' } }}
        transition={{ duration: 0.2 }}
      >
        {children}
        {icon && (
          <motion.span variants={{ hover: { x: 4 }, tap: { x: 2 } }}>
            {icon}
          </motion.span>
        )}
      </motion.span>
    </motion.button>
  );
}
