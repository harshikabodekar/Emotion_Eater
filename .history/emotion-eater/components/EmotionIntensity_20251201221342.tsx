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
      <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 mb-3 shadow-lg">
        <div className="flex items-center justify-between">
          <label className="text-white text-lg font-bold drop-shadow-lg">Intensity</label>
          <span className="text-white font-semibold text-base bg-black/50 px-3 py-1 rounded-full border border-white/30">
            {getIntensityLabel(intensity)} ({Math.round(intensity * 100)}%)
          </span>
        </div>
      </div>
      
      <div className="relative">
        <motion.div
          ref={sliderRef}
          className="relative w-full h-8 bg-black/80 border-2 border-gray-600 rounded-full cursor-pointer overflow-hidden shadow-lg"
          onClick={handleSliderChange}
          onMouseDown={() => setIsAdjusting(true)}
          onMouseUp={() => setIsAdjusting(false)}
          onMouseLeave={() => setIsAdjusting(false)}
          onMouseMove={(e) => isAdjusting && handleSliderChange(e)}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-yellow-400 to-red-400 opacity-30" />
          
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
        <div className="flex justify-between mt-2 px-2">
          {[0, 0.25, 0.5, 0.75, 1].map((mark) => (
            <div
              key={mark}
              className="w-2 h-2 bg-white/70 border border-white/40 rounded-full shadow-sm"
              style={{
                backgroundColor: Math.abs(mark - intensity) < 0.1 ? getIntensityColor(intensity) : undefined,
                borderColor: Math.abs(mark - intensity) < 0.1 ? getIntensityColor(intensity) : undefined,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Intensity effects description */}
      <div className="mt-3 bg-black/90 backdrop-blur-lg border-2 border-white/30 rounded-lg px-5 py-3 shadow-xl">
        <motion.p 
          className="text-white font-semibold text-base text-center drop-shadow-lg"
          animate={{ 
            scale: intensity > 0.7 ? 1.02 : 1,
          }}
        >
          {intensity < 0.3 && "✨ Soft flowing movements"}
          {intensity >= 0.3 && intensity < 0.6 && "🌊 Balanced energy flow"}
          {intensity >= 0.6 && intensity < 0.8 && "🔥 Dynamic vibrant effects"}
          {intensity >= 0.8 && "💥 Explosive intense visuals"}
        </motion.p>
        <div className="mt-2 flex justify-center">
          <div 
            className="w-16 h-1 rounded-full" 
            style={{ backgroundColor: getIntensityColor(intensity) }}
          />
        </div>
      </div>
    </div>
  );
}