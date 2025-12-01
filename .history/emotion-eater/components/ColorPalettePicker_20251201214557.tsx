'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorPalettePickerProps {
  onPaletteChange: (palette: CustomPalette) => void;
  currentPalette: any;
}

interface CustomPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const PRESET_PALETTES = [
  {
    name: "Ocean Depths",
    palette: { primary: "#0077BE", secondary: "#00A8CC", accent: "#40E0D0", background: "#001830" },
    emoji: "🌊"
  },
  {
    name: "Sunset Glow",
    palette: { primary: "#FF6B35", secondary: "#F7931E", accent: "#FFD23F", background: "#2D1B37" },
    emoji: "🌅"
  },
  {
    name: "Forest Mist",
    palette: { primary: "#2E8B57", secondary: "#90EE90", accent: "#ADFF2F", background: "#1C2E1F" },
    emoji: "🌲"
  },
  {
    name: "Purple Dream",
    palette: { primary: "#8A2BE2", secondary: "#DA70D6", accent: "#E6E6FA", background: "#2F1B37" },
    emoji: "💜"
  },
  {
    name: "Warm Embrace",
    palette: { primary: "#DC143C", secondary: "#FF69B4", accent: "#FFA07A", background: "#3D2B2E" },
    emoji: "🔥"
  },
  {
    name: "Cool Breeze",
    palette: { primary: "#4169E1", secondary: "#87CEEB", accent: "#E0FFFF", background: "#1E2A3A" },
    emoji: "❄️"
  }
];

export default function ColorPalettePicker({ onPaletteChange, currentPalette }: ColorPalettePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [customPalette, setCustomPalette] = useState<CustomPalette>({
    primary: currentPalette?.primary || "#4ECDC4",
    secondary: currentPalette?.secondary || "#45B7D1",
    accent: currentPalette?.accent || "#96CEB4",
    background: currentPalette?.background || "#2C3E50"
  });

  const handleColorChange = (key: keyof CustomPalette, color: string) => {
    const newPalette = { ...customPalette, [key]: color };
    setCustomPalette(newPalette);
    onPaletteChange(newPalette);
  };

  const applyPreset = (preset: typeof PRESET_PALETTES[0]) => {
    setCustomPalette(preset.palette);
    onPaletteChange(preset.palette);
  };

  const generateRandomPalette = () => {
    const hue1 = Math.random() * 360;
    const hue2 = (hue1 + 60 + Math.random() * 180) % 360;
    const hue3 = (hue1 + 180 + Math.random() * 60) % 360;
    
    const randomPalette = {
      primary: `hsl(${hue1}, 70%, 55%)`,
      secondary: `hsl(${hue2}, 60%, 65%)`,
      accent: `hsl(${hue3}, 80%, 75%)`,
      background: `hsl(${hue1}, 30%, 15%)`
    };
    
    setCustomPalette(randomPalette);
    onPaletteChange(randomPalette);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-lg border-2 border-gray-600 rounded-xl text-white hover:bg-black/90 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: currentPalette?.primary }} />
          <div className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: currentPalette?.secondary }} />
          <div className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: currentPalette?.accent }} />
        </div>
        <span className="text-base font-medium">Colors</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 left-0 w-96 bg-black/90 backdrop-blur-xl border-2 border-gray-600 rounded-xl p-6 shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Color Palette</h3>
              <button
                onClick={generateRandomPalette}
                className="text-xs text-white/60 hover:text-white/80 transition-colors px-2 py-1 bg-white/10 rounded-lg"
              >
                🎲 Random
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('presets')}
                className={`px-3 py-2 text-sm rounded-lg transition-all ${
                  activeTab === 'presets'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                Presets
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-2 text-sm rounded-lg transition-all ${
                  activeTab === 'custom'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Preset Palettes */}
            {activeTab === 'presets' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                {PRESET_PALETTES.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{preset.emoji}</span>
                      <span className="text-white text-sm font-medium">
                        {preset.name}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Object.values(preset.palette).slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="flex-1 h-6 rounded border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Custom Colors */}
            {activeTab === 'custom' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {(Object.entries(customPalette) as Array<[keyof CustomPalette, string]>).map(([key, color]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/70 text-sm capitalize">
                        {key === 'primary' && '🎨 Primary'}
                        {key === 'secondary' && '🌟 Secondary'}
                        {key === 'accent' && '✨ Accent'}
                        {key === 'background' && '🖤 Background'}
                      </label>
                      <span className="text-white/50 text-xs font-mono">
                        {color.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-12 h-8 rounded border border-white/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}

                {/* Palette Preview */}
                <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-white/70 text-sm mb-2">Preview</div>
                  <div 
                    className="h-16 rounded-lg border border-white/20 relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${customPalette.primary} 0%, ${customPalette.secondary} 50%, ${customPalette.accent} 100%)` 
                    }}
                  >
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: customPalette.background }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-8 h-8 rounded-full border-2"
                        style={{ borderColor: customPalette.accent }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}