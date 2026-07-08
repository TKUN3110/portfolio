'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '@/hooks/useScroll';
import InkBrush from '@/components/effects/InkBrush';
import { Menu, X } from 'lucide-react';
import MusicPlayer from '@/components/layout/MusicPlayer';
import { siteConfig } from '@/data/config';

import SumiTooltip from '@/components/ui/SumiTooltip';

export default function Navbar() {
  const { activeSection, scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const bodyRect    = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition  = elementPosition - siteConfig.navbarHeight;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const isScrolled = scrollY > 50;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
        backgroundColor: isScrolled ? 'rgba(250, 246, 238, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(28, 28, 28, 0.05)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: isScrolled ? '12px 40px' : '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s ease',
          overflow: 'visible',
          position: 'relative',
          zIndex: 101,
        }}
      >
        {/* Left-Aligned Group: Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexShrink: 0 }}>
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="clickable"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
          >
            {siteConfig.kanji?.navLogo !== undefined && (
              <SumiTooltip translation={siteConfig.kanji.navLogo?.translation}>
                <div
                  style={{
                    position: 'relative',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <InkBrush type="enso" color="var(--charcoal)" animate={false} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: 'var(--charcoal)',
                      marginTop: '1px',
                      zIndex: 1,
                    }}
                  >
                    {siteConfig.kanji.navLogo?.text || '\u00a0'}
                  </span>
                </div>
              </SumiTooltip>
            )}
            
            {siteConfig.kanji?.navStamp !== undefined && (
              <SumiTooltip translation={siteConfig.kanji.navStamp?.translation}>
                <div className="red-stamp" style={{ padding: '2px 4px', fontSize: '9px', writingMode: 'horizontal-tb', minWidth: '18px', minHeight: '18px' }}>
                  {siteConfig.kanji.navStamp?.text || '\u00a0'}
                </div>
              </SumiTooltip>
            )}
          </div>

          {/* Desktop Navbar Links */}
          <nav style={{ display: 'none' }} className="md-flex">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '28px', alignItems: 'center', whiteSpace: 'nowrap' }}>
              {siteConfig.navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} style={{ position: 'relative' }}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--crimson)' : 'var(--charcoal)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '8px 0',
                        transition: 'color 0.3s ease',
                        fontFamily: 'var(--font-serif)',
                      }}
                    >
                      {item.name}
                    </button>

                    {/* Calligraphy Active underline stroke */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavStroke"
                        style={{
                          position: 'absolute',
                          bottom: '-12px',
                          left: '-10%',
                          width: '120%',
                          height: '10px',
                        }}
                      >
                        <InkBrush type="horizontal" color="var(--charcoal)" animate={true} />
                      </motion.div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Far-Right: Music Player */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'visible', position: 'relative' }}>
          <MusicPlayer />

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md-hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md-hidden"
            style={{
              backgroundColor: 'var(--parchment)',
              borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
              overflow: 'hidden',
            }}
          >
            <ul style={{ listStyle: 'none', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {siteConfig.navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-serif)',
                        color: isActive ? 'var(--crimson)' : 'var(--charcoal)',
                        width: '100%',
                        textAlign: 'left',
                        padding: '6px 0',
                        borderBottom: isActive ? '1px dashed var(--crimson)' : 'none',
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Queries & Hover Effects Styling */}
      <style jsx global>{`
        .md-flex {
          display: none !important;
        }
        .md-hidden {
          display: block !important;
        }
        .nav-link {
          position: relative;
        }
        .nav-link:hover {
          color: var(--crimson) !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1.5px;
          bottom: 0px;
          left: 0;
          background-color: var(--crimson);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
          opacity: 0.85;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .nav-link.active::after {
          display: none !important;
        }
        .mobile-nav-link {
          transition: color 0.3s ease, padding-left 0.3s ease !important;
        }
        .mobile-nav-link:hover {
          color: var(--crimson) !important;
          padding-left: 6px !important;
        }
        @media (min-width: 768px) {
          .md-flex {
            display: flex !important;
          }
          .md-hidden {
            display: none !important;
          }
        }
      `}</style>
    </motion.header>
  );
}
