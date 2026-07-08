'use client';

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { TimelineItemData } from '@/data/timeline';

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  scrollYProgress: any;
}

export default function TimelineItem({ item, index, scrollYProgress }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  const flowerRanges = [
    [0.05, 0.08], // item 0
    [0.30, 0.33], // item 1
    [0.55, 0.58], // item 2
    [0.80, 0.83]  // item 3
  ];
  const currentFlowerRange = flowerRanges[index] ?? [0.1, 0.2];

  const flowerScale = useTransform(scrollYProgress, [currentFlowerRange[0] - 0.03, currentFlowerRange[0], currentFlowerRange[1]], [0, 0, 1]);
  const flowerRotate = useTransform(scrollYProgress, [currentFlowerRange[0] - 0.03, currentFlowerRange[0], currentFlowerRange[1]], [-45, -45, 0]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'relative',
        minHeight: '220px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Left panel (Empty in mobile, holds content on desktop for alternating layout) */}
      <div 
        className="timeline-side-panel left"
        style={{
          width: '50%',
          paddingRight: '45px',
          paddingBottom: '48px',
          textAlign: 'right',
          display: 'none',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {isEven && (
          <TimelineContent
            item={item}
            align="right"
            scrollYProgress={scrollYProgress}
            index={index}
          />
        )}
      </div>

      {/* Center spine & Timeline dot */}
      <div
        style={{
          position: 'relative',
          width: '40px',
          display: 'flex',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Blooming Sakura Milestone Flower */}
        <motion.div
          style={{
            position: 'absolute',
            top: '16px',
            width: '26px',
            height: '26px',
            zIndex: 10,
            cursor: 'pointer',
            scale: flowerScale,
            rotate: flowerRotate,
          }}
        >
          <SakuraFlower size={26} />
        </motion.div>
      </div>

      {/* Right panel */}
      <div
        className="timeline-side-panel right"
        style={{
          width: '100%',
          paddingLeft: '24px',
          paddingBottom: '48px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!isEven ? (
          <TimelineContent
            item={item}
            align="left"
            scrollYProgress={scrollYProgress}
            index={index}
          />
        ) : (
          <div className="mobile-show">
            <TimelineContent
              item={item}
              align="left"
              scrollYProgress={scrollYProgress}
              index={index}
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        .mobile-show {
          display: block;
        }
        @media (min-width: 768px) {
          .timeline-side-panel.left {
            display: flex !important;
          }
          .timeline-side-panel.right {
            width: 50% !important;
            padding-left: 45px !important;
          }
          .mobile-show {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Inner helper content block
function TimelineContent({ 
  item, 
  align, 
  scrollYProgress, 
  index 
}: { 
  item: TimelineItemData; 
  align: 'left' | 'right'; 
  scrollYProgress: any; 
  index: number; 
}) {
  const isRight = align === 'right';

  const ranges = [
    [0.18, 0.23], // item 0
    [0.43, 0.48], // item 1
    [0.68, 0.73], // item 2
    [0.93, 0.98]  // item 3
  ];

  const currentRange = ranges[index] ?? [0.1, 0.2];

  // Opacity and Y movement linked directly to scroll
  const cardOpacity = useTransform(scrollYProgress, [currentRange[0] - 0.04, currentRange[0], currentRange[1]], [0, 0, 1]);
  const cardY = useTransform(scrollYProgress, [currentRange[0] - 0.04, currentRange[0], currentRange[1]], [15, 15, 0]);
  const cardScale = useTransform(scrollYProgress, [currentRange[0] - 0.04, currentRange[0], currentRange[1]], [0.97, 0.97, 1]);

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isRight ? 'flex-end' : 'flex-start',
        textAlign: align,
        width: '100%',
        opacity: cardOpacity,
        y: cardY,
        scale: cardScale,
      }}
    >
      <div 
        className="washi-border"
        style={{
          padding: '24px 28px',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: '4px',
        }}
      >
        {/* Date badge */}
        <div 
          className="red-stamp" 
          style={{ 
            writingMode: 'horizontal-tb', 
            fontSize: '11px', 
            padding: '4px 8px',
            marginBottom: '14px',
            transform: 'rotate(-1.5deg)',
            borderRadius: '1px',
            boxShadow: '0 2px 4px rgba(140,29,24,0.1)',
            zIndex: 1,
          }}
        >
          {item.year}
        </div>

        {/* Event Details */}
        <h3 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '18px', 
            fontWeight: 700, 
            color: 'var(--charcoal)',
            marginBottom: '4px',
            zIndex: 1,
          }}
        >
          {item.title}
        </h3>
        
        <span 
          style={{ 
            fontSize: '13px', 
            fontWeight: 600, 
            color: 'var(--crimson)', 
            letterSpacing: '0.05em',
            marginBottom: '12px',
            zIndex: 1,
          }}
        >
          {item.company}
        </span>

        <p 
          style={{ 
            fontSize: '13.5px', 
            lineHeight: '1.6', 
            color: 'var(--charcoal-light)', 
            opacity: 0.85, 
            marginBottom: '16px',
            zIndex: 1,
          }}
        >
          {item.description}
        </p>

        {/* Meta tags */}
        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', zIndex: 1 }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--charcoal-light)',
                  backgroundColor: 'rgba(28,28,28,0.04)',
                  border: '1px solid rgba(28,28,28,0.08)',
                  padding: '1px 6px',
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SakuraFlower({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: 'block' }}>
      <g transform="translate(12, 12)">
        {/* 5 Petals rotated at 72 degree intervals */}
        {[0, 72, 144, 216, 288].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            {/* Heart-split tip sakura petal */}
            <path
              d="M 0,0 C -3.5,-5.5 -5.5,-9.5 0,-12 C 5.5,-9.5 3.5,-5.5 0,0"
              fill="var(--sakura)"
            />
            {/* Delicate vein lines */}
            <line x1="0" y1="0" x2="0" y2="-8.5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.45" />
          </g>
        ))}
        {/* Central stamens (gold pistils) */}
        <circle cx="0" cy="0" r="2.2" fill="var(--accent-gold)" />
        <circle cx="0" cy="0" r="1.1" fill="#ffffff" />
      </g>
    </svg>
  );
}
