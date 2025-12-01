'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from '../utils/generatePalette';

interface ArtDisplayProps {
  svgPath: string;
  palette: Palette;
}

export default function ArtDisplay({ svgPath, palette }: ArtDisplayProps) {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center pointer-events-none">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-50 blur-3xl"
        animate={{
          background: `radial-gradient(circle, ${palette.secondary}, transparent 70%)`
        }}
        transition={{ duration: 0.5 }}
      />

      {/* SVG Art */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={svgPath}
          fill={palette.primary}
          stroke={palette.accent}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            d: svgPath,
            fill: palette.primary,
            stroke: palette.accent,
            pathLength: 1,
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            // Smooth morphing
          }}
        />
      </svg>
    </div>
  );
}
