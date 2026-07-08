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
          className="projects-list"
          style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '40px' }}
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
    </section>
  );
}
