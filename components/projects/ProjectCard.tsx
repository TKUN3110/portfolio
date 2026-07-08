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

export default function ProjectCard({ project, delay = 0, index = 0 }: ProjectCardProps) {
  const kanji = siteConfig.kanji?.projectCards?.[project.id] ?? siteConfig.kanji?.projectsKanji ?? { text: '作', translation: 'Create' };
  const year = projectYears[project.id] ?? '2025';

  // Attach scroll tracking to this card's own wrapper div.
  // offset: ["0 1", "1 0"]
  //   "0 1" = card's top (0) meets viewport's bottom (1) → progress = 0  (card entering from below)
  //   "1 0" = card's bottom (1) meets viewport's top (0) → progress = 1  (card fully exited above)
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['0 1', '1 0'],
  });

  // Mask: scaleY=1 covers the scroll (closed). scaleY=0 reveals it (open).
  // Opens quickly once card enters, stays open while in view, closes as it exits top.
  const maskScaleY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 1]);

  // Tassel fades in when scroll is open.
  const tassleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={scrollRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* ── Wooden Rod (always visible) ── */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', zIndex: 3, marginBottom: -2 }}>
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

      {/* ── Scroll Body (full DOM height — layout never shifts) ── */}
      <div style={{ position: 'relative', width: '88%', zIndex: 2 }}>
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

        {/* Parchment scroll content */}
        <div style={{
          backgroundColor: 'var(--parchment)',
          padding: '28px 24px 32px',
          boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.04), inset -3px 0 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Paper texture */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)', pointerEvents: 'none' }} />
          {/* Watercolour blob */}
          <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220, 180, 180, 0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Year + Kanji header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'var(--charcoal-light)', opacity: 0.7, letterSpacing: '0.05em' }}>{year}</span>
            {kanji?.text && (
              <SumiTooltip translation={kanji.translation}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: 'rgba(28,28,28,0.08)', letterSpacing: '0.02em', lineHeight: 1, userSelect: 'none', cursor: 'help', pointerEvents: 'auto' }}>{kanji.text}</span>
              </SumiTooltip>
            )}
          </div>

          {/* Title */}
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 10, position: 'relative', zIndex: 1 }}>
            {project.title}
          </h3>

          {/* Subtitle */}
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, color: 'var(--crimson)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.4, marginBottom: 20, position: 'relative', zIndex: 1 }}>
            {project.subtitle}
          </p>

          {/* Separator */}
          <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(28,28,28,0.12), transparent)', marginBottom: 18 }} />

          {/* Description */}
          <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'var(--charcoal-light)', opacity: 0.88, marginBottom: 24, position: 'relative', zIndex: 1 }}>
            {project.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 20, position: 'relative', zIndex: 1 }}>
            {project.tech.map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, color: 'var(--charcoal)', backgroundColor: 'rgba(28, 28, 28, 0.06)', border: '1px solid rgba(28, 28, 28, 0.12)', borderRadius: '1px', padding: '2px 9px', letterSpacing: '0.02em' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            {project.github && (
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '12px', fontWeight: 600, color: 'var(--charcoal)', cursor: 'pointer', transition: 'color 0.25s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}>
                <Github size={14} /><span>CODE</span>
              </motion.a>
            )}
            {project.demo && (
              <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
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
        </div>

        {/* ── MASK OVERLAY ──
            Same parchment background as the section → invisible against the bg, hides content.
            scaleY=1: mask covers entire scroll body → scroll appears CLOSED (just the rod shows).
            scaleY=0: mask shrinks to nothing → scroll content fully visible (OPEN).
            transformOrigin:'top center' → mask shrinks upward → reveals content top-to-bottom = unrolling.
            Driven directly by scrollYProgress of THIS card's ref: no thresholds, no whileInView. */}
        <motion.div
          style={{
            scaleY: maskScaleY,
            transformOrigin: 'top center',
            position: 'absolute',
            top: 0,
            left: -12,
            right: -12,
            bottom: 0,
            backgroundColor: 'var(--parchment)',
            backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(226, 222, 201, 0.25) 0%, transparent 60%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Bottom tassel — fades with scroll open/close ── */}
      <motion.div
        style={{
          opacity: tassleOpacity,
          width: '88%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <div style={{ width: '30%', height: 6, background: 'linear-gradient(180deg, #C4A37A 0%, #8B5E35 50%, #6B4423 100%)', boxShadow: '0 2px 6px rgba(0,0,0,0.22)' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #C8A97E, #7A5230 60%, #3D2410)', boxShadow: '1px 2px 5px rgba(0,0,0,0.3)' }} />
      </motion.div>
    </div>
  );
}
