'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/config';

interface SumiSendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSubmitting?: boolean;
}

export default function SumiSendButton({
  children,
  isSubmitting = false,
  disabled,
  style,
  ...props
}: SumiSendButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [petalsKey, setPetalsKey] = useState(0);
  const isDisabled = disabled || isSubmitting;

  // Re-trigger petal burst animations on each hover
  useEffect(() => {
    if (hovered) setPetalsKey((k) => k + 1);
  }, [hovered]);

  return (
    <motion.button
      onHoverStart={() => !isDisabled && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      disabled={isDisabled}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        padding: 0,
        // Width for button body + extra right room for sakura overflow
        width: '252px',
        height: '56px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled && !isSubmitting ? 0.5 : 1,
        ...style,
      }}
      {...(props as any)}
    >
      {/* ── SVG Layer: organic ink shape + sakura branch ── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-22px',
          left: '-8px',
          width: '272px',
          height: '102px',
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        viewBox="-8 -22 272 102"
      >
        {/* Ink-wash fill — slides in from left on hover */}
        <motion.path
          d="M 4,6 Q 126,2 246,5 Q 248,30 246,53 Q 126,56 5,52 Q 2,30 4,6 Z"
          fill="#B22234"
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0, transformOrigin: 'left center' }}
        />

        {/* Outer organic outline */}
        <path
          d="M 4,6 Q 126,2 246,5 Q 248,30 246,53 Q 126,56 5,52 Q 2,30 4,6 Z"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner hairline — subtle depth / hand-drawn feel */}
        <path
          d="M 7,9 Q 126,5 243,8"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.75"
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* ── Sakura Branch ── */}
        {/* Main branch — curves up from top-right of button */}
        <path
          d="M 188,4 Q 208,-17 234,-6 T 260,20"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Side twig */}
        <path
          d="M 219,-5 Q 232,-21 243,-14"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* ── Cherry blossom petals ── */}
        {/* Cluster 1 — mid-branch */}
        <motion.circle
          key={`p0-${petalsKey}`}
          cx="213" cy="-9" r="4"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.15, 1] : 1, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        />
        <motion.circle
          key={`p1-${petalsKey}`}
          cx="207" cy="-5" r="2.5"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.2, 1] : 1, opacity: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.circle
          key={`p2-${petalsKey}`}
          cx="220" cy="-4" r="3"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.18, 1] : 1, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />

        {/* Cluster 2 — side twig */}
        <motion.circle
          key={`p3-${petalsKey}`}
          cx="239" cy="-14" r="3.5"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.2, 1] : 1, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        />
        <motion.circle
          key={`p4-${petalsKey}`}
          cx="245" cy="-9" r="2"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.3, 1] : 1, opacity: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        />

        {/* Cluster 3 — branch tip */}
        <motion.circle
          key={`p5-${petalsKey}`}
          cx="256" cy="11" r="3.5"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.18, 1] : 1, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        />
        <motion.circle
          key={`p6-${petalsKey}`}
          cx="250" cy="18" r="2"
          fill="#DB5E5E"
          animate={{ scale: hovered ? [1, 1.25, 1] : 1, opacity: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        />

        {/* ── Red Hanko Seal (bottom-left) ── */}
        {siteConfig.kanji?.contactKanji !== undefined && (
          <g style={{ cursor: 'help' }}>
            {siteConfig.kanji.contactKanji?.translation && (
              <title>{siteConfig.kanji.contactKanji.translation}</title>
            )}
            <rect
              x="6" y="41"
              width="14" height="14"
              fill="#B22234"
              opacity="0.9"
              rx="1"
              transform="rotate(-7 13 48)"
            />
            <text
              x="8" y="52"
              fill="#F5EFE1"
              fontSize="9"
              fontWeight="bold"
              fontFamily="serif"
              transform="rotate(-7 13 48)"
            >
              {siteConfig.kanji.contactKanji?.text || '\u00a0'}
            </text>
          </g>
        )}
      </svg>

      {/* ── Content Layer: icon + label ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
          marginRight: '4px', // keep clear of right sakura bleed
        }}
      >
        {/* Icon — spinner while submitting, send plane otherwise */}
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{
                rotate: { duration: 0.9, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 0.15 },
              }}
              style={{ display: 'flex', color: hovered ? '#F5EFE1' : '#1a1a1a' }}
            >
              <svg
                width="14" height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.9" />
                <path d="M12 22a10 10 0 0 1-10-10" opacity="0.25" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="send-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex' }}
            >
              <motion.svg
                width="14" height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  color: hovered ? '#F5EFE1' : '#1a1a1a',
                  x: hovered ? 4 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </motion.svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Button label */}
        <motion.span
          animate={{ color: hovered ? '#F5EFE1' : '#1a1a1a' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.13em',
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </motion.span>
      </div>
    </motion.button>
  );
}
