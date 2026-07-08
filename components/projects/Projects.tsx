'use client';

import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from './ProjectCard';
import { projectsData } from '@/data/projects';
import { siteConfig } from '@/data/config';

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding"
      style={{
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(226, 222, 201, 0.25) 0%, transparent 60%)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionTitle
          title="Featured Creations"
          subtitle="MY WORK"
          kanji={siteConfig.kanji.projectsKanji}
          stamp={siteConfig.kanji.projectsKanji}
          align="center"
        />

        <div
          className="projects-grid"
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-grid {
          display: grid;
          gap: 24px;
          margin-top: 40px;
          align-items: start;
          grid-template-columns: 1fr;
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
