'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroText from './HeroText';
import Mountain from './Mountain';
import SakuraBackground from './SakuraBackground';
import Parallax from '@/components/effects/Parallax';
import { siteConfig } from '@/data/config';

import SumiTooltip from '@/components/ui/SumiTooltip';

export default function Hero() {

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px 80px',
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(226, 222, 201, 0.25) 0%, transparent 60%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Traditional Red Seal Logo (Top Left background) */}
      {(siteConfig.kanji?.navLogo !== undefined || siteConfig.kanji?.navStamp !== undefined) && (
        <div
          style={{
            position: 'absolute',
            top: '110px',
            left: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.25, // increase opacity slightly so it's readable on hover
            pointerEvents: 'auto',
            userSelect: 'none',
            zIndex: 9,
          }}
        >
          {siteConfig.kanji?.navLogo !== undefined && siteConfig.kanji.navLogo?.text && (
            <SumiTooltip translation={siteConfig.kanji.navLogo.translation}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', writingMode: 'vertical-rl', fontWeight: 'bold', cursor: 'help' }}>
                {siteConfig.kanji.navLogo.text}
              </div>
            </SumiTooltip>
          )}
          {siteConfig.kanji?.navStamp !== undefined && (
            <SumiTooltip translation={siteConfig.kanji.navStamp?.translation}>
              <div className="red-stamp" style={{ fontSize: '10px', padding: '3px 4px', writingMode: 'horizontal-tb', minWidth: '18px', minHeight: '18px', cursor: 'help' }}>
                {siteConfig.kanji.navStamp?.text || '\u00a0'}
              </div>
            </SumiTooltip>
          )}
        </div>
      )}

      {/* Sumi-e Flying Swallows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
        {/* Swallow 1 (Glides Right to Left, high altitude) */}
        <motion.div
          initial={{ x: '100vw', y: '20vh', scale: 0.35, opacity: 0 }}
          animate={{
            x: ['95vw', '50vw', '5vw'],
            y: ['20vh', '24vh', '16vh'],
            opacity: [0, 0.8, 0],
            scale: [0.35, 0.4, 0.35],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: 1.5,
          }}
          style={{ position: 'absolute' }}
        >
          <motion.svg
            viewBox="0 0 100 100"
            fill="var(--charcoal)"
            style={{ width: '80px', height: '80px' }}
            animate={{ rotate: [-4, 4, -4], scaleY: [1, 0.55, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50,15 C45,25 30,35 5,30 C20,38 35,38 45,35 C42,48 35,65 25,75 C35,68 45,55 48,45 C52,45 62,68 75,75 C65,65 58,48 55,35 C65,38 80,38 95,30 C70,35 55,25 50,15 Z" />
          </motion.svg>
        </motion.div>

        {/* Swallow 2 (Glides Right to Left, low altitude) */}
        <motion.div
          initial={{ x: '100vw', y: '35vh', scale: 0.28, opacity: 0 }}
          animate={{
            x: ['90vw', '45vw', '10vw'],
            y: ['35vh', '38vh', '32vh'],
            opacity: [0, 0.7, 0],
            scale: [0.28, 0.32, 0.28],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: 6.5,
          }}
          style={{ position: 'absolute' }}
        >
          <motion.svg
            viewBox="0 0 100 100"
            fill="var(--charcoal)"
            style={{ width: '80px', height: '80px' }}
            animate={{ rotate: [-6, 6, -6], scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50,15 C45,25 30,35 5,30 C20,38 35,38 45,35 C42,48 35,65 25,75 C35,68 45,55 48,45 C52,45 62,68 75,75 C65,65 58,48 55,35 C65,38 80,38 95,30 C70,35 55,25 50,15 Z" />
          </motion.svg>
        </motion.div>

        {/* Swallow 3 (Glides Left to Right) */}
        <motion.div
          initial={{ x: '-10vw', y: '15vh', scale: 0.2, opacity: 0 }}
          animate={{
            x: ['5vw', '45vw', '85vw'],
            y: ['15vh', '12vh', '18vh'],
            opacity: [0, 0.6, 0],
            scale: [0.2, 0.24, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: 11.5,
          }}
          style={{ position: 'absolute' }}
        >
          <motion.svg
            viewBox="0 0 100 100"
            fill="var(--charcoal)"
            style={{ width: '80px', height: '80px' }}
            animate={{ rotate: [8, -8, 8], scaleY: [1, 0.65, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50,15 C45,25 30,35 5,30 C20,38 35,38 45,35 C42,48 35,65 25,75 C35,68 45,55 48,45 C52,45 62,68 75,75 C65,65 58,48 55,35 C65,38 80,38 95,30 C70,35 55,25 50,15 Z" />
          </motion.svg>
        </motion.div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Core Introductory Typography */}
        <HeroText />
      </div>

      {/* Parallax Background: Sumi-e Mount Fuji */}
      <Parallax offset={0.15} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, mixBlendMode: 'multiply' }}>
        <Mountain />
      </Parallax>

      {/* Layered Foreground: Sakura Blossom Branch */}
      <Parallax offset={-0.08} style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, mixBlendMode: 'multiply' }}>
        <SakuraBackground />
      </Parallax>


    </section>
  );
}
