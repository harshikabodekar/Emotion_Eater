// Generates SVG path data for organic blobs/waves

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

    // Parameters for the blob
    const size = 200;
    const numPoints = 12; // Constant number of points for smooth morphing
    const points: {x: number, y: number}[] = [];
    const center = { x: size / 2, y: size / 2 };
    const radius = size * 0.4;
    const variance = size * 0.1;

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const r = radius + (random() - 0.5) * variance * 2;
        points.push({
            x: center.x + Math.cos(angle) * r,
            y: center.y + Math.sin(angle) * r
        });
    }

    // Generate smooth path using a simple quadratic bezier approach
    if (points.length === 0) return "";

    // Start at midpoint of last and 0
    const pLast = points[points.length - 1];
    const p0 = points[0];
    const startX = (pLast.x + p0.x) / 2;
    const startY = (pLast.y + p0.y) / 2;

    let d = `M ${startX} ${startY}`;

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const endX = (p1.x + p2.x) / 2;
        const endY = (p1.y + p2.y) / 2;

        d += ` Q ${p1.x} ${p1.y} ${endX} ${endY}`;
    }

    return d;
}
