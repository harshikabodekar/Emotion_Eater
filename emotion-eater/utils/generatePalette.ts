export type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

// Colors based on emotion keywords
const PALETTES = {
  happy: {
    primary: '#FFD700', // Gold/Yellow
    secondary: '#FF69B4', // HotPink
    accent: '#FFFF00', // Yellow
    background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
  },
  sad: {
    primary: '#1E90FF', // DodgerBlue
    secondary: '#9370DB', // MediumPurple
    accent: '#00BFFF', // DeepSkyBlue
    background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', // Actually this looks too pink for sad, let's adjust
    // Better sad bg
  },
  angry: {
    primary: '#FF4500', // OrangeRed
    secondary: '#FF8C00', // DarkOrange
    accent: '#FF0000', // Red
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', // readjust
  },
  calm: {
    primary: '#20B2AA', // LightSeaGreen
    secondary: '#3CB371', // MediumSeaGreen
    accent: '#00FA9A', // MediumSpringGreen
    background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  },
  default: {
    primary: '#ffffff',
    secondary: '#cccccc',
    accent: '#aaaaaa',
    background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
  }
};

// Specific background overrides
const BACKGROUNDS = {
  happy: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  sad: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  angry: 'linear-gradient(to right, #ed213a, #93291e)',
  calm: 'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)', // or the teal one
};

export function getPalette(emotion: string): Palette {
  const normalized = emotion.toLowerCase().trim();

  if (!normalized) return PALETTES.default;

  // Simple keyword matching
  if (normalized.includes('happy') || normalized.includes('joy') || normalized.includes('fun') || normalized.includes('smile') || normalized.includes('excited')) {
    return { ...PALETTES.happy, background: BACKGROUNDS.happy };
  }
  if (normalized.includes('sad') || normalized.includes('cry') || normalized.includes('tear') || normalized.includes('blue') || normalized.includes('depress')) {
    return { ...PALETTES.sad, background: BACKGROUNDS.sad };
  }
  if (normalized.includes('angry') || normalized.includes('mad') || normalized.includes('rage') || normalized.includes('hate') || normalized.includes('furious')) {
    return { ...PALETTES.angry, background: BACKGROUNDS.angry };
  }
  if (normalized.includes('calm') || normalized.includes('peace') || normalized.includes('relax') || normalized.includes('chill') || normalized.includes('zen')) {
    return { ...PALETTES.calm, background: BACKGROUNDS.calm };
  }

  // Fallback / Procedural generation for unknown words?
  // For now return default, but maybe we can hash the string to pick colors?
  return PALETTES.default;
}

export function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0];
}
