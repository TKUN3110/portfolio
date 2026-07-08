'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Timeline from '@/components/timeline/Timeline';
import Contact from '@/components/contact/Contact';

// Interactive canvas layers
import SakuraPetals from '@/components/effects/SakuraPetals';
import MouseGlow from '@/components/effects/MouseGlow';
import InkStrokeIntro from '@/components/effects/InkStrokeIntro';


export default function Home() {
  return (
    <>
      {/* Page Intro Transition */}
      <InkStrokeIntro />
      
      {/* Dynamic Navigation Progress indicator */}
      <ScrollProgress />
      
      {/* Sticky Header */}
      <Navbar />

      {/* Floating Interactive Effects (HTML5 Canvas layers) */}
      <SakuraPetals />
      <MouseGlow />


      {/* Page Content sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
