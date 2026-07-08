'use client';

import React from 'react';
import { motion } from 'framer-motion';
import InkButton from '@/components/ui/InkButton';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

export default function HeroText() {
  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const bodyRect        = document.body.getBoundingClientRect().top;
      const elementRect     = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition  = elementPosition - siteConfig.navbarHeight;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={staggerContainer(0.2, 1.3)}
      initial="hidden"
      animate="show"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 10,
        maxWidth: '850px',
      }}
    >
      <motion.span
        variants={fadeIn('up', 0.1, 0.6)}
        className="hero-greeting"
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: 'var(--crimson)',
          letterSpacing: '0.05em',
          marginBottom: '18px',
          cursor: 'help',
        }}
      >
        <SumiTooltip translation={siteConfig.greeting?.translation}>
          {siteConfig.greeting?.text || '\u00a0'}
        </SumiTooltip>
      </motion.span>

      {/* Main Name */}
      <motion.h1
        variants={fadeIn('up', 0.2, 0.7)}
        className="hero-name"
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          lineHeight: '1',
          color: 'var(--charcoal)',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
        }}
      >
        {siteConfig.name}
      </motion.h1>

      {/* Tagline Role */}
      <motion.div
        variants={fadeIn('up', 0.3, 0.7)}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}
      >
        <span
          className="hero-role"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            color: 'var(--crimson)',
            letterSpacing: '0.05em',
          }}
        >
          {siteConfig.title}
        </span>
        <span
          style={{
            fontSize: '18px',
            color: 'var(--charcoal-light)',
            fontWeight: 500,
            letterSpacing: '0.03em',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px 16px',
          }}
        >
          {siteConfig.roles.map((role, i) => (
            <React.Fragment key={role}>
              <span>{role}</span>
              {i < siteConfig.roles.length - 1 && (
                <span style={{ color: 'var(--crimson)', opacity: 0.5 }}>•</span>
              )}
            </React.Fragment>
          ))}
        </span>
      </motion.div>

      {/* Call to Action Ink Stroke Button & Social Links */}
      <motion.div
        variants={fadeIn('up', 0.4, 0.8)}
        style={{ display: 'flex', alignItems: 'center', gap: '36px', flexWrap: 'wrap', marginTop: '8px' }}
      >
        <InkButton
          variant="primary"
          onClick={handleScrollToProjects}
          icon={<ArrowRight size={16} />}
        >
          EXPLORE MY WORK
        </InkButton>

        <div className="hero-social-container" style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="clickable"
            style={{ color: 'var(--charcoal)', opacity: 0.7, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
          >
            <Github size={32} className="hero-social-icon" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="clickable"
            style={{ color: 'var(--charcoal)', opacity: 0.7, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
          >
            <Linkedin size={32} className="hero-social-icon" />
          </a>
          <a
            href={`mailto:${siteConfig.socials.email}`}
            className="clickable"
            style={{ color: 'var(--charcoal)', opacity: 0.7, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
          >
            <Mail size={32} className="hero-social-icon" />
          </a>

          <SumiTooltip translation={siteConfig.kanji?.heroStamp?.translation}>
            <motion.a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="red-stamp hero-social-stamp clickable"
              aria-label="Open resume PDF"
              whileHover={{ scale: 1.08, boxShadow: '0 4px 16px rgba(140,29,24,0.35)', backgroundColor: '#991A2A' }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              style={{
                boxShadow: '0 2px 6px rgba(140,29,24,0.15)',
                lineHeight: '1.2',
                userSelect: 'none',
                display: 'inline-flex',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {siteConfig.kanji?.heroStamp?.text}
            </motion.a>
          </SumiTooltip>
        </div>
      </motion.div>

      <style jsx global>{`
        .hero-name {
          font-size: 7.5rem !important;
        }
        .hero-greeting {
          font-size: 38px !important;
        }
        .hero-role {
          font-size: 38px !important;
        }
        .hero-social-icon {
          width: 32px !important;
          height: 32px !important;
        }
        .hero-social-stamp {
          font-size: 15px !important;
          padding: 6px 5px !important;
          margin-top: 1px !important;
          writing-mode: vertical-rl !important;
          text-orientation: upright !important;
        }
        .hero-social-container {
          gap: 32px !important;
        }
        @media (max-width: 768px) {
          .hero-name {
            font-size: 4.5rem !important;
          }
          .hero-greeting {
            font-size: 26px !important;
          }
          .hero-role {
            font-size: 28px !important;
          }
          .hero-social-icon {
            width: 26px !important;
            height: 26px !important;
          }
          .hero-social-stamp {
            font-size: 12px !important;
            padding: 5px 4px !important;
            margin-top: 0px !important;
          }
          .hero-social-container {
            gap: 24px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
