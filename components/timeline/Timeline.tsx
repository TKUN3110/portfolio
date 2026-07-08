'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import TimelineItem from './TimelineItem';
import { timelineData } from '@/data/timeline';
import { siteConfig } from '@/data/config';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"]
  });

  const centerPathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const twig1PathLength = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const twig2PathLength = useTransform(scrollYProgress, [0.33, 0.43], [0, 1]);
  const twig3PathLength = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const twig4PathLength = useTransform(scrollYProgress, [0.83, 0.93], [0, 1]);

  return (
    <section
      id="experience"
      className="section-padding"
      style={{
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(226, 222, 201, 0.25) 0%, transparent 60%)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Section Title */}
        <SectionTitle
          title="Career Journey"
          subtitle="EXPERIENCE"
          kanji={siteConfig.kanji.experienceKanji}
          stamp={siteConfig.kanji.experienceKanji}
          align="center"
        />

        {/* Timeline wrapper */}
        <div
          ref={containerRef}
          style={{
            marginTop: '50px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
          }}
        >
          {/* Center branch line SVG */}
          <div className="timeline-branch-svg-container" style={{ pointerEvents: 'none' }}>
            <svg viewBox="0 0 100 1200" preserveAspectRatio="none" className="timeline-branch-svg">
              <motion.path
                d="M50,0 Q60,150 40,300 T60,600 T40,900 Q50,1050 50,1200"
                fill="none"
                stroke="var(--charcoal)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ opacity: 0.8, pathLength: centerPathLength }}
              />
              {/* Branch twigs extending left and right to milestones */}
              {/* Twig 1 (Node 0, left) */}
              <motion.path
                d="M48,150 Q25,145 10,135"
                fill="none"
                stroke="var(--charcoal)"
                strokeWidth="2.2"
                style={{ opacity: 0.75, pathLength: twig1PathLength }}
              />
              {/* Twig 2 (Node 1, right) */}
              <motion.path
                d="M52,450 Q75,455 90,465"
                fill="none"
                stroke="var(--charcoal)"
                strokeWidth="2.2"
                style={{ opacity: 0.75, pathLength: twig2PathLength }}
              />
              {/* Twig 3 (Node 2, left) */}
              <motion.path
                d="M48,750 Q25,745 10,735"
                fill="none"
                stroke="var(--charcoal)"
                strokeWidth="2.2"
                style={{ opacity: 0.75, pathLength: twig3PathLength }}
              />
              {/* Twig 4 (Node 3, right) */}
              <motion.path
                d="M52,1050 Q75,1055 90,1065"
                fill="none"
                stroke="var(--charcoal)"
                strokeWidth="2.2"
                style={{ opacity: 0.75, pathLength: twig4PathLength }}
              />
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .timeline-branch-svg-container {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100%;
          z-index: 1;
        }
        .timeline-branch-svg {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 767px) {
          .timeline-branch-svg-container {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
