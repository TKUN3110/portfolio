'use client';

import React from 'react';
import InkBrush from '@/components/effects/InkBrush';
import { siteConfig } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--parchment-dark)',
        borderTop: '1px solid rgba(28, 28, 28, 0.08)',
        padding: '60px 24px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        {/* Top Scroll Accent line */}
        <div style={{ width: '100px', height: '10px', opacity: 0.3 }}>
          <InkBrush type="horizontal" color="var(--charcoal)" animate={false} />
        </div>

        {/* Traditional Hanko vertical stamps block */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {siteConfig.kanji?.footerStamp !== undefined && (
            <SumiTooltip translation={siteConfig.kanji.footerStamp?.translation}>
              <div className="red-stamp" style={{ fontSize: '11px', padding: '8px 6px', minWidth: '22px', minHeight: '30px', cursor: 'help' }}>
                {siteConfig.kanji.footerStamp?.text || '\u00a0'}
              </div>
            </SumiTooltip>
          )}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
            }}
          >
            <span>{siteConfig.name}</span>
            <span style={{ fontSize: '11px', color: 'var(--crimson)', letterSpacing: '0.15em', marginTop: '2px' }}>{siteConfig.title.toUpperCase()}</span>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={handleBackToTop}
          className="clickable"
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            color: 'var(--charcoal)',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            transition: 'color 0.3s ease',
            paddingBottom: '2px',
            borderBottom: '1px dashed var(--charcoal-light)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--crimson)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
        >
          BACK TO TOP{siteConfig.kanji?.footerBackToTop?.text ? ' / ' : ''}
          {siteConfig.kanji?.footerBackToTop?.text && (
            <SumiTooltip translation={siteConfig.kanji.footerBackToTop.translation}>
              <span style={{ cursor: 'help' }}>{siteConfig.kanji.footerBackToTop.text}</span>
            </SumiTooltip>
          )}
        </button>

        {/* Bottom credits */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--charcoal-light)',
            opacity: 0.6,
          }}
        >
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '11px' }}>
            Made with React • Next.js • Washi & Sumi-e Aesthetics
          </p>
        </div>
      </div>
    </footer>
  );
}
