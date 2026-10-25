import React, { useEffect, useRef, useState } from 'react';
import { StateBoundary } from '../types';
import { project } from './IndiaMapCanvas';

interface IndiaSilhouetteProps {
  states: StateBoundary[];
  className?: string;
  fillColor?: string;
  strokeColor?: string;
}

export const IndiaSilhouette: React.FC<IndiaSilhouetteProps> = ({
  states,
  className = '',
  fillColor = 'rgba(31, 58, 77, 0.07)',
  strokeColor = 'rgba(31, 58, 77, 0.16)'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height)
        });
      }
    };

    updateSize();
    const ro = new ResizeObserver(() => updateSize());
    ro.observe(container);

    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || states.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    if (width <= 0 || height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const minX = 0.5;
    const maxX = 27.5;
    const minY = 0.5;
    const maxY = 31.5;
    const projW = maxX - minX;
    const projH = maxY - minY;

    const scale = Math.min(width / projW, height / projH) * 0.95;
    const offsetX = (width - projW * scale) / 2 - minX * scale;
    const offsetY = (height - projH * scale) / 2 - minY * scale;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 0.8 / scale;

    for (const state of states) {
      for (const ring of state.rings) {
        if (ring.length < 3) continue;
        ctx.beginPath();
        const [x0, y0] = project(ring[0][0], ring[0][1]);
        ctx.moveTo(x0, y0);
        for (let i = 1; i < ring.length; i++) {
          const [xi, yi] = project(ring[i][0], ring[i][1]);
          ctx.lineTo(xi, yi);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.restore();
  }, [states, dimensions, fillColor, strokeColor]);

  return (
    <div ref={containerRef} className={`w-full h-full relative pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
