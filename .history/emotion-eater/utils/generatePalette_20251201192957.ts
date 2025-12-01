export type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

// Enhanced color palettes for various emotions
const PALETTES = {
  // Core emotions
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
    background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  angry: {
    primary: '#FF4500', // OrangeRed
    secondary: '#FF8C00', // DarkOrange
    accent: '#FF0000', // Red
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  },
  calm: {
    primary: '#20B2AA', // LightSeaGreen
    secondary: '#3CB371', // MediumSeaGreen
    accent: '#00FA9A', // MediumSpringGreen
    background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  },
  
  // Extended emotions
  excited: {
    primary: '#FF6B35', // Vibrant orange
    secondary: '#F7931E', // Golden orange
    accent: '#FFD23F', // Bright yellow
    background: 'linear-gradient(45deg, #ff9a56 0%, #ff6b35 50%, #f7931e 100%)',
  },
  anxious: {
    primary: '#8B5A3C', // Dark brown
    secondary: '#A0522D', // Sienna
    accent: '#CD853F', // Peru
    background: 'linear-gradient(135deg, #d4a574 0%, #8b5a3c 100%)',
  },
  love: {
    primary: '#FF1493', // Deep pink
    secondary: '#FF69B4', // Hot pink
    accent: '#FFB6C1', // Light pink
    background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)',
  },
  peaceful: {
    primary: '#87CEEB', // Sky blue
    secondary: '#98FB98', // Pale green
    accent: '#F0F8FF', // Alice blue
    background: 'linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)',
  },
  energetic: {
    primary: '#32CD32', // Lime green
    secondary: '#00FF7F', // Spring green
    accent: '#ADFF2F', // Green yellow
    background: 'linear-gradient(60deg, #96fbc4 0%, #f9f586 100%)',
  },
  melancholy: {
    primary: '#4B0082', // Indigo
    secondary: '#663399', // Rebecca purple
    accent: '#9370DB', // Medium purple
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  confident: {
    primary: '#FF4500', // Orange red
    secondary: '#DC143C', // Crimson
    accent: '#FFD700', // Gold
    background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
  },
  dreamy: {
    primary: '#DDA0DD', // Plum
    secondary: '#E6E6FA', // Lavender
    accent: '#F0E68C', // Khaki
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  mysterious: {
    primary: '#2F4F4F', // Dark slate gray
    secondary: '#483D8B', // Dark slate blue
    accent: '#8A2BE2', // Blue violet
    background: 'linear-gradient(225deg, #2c3e50 0%, #4a6741 100%)',
  },
  playful: {
    primary: '#FF69B4', // Hot pink
    secondary: '#00CED1', // Dark turquoise
    accent: '#FFD700', // Gold
    background: 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 50%, #a8edea 100%)',
  },
  nostalgic: {
    primary: '#D2691E', // Chocolate
    secondary: '#CD853F', // Peru
    accent: '#F4A460', // Sandy brown
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
  },
  grateful: {
    primary: '#FFD700', // Gold
    secondary: '#FFA500', // Orange
    accent: '#FF6347', // Tomato
    background: 'linear-gradient(45deg, #fdcb6e 0%, #e17055 100%)',
  },
  overwhelmed: {
    primary: '#696969', // Dim gray
    secondary: '#808080', // Gray
    accent: '#A9A9A9', // Dark gray
    background: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  },
  hopeful: {
    primary: '#7FB3D3', // Light blue
    secondary: '#68BBE3', // Sky blue
    accent: '#0E4B99', // Dark blue
    background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
  },
  creative: {
    primary: '#9932CC', // Dark orchid
    secondary: '#FF1493', // Deep pink
    accent: '#00CED1', // Dark turquoise
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  default: {
    primary: '#ffffff',
    secondary: '#cccccc',
    accent: '#aaaaaa',
    background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
  }
};

// Specific background overrides for enhanced visuals
const BACKGROUNDS = {
  happy: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  sad: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  angry: 'linear-gradient(to right, #ed213a, #93291e)',
  calm: 'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
  excited: 'linear-gradient(45deg, #ff9a56 0%, #ff6b35 50%, #f7931e 100%)',
  anxious: 'linear-gradient(135deg, #d4a574 0%, #8b5a3c 100%)',
  love: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)',
  peaceful: 'linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)',
  energetic: 'linear-gradient(60deg, #96fbc4 0%, #f9f586 100%)',
  melancholy: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  confident: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
  dreamy: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  mysterious: 'linear-gradient(225deg, #2c3e50 0%, #4a6741 100%)',
  playful: 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 50%, #a8edea 100%)',
  nostalgic: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
  grateful: 'linear-gradient(45deg, #fdcb6e 0%, #e17055 100%)',
  overwhelmed: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  hopeful: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
  creative: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
};

// Enhanced emotion keywords mapping
const EMOTION_KEYWORDS = {
  happy: ['happy', 'joy', 'joyful', 'fun', 'smile', 'cheerful', 'delighted', 'elated', 'blissful', 'glad', 'pleased', 'content', 'upbeat'],
  excited: ['excited', 'thrilled', 'enthusiastic', 'pumped', 'hyped', 'energized', 'exhilarated', 'ecstatic'],
  sad: ['sad', 'cry', 'crying', 'tear', 'tears', 'blue', 'depress', 'depressed', 'down', 'gloomy', 'melancholy', 'sorrowful', 'heartbroken'],
  angry: ['angry', 'mad', 'rage', 'hate', 'furious', 'livid', 'enraged', 'irritated', 'annoyed', 'frustrated', 'pissed'],
  calm: ['calm', 'peace', 'peaceful', 'relax', 'relaxed', 'chill', 'zen', 'serene', 'tranquil', 'quiet', 'still'],
  anxious: ['anxious', 'worried', 'stress', 'stressed', 'nervous', 'tense', 'uneasy', 'restless', 'panicked', 'overwhelmed'],
  love: ['love', 'loving', 'adore', 'romantic', 'affection', 'crush', 'infatuated', 'smitten', 'passionate'],
  energetic: ['energetic', 'active', 'dynamic', 'lively', 'vibrant', 'spirited', 'bouncy', 'vivacious'],
  melancholy: ['melancholy', 'wistful', 'pensive', 'contemplative', 'reflective', 'longing', 'yearning'],
  confident: ['confident', 'bold', 'brave', 'strong', 'powerful', 'determined', 'assertive', 'fearless'],
  dreamy: ['dreamy', 'whimsical', 'ethereal', 'floating', 'surreal', 'magical', 'enchanted'],
  mysterious: ['mysterious', 'dark', 'enigmatic', 'shadowy', 'secretive', 'hidden', 'unknown'],
  playful: ['playful', 'silly', 'funny', 'giggly', 'mischievous', 'childlike', 'carefree'],
  nostalgic: ['nostalgic', 'reminiscent', 'sentimental', 'wistful', 'longing', 'remembering'],
  grateful: ['grateful', 'thankful', 'appreciative', 'blessed', 'fortunate', 'honored'],
  overwhelmed: ['overwhelmed', 'confused', 'chaotic', 'scattered', 'lost', 'dizzy'],
  hopeful: ['hopeful', 'optimistic', 'positive', 'bright', 'promising', 'encouraging'],
  creative: ['creative', 'inspired', 'artistic', 'imaginative', 'innovative', 'expressive']
};

// Function to detect multiple emotions in text
function detectEmotions(text: string): string[] {
  const normalized = text.toLowerCase().trim();
  const detectedEmotions: string[] = [];
  
  // Check each emotion category
  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    const hasKeyword = keywords.some(keyword => 
      normalized.includes(keyword) ||
      normalized.split(/[\s,;.!?]+/).includes(keyword)
    );
    if (hasKeyword) {
      detectedEmotions.push(emotion);
    }
  });
  
  return detectedEmotions;
}

