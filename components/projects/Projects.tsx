'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from './ProjectCard';
import { projectsData } from '@/data/projects';
import { siteConfig } from '@/data/config';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the entire projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="projects-section"
      style={{
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(226, 222, 201, 0.25) 0%, transparent 60%)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div className="sticky-viewport">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
          <SectionTitle
            title="Featured Creations"
            subtitle="MY WORK"
            kanji={siteConfig.kanji.projectsKanji}
            stamp={siteConfig.kanji.projectsKanji}
            align="center"
          />

          <div className="projects-grid">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                scrollYProgress={scrollYProgress}
                index={index}
                delay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          height: 150vh;
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
          width: 100%;
        }
        .projects-grid {
          display: grid;
          gap: 24px;
          margin-top: 40px;
          align-items: center;
          grid-template-columns: 1fr;
          width: 100%;
        }
        @media (max-width: 1023px) {
          .projects-section {
            height: auto !important;
          }
          .sticky-viewport {
            position: relative !important;
            height: auto !important;
            padding: 60px 0 !important;
            overflow: visible !important;
          }
        }
        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
