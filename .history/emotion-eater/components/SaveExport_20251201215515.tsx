'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

interface SaveExportProps {
  currentEmotion: string;
  palette: any;
  svgPath: string;
}

export default function SaveExport({ currentEmotion, palette, svgPath }: SaveExportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
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

  const captureScreenshot = async () => {
    setIsExporting(true);
    try {
      const canvas = await html2canvas(document.body, {
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
        scale: 2, // Higher quality
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `emotion-eater-${currentEmotion || 'art'}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      setExportSuccess('Screenshot saved!');
      setTimeout(() => setExportSuccess(null), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      setExportSuccess('Export failed');
      setTimeout(() => setExportSuccess(null), 3000);
    }
    setIsExporting(false);
  };

  const exportSVG = () => {
    const svgContent = `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${palette.primary};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${palette.secondary};stop-opacity:0.3" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#bg)" />
        <path d="${svgPath}" fill="${palette.primary}" stroke="${palette.accent}" stroke-width="2" />
        <text x="10" y="190" font-family="Arial" font-size="8" fill="${palette.accent}">
          ${currentEmotion} • ${new Date().toLocaleDateString()}
        </text>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `emotion-art-${currentEmotion || 'design'}-${Date.now()}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();

    setExportSuccess('SVG exported!');
    setTimeout(() => setExportSuccess(null), 3000);
  };

  const exportPalette = () => {
    const paletteData = {
      emotion: currentEmotion,
      timestamp: new Date().toISOString(),
      colors: {
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent,
        background: palette.background,
      },
      metadata: {
        generator: 'Emotion Eater Pro',
        version: '1.0',
      }
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { 
      type: 'application/json' 
    });
    const link = document.createElement('a');
    link.download = `palette-${currentEmotion || 'colors'}-${Date.now()}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();

    setExportSuccess('Palette saved!');
    setTimeout(() => setExportSuccess(null), 3000);
  };

  const shareToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `Just created art for "${currentEmotion}" on Emotion Eater Pro! 🎨✨\n\nColors: ${palette.primary}, ${palette.secondary}, ${palette.accent}`
      );
      setExportSuccess('Copied to clipboard!');
      setTimeout(() => setExportSuccess(null), 3000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span className="text-base font-medium">Save & Share</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-80 bg-black/90 backdrop-blur-xl border-2 border-gray-600 rounded-xl p-6 shadow-2xl z-50"
          >
            <h3 className="text-white font-medium mb-3">Export Options</h3>
            
            <div className="space-y-2">
              <motion.button
                onClick={captureScreenshot}
                disabled={isExporting}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{isExporting ? 'Capturing...' : 'Screenshot (PNG)'}</span>
              </motion.button>

              <motion.button
                onClick={exportSVG}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Export Art (SVG)</span>
              </motion.button>

              <motion.button
                onClick={exportPalette}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4" />
                </svg>
                <span>Save Palette (JSON)</span>
              </motion.button>

              <motion.button
                onClick={shareToClipboard}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Share Text</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {exportSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 text-xs text-center"
                >
                  ✅ {exportSuccess}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}