// Function to blend two colors
function blendColors(color1: string, color2: string, ratio: number = 0.5): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const blended = [
    Math.round(rgb1[0] * (1 - ratio) + rgb2[0] * ratio),
    Math.round(rgb1[1] * (1 - ratio) + rgb2[1] * ratio),
    Math.round(rgb1[2] * (1 - ratio) + rgb2[2] * ratio)
  ];
  
  return `#${blended.map(c => c.toString(16).padStart(2, '0')).join('')}`;
}

// Function to create mixed palette from multiple emotions
function createMixedPalette(emotions: string[]): Palette {
  if (emotions.length === 0) return PALETTES.default;
  if (emotions.length === 1) {
    const emotion = emotions[0];
    const palette = PALETTES[emotion as keyof typeof PALETTES] || PALETTES.default;
    const background = BACKGROUNDS[emotion as keyof typeof BACKGROUNDS] || palette.background;
    return { ...palette, background };
  }
  
  // Blend multiple emotions
  const basePalette = PALETTES[emotions[0] as keyof typeof PALETTES] || PALETTES.default;
  let mixedPalette = { ...basePalette };
  
  // Blend with other emotions
  for (let i = 1; i < Math.min(emotions.length, 3); i++) { // Limit to 3 emotions for clarity
    const emotionPalette = PALETTES[emotions[i] as keyof typeof PALETTES];
    if (emotionPalette) {
      const ratio = 1 / (i + 1); // Decreasing influence of additional emotions
      mixedPalette = {
        primary: blendColors(mixedPalette.primary, emotionPalette.primary, ratio),
        secondary: blendColors(mixedPalette.secondary, emotionPalette.secondary, ratio),
        accent: blendColors(mixedPalette.accent, emotionPalette.accent, ratio),
        background: mixedPalette.background // Keep first emotion's background
      };
    }
  }
  
  // Create a mixed background gradient
  const primaryEmotion = emotions[0];
  const background = BACKGROUNDS[primaryEmotion as keyof typeof BACKGROUNDS] || mixedPalette.background;
  
  return { ...mixedPalette, background };
}

export function getPalette(emotion: string): Palette {
  const normalized = emotion.toLowerCase().trim();

  if (!normalized) return PALETTES.default;

  // Detect multiple emotions
  const detectedEmotions = detectEmotions(normalized);
  
  // Handle multiple or single emotions
  if (detectedEmotions.length > 0) {
    return createMixedPalette(detectedEmotions);
  }

  // Fallback: Generate palette based on text hash for unknown emotions
  return generateHashBasedPalette(normalized);
}

// Generate a unique palette based on text hash for unknown emotions
function generateHashBasedPalette(text: string): Palette {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use hash to generate colors
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 120) % 360;
  const hue3 = (hue1 + 240) % 360;
  
  const primary = hslToHex(hue1, 70, 60);
  const secondary = hslToHex(hue2, 60, 70);
  const accent = hslToHex(hue3, 80, 50);
  
  return {
    primary,
    secondary,
    accent,
    background: `linear-gradient(135deg, ${primary}40, ${secondary}40)`
  };
}

// Helper function to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0];
}
