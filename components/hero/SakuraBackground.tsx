'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SakuraBackground() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: 0.9, x: 0, y: 0 }}
        transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
        className="hero-sakura-branch"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          left: 'auto',
          zIndex: 1,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
        }}
      >
        <Image
          src="/images/sakura_branch.png"
          alt="Sumi-e Sakura Branch"
          fill
          priority
          style={{
            objectFit: 'contain',
            objectPosition: 'top right',
          }}
        />
      </motion.div>
      <style jsx global>{`
        .hero-sakura-branch {
          width: 45% !important;
          height: 75% !important;
        }
        @media (max-width: 768px) {
          .hero-sakura-branch {
            width: 75% !important;
            height: 45% !important;
          }
        }
      `}</style>
    </>
  );
}
