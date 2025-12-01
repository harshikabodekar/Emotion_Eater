'use client';

import React, { useState, useRef } from 'react';
import FluidCanvas, { FluidCanvasHandle } from '@/components/FluidCanvas';
import EmotionForm from '@/components/EmotionForm';
import ArtDisplay from '@/components/ArtDisplay';
import EmotionHistory from '@/components/EmotionHistory';
import EmotionPresets from '@/components/EmotionPresets';
import EmotionIntensity from '@/components/EmotionIntensity';
import SaveExport from '@/components/SaveExport';
import StatsDisplay from '@/components/StatsDisplay';
import SettingsPanel, { AppSettings } from '@/components/SettingsPanel';
import ColorPalettePicker from '@/components/ColorPalettePicker';
import { getPalette } from '@/utils/generatePalette';
import { generateBlobPath } from '@/utils/generateArt';

export default function Home() {
  const [emotion, setEmotion] = useState('');
  const [intensity, setIntensity] = useState(0.7);
  const [customPalette, setCustomPalette] = useState<any>(null);
  const [settings, setSettings] = useState<AppSettings>({
    animationSpeed: 1,
    particleCount: 50,
    backgroundIntensity: 0.7,
    autoSave: false,
    soundEnabled: false,
    highContrast: false,
    reducedMotion: false,
  });

  const fluidRef = useRef<FluidCanvasHandle>(null);

  // Memoize palette and path with intensity and custom palette support
  const palette = React.useMemo(() => {
    if (customPalette) return customPalette;
    const basePalette = getPalette(emotion);
    // Apply intensity to palette
    return {
      ...basePalette,
      primary: basePalette.primary,
      secondary: basePalette.secondary,
      accent: basePalette.accent,
      background: basePalette.background,
    };
  }, [emotion, customPalette, intensity]);
  
  const svgPath = React.useMemo(() => generateBlobPath(emotion || 'default'), [emotion]);

  const handleTyping = () => {
    // Inject splash at random position or center
    if (fluidRef.current) {
        // Random position near center with intensity affecting spread
        const spread = intensity * 0.6;
        const x = 0.5 + (Math.random() - 0.5) * spread;
        const y = 0.5 + (Math.random() - 0.5) * spread;
        fluidRef.current.splash(x, y);
    }
  };

  const handleEmotionSelect = (selectedEmotion: string) => {
    setEmotion(selectedEmotion);
  };

  const handlePaletteChange = (newPalette: any) => {
    setCustomPalette(newPalette);
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  return (
    <main 
      className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 ${
        settings.highContrast ? 'contrast-125 brightness-110' : ''
      }`}
      style={{
        filter: settings.reducedMotion ? 'none' : undefined,
      }}
    >
      {/* Background Fluid Canvas */}
      <FluidCanvas ref={fluidRef} palette={palette} />

      {/* Top Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EmotionPresets 
              onEmotionSelect={handleEmotionSelect}
              currentEmotion={emotion}
            />
            <ColorPalettePicker 
              onPaletteChange={handlePaletteChange}
              currentPalette={palette}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <EmotionHistory 
              currentEmotion={emotion}
              onEmotionSelect={handleEmotionSelect}
            />
            <StatsDisplay 
              currentEmotion={emotion}
              intensity={intensity}
            />
            <SaveExport 
              currentEmotion={emotion}
              palette={palette}
              svgPath={svgPath}
            />
            <SettingsPanel 
              onSettingsChange={handleSettingsChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-md">
            EMOTION EATER 
            <span className="text-sm font-normal opacity-70 block md:inline align-top mt-2 md:mt-0 ml-2">
              Pro
            </span>
          </h1>
          <p className="text-white/60 text-sm mt-2">
            Transform your emotions into fluid art experiences
          </p>
        </div>

        {/* Art Display */}
        <div className="my-4">
          <ArtDisplay svgPath={svgPath} palette={palette} />
        </div>

        {/* Input Form */}
        <div className="w-full max-w-md">
          <EmotionForm
            onEmotionChange={setEmotion}
            onTyping={handleTyping}
          />
          
          {/* Intensity Slider */}
          <div className="mt-6">
            <EmotionIntensity
              intensity={intensity}
              onIntensityChange={setIntensity}
            />
          </div>
        </div>

        {/* Live Stats / Welcome Message */}
        <div className="text-center">
          {emotion ? (
            <div className="inline-flex items-center gap-6 px-8 py-4 bg-black/80 backdrop-blur-lg border-2 border-gray-600 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-white/80 text-sm font-medium">Current Emotion</div>
                <div className="text-white font-semibold text-lg">{emotion}</div>
              </div>
              <div className="w-px h-8 bg-gray-500" />
              <div className="text-center">
                <div className="text-white/80 text-sm font-medium">Intensity</div>
                <div className="text-white font-semibold text-lg">{Math.round(intensity * 100)}%</div>
              </div>
              <div className="w-px h-8 bg-gray-500" />
              <div className="text-center">
                <div className="text-white/80 text-sm font-medium">Colors Active</div>
                <div className="flex gap-1 justify-center mt-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.primary }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.secondary }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.accent }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-black/70 backdrop-blur-lg border-2 border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="text-white/90 text-lg font-medium mb-3">
                  ✨ Welcome to Emotion Eater Pro
                </div>
                <div className="text-white/70 text-sm space-y-2">
                  <p>• Type any emotion to see it transform into fluid art</p>
                  <p>• Try combinations like "happy excited" or "calm peaceful"</p>
                  <p>• Use presets above for quick inspiration</p>
                  <p>• Adjust intensity to change visual effects</p>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-white/30 text-xs text-center">
        Client-side only • No permissions required • Lightweight WebGL
      </div>

      {/* Accessibility Indicator */}
      {(settings.highContrast || settings.reducedMotion) && (
        <div className="absolute top-4 right-4 text-white/50 text-xs">
          {settings.highContrast && '🔆'} {settings.reducedMotion && '⏸️'}
        </div>
      )}
    </main>
  );
}
