'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmotionIntensityProps {
  intensity: number;
  onIntensityChange: (intensity: number) => void;
}

export default function EmotionIntensity({ intensity, onIntensityChange }: EmotionIntensityProps) {
  const [isAdjusting, setIsAdjusting] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    onIntensityChange(percentage);
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 0.3) return '#4ECDC4'; // Calm - Teal
    if (intensity < 0.6) return '#FFD93D'; // Moderate - Yellow
    if (intensity < 0.8) return '#FF6B35'; // High - Orange
    return '#E74C3C'; // Extreme - Red
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 0.2) return 'Subtle';
    if (intensity < 0.4) return 'Gentle';
    if (intensity < 0.6) return 'Moderate';
    if (intensity < 0.8) return 'Strong';
    return 'Intense';
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <label className="text-white/80 text-sm font-medium">Intensity</label>
        <span className="text-white/60 text-xs">
          {getIntensityLabel(intensity)} ({Math.round(intensity * 100)}%)
        </span>
      </div>
      
      <div className="relative">
        <motion.div
          ref={sliderRef}
          className="relative w-full h-6 bg-white/10 border border-white/20 rounded-full cursor-pointer overflow-hidden"
          onClick={handleSliderChange}
          onMouseDown={() => setIsAdjusting(true)}
          onMouseUp={() => setIsAdjusting(false)}
          onMouseLeave={() => setIsAdjusting(false)}
          onMouseMove={(e) => isAdjusting && handleSliderChange(e)}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-yellow-400 via-orange-400 to-red-400 opacity-30" />
          
          {/* Progress fill */}
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${intensity * 100}%`,
              backgroundColor: getIntensityColor(intensity),
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Slider handle */}
          <motion.div
            className="absolute top-1/2 w-4 h-4 bg-white border-2 border-white/30 rounded-full shadow-lg transform -translate-y-1/2"
            style={{
              left: `${intensity * 100}%`,
              x: '-50%',
              borderColor: getIntensityColor(intensity),
            }}
            animate={{
              scale: isAdjusting ? 1.2 : 1,
              boxShadow: isAdjusting 
                ? `0 0 20px ${getIntensityColor(intensity)}` 
                : '0 2px 8px rgba(0,0,0,0.3)',
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Ripple effect */}
          <AnimatePresence>
            {isAdjusting && (
              <motion.div
                className="absolute top-1/2 w-8 h-8 border-2 rounded-full pointer-events-none transform -translate-y-1/2"
                style={{
                  left: `${intensity * 100}%`,
                  x: '-50%',
                  borderColor: getIntensityColor(intensity),
                }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Intensity markers */}
        <div className="flex justify-between mt-1 px-2">
          {[0, 0.25, 0.5, 0.75, 1].map((mark) => (
            <div
              key={mark}
              className="w-1 h-1 bg-white/30 rounded-full"
              style={{
                backgroundColor: Math.abs(mark - intensity) < 0.05 ? getIntensityColor(intensity) : undefined,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Intensity effects description */}
      <motion.p 
        className="text-white/40 text-xs text-center mt-2"
        animate={{ 
          color: intensity > 0.7 ? '#FFFFFF80' : '#FFFFFF40',
        }}
      >
        {intensity < 0.3 && "Soft flowing movements"}
        {intensity >= 0.3 && intensity < 0.6 && "Balanced energy flow"}
        {intensity >= 0.6 && intensity < 0.8 && "Dynamic vibrant effects"}
        {intensity >= 0.8 && "Explosive intense visuals"}
      </motion.p>
    </div>
  );
}