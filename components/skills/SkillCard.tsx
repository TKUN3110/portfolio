'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PaperCard from '@/components/ui/PaperCard';
import { SkillCategory } from '@/data/skills';
import * as Icons from 'lucide-react';
import SumiTooltip from '@/components/ui/SumiTooltip';

interface SkillCardProps {
  category: SkillCategory;
  delay?: number;
}

export default function SkillCard({ category, delay = 0 }: SkillCardProps) {
  // Rough calligraphic stroke path for skill bar indicators
  const skillBarPath = "M0,5 C50,2 100,8 150,4 C200,1 250,9 300,5";

  return (
    <PaperCard
      delay={delay}
      style={{
        padding: '30px 24px',
        height: '100%',
      }}
    >
      {/* Category Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '1px dashed rgba(28,28,28,0.1)',
          paddingBottom: '12px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--charcoal)',
            letterSpacing: '0.05em',
          }}
        >
          {category.title}
        </h3>

        {/* Kanji Seal for Category */}
        {category.kanji?.text !== undefined && (
          <SumiTooltip translation={category.kanji?.translation}>
            <div
              className="red-stamp"
              style={{
                fontSize: '11px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'horizontal-tb',
                borderRadius: '2px',
                cursor: 'help',
              }}
            >
              {category.kanji?.text || '\u00a0'}
            </div>
          </SumiTooltip>
        )}
      </div>

      {/* Skills list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {category.skills.map((skill, index) => {
          // Dynamic Lucide Icon picker
          // @ts-ignore
          const IconComponent = Icons[skill.icon] || Icons.Cpu;

          return (
            <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Skill Meta Label */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--charcoal-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--crimson)' }}>
                    <IconComponent size={14} />
                  </span>
                  <span>{skill.name}</span>
                </div>
                <span style={{ fontSize: '11px', opacity: 0.8, fontFamily: 'var(--font-serif)' }}>{skill.level}%</span>
              </div>

              {/* Custom SVG Calligraphy Brush Progress Bar */}
              <div 
                style={{ 
                  width: '100%', 
                  height: '10px', 
                  backgroundColor: 'rgba(28, 28, 28, 0.05)',
                  borderRadius: '1px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Back static faint stroke */}
                <svg viewBox="0 0 300 10" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                  <path d={skillBarPath} fill="none" stroke="rgba(28, 28, 28, 0.1)" strokeWidth="4" />
                </svg>

                {/* Animated active level stroke using clipPath reveal */}
                <motion.svg 
                  viewBox="0 0 300 10" 
                  preserveAspectRatio="none" 
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: `inset(0 ${100 - skill.level}% 0 0)` }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, delay: delay + (index * 0.1), ease: "easeOut" }}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    position: 'absolute', 
                    top: 0, 
                    left: 0,
                  }}
                >
                  <path 
                    d={skillBarPath} 
                    fill="none" 
                    stroke="var(--charcoal)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>
            </div>
          );
        })}
      </div>
    </PaperCard>
  );
}
