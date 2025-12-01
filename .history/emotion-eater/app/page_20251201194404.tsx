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
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Fluid Canvas */}
      <FluidCanvas ref={fluidRef} palette={palette} />

      {/* Overlay Content */}
      <div className="z-10 flex flex-col items-center gap-8 w-full">

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-md text-center">
          EMOTION EATER <span className="text-sm font-normal opacity-70 block md:inline align-top mt-2 md:mt-0">Pro</span>
        </h1>

        {/* Art Display */}
        <div className="my-4">
            <ArtDisplay svgPath={svgPath} palette={palette} />
        </div>

        {/* Input Form */}
        <EmotionForm
            onEmotionChange={setEmotion}
            onTyping={handleTyping}
        />

      </div>

      {/* Footer / Safety Notice */}
      <div className="absolute bottom-4 text-white/30 text-xs text-center">
        Client-side only • No permissions required • Lightweight WebGL
      </div>
    </main>
  );
}
