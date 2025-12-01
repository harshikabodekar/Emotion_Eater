'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmotionStats {
  emotion: string;
  count: number;
  lastUsed: Date;
  avgIntensity?: number;
}

interface StatsDisplayProps {
  currentEmotion: string;
  intensity: number;
}

export default function StatsDisplay({ currentEmotion, intensity }: StatsDisplayProps) {
  const [stats, setStats] = useState<EmotionStats[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    if (currentEmotion.trim()) {
      setStats(prev => {
        const existing = prev.find(s => s.emotion === currentEmotion);
        if (existing) {
          return prev.map(s => 
            s.emotion === currentEmotion 
              ? { 
                  ...s, 
                  count: s.count + 1, 
                  lastUsed: new Date(),
                  avgIntensity: s.avgIntensity ? (s.avgIntensity + intensity) / 2 : intensity
                }
              : s
          );
        } else {
          return [...prev, {
            emotion: currentEmotion,
            count: 1,
            lastUsed: new Date(),
            avgIntensity: intensity
          }].slice(0, 20); // Keep top 20
        }
      });
      setTotalSessions(prev => prev + 1);
    }
  }, [currentEmotion, intensity]);

  const topEmotions = stats.sort((a, b) => b.count - a.count).slice(0, 5);
  const recentEmotions = stats.sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime()).slice(0, 3);

  const getEmotionCategory = (emotion: string) => {
    const lowerEmotion = emotion.toLowerCase();
    if (lowerEmotion.includes('happy') || lowerEmotion.includes('joy') || lowerEmotion.includes('excited')) {
      return { category: 'Positive', color: '#10B981', emoji: '😊' };
    }
    if (lowerEmotion.includes('sad') || lowerEmotion.includes('melancholy') || lowerEmotion.includes('down')) {
      return { category: 'Reflective', color: '#6366F1', emoji: '💙' };
    }
    if (lowerEmotion.includes('angry') || lowerEmotion.includes('rage') || lowerEmotion.includes('frustrated')) {
      return { category: 'Intense', color: '#EF4444', emoji: '🔥' };
    }
    if (lowerEmotion.includes('calm') || lowerEmotion.includes('peace') || lowerEmotion.includes('zen')) {
      return { category: 'Peaceful', color: '#06B6D4', emoji: '🧘' };
    }
    if (lowerEmotion.includes('creative') || lowerEmotion.includes('artistic') || lowerEmotion.includes('inspired')) {
      return { category: 'Creative', color: '#8B5CF6', emoji: '🎨' };
    }
    return { category: 'Mixed', color: '#F59E0B', emoji: '✨' };
  };

  const emotionDistribution = topEmotions.reduce((acc, stat) => {
    const category = getEmotionCategory(stat.emotion).category;
    acc[category] = (acc[category] || 0) + stat.count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-sm">Stats</span>
        {totalSessions > 0 && (
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
            {totalSessions}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-96 max-h-96 overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-xl z-50"
          >
            <h3 className="text-white font-medium mb-4">Emotion Analytics</h3>
            
            {stats.length === 0 ? (
              <p className="text-white/50 text-sm text-center py-8">
                Start exploring emotions to see your stats! 📊
              </p>
            ) : (
              <div className="space-y-4">
                {/* Overview Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-xs">Total Sessions</div>
                    <div className="text-white text-xl font-bold">{totalSessions}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-xs">Unique Emotions</div>
                    <div className="text-white text-xl font-bold">{stats.length}</div>
                  </div>
                </div>

                {/* Top Emotions */}
                <div>
                  <h4 className="text-white/80 text-sm font-medium mb-2">Most Explored</h4>
                  <div className="space-y-2">
                    {topEmotions.map((stat, index) => {
                      const category = getEmotionCategory(stat.emotion);
                      return (
                        <motion.div
                          key={stat.emotion}
                          className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{category.emoji}</span>
                            <div>
                              <div className="text-white text-sm font-medium truncate max-w-32">
                                {stat.emotion}
                              </div>
                              <div className="text-white/50 text-xs">
                                {category.category}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-sm font-bold">
                              {stat.count}
                            </div>
                            <div className="text-white/40 text-xs">
                              {stat.avgIntensity ? `${Math.round(stat.avgIntensity * 100)}%` : ''}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Category Distribution */}
                <div>
                  <h4 className="text-white/80 text-sm font-medium mb-2">Emotion Types</h4>
                  <div className="space-y-1">
                    {Object.entries(emotionDistribution).map(([category, count]) => {
                      const total = Object.values(emotionDistribution).reduce((a, b) => a + b, 0);
                      const percentage = (count / total) * 100;
                      const categoryInfo = getEmotionCategory(category);
                      
                      return (
                        <div key={category} className="flex items-center gap-2">
                          <span className="text-xs">{categoryInfo.emoji}</span>
                          <span className="text-white/70 text-xs flex-1">{category}</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: categoryInfo.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-white/50 text-xs w-8 text-right">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Activity */}
                {recentEmotions.length > 0 && (
                  <div>
                    <h4 className="text-white/80 text-sm font-medium mb-2">Recent Activity</h4>
                    <div className="space-y-1">
                      {recentEmotions.map((stat) => (
                        <div key={stat.emotion} className="flex items-center justify-between text-xs">
                          <span className="text-white/70 truncate flex-1">
                            {stat.emotion}
                          </span>
                          <span className="text-white/40">
                            {stat.lastUsed.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear button */}
                <button
                  onClick={() => {
                    setStats([]);
                    setTotalSessions(0);
                  }}
                  className="w-full text-xs text-white/40 hover:text-white/60 transition-colors py-2"
                >
                  Clear All Stats
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}