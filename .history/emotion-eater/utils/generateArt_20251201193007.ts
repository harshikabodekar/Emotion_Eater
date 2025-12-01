// Generates SVG path data for organic blobs/waves with emotion-based variations

// Emotion-based shape parameters
const EMOTION_SHAPES = {
  happy: { complexity: 1.2, smoothness: 0.8, size: 1.1, spikiness: 0.2 },
  excited: { complexity: 1.5, smoothness: 0.6, size: 1.3, spikiness: 0.8 },
  sad: { complexity: 0.7, smoothness: 1.2, size: 0.8, spikiness: 0.1 },
  angry: { complexity: 1.8, smoothness: 0.3, size: 1.2, spikiness: 1.5 },
  calm: { complexity: 0.5, smoothness: 1.5, size: 1.0, spikiness: 0.0 },
  anxious: { complexity: 2.0, smoothness: 0.4, size: 0.9, spikiness: 1.2 },
  love: { complexity: 1.0, smoothness: 1.3, size: 1.1, spikiness: 0.3 },
  peaceful: { complexity: 0.6, smoothness: 1.4, size: 1.0, spikiness: 0.1 },
  energetic: { complexity: 1.6, smoothness: 0.7, size: 1.2, spikiness: 0.9 },
  melancholy: { complexity: 0.8, smoothness: 1.1, size: 0.9, spikiness: 0.2 },
  confident: { complexity: 1.1, smoothness: 0.9, size: 1.2, spikiness: 0.6 },
  dreamy: { complexity: 0.9, smoothness: 1.6, size: 1.1, spikiness: 0.0 },
  mysterious: { complexity: 1.4, smoothness: 0.8, size: 1.0, spikiness: 0.7 },
  playful: { complexity: 1.7, smoothness: 0.9, size: 1.1, spikiness: 0.5 },
  default: { complexity: 1.0, smoothness: 1.0, size: 1.0, spikiness: 0.4 }
};

function getEmotionFromSeed(seed: string) {
  const emotions = Object.keys(EMOTION_SHAPES);
  for (const emotion of emotions) {
    if (seed.toLowerCase().includes(emotion)) {
      return emotion;
    }
  }
  return 'default';
}

export function generateBlobPath(seed: string): string {
    // Simple pseudo-random number generator based on seed string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    const random = () => {
        hash = (hash * 16807) % 2147483647;
        return (hash / 2147483647);
    };

    // Get emotion-based parameters
    const emotion = getEmotionFromSeed(seed);
    const params = EMOTION_SHAPES[emotion as keyof typeof EMOTION_SHAPES];

    // Parameters for the blob with emotion influence
    const size = 200;
    const basePoints = 8;
    const numPoints = Math.floor(basePoints + (random() * 5 * params.complexity)); // Complexity affects point count
    const points: {x: number, y: number}[] = [];
    const center = { x: size / 2, y: size / 2 };
    const radius = size * 0.4 * params.size; // Size multiplier
    const variance = size * 0.1 * (1 + params.spikiness); // Spikiness affects variance

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const r = radius + (random() - 0.5) * variance * 2;
        points.push({
            x: center.x + Math.cos(angle) * r,
            y: center.y + Math.sin(angle) * r
        });
    }

    // Generate smooth path using Catmull-Rom splines or cubic bezier
    // Here we use a simple quadratic bezier approach to smooth it

    if (points.length === 0) return "";

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length; i++) {
        const p0 = points[i];
        const p1 = points[(i + 1) % points.length];

        // Midpoint
        const mx = (p0.x + p1.x) / 2;
        const my = (p0.y + p1.y) / 2;

        // This makes it a bit pointy if we just line to midpoint,
        // to make it smooth we can use quadratic curve
        // Q controlPoint endPoint
        // For a closed loop of smooth curves through points, we usually use
        // the points as control points for curves between midpoints.

        // Let's rewrite: Start at midpoint between last and first
        // Then curve to midpoint between first and second using first as control
    }

    // Better smoothing approach:
    // Start at midpoint of last and 0
    const pLast = points[points.length - 1];
    const p0 = points[0];
    const startX = (pLast.x + p0.x) / 2;
    const startY = (pLast.y + p0.y) / 2;

    d = `M ${startX} ${startY}`;

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const endX = (p1.x + p2.x) / 2;
        const endY = (p1.y + p2.y) / 2;

        d += ` Q ${p1.x} ${p1.y} ${endX} ${endY}`;
    }

    return d;
}
