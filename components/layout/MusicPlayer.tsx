'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { VIDEO_ID } from '@/data/music';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/config';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

/**
 * localStorage keys
 * 'portfolio-music-muted'  → 'true' | 'false'
 * 'portfolio-music-volume' → '0'–'100'
 */
const LS_MUTED  = 'portfolio-music-muted';
const LS_VOLUME = 'portfolio-music-volume';

const EMBED_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&enablejsapi=1&modestbranding=1&rel=0`;

export default function MusicPlayer() {
  const playerRef    = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isReady,      setIsReady]      = useState(false);
  const [isMuted,      setIsMuted]      = useState(true);
  const [volume,       setVolume]       = useState(50);
  const [showOverlay,  setShowOverlay]  = useState(false);
  const [showTooltip,  setShowTooltip]  = useState(false);

  const attachPlayer = useCallback(() => {
    if (playerRef.current) return;

    playerRef.current = new window.YT.Player('yt-music-iframe', {
      events: {
        onReady: (event: YT.PlayerEvent) => {
          setIsReady(true);

          // Sync play state (iframe may already be playing)
          const state   = event.target.getPlayerState();
          const playing = state === window.YT.PlayerState.PLAYING ||
                          state === window.YT.PlayerState.BUFFERING;
          setIsPlaying(playing);
          if (!playing) event.target.playVideo();

          // Restore saved volume
          const savedVol = parseInt(localStorage.getItem(LS_VOLUME) ?? '50', 10);
          const vol      = isNaN(savedVol) ? 50 : Math.min(100, Math.max(0, savedVol));
          setVolume(vol);
          event.target.setVolume(vol);

          // Restore mute preference
          const savedMuted = localStorage.getItem(LS_MUTED);
          if (savedMuted === 'false') {
            event.target.unMute();
            setIsMuted(false);
          } else {
            event.target.mute();
            setIsMuted(true);
            localStorage.setItem(LS_MUTED, 'true');
          }
        },
        onStateChange: (event: YT.OnStateChangeEvent) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  }, []);

  useEffect(() => {
    const load = () => {
      if (window.YT && window.YT.Player) {
        attachPlayer();
      } else {
        window.onYouTubeIframeAPIReady = attachPlayer;
      }
    };

    if (document.getElementById('yt-iframe-api')) {
      load();
    } else {
      const tag   = document.createElement('script');
      tag.id      = 'yt-iframe-api';
      tag.src     = 'https://www.youtube.com/iframe_api';
      tag.onload  = load;
      document.head.appendChild(tag);
    }
  }, [attachPlayer]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !isReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      localStorage.setItem(LS_MUTED, 'false');
    } else {
      playerRef.current.mute();
      setIsMuted(true);
      localStorage.setItem(LS_MUTED, 'true');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current || !isReady) return;
    const val = Number(e.target.value);
    setVolume(val);
    playerRef.current.setVolume(val);
    localStorage.setItem(LS_VOLUME, String(val));

    // Auto-mute / unmute based on volume position
    if (val === 0 && !isMuted) {
      playerRef.current.mute();
      setIsMuted(true);
      localStorage.setItem(LS_MUTED, 'true');
    } else if (val > 0 && isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      localStorage.setItem(LS_MUTED, 'false');
    }
  };

  return (
    <>
      {/* Hidden YouTube iframe — src handles autoplay */}
      <iframe
        id="yt-music-iframe"
        src={EMBED_SRC}
        allow="autoplay"
        style={{
          position: 'fixed',
          bottom: '-300px',
          left:   '-300px',
          width:  '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          border: 'none',
        }}
        aria-hidden="true"
        title="Background music player"
      />

      {/* ── Player UI ── */}
      <div
        ref={containerRef}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {/* ── Hover Overlay Panel ── */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,   scale: 1 }}
              exit={{   opacity: 0, y: -6,  scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position:       'absolute',
                top:            'calc(100% + 14px)',
                left:           '50%',
                transform:      'translateX(-50%)',
                background:     'rgba(247, 242, 232, 0.96)',
                border:         '1px solid rgba(23, 23, 23, 0.1)',
                borderRadius:   '10px',
                padding:        '10px 12px 14px',
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            '10px',
                backdropFilter: 'blur(8px)',
                boxShadow:      '0 4px 20px rgba(0,0,0,0.08)',
                zIndex:         200,
                minWidth:       '48px',
              }}
            >
              {/* Little arrow pointing UP to the vinyl */}
              <div style={{
                position:       'absolute',
                top:            '-5px',
                left:           '50%',
                transform:      'translateX(-50%)',
                width:          0,
                height:         0,
                borderLeft:     '5px solid transparent',
                borderRight:    '5px solid transparent',
                borderBottom:   '5px solid rgba(247, 242, 232, 0.96)',
                filter:         'drop-shadow(0 -1px 1px rgba(0,0,0,0.04))',
              }} />
              {/* Volume percentage label */}
              <span style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      '9px',
                color:         'var(--charcoal)',
                opacity:       0.5,
                letterSpacing: '0.05em',
              }}>
                {isMuted ? '0' : volume}
              </span>

              {/* Vertical volume slider */}
              <div style={{ position: 'relative', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Track background */}
                <div style={{
                  position:        'absolute',
                  width:           '3px',
                  height:          '80px',
                  background:      'rgba(23,23,23,0.1)',
                  borderRadius:    '2px',
                }} />
                {/* Track fill */}
                <div style={{
                  position:        'absolute',
                  bottom:          0,
                  width:           '3px',
                  height:          `${isMuted ? 0 : volume}%`,
                  background:      'var(--charcoal)',
                  borderRadius:    '2px',
                  transition:      'height 0.1s ease',
                }} />
                {/* Range input (invisible but interactive) */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position:   'absolute',
                    width:      '80px',
                    height:     '3px',
                    opacity:    0,
                    cursor:     'pointer',
                    transform:  'rotate(-90deg)',
                    margin:     0,
                  }}
                  aria-label="Volume"
                />
              </div>

              {/* Mute toggle icon */}
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                style={{
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  color:      'var(--charcoal)',
                  display:    'flex',
                  alignItems: 'center',
                  opacity:    isMuted ? 0.35 : 0.65,
                  transition: 'opacity 0.2s',
                  padding:    '2px',
                }}
              >
                {isMuted || volume === 0 ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
                  </svg>
                ) : volume < 50 ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>


            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Vinyl Button ── */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title={isPlaying ? 'Pause music' : 'Play music'}
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    0,
            position:   'relative',
            width:      '36px',
            height:     '36px',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ink-brush enso ring */}
          <svg width="36" height="36" viewBox="0 0 36 36" style={{ position: 'absolute', top: 0, left: 0 }}>
            <circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke="var(--charcoal)"
              strokeWidth="1.5"
              strokeDasharray="85 8"
              strokeLinecap="round"
              opacity="0.6"
              style={{ transform: 'rotate(-30deg)', transformOrigin: '18px 18px' }}
            />
          </svg>

          {/* Spinning vinyl disc */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={
              isPlaying
                ? { duration: 4, ease: 'linear', repeat: Infinity }
                : { duration: 0.5, ease: 'easeOut' }
            }
            style={{
              width:        '26px',
              height:       '26px',
              borderRadius: '50%',
              background: `radial-gradient(circle at center,
                #c9a227 0%, #c9a227 18%,
                #1a1a1a 18%, #2a2a2a 35%,
                #1a1a1a 35%, #1d1d1d 55%,
                #252525 70%, #1a1a1a 100%
              )`,
              boxShadow:  isPlaying
                ? '0 0 12px rgba(201,162,39,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 6px rgba(0,0,0,0.2)',
              transition:   'box-shadow 0.4s ease',
              position:     'relative',
              flexShrink:   0,
            }}
          >
            <div style={{
              position:     'absolute',
              top: '50%', left: '50%',
              transform:    'translate(-50%, -50%)',
              width:        '5px', height: '5px',
              borderRadius: '50%',
              background:   'var(--accent-gold)',
              boxShadow:    '0 0 4px rgba(201,162,39,0.6)',
            }} />
          </motion.div>

          {/* Sound wave bars — playing & unmuted */}
          <AnimatePresence>
            {isPlaying && !isMuted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{   opacity: 0, scale: 0.8 }}
                style={{
                  position:  'absolute',
                  bottom:    '-14px',
                  left:      '50%',
                  transform: 'translateX(-50%)',
                  display:   'flex',
                  alignItems: 'flex-end',
                  gap:       '2px',
                  height:    '10px',
                }}
              >
                {[0.6, 1, 0.7, 1, 0.5].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
                    transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                    style={{
                      display:         'block',
                      width:           '2px',
                      height:          '8px',
                      background:      'var(--crimson)',
                      borderRadius:    '1px',
                      transformOrigin: 'bottom',
                      opacity:         0.8,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !showOverlay && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              style={{
                position:      'absolute',
                top:           'calc(100% + 10px)',
                left:          '50%',
                transform:     'translateX(-50%)',
                whiteSpace:    'nowrap',
                background:    'var(--charcoal)',
                color:         'var(--parchment)',
                fontSize:      '10px',
                fontFamily:    'var(--font-serif)',
                letterSpacing: '0.08em',
                padding:       '4px 10px',
                borderRadius:  '2px',
                pointerEvents: 'none',
                zIndex:        200,
              }}
            >
              {isMuted ? (
                `${siteConfig.musicTooltips?.muted?.text || '🔇 ミュート中'}${siteConfig.musicTooltips?.muted?.translation ? ` / ${siteConfig.musicTooltips.muted.translation}` : ''}`
              ) : isPlaying ? (
                `${siteConfig.musicTooltips?.pause?.text || '一時停止'}${siteConfig.musicTooltips?.pause?.translation ? ` / ${siteConfig.musicTooltips.pause.translation}` : ''}`
              ) : (
                `${siteConfig.musicTooltips?.play?.text || '音楽を再生'}${siteConfig.musicTooltips?.play?.translation ? ` / ${siteConfig.musicTooltips.play.translation}` : ''}`
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
