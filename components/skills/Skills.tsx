'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { siteConfig } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

const categoryIcons = [
  // AI & CV - Eye
  <svg key="ai-cv" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // LLMs & GenAI - Chat Bubble / Bot
  <svg key="llms-gen" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" />
  </svg>,
  // Software Eng - Code
  <svg key="soft-eng" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // MLOps & Tools - Layers
  <svg key="mlops-tools" viewBox="0 0 24 24">
    <polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="2 17 12 22 22 17" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="2 12 12 17 22 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const tagContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const tagItemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(226, 222, 201, 0.25) 0%, transparent 60%)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ink-wash bleed in corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 220, height: 220, background: 'radial-gradient(circle at 100% 0%, rgba(178,34,52,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 180, height: 180, background: 'radial-gradient(circle at 0% 100%, rgba(201,162,39,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="skills-combat-layout">

          {/* ── LEFT COLUMN: Profile Card ── */}
          <div className="profile-column">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <div
                style={{
                  border: '1px dashed rgba(23, 23, 23, 0.3)',
                  padding: '8px',
                  backgroundColor: 'var(--parchment)',
                  position: 'relative',
                  width: '100%',
                  maxWidth: '280px',
                }}
              >
                <div
                  style={{
                    border: '1px solid rgba(23, 23, 23, 0.15)',
                    padding: '30px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {siteConfig.kanji?.skillsWanted?.text && (
                    <SumiTooltip translation={siteConfig.kanji.skillsWanted.translation}>
                      <div style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        letterSpacing: '0.1em',
                        marginBottom: '25px',
                        borderBottom: '2px solid var(--charcoal)',
                        paddingBottom: '10px',
                        width: '80%',
                        fontWeight: 700,
                        cursor: 'help',
                      }}>
                        {siteConfig.kanji.skillsWanted.text}
                      </div>
                    </SumiTooltip>
                  )}

                  <div style={{
                    width: '160px',
                    height: '200px',
                    backgroundColor: 'rgba(23, 23, 23, 0.05)',
                    border: '1px solid rgba(23, 23, 23, 0.1)',
                    marginBottom: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* User profile image */}
                    <img
                      src="/images/199908.jpg"
                      alt="Tejas Salunke"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallbackSvg = document.getElementById('avatar-silhouette-fallback');
                        if (fallbackSvg) {
                          fallbackSvg.style.display = 'block';
                        }
                      }}
                    />

                    {/* Ink brush silhouette SVG as fallback */}
                    <svg
                      id="avatar-silhouette-fallback"
                      viewBox="0 0 160 200"
                      style={{
                        width: '82%',
                        height: '100%',
                        opacity: 0.82,
                        display: 'none',
                      }}
                    >
                      {/* Head */}
                      <ellipse cx="80" cy="56" rx="30" ry="33" fill="var(--charcoal)" opacity="0.85" />
                      {/* Hair */}
                      <ellipse cx="80" cy="33" rx="30" ry="18" fill="var(--charcoal)" />
                      <rect x="50" y="28" width="8" height="32" rx="3" fill="var(--charcoal)" />
                      <rect x="102" y="28" width="8" height="32" rx="3" fill="var(--charcoal)" />
                      {/* Neck */}
                      <rect x="71" y="85" width="18" height="16" rx="3" fill="var(--charcoal)" opacity="0.8" />
                      {/* Body/Shoulders */}
                      <path d="M22,145 Q42,102 80,106 Q118,102 138,145 L138,200 L22,200 Z" fill="var(--charcoal)" opacity="0.85" />
                      {/* Face highlight */}
                      <ellipse cx="80" cy="56" rx="22" ry="25" fill="#ECE7DC" opacity="0.55" />
                      {/* Eyes */}
                      <ellipse cx="68" cy="53" rx="5" ry="4" fill="var(--charcoal)" />
                      <ellipse cx="92" cy="53" rx="5" ry="4" fill="var(--charcoal)" />
                      <ellipse cx="69.5" cy="52" rx="1.5" ry="1.5" fill="white" opacity="0.8" />
                      <ellipse cx="93.5" cy="52" rx="1.5" ry="1.5" fill="white" opacity="0.8" />
                      {/* Smile */}
                      <path d="M70,70 Q80,77 90,70" fill="none" stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" />
                      {/* Ink texture scatter dots */}
                      <circle cx="40" cy="140" r="1.5" fill="var(--charcoal)" opacity="0.15" />
                      <circle cx="120" cy="155" r="1" fill="var(--charcoal)" opacity="0.12" />
                      <circle cx="35" cy="170" r="1" fill="var(--charcoal)" opacity="0.1" />
                    </svg>

                    {/* Watercolor bottom fade */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, var(--parchment-dark), transparent)', pointerEvents: 'none' }} />
                  </div>

                  <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    letterSpacing: '0.15em',
                    margin: '0 0 5px 0',
                    fontWeight: 700,
                    color: 'var(--charcoal)',
                  }}>
                    TEJAS
                  </h1>
                  <p style={{
                    color: 'var(--crimson)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    margin: 0,
                  }}>
                    AI ENGINEER
                  </p>
                </div>
                {siteConfig.kanji?.skillsStamp !== undefined && (
                  <SumiTooltip
                    translation={siteConfig.kanji.skillsStamp?.translation}
                    style={{
                      position: 'absolute',
                      bottom: '-15px',
                      right: '-15px',
                      width: '40px',
                      height: '40px',
                      zIndex: 2,
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'var(--crimson)',
                      color: 'var(--parchment)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      borderRadius: '4px',
                      transform: 'rotate(-5deg)',
                      boxShadow: '2px 2px 5px rgba(0,0,0,0.15)',
                      cursor: 'help',
                    }}>
                      {siteConfig.kanji.skillsStamp?.text || '\u00a0'}
                    </div>
                  </SumiTooltip>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Expertise Section ── */}
          <div className="expertise-column">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="section-header"
            >
              <span className="sub-title">
                {siteConfig.kanji?.skillsSubtitle?.text ? (
                  <SumiTooltip translation={siteConfig.kanji.skillsSubtitle.translation}>
                    <span style={{ cursor: 'help' }}>{siteConfig.kanji.skillsSubtitle.text}</span>
                  </SumiTooltip>
                ) : ''}
                {siteConfig.kanji?.skillsSubtitle?.text ? ' / ' : ''}SKILLS DATA
              </span>
              <h2>EXPERTISE</h2>
              <div className="brush-line" />
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: '-40px' }}
              className="skills-grid"
            >
              {skillCategories.map((cat, catIdx) => (
                <motion.div
                  key={cat.title}
                  variants={rowVariants}
                  className="category-row"
                >
                  <div className="title-group" style={{ alignItems: 'flex-start' }}>
                    {/* Left Column: Icon + Kanji Stamp underneath */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0, width: '32px' }}>
                      <div className="icon-circle">
                        {categoryIcons[catIdx] ?? categoryIcons[0]}
                      </div>
                      {cat.kanji !== undefined && (
                        <SumiTooltip translation={cat.kanji?.translation}>
                          <div
                            className="red-stamp"
                            style={{
                              fontSize: '9px',
                              padding: '2px 4px',
                              minWidth: '18px',
                              minHeight: '18px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              writingMode: 'horizontal-tb',
                              borderRadius: '2px',
                              transform: 'rotate(-3deg)',
                              flexShrink: 0,
                              cursor: 'help',
                            }}
                          >
                            {cat.kanji?.text || '\u00a0'}
                          </div>
                        </SumiTooltip>
                      )}
                    </div>

                    {/* Right Column: Title text */}
                    <div className="category-title" style={{ padding: 0, paddingTop: '8px', lineHeight: '1.2' }}>
                      {cat.title}
                    </div>
                  </div>

                  <motion.div
                    variants={tagContainerVariants}
                    className="tags-container"
                  >
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        variants={tagItemVariants}
                        className="tag-pill"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .skills-combat-layout {
          display: flex;
          flex-direction: column;
          gap: 48px;
          width: 100%;
        }
        .profile-column {
          width: 100%;
          display: flex;
          justify-content: center;
          flex-shrink: 0;
        }
        .expertise-column {
          flex-grow: 1;
          padding-top: 10px;
        }
        .section-header {
          margin-bottom: 40px;
        }
        .section-header .sub-title {
          color: var(--crimson);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          font-weight: 600;
          margin-bottom: 5px;
          display: block;
        }
        .section-header h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 400;
          margin: 0;
          letter-spacing: 0.05em;
          color: var(--charcoal);
        }
        .brush-line {
          width: 150px;
          height: 4px;
          background-color: var(--charcoal);
          margin-top: 10px;
          border-radius: 2px 50% 2px 50%;
          opacity: 0.7;
        }
        .skills-grid {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .category-row {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid rgba(23, 23, 23, 0.1);
          padding-bottom: 24px;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }
        .title-group {
          width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .icon-circle {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(23, 23, 23, 0.3);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--charcoal);
        }
        .icon-circle svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }
        .category-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: var(--crimson);
          text-transform: uppercase;
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 2px;
        }
        .tag-pill {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          padding: 6px 14px;
          border: 1px solid var(--charcoal);
          border-radius: 20px;
          background: transparent;
          color: var(--charcoal);
          transition: all 0.25s ease;
          cursor: default;
        }
        .tag-pill:hover {
          background-color: var(--charcoal);
          color: var(--parchment);
        }
         @media (min-width: 768px) {
           .skills-combat-layout {
             flex-direction: row;
             gap: 60px;
             align-items: flex-start;
           }
           .profile-column {
             width: 280px;
           }
         }
        @media (min-width: 850px) {
          .category-row {
            flex-direction: row;
            gap: 0;
          }
          .title-group {
            width: 250px;
          }
        }
      `}</style>
    </section>
  );
}
