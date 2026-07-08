'use client';

import React from 'react';
import PaperCard from '@/components/ui/PaperCard';

interface CardData {
  title: string;
  description: string;
  iconPath: React.ReactNode;
}

interface AboutCardProps {
  cardType: 'developer' | 'visionary' | 'explorer' | 'solver';
  delay?: number;
}

export default function AboutCard({ cardType, delay = 0 }: AboutCardProps) {
  const getCardDetails = (): CardData => {
    switch (cardType) {
      case 'developer':
        return {
          title: "DEVELOPER",
          description: "Crafting clean and efficient code with modern technologies.",
          iconPath: (
            <svg viewBox="0 0 100 100" width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="brush-texture" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves={3} result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.5} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              
              <g filter="url(#brush-texture)">
                {/* Sakura branch */}
                <path d="M 35,85 Q 55,75 65,60 T 95,35" stroke="#4a2e2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 65,60 Q 75,50 82,30" stroke="#4a2e2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M 45,78 Q 30,70 20,75" stroke="#4a2e2e" strokeWidth="1" strokeLinecap="round" fill="none" />
                
                {/* Code brackets */}
                <g fill="var(--charcoal)">
                  <path d="M 32,25 C 20,40 10,48 12,50 C 20,58 30,72 32,75 C 28,72 15,53 15,50 C 15,47 28,28 32,25 Z" />
                  <path d="M 58,15 C 55,35 45,75 42,85 C 44,82 52,45 61,15 Z" />
                  <path d="M 68,25 C 80,40 90,48 88,50 C 80,58 70,72 68,75 C 72,72 85,53 85,50 C 85,47 72,28 68,25 Z" />
                </g>

                {/* Cherry blossoms */}
                <g fill="var(--crimson)" opacity="0.85">
                  <circle cx="82" cy="30" r="3.5" />
                  <circle cx="86" cy="34" r="2.5" />
                  <circle cx="78" cy="35" r="2" />
                  
                  <circle cx="65" cy="60" r="4" />
                  <circle cx="60" cy="56" r="2.5" />
                  <circle cx="69" cy="55" r="2" />
                  
                  <circle cx="35" cy="80" r="3.5" />
                  <circle cx="30" cy="83" r="2" />

                  <ellipse cx={90} cy={42} rx={2.5} ry={1.5} transform="rotate(45 90 42)" />
                  <ellipse cx={75} cy={48} rx={2} ry={1} transform="rotate(-20 75 48)" />
                  <ellipse cx={50} cy={72} rx={2} ry={1.5} transform="rotate(15 50 72)" />
                  <ellipse cx={22} cy={70} rx={1.5} ry={1} transform="rotate(-40 22 70)" />
                </g>
              </g>
            </svg>
          )
        };

      case 'visionary':
        return {
          title: "VISIONARY",
          description: "Building computer vision systems that understand the world.",
          iconPath: (
            <svg viewBox="0 0 100 100" width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="brush-texture-vision" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              
              <g filter="url(#brush-texture-vision)" opacity={0.95}>
                <circle cx="50" cy="30" r="18" fill="var(--crimson)" />
              </g>

              <g stroke="#4a2e2e" filter="url(#brush-texture-vision)" opacity={0.9}>
                <path d="M 50,60 Q 65,55 75,45 T 98,35 Q 85,30 80,15" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M 75,45 Q 80,42 85,30 T 92,20" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M 60,58 Q 50,55 45,58 T 35,62" strokeWidth="1" strokeLinecap="round" fill="none" opacity={0.6}/>
              </g>

              <g stroke="var(--charcoal)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none" filter="url(#brush-texture-vision)">
                <path d="M 25,48 L 33,48 C 36,48 38,38 42,38 L 58,38 C 62,38 64,48 67,48 L 75,48 C 78.5,48 81,50.5 81,54 L 81,71 C 81,74.5 78.5,77 75,77 L 25,77 C 21.5,77 19,74.5 19,71 L 19,54 C 19,50.5 21.5,48 25,48 Z" fill="var(--parchment)" />
                
                <line x1={19} y1={55} x2={81} y2={55} strokeWidth={1.5} />
                <path d="M 24,48 L 24,45 L 29,45 L 29,48" fill="var(--charcoal)" />
                <path d="M 70,48 L 70,46 L 74,46 L 74,48" fill="var(--charcoal)" />
                <circle cx={34} cy={51.5} r={1.5} fill="var(--charcoal)" stroke="none" />
                <line x1={46} y1={38} x2={54} y2={38} strokeWidth={1.5} />

                <circle cx={50} cy={62} r={15} fill="var(--parchment)" strokeWidth={3} />
                <circle cx={50} cy={62} r={11} strokeWidth={1.5} />
                <circle cx={50} cy={62} r={7.5} fill="var(--charcoal)" stroke="none" />
                <circle cx={52.5} cy={59.5} r={2.5} fill="#ffffff" stroke="none" />
              </g>
              
              <path d="M 19,71 C 19,74.5 21.5,77 25,77 L 30,77 C 28,72 24,69 19,67 Z" fill="var(--charcoal)" filter="url(#brush-texture-vision)" />

              <g fill="var(--crimson)" opacity="0.85">
                <circle cx="82" cy="40" r="3.5" />
                <circle cx="86" cy="44" r="2.5" />
                <circle cx="78" cy="45" r="2" />
                
                <circle cx="95" cy="32" r="3" />
                <circle cx="98" cy="36" r="2" />
                
                <circle cx="80" cy="18" r="3.5" />
                <circle cx="85" cy="15" r="2" />
                
                <circle cx="50" cy="60" r="4" opacity={0.5}/>
                <circle cx="65" cy="55" r="3.5" opacity={0.7}/>
                <circle cx="60" cy="51" r="2.5" />
                <circle cx="69" cy="50" r="2" />
                
                <circle cx="35" cy="62" r="3" opacity={0.8}/>
                <circle cx="30" cy="65" r="2" />

                <ellipse cx={90} cy={48} rx={2.5} ry={1.5} transform="rotate(45 90 48)" />
                <ellipse cx={70} cy={65} rx={2} ry={1.5} transform="rotate(15 70 65)" opacity={0.7}/>
                <ellipse cx={50} cy={72} rx={2.2} ry={1.2} transform="rotate(15 50 72)" opacity={0.6}/>
                <ellipse cx={20} cy={78} rx={1.5} ry={1} transform="rotate(-40 20 78)" opacity={0.5}/>
                <circle cx="88" cy="25" r="1.5" />
                <circle cx="45" cy="58" r="1.2" />
              </g>
            </svg>
          )
        };

      case 'explorer':
        return {
          title: "AI EXPLORER",
          description: "Exploring LLMs and creating AI solutions that make impact.",
          iconPath: (
            <svg viewBox="0 0 100 100" width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="brush-texture-explorer" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.5} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              
              {/* Divider */}
              <line x1={50} y1={15} x2={50} y2={90} stroke="var(--charcoal)" strokeWidth="2.5" strokeLinecap="round" filter="url(#brush-texture-explorer)" />

              {/* Brain Left Hemisphere */}
              <g stroke="var(--charcoal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#brush-texture-explorer)">
                <path d="M 47,18 C 32,12 20,25 22,34 C 10,38 10,54 18,60 C 10,72 18,85 28,85 C 36,92 45,86 47,82" />
                <path d="M 46,28 C 32,28 30,35 30,40" />
                <path d="M 46,45 C 28,45 25,52 28,58 C 32,62 40,62 45,62" />
                <path d="M 46,72 C 32,72 32,78 35,82" />
                <path d="M 22,48 C 26,48 28,42 28,42" />
                <path d="M 22,72 C 26,72 28,68 28,68" />
              </g>

              {/* Digital Right Hemisphere */}
              <g stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 50,25 L 58,25 L 62,21" />
                <circle cx={62} cy={21} r={2} fill="var(--parchment)" stroke="var(--charcoal)" strokeWidth={2} />
                
                <path d="M 50,38 L 56,38 L 60,43 L 65,43 L 68,40" />
                <circle cx={68} cy={40} r={2} fill="var(--parchment)" stroke="var(--charcoal)" strokeWidth={2} />
                <path d="M 60,43 L 62,47" />
                <circle cx={62} cy={47} r={1.5} fill="var(--charcoal)" stroke="none" />

                <path d="M 50,52 L 72,52" strokeWidth="2.5" />
                <polygon points="71,48 78,52 71,56" fill="var(--charcoal)" stroke="none" />

                <path d="M 50,65 L 56,65 L 60,72 L 66,72 L 68,76" />
                <circle cx={68} cy={76} r={2} fill="var(--parchment)" stroke="var(--charcoal)" strokeWidth={2} />
                <path d="M 60,72 L 58,76" />
                <circle cx={58} cy={76} r={1.5} fill="var(--charcoal)" stroke="none" />

                <path d="M 50,80 L 56,80 L 60,85" />
                <circle cx={60} cy={85} r={2} fill="var(--charcoal)" stroke="none" />
              </g>

              {/* Sakura Branch Right Side */}
              <g stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#brush-texture-explorer)" opacity={0.95}>
                <path d="M 62,95 C 68,85 72,70 75,55 C 77,45 80,30 88,15" />
                <path d="M 73,65 C 78,60 84,58 88,58" />
                <path d="M 76,45 C 82,40 85,35 88,28" />
              </g>

              {/* Cherry blossoms */}
              <g fill="var(--crimson)" opacity="0.85" stroke="none">
                <circle cx="85" cy="30" r="3.5" />
                <circle cx="90" cy="28" r="2.5" />
                <circle cx="82" cy="26" r="2" />

                <circle cx="72" cy="42" r="4" />
                <circle cx="68" cy="38" r="2.5" />
                <circle cx="75" cy="37" r="2" />

                <circle cx="78" cy="58" r="3" />
                <circle cx="83" cy="60" r="2" />

                <circle cx="88" cy="18" r="2.5" />
                <circle cx="92" cy="15" r="1.5" />

                <circle cx="68" cy="70" r="2.5" />
                <circle cx="66" cy="74" r="1.5" />

                <ellipse cx={94} cy={46} rx={2.5} ry={1.5} transform="rotate(30 94 46)" />
                <ellipse cx={88} cy={45} rx={2} ry={1} transform="rotate(-15 88 45)" />
                <ellipse cx={80} cy={50} rx={1.5} ry={1} transform="rotate(45 80 50)" />
                <ellipse cx={92} cy={62} rx={2} ry={1.5} transform="rotate(60 92 62)" />
              </g>
            </svg>
          )
        };

      case 'solver':
        default:
        return {
          title: "PROBLEM SOLVER",
          description: "Turning complex problems into simple and elegant solutions.",
          iconPath: (
            <svg viewBox="0 0 100 100" width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="brush-texture-solver" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.5} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>

              {/* Sun */}
              <circle cx={78} cy={28} r={11} fill="var(--crimson)" opacity={0.9} filter="url(#brush-texture-solver)" />

              {/* Mountain Silhouette and details */}
              <g filter="url(#brush-texture-solver)">
                {/* Mountain base */}
                <path d="M 46,35 L 54,35 Q 70,60 90,85 C 70,88 30,88 10,85 Q 30,60 46,35 Z" fill="var(--charcoal)" />

                {/* Snow cap */}
                <path d="M 46,35 L 54,35 Q 61,45 68,59 C 62,55 58,62 55,55 C 50,60 48,52 45,55 C 42,62 38,55 32,59 Q 39,45 46,35 Z" fill="var(--parchment)" />
                <path d="M 32,59 C 38,55 42,62 45,55 C 48,52 50,60 55,55 C 58,62 62,55 68,59" stroke="var(--charcoal)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />

                {/* Ridges */}
                <path d="M 46,35 Q 30,60 10,85" stroke="var(--charcoal)" strokeWidth={2} strokeLinecap="round" fill="none" />
                <path d="M 54,35 Q 70,60 90,85" stroke="var(--charcoal)" strokeWidth={2} strokeLinecap="round" fill="none" />
                
                {/* Torii flag pole */}
                <line x1={50} y1={35} x2={50} y2={13} stroke="var(--charcoal)" strokeWidth={2.5} strokeLinecap="round" />
                
                {/* Flag banner */}
                <path d="M 50,15 Q 58,12 66,15 Q 61,19 64,23 Q 57,24 50,23 Z" fill="var(--parchment)" stroke="var(--charcoal)" strokeWidth={2} strokeLinejoin="round" />
              </g>
            </svg>
          )
        };
    }
  };

  const { title, description, iconPath } = getCardDetails();

  return (
    <PaperCard
      delay={delay}
      variant="clean"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '260px',
        justifyContent: 'center',
      }}
    >
      {/* Dynamic Vector Icon */}
      <div 
        style={{ 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {iconPath}
      </div>

      {/* Role Title */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '15px',
          fontWeight: 700,
          color: 'var(--charcoal)',
          letterSpacing: '0.15em',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>

      {/* Description text */}
      <p
        style={{
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'var(--charcoal-light)',
          opacity: 0.85,
        }}
      >
        {description}
      </p>
    </PaperCard>
  );
}
