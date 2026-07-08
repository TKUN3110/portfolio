'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Mountain() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1.8, delay: 1.0, ease: "easeOut" }}
        className="hero-mountain"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 'auto',
          zIndex: 2,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
        }}
      >
        <Image
          src="/images/mount_fuji_sumie.png"
          alt="Sumi-e Mount Fuji"
          fill
          priority
          style={{
            objectFit: 'contain',
            objectPosition: 'bottom right',
          }}
        />
      </motion.div>
      <style jsx global>{`
        .hero-mountain {
          width: 50% !important;
          height: 60% !important;
        }
        @media (max-width: 768px) {
          .hero-mountain {
            width: 75% !important;
            height: 35% !important;
          }
        }
      `}</style>
    </>
  );
}
