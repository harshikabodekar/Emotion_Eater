'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmotionPresetsProps {
  onEmotionSelect: (emotion: string) => void;
  currentEmotion: string;
}

const EMOTION_PRESETS = [
  {
    category: "Joy",
    emotions: ["happy excited", "joy bliss", "elated cheerful", "euphoric", "content peaceful"],
    color: "#FFD700",
    icon: "😊"
  },
  {
    category: "Energy",
    emotions: ["energetic vibrant", "powerful dynamic", "intense fiery", "electric buzzing", "motivated driven"],
    color: "#FF6B35",
    icon: "⚡"
  },
  {
    category: "Calm",
    emotions: ["calm serene", "peaceful tranquil", "relaxed zen", "meditative quiet", "balanced centered"],
    color: "#4ECDC4",
    icon: "🧘"
  },
  {
    category: "Creative",
    emotions: ["creative inspired", "artistic flowing", "imaginative dreamy", "innovative bold", "expressive colorful"],
    color: "#9B59B6",
    icon: "🎨"
  },
  {
    category: "Melancholy",
    emotions: ["sad melancholic", "nostalgic wistful", "lonely isolated", "somber grey", "contemplative deep"],
    color: "#34495E",
    icon: "🌧️"
  },
  {
    category: "Adventure",
    emotions: ["adventurous bold", "curious exploring", "brave courageous", "wild free", "spontaneous"],
    color: "#E74C3C",
    icon: "🌍"
  }
];

export default function EmotionPresets({ onEmotionSelect, currentEmotion }: EmotionPresetsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-lg border-2 border-gray-600 rounded-xl text-white hover:bg-black/90 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">🎭</span>
        <span className="text-base font-medium">Presets</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 left-0 w-96 bg-black/90 backdrop-blur-xl border-2 border-gray-600 rounded-xl p-6 shadow-2xl z-50"
          >
            <h3 className="text-white font-medium mb-4">Emotion Presets</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {EMOTION_PRESETS.map((preset) => (
                <motion.button
                  key={preset.category}
                  onClick={() => setSelectedCategory(
                    selectedCategory === preset.category ? null : preset.category
                  )}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    selectedCategory === preset.category
                      ? 'bg-white/20 border-white/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/15'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{preset.icon}</span>
                    <span className="text-white text-sm font-medium">
                      {preset.category}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ backgroundColor: preset.color }}
                  />
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <h4 className="text-white/80 text-sm font-medium">
                    {selectedCategory} Emotions:
                  </h4>
                  {EMOTION_PRESETS
                    .find(p => p.category === selectedCategory)
                    ?.emotions.map((emotion) => (
                      <motion.button
                        key={emotion}
                        onClick={() => {
                          onEmotionSelect(emotion);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          currentEmotion === emotion
                            ? 'bg-white/25 text-white border border-white/30'
                            : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {emotion}
                      </motion.button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}