'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmotionEntry {
  id: string;
  emotion: string;
  timestamp: Date;
  colors: string[];
}

interface EmotionHistoryProps {
  currentEmotion: string;
  onEmotionSelect: (emotion: string) => void;
}

export default function EmotionHistory({ currentEmotion, onEmotionSelect }: EmotionHistoryProps) {
  const [history, setHistory] = useState<EmotionEntry[]>([]);
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

  useEffect(() => {
    if (currentEmotion.trim()) {
      const newEntry: EmotionEntry = {
        id: Date.now().toString(),
        emotion: currentEmotion,
        timestamp: new Date(),
        colors: generateColorsFromEmotion(currentEmotion),
      };
      
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10
    }
  }, [currentEmotion]);

  const generateColorsFromEmotion = (emotion: string): string[] => {
    // Simple color generation for preview
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    return colors.slice(0, 3);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-lg border-2 border-gray-600 rounded-xl text-white hover:bg-black/90 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-base font-medium">History ({history.length})</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-96 max-h-96 overflow-y-auto bg-black/90 backdrop-blur-xl border-2 border-gray-600 rounded-xl p-6 shadow-2xl z-50"
          >
            <h3 className="text-white font-medium mb-3">Recent Emotions</h3>
            
            {history.length === 0 ? (
              <p className="text-white/50 text-sm text-center py-4">No emotions recorded yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <motion.button
                    key={entry.id}
                    onClick={() => onEmotionSelect(entry.emotion)}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium truncate flex-1">
                        {entry.emotion}
                      </span>
                      <span className="text-white/40 text-xs">
                        {formatTime(entry.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      {entry.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
            
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="w-full mt-3 text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Clear History
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}