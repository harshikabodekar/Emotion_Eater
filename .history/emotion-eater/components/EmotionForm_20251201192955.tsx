

'use client';

import React, { useState, useEffect } from 'react';

interface EmotionFormProps {
  onEmotionChange: (emotion: string) => void;
  onTyping: () => void;
}

export default function EmotionForm({ onEmotionChange, onTyping }: EmotionFormProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    // Debounce logic
    const handler = setTimeout(() => {
      onEmotionChange(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onEmotionChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onTyping(); // Trigger immediate visual feedback (splash)
  };

  return (
    <div className="w-full max-w-md mx-auto z-10 relative">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
        <label htmlFor="emotion-input" className="block text-white text-lg font-medium mb-2 text-center">
          How do you feel?
        </label>
        <input
          id="emotion-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Type emotions (happy excited, sad anxious, creative playful...)"
          className="w-full bg-black/20 text-white placeholder-white/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-center text-xl"
          autoComplete="off"
        />
        <p className="text-white/40 text-xs text-center mt-3">
            Hot Reactivity™ Active • No Data Saved
        </p>
      </div>
    </div>
  );
}
