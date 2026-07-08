'use client';

import React from 'react';
import { motion } from 'framer-motion';
import InkButton from '@/components/ui/InkButton';
import AboutCard from './AboutCard';
import InkBrush from '@/components/effects/InkBrush';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { siteConfig } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

export default function About() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(232, 143, 143, 0.08) 0%, transparent 60%)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Top Section: Bio Header & Text (Enso on left, bio text on right) */}
        <div
          className="bio-section"
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '60px',
            width: '100%',
          }}
        >
          {/* Left Column: Calligraphy Enso Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              width: '150px',
              height: '150px',
              flexShrink: 0,
            }}
            className="bio-enso"
          >
            {/* InkBrush Calligraphy Enso */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <InkBrush type="enso" color="var(--charcoal)" animate={true} />
            </div>

            {/* Internal Kanji Character */}
            {siteConfig.kanji?.aboutEnso?.text && (
              <SumiTooltip
                translation={siteConfig.kanji.aboutEnso.translation}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    cursor: 'help',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '40px',
                      fontWeight: 'bold',
                      color: 'var(--crimson)',
                      textShadow: '1px 1px 2px rgba(140,29,24,0.1)',
                      marginTop: '-4px', // alignment centering
                    }}
                  >
                    {siteConfig.kanji.aboutEnso.text}
                  </span>
                </div>
              </SumiTooltip>
            )}

            {/* Floating blossom accent */}
            {siteConfig.kanji?.heroBlossom?.text && (
              <SumiTooltip
                translation={siteConfig.kanji.heroBlossom.translation}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '5px',
                  width: '14px',
                  height: '14px',
                }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--crimson)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6px',
                    color: 'var(--parchment)',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(140,29,24,0.2)',
                    zIndex: 2,
                    cursor: 'help',
                  }}
                >
                  {siteConfig.kanji.heroBlossom.text}
                </motion.div>
              </SumiTooltip>
            )}
          </motion.div>

          {/* Right Column: Left Aligned Titles & Description */}
          <motion.div
            variants={staggerContainer(0.2, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              flexGrow: 1,
            }}
            className="bio-content"
          >
            {/* Red Subtitle */}
            <motion.span
              variants={fadeIn('up', 0.1, 0.6)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--crimson)',
                letterSpacing: '0.15em',
                marginBottom: '8px',
              }}
            >
              ABOUT ME
            </motion.span>

            {/* Title with brush underline */}
            <motion.div
              variants={fadeIn('up', 0.15, 0.6)}
              style={{ position: 'relative', marginBottom: '24px' }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--charcoal)',
                  letterSpacing: '0.03em',
                  lineHeight: 1.1,
                }}
              >
                Who am I?
              </h2>
              {/* Decorative ink line below */}
              <div
                style={{
                  height: '4px',
                  backgroundColor: 'var(--charcoal)',
                  width: '90px',
                  marginTop: '8px',
                  borderRadius: '2px',
                  opacity: 0.85
                }}
              />
            </motion.div>

            {/* Description Text */}
            <motion.p
              variants={fadeIn('up', 0.2, 0.7)}
              style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: 'var(--charcoal-light)',
                maxWidth: '850px',
                marginBottom: '28px',
              }}
            >
              {siteConfig.bio}
            </motion.p>

            {/* More About Me Button */}
            <motion.div variants={fadeIn('up', 0.25, 0.7)}>
              <InkButton
                variant="secondary"
                onClick={() => {
                  const element = document.getElementById('experience');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                MORE ABOUT ME
              </InkButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section: 4 roles in a single row */}
        <div
          className="roles-row"
          style={{
            display: 'grid',
            gap: '24px',
            width: '100%',
          }}
        >
          <AboutCard cardType="developer" delay={0.1} />
          <AboutCard cardType="visionary" delay={0.2} />
          <AboutCard cardType="explorer" delay={0.3} />
          <AboutCard cardType="solver" delay={0.4} />
        </div>
      </div>

      <style jsx global>{`
        .bio-section {
          flex-direction: column;
        }
        .bio-enso {
          margin: 0 auto;
        }
        .bio-content {
          align-items: center;
          text-align: center;
        }
        .roles-row {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .roles-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .bio-section {
            flex-direction: row;
          }
          .bio-enso {
            margin: 0;
          }
          .bio-content {
            align-items: flex-start;
            text-align: left;
          }
        }
        @media (min-width: 1024px) {
          .roles-row {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
