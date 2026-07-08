'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/data/projects';
import { Github, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

interface ProjectCardProps {
  project: Project;
  delay?: number;
  index?: number;
}

const projectYears: Record<string, string> = {
  'breast-cancer-pipeline': '2026',
  'eco-sentry':             '2026',
  'genomic-classifier':     '2026',
};

const Roller = ({ isTop }: { isTop: boolean }) => (
  <div style={{
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 12,
    marginBottom: isTop ? -2 : 0,
    marginTop: isTop ? 0 : -2,
  }}>
    {/* Left knob */}
    <div style={{
      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 35% 35%, #C8A97E, #7A5230 60%, #3D2410)',
      boxShadow: '2px 2px 6px rgba(0,0,0,0.35), inset -2px -2px 4px rgba(0,0,0,0.2)',
    }} />
    {/* Rod bar */}
    <div style={{
      flex: 1, height: 10,
      background: 'linear-gradient(180deg, #C4A37A 0%, #8B5E35 40%, #6B4423 70%, #8B5E35 100%)',
      boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)',
    }} />
    {/* Right knob */}
    <div style={{
      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 35% 35%, #C8A97E, #7A5230 60%, #3D2410)',
      boxShadow: '2px 2px 6px rgba(0,0,0,0.35), inset -2px -2px 4px rgba(0,0,0,0.2)',
    }} />
  </div>
);

export default function ProjectCard({ project, delay = 0, index = 0 }: ProjectCardProps) {
  const kanji = siteConfig.kanji?.projectCards?.[project.id] ?? siteConfig.kanji?.projectsKanji ?? { text: '作', translation: 'Create' };
  const year = projectYears[project.id] ?? '2026';

  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the 140vh wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Map the scroll progress to a height in pixels
  const paperHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0px", "420px"]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);
  const tassleOpacity = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);

  return (
    <div ref={containerRef} className="scroll-wrapper">
      <div className="sticky-viewport">
        <div className="scroll-assembly">
          
          {/* Top Wooden Roller */}
          <Roller isTop={true} />

          {/* Unrolling Paper */}
          <motion.div style={{ height: paperHeight }} className="paper">
            {/* Deckled left edge */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
              style={{ position: 'absolute', left: -9, top: 0, bottom: 0, width: 10, height: '100%', zIndex: 4, pointerEvents: 'none' }}>
              <path d="M10,0 L8,4 L10,8 L7,12 L10,16 L8,20 L10,24 L7,28 L10,32 L8,36 L10,40 L7,44 L10,48 L8,52 L10,56 L7,60 L10,64 L8,68 L10,72 L7,76 L10,80 L8,84 L10,88 L7,92 L10,96 L10,100 L0,100 L0,0 Z"
                fill="var(--parchment)" />
            </svg>
            {/* Deckled right edge */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
              style={{ position: 'absolute', right: -9, top: 0, bottom: 0, width: 10, height: '100%', zIndex: 4, pointerEvents: 'none' }}>
              <path d="M0,0 L2,4 L0,8 L3,12 L0,16 L2,20 L0,24 L3,28 L0,32 L2,36 L0,40 L3,44 L0,48 L2,52 L0,56 L3,60 L0,64 L2,68 L0,72 L3,76 L0,80 L2,84 L0,88 L3,92 L0,96 L0,100 L10,100 L10,0 Z"
                fill="var(--parchment)" />
            </svg>

            {/* Paper texture and watercolors */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220, 180, 180, 0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Content Wrapper */}
            <motion.div
              style={{
                height: '420px',
                width: '100%',
                padding: '32px 28px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: contentOpacity,
                position: 'relative',
              }}
            >
              {/* Year + Kanji header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'var(--charcoal-light)', opacity: 0.7, letterSpacing: '0.05em' }}>{year}</span>
                {kanji?.text && (
                  <SumiTooltip translation={kanji.translation}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: 'rgba(28,28,28,0.08)', letterSpacing: '0.02em', lineHeight: 1, userSelect: 'none', cursor: 'help', pointerEvents: 'auto' }}>{kanji.text}</span>
                  </SumiTooltip>
                )}
              </div>

              {/* Title & Subtitle */}
              <div style={{ marginTop: '10px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 6 }}>
                  {project.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10.5px', fontWeight: 700, color: 'var(--crimson)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.4 }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Separator */}
              <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(28,28,28,0.12), transparent)', margin: '12px 0' }} />

              {/* Description */}
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--charcoal-light)', opacity: 0.88, flexGrow: 1, marginBottom: '16px', overflowY: 'auto' }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {project.tech.map((tag) => (
                  <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, color: 'var(--charcoal)', backgroundColor: 'rgba(28, 28, 28, 0.06)', border: '1px solid rgba(28, 28, 28, 0.12)', borderRadius: '1px', padding: '1px 8px', letterSpacing: '0.02em' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {project.github && (
                  <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '12px', fontWeight: 600, color: 'var(--charcoal)', cursor: 'pointer', transition: 'color 0.25s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}>
                    <Github size={14} /><span>CODE</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '12px', fontWeight: 600, color: 'var(--charcoal)', cursor: 'pointer', transition: 'color 0.25s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}>
                    <ExternalLink size={14} /><span>LIVE</span>
                  </motion.a>
                )}
                {project.featured && siteConfig.kanji?.projectsFeatured?.text && (
                  <SumiTooltip translation={siteConfig.kanji.projectsFeatured.translation}>
                    <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-serif)', fontSize: '10px', color: 'var(--crimson)', border: '1.5px solid var(--crimson)', borderRadius: '2px', padding: '2px 5px', fontWeight: 'bold', letterSpacing: '1px', opacity: 0.75, transform: 'rotate(-3deg)', userSelect: 'none', cursor: 'help' }}>
                      {siteConfig.kanji.projectsFeatured.text}
                    </div>
                  </SumiTooltip>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Wooden Roller */}
          <Roller isTop={false} />

          {/* Bottom tassel */}
          <motion.div
            style={{
              opacity: tassleOpacity,
              width: '88%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 3,
              marginTop: 4,
            }}
          >
            <div style={{ width: '30%', height: 6, background: 'linear-gradient(180deg, #C4A37A 0%, #8B5E35 50%, #6B4423 100%)', boxShadow: '0 2px 6px rgba(0,0,0,0.22)' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #C8A97E, #7A5230 60%, #3D2410)', boxShadow: '1px 2px 5px rgba(0,0,0,0.3)' }} />
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        .scroll-wrapper {
          height: 140vh;
          position: relative;
          width: 100%;
          margin-bottom: 2rem;
        }
        .sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .scroll-assembly {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 90%;
          max-width: 620px;
        }
        .paper {
          width: 88%;
          position: relative;
          background-color: var(--parchment);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-shadow: inset 3px 0 8px rgba(0,0,0,0.04), inset -3px 0 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.15);
          will-change: height;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
