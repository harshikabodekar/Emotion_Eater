'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Palette, hexToRgb } from '../utils/generatePalette';

interface FluidCanvasProps {
  palette: Palette;
}

export interface FluidCanvasHandle {
  splash: (x: number, y: number, color?: [number, number, number]) => void;
}

const FluidCanvas = forwardRef<FluidCanvasHandle, FluidCanvasProps>(({ palette }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splashesRef = useRef<{ x: number; y: number; dx: number; dy: number; r: number; g: number; b: number; life: number; size: number }[]>([]);

  useImperativeHandle(ref, () => ({
    splash: (x, y, color) => {
        // x and y are 0-1 normalized coordinates
        const rgb = color || hexToRgb(palette.accent);
        splashesRef.current.push({
            x: x * window.innerWidth,
            y: y * window.innerHeight,
            dx: (Math.random() - 0.5) * 4,
            dy: (Math.random() - 0.5) * 4,
            r: rgb[0],
            g: rgb[1],
            b: rgb[2],
            life: 1.0,
            size: Math.random() * 50 + 50
        });
    }
  }));


  // Let's use a Ref for the animation state to avoid re-creating the loop
  const stateRef = useRef({
      palette,
      splashes: [] as { x: number; y: number; dx: number; dy: number; r: number; g: number; b: number; life: number; size: number }[]
  });

  useEffect(() => {
      stateRef.current.palette = palette;
  }, [palette]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
        preserveDrawingBuffer: false,
        alpha: false,
        antialias: false,
        powerPreference: 'low-power'
    });
    if (!gl) return;

    // ... Shader setup ...
    const vsSource = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;
    const fsSource = `
        precision mediump float;
        uniform vec2 resolution;
        uniform float time;
        uniform vec3 baseColor1;
        uniform vec3 baseColor2;

        uniform vec4 splashData[10];
        uniform vec3 splashColors[10];

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution;

            float t = time * 0.2;

            // Create a flowing background
            float wave1 = sin(uv.x * 3.0 + t + uv.y * 2.0);
            float wave2 = cos(uv.y * 4.0 - t * 1.5 + uv.x * 2.0);
            float flow = (wave1 + wave2) * 0.25 + 0.5;

            vec3 bg = mix(baseColor1, baseColor2, flow);

            vec3 finalColor = bg;

            for(int i=0; i<10; i++) {
                vec4 s = splashData[i];
                if (s.w <= 0.0) continue;

                // Normalize splash pos
                vec2 splashPos = s.xy;

                // Aspect ratio correction for distance
                vec2 diff = uv - splashPos;
                diff.x *= resolution.x / resolution.y;

                float dist = length(diff);
                float radius = s.z;

                // Soft glowy splash
                float glow = exp(-dist * 20.0 / radius) * s.w;
                finalColor += splashColors[i] * glow;
            }

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");
    const baseColor1Loc = gl.getUniformLocation(program, "baseColor1");
    const baseColor2Loc = gl.getUniformLocation(program, "baseColor2");
    const splashDataLoc = gl.getUniformLocation(program, "splashData");
    const splashColorsLoc = gl.getUniformLocation(program, "splashColors");

    // Handle Resize
    let dpr = 1;
    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const simScale = 0.5;
        canvas.width = window.innerWidth * dpr * simScale;
        canvas.height = window.innerHeight * dpr * simScale;
        gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 45;

    const render = (timestamp: number) => {
        animationFrameId = requestAnimationFrame(render);
        const elapsed = timestamp - lastTime;
        if (elapsed < fpsInterval) return;
        lastTime = timestamp - (elapsed % fpsInterval);

        // Update splashes
        const splashes = splashesRef.current;
        for (let i = splashes.length - 1; i >= 0; i--) {
            const s = splashes[i];
            s.life -= 0.02; // Fade out
            s.x += s.dx;
            s.y += s.dy;
            if (s.life <= 0) splashes.splice(i, 1);
        }

        // Prepare uniforms
        const p = stateRef.current.palette;
        const c1 = hexToRgb(p.primary).map(c => c/255);
        const c2 = hexToRgb(p.secondary).map(c => c/255);

        gl.uniform3f(baseColor1Loc, c1[0], c1[1], c1[2]);
        gl.uniform3f(baseColor2Loc, c2[0], c2[1], c2[2]);
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, timestamp / 1000);

        // Upload splash data (max 10)
        const sData = new Float32Array(40); // 10 * 4
        const sColors = new Float32Array(30); // 10 * 3

        for (let i = 0; i < 10; i++) {
            if (i < splashes.length) {
                const s = splashes[i];
                // Normalize position to 0-1 for shader
                const nx = s.x / window.innerWidth;
                const ny = 1.0 - (s.y / window.innerHeight); // Flip Y? GL coords 0,0 is bottom left usually. Mouse/Window is top left.
                // Wait, in fragment shader gl_FragCoord is pixels.
                // But we want to pass normalized UVs to match logic.
                // Actually my logic in shader was:
                // vec2 uv = gl_FragCoord.xy / resolution;
                // splashPos should be in same UV space (0-1).

                sData[i*4 + 0] = nx;
                sData[i*4 + 1] = ny;
                sData[i*4 + 2] = s.size / window.innerHeight; // Size relative to height
                sData[i*4 + 3] = s.life;

                sColors[i*3 + 0] = s.r / 255;
                sColors[i*3 + 1] = s.g / 255;
                sColors[i*3 + 2] = s.b / 255;
            } else {
                sData[i*4 + 3] = 0.0; // Life 0
            }
        }

        gl.uniform4fv(splashDataLoc, sData);
        gl.uniform3fv(splashColorsLoc, sColors);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    render(0);

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };

  }, []); // Run once

  return (
    <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
});

FluidCanvas.displayName = 'FluidCanvas';

export default FluidCanvas;
