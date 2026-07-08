'use client';

import React from 'react';
import { motion } from 'framer-motion';
import InkBrush from '@/components/effects/InkBrush';
import { fadeIn, stampRotate } from '@/lib/animations';

import { KanjiEntry } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  kanji?: KanjiEntry;
  stamp?: KanjiEntry;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  title,
  subtitle,
  kanji,
  stamp,
  align = 'center',
}: SectionTitleProps) {
  const isCenter = align === 'center';

  return (
    <div 
      style={{
        position: 'relative',
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : 'flex-start',
        textAlign: isCenter ? 'center' : 'left',
      }}
    >
      {/* Translucent Background Kanji watermark */}
      {kanji?.text && (
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            [isCenter ? 'left' : 'left']: isCenter ? '50%' : '20px',
            transform: isCenter ? 'translateX(-50%)' : 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '9rem',
            fontWeight: 800,
            color: 'var(--charcoal)',
            opacity: 0.03,
            pointerEvents: 'none',
            zIndex: 0,
            userSelect: 'none',
          }}
        >
          {kanji.text}
        </div>
      )}

      {/* Title Subheading */}
      {subtitle && (
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--crimson)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {subtitle}
        </span>
      )}

      {/* Main Title Head & Red Stamp Seal */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2 
          style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            lineHeight: 1.2,
            fontFamily: 'var(--font-serif)'
          }}
        >
          {title}
        </h2>
        
        {stamp !== undefined && (
          <SumiTooltip translation={stamp?.translation}>
            <motion.div
              variants={stampRotate}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              className="red-stamp-circle"
              style={{
                width: '32px',
                height: '32px',
                fontSize: '14px',
                flexShrink: 0,
                boxShadow: '0 2px 5px rgba(140,29,24,0.15)',
                transform: 'rotate(-5deg)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'help',
              }}
            >
              {stamp?.text || '\u00a0'}
            </motion.div>
          </SumiTooltip>
        )}
      </div>

      {/* Underline Calligraphy Brush stroke */}
      <div 
        style={{ 
          width: isCenter ? '240px' : '160px', 
          height: '16px', 
          marginTop: '12px',
          opacity: 0.85,
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <InkBrush type="horizontal" color="var(--charcoal)" animate={true} />
      </div>
    </div>
  );
}
