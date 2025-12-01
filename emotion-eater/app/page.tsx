'use client';

import React, { useState, useRef } from 'react';
import FluidCanvas, { FluidCanvasHandle } from '@/components/FluidCanvas';
import EmotionForm from '@/components/EmotionForm';
import ArtDisplay from '@/components/ArtDisplay';
import { getPalette } from '@/utils/generatePalette';
import { generateBlobPath } from '@/utils/generateArt';

export default function Home() {
  const [emotion, setEmotion] = useState('');

  const fluidRef = useRef<FluidCanvasHandle>(null);

  // Update palette and art when emotion changes (debounced from form)
  // We can calculate derived state during render if it's cheap, but generateBlobPath might be slightly heavy?
  // Actually, setting state in useEffect based on another state is okay if it prevents render loops,
  // but here 'emotion' is a dependency.
  // The lint error warns about "Calling setState synchronously within an effect".
  // Which is weird because it's standard pattern to update derived state.
  // However, we can avoid this by just memoizing the derived state.

  // Memoize palette and path
  const palette = React.useMemo(() => getPalette(emotion), [emotion]);
  const svgPath = React.useMemo(() => generateBlobPath(emotion || 'default'), [emotion]);

  // We need to remove the state variables for palette and svgPath

  const handleTyping = () => {
    // Inject splash at random position or center
    if (fluidRef.current) {
        // Random position near center
        const x = 0.5 + (Math.random() - 0.5) * 0.4;
        const y = 0.5 + (Math.random() - 0.5) * 0.4;
        fluidRef.current.splash(x, y);
    }
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
