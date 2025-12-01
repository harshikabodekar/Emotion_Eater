'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsPanelProps {
  onSettingsChange: (settings: AppSettings) => void;
}

export interface AppSettings {
  animationSpeed: number;
  particleCount: number;
  backgroundIntensity: number;
  autoSave: boolean;
  soundEnabled: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

const defaultSettings: AppSettings = {
  animationSpeed: 1,
  particleCount: 50,
  backgroundIntensity: 0.7,
  autoSave: false,
  soundEnabled: false,
  highContrast: false,
  reducedMotion: false,
};

export default function SettingsPanel({ onSettingsChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
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

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    onSettingsChange(defaultSettings);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-lg border-2 border-gray-600 rounded-xl text-white hover:bg-black/90 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </motion.svg>
        <span className="text-base font-medium">Settings</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-96 max-h-96 overflow-y-auto bg-black/90 backdrop-blur-xl border-2 border-gray-600 rounded-xl p-6 shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Settings</h3>
              <button
                onClick={resetSettings}
                className="text-xs text-white/60 hover:text-white/80 transition-colors"
              >
                Reset All
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Performance Settings */}
              <div>
                <h4 className="text-white/80 text-sm font-medium mb-3">Performance</h4>
                
                <div className="space-y-3">
                  {/* Animation Speed */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/70 text-sm">Animation Speed</label>
                      <span className="text-white/50 text-xs">
                        {settings.animationSpeed === 0.5 ? 'Slow' : 
                         settings.animationSpeed === 1 ? 'Normal' : 'Fast'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0.5, 1, 1.5].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => updateSetting('animationSpeed', speed)}
                          className={`flex-1 px-3 py-2 rounded-lg text-xs transition-all ${
                            settings.animationSpeed === speed
                              ? 'bg-white/20 text-white border border-white/30'
                              : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Particle Count */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/70 text-sm">Particle Effects</label>
                      <span className="text-white/50 text-xs">{settings.particleCount}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={settings.particleCount}
                      onChange={(e) => updateSetting('particleCount', parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Background Intensity */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/70 text-sm">Background Intensity</label>
                      <span className="text-white/50 text-xs">
                        {Math.round(settings.backgroundIntensity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={settings.backgroundIntensity}
                      onChange={(e) => updateSetting('backgroundIntensity', parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* App Features */}
              <div>
                <h4 className="text-white/80 text-sm font-medium mb-3">Features</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Auto-save Emotions</span>
                    <motion.button
                      onClick={() => updateSetting('autoSave', !settings.autoSave)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        settings.autoSave ? 'bg-blue-500' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full absolute top-1"
                        animate={{ x: settings.autoSave ? 24 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Sound Effects</span>
                    <motion.button
                      onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        settings.soundEnabled ? 'bg-green-500' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full absolute top-1"
                        animate={{ x: settings.soundEnabled ? 24 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </label>
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <h4 className="text-white/80 text-sm font-medium mb-3">Accessibility</h4>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">High Contrast</span>
                    <motion.button
                      onClick={() => updateSetting('highContrast', !settings.highContrast)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        settings.highContrast ? 'bg-yellow-500' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full absolute top-1"
                        animate={{ x: settings.highContrast ? 24 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Reduced Motion</span>
                    <motion.button
                      onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        settings.reducedMotion ? 'bg-purple-500' : 'bg-white/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full absolute top-1"
                        animate={{ x: settings.reducedMotion ? 24 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </label>
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="text-white/40 text-xs mb-1">Emotion Eater Pro v1.0</p>
                <p className="text-white/30 text-xs">Built with ❤️ using Next.js & WebGL</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}