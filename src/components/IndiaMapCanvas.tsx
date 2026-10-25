import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StateBoundary } from '../types';
import { Plus, Minus, Maximize2, Compass } from 'lucide-react';

export interface WebMapMarker {
  id: string;
  lat: number;
  lon: number;
  label: string;
  color: string;
  isSelected?: boolean;
  hasPulseRing?: boolean;
  category?: string;
  state?: string;
}

export interface WebMapLine {
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
  label?: string;
  color: string;
}

interface IndiaMapCanvasProps {
  states: StateBoundary[];
  markers?: WebMapMarker[];
  highlightStates?: Set<string>;
  line?: WebMapLine | null;
  focus?: { lat: number; lon: number; zoom?: number } | null;
  resetKey?: number;
  showAllLabels?: boolean;
  className?: string;
  onMapTap?: (lat: number, lon: number) => void;
  onMarkerTap?: (marker: WebMapMarker) => void;
}

const COS_22 = Math.cos((22 * Math.PI) / 180);
const REF_LON = 67.5;
const REF_LAT = 38.0;

export function project(lon: number, lat: number): [number, number] {
  return [(lon - REF_LON) * COS_22, REF_LAT - lat];
}

export function unproject(x: number, y: number): [number, number] {
  return [x / COS_22 + REF_LON, REF_LAT - y];
}

export const IndiaMapCanvas: React.FC<IndiaMapCanvasProps> = ({
  states,
  markers = [],
  highlightStates = new Set(),
  line = null,
  focus = null,
  resetKey = 0,
  showAllLabels = false,
  className = '',
  onMapTap,
  onMarkerTap
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Viewport transforms (in CSS pixels)
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Drag & Touch interaction tracking
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);
  const pinchDistanceRef = useRef<number | null>(null);

  // Pulse animation loop
  const animFrameRef = useRef<number | null>(null);
  const pulseRef = useRef(0);

  // Focus transition animation
  const focusAnimRef = useRef<number | null>(null);

  // Track dimensions via ResizeObserver
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

    const ro = new ResizeObserver(() => {
      updateSize();
    });
    ro.observe(container);

    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Reset transforms
  useEffect(() => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  }, [resetKey]);

  // Handle focus changes with smooth camera tween
  useEffect(() => {
    if (!focus || dimensions.width <= 0 || dimensions.height <= 0) return;

    const { width, height } = dimensions;
    const [projX, projY] = project(focus.lon, focus.lat);
    const targetZoom = focus.zoom || 3.2;

    const projW = 27.0;
    const projH = 31.0;
    const minX = 0.5;
    const minY = 0.5;
    const fitScale = Math.min(width / projW, height / projH) * 0.94;
    const baseOffsetX = (width - projW * fitScale) / 2 - minX * fitScale;
    const baseOffsetY = (height - projH * fitScale) / 2 - minY * fitScale;

    const worldX = projX * fitScale + baseOffsetX;
    const worldY = projY * fitScale + baseOffsetY;

    const targetPanX = width / 2 - worldX * targetZoom;
    const targetPanY = height / 2 - worldY * targetZoom;

    // Smooth tween from current to target
    const startZoom = zoom;
    const startPanX = pan.x;
    const startPanY = pan.y;
    const startTime = performance.now();
    const duration = 380; // ms

    if (focusAnimRef.current) cancelAnimationFrame(focusAnimRef.current);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setZoom(startZoom + (targetZoom - startZoom) * ease);
      setPan({
        x: startPanX + (targetPanX - startPanX) * ease,
        y: startPanY + (targetPanY - startPanY) * ease
      });

      if (progress < 1) {
        focusAnimRef.current = requestAnimationFrame(step);
      }
    };

    focusAnimRef.current = requestAnimationFrame(step);
    return () => {
      if (focusAnimRef.current) cancelAnimationFrame(focusAnimRef.current);
    };
  }, [focus, dimensions.width, dimensions.height]);

  // Main Draw Function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    if (width <= 0 || height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    const bufferW = Math.floor(width * dpr);
    const bufferH = Math.floor(height * dpr);

    if (canvas.width !== bufferW || canvas.height !== bufferH) {
      canvas.width = bufferW;
      canvas.height = bufferH;
    }

    // Reset transform every single frame: map CSS coordinates to physical pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 1. Sea Gradient Background
    const seaGrad = ctx.createLinearGradient(0, 0, 0, height);
    seaGrad.addColorStop(0, '#E6EFF4');
    seaGrad.addColorStop(1, '#D2E3ED');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, 0, width, height);

    // Coordinate projections bounding box for India
    const minX = 0.5;
    const maxX = 27.5;
    const minY = 0.5;
    const maxY = 31.5;
    const projW = maxX - minX;
    const projH = maxY - minY;

    const fitScale = Math.min(width / projW, height / projH) * 0.94;
    const baseOffsetX = (width - projW * fitScale) / 2 - minX * fitScale;
    const baseOffsetY = (height - projH * fitScale) / 2 - minY * fitScale;

    // 2. Landmass & State Outlines
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    ctx.translate(baseOffsetX, baseOffsetY);
    ctx.scale(fitScale, fitScale);

    // 2a. Soft Drop Shadow under landmass
    ctx.save();
    ctx.translate(0.12, 0.16);
    ctx.fillStyle = 'rgba(25, 45, 60, 0.08)';
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
      }
    }
    ctx.restore();

    // 2b. State Landmass Polygons & Borders
    for (const state of states) {
      const isHighlighted =
        highlightStates.has(state.name) ||
        (highlightStates.has('Ladakh') && state.name === 'Jammu & Kashmir');

      ctx.fillStyle = isHighlighted ? '#FFE7B8' : '#FAF8F3';
      ctx.strokeStyle = isHighlighted ? '#E07A3F' : '#CFBEA7';
      ctx.lineWidth = (isHighlighted ? 1.8 : 0.75) / (fitScale * zoom);

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

    // 2c. Dashed Map Line (e.g., tap question distance measurement)
    if (line) {
      const [x1, y1] = project(line.fromLon, line.fromLat);
      const [x2, y2] = project(line.toLon, line.toLat);

      ctx.save();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2.5 / (fitScale * zoom);
      ctx.setLineDash([5 / (fitScale * zoom), 4 / (fitScale * zoom)]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();

    // 3. Markers & Labels (rendered in crisp screen-space)
    const hasPulse = markers.some((m) => m.hasPulseRing);
    const pulseT = hasPulse ? (pulseRef.current % 120) / 120 : 0;
    const pulseRadius = 12 + pulseT * 20;
    const pulseAlpha = Math.max(0, 0.85 * (1 - pulseT));

    for (const m of markers) {
      const [mx, my] = project(m.lon, m.lat);
      const sx = (mx * fitScale + baseOffsetX) * zoom + pan.x;
      const sy = (my * fitScale + baseOffsetY) * zoom + pan.y;

      // Cull markers outside viewport bounds
      if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) {
        continue;
      }

      // Pulsing Halo Ring on active/answer pin
      if (m.hasPulseRing) {
        ctx.beginPath();
        ctx.arc(sx, sy, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224, 122, 63, ${pulseAlpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Marker Drop Shadow
      ctx.beginPath();
      ctx.arc(sx + 1.2, sy + 1.8, m.isSelected ? 9 : 6.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fill();

      // Outer White Ring
      ctx.beginPath();
      ctx.arc(sx, sy, m.isSelected ? 8.5 : 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Core Color Dot
      ctx.beginPath();
      ctx.arc(sx, sy, m.isSelected ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.fill();

      // Marker Label (shown if selected, or if zoomed in >= 2.2x, or if showAllLabels is enabled)
      const shouldShowLabel = m.isSelected || showAllLabels || zoom >= 2.2;
      if (shouldShowLabel && m.label) {
        ctx.font = `${m.isSelected ? 'bold 11px' : '500 10px'} "Plus Jakarta Sans", system-ui, sans-serif`;
        const textWidth = ctx.measureText(m.label).width;
        const padX = 5;
        const pillH = 16;
        const pillW = textWidth + padX * 2;
        const pillX = sx - pillW / 2;
        const pillY = sy - 22;

        // Label Background Pill
        ctx.fillStyle = m.isSelected ? '#1F3A4D' : 'rgba(255, 255, 255, 0.94)';
        ctx.strokeStyle = m.isSelected ? '#E07A3F' : 'rgba(31, 58, 77, 0.2)';
        ctx.lineWidth = m.isSelected ? 1.5 : 1;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 4);
        ctx.fill();
        ctx.stroke();

        // Label Text
        ctx.fillStyle = m.isSelected ? '#FFFFFF' : '#1F3A4D';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(m.label, sx, pillY + pillH / 2 + 0.5);
      }
    }
  }, [states, markers, highlightStates, line, zoom, pan, dimensions, showAllLabels]);

  // Animation frame loop for pulsing rings
  useEffect(() => {
    let animId: number;
    const animate = () => {
      pulseRef.current += 1;
      draw();
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [draw]);

  // Click & Drag Handlers for Mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    dragDistanceRef.current += Math.hypot(dx, dy);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    if (dragDistanceRef.current < 6 && containerRef.current) {
      handleTap(e.clientX, e.clientY);
    }
  };

  // Touch Handlers for Mobile / Tablet / Touchscreen
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragDistanceRef.current = 0;
      pinchDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchDistanceRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - lastPosRef.current.x;
      const dy = e.touches[0].clientY - lastPosRef.current.y;
      dragDistanceRef.current += Math.hypot(dx, dy);
      lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (e.touches.length === 2 && pinchDistanceRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = dist / pinchDistanceRef.current;
      pinchDistanceRef.current = dist;
      setZoom((z) => Math.min(16, Math.max(0.9, z * factor)));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (dragDistanceRef.current < 8 && lastPosRef.current) {
      handleTap(lastPosRef.current.x, lastPosRef.current.y);
    }
    isDraggingRef.current = false;
    pinchDistanceRef.current = null;
  };

  // Unified Tap / Click Hit Testing
  const handleTap = (clientXPos: number, clientYPos: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = clientXPos - rect.left;
    const clientY = clientYPos - rect.top;

    const { width, height } = dimensions;
    const projW = 27.0;
    const projH = 31.0;
    const minX = 0.5;
    const minY = 0.5;
    const fitScale = Math.min(width / projW, height / projH) * 0.94;
    const baseOffsetX = (width - projW * fitScale) / 2 - minX * fitScale;
    const baseOffsetY = (height - projH * fitScale) / 2 - minY * fitScale;

    // Check marker collision within 28px
    let hitMarker: WebMapMarker | null = null;
    let minDist = 28;

    for (const m of markers) {
      const [mx, my] = project(m.lon, m.lat);
      const sx = (mx * fitScale + baseOffsetX) * zoom + pan.x;
      const sy = (my * fitScale + baseOffsetY) * zoom + pan.y;
      const d = Math.hypot(clientX - sx, clientY - sy);
      if (d < minDist) {
        minDist = d;
        hitMarker = m;
      }
    }

    if (hitMarker && onMarkerTap) {
      onMarkerTap(hitMarker);
    } else if (onMapTap) {
      // Inverse projection to exact Lat / Lon
      const worldX = (clientX - pan.x) / zoom - baseOffsetX;
      const projX = worldX / fitScale;
      const worldY = (clientY - pan.y) / zoom - baseOffsetY;
      const projY = worldY / fitScale;
      const [lon, lat] = unproject(projX, projY);
      onMapTap(lat, lon);
    }
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = Math.min(16, Math.max(0.9, zoom * factor));
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const worldX = (cursorX - pan.x) / zoom;
      const worldY = (cursorY - pan.y) / zoom;

      setPan({
        x: cursorX - worldX * newZoom,
        y: cursorY - worldY * newZoom
      });
    }
    setZoom(newZoom);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] overflow-hidden select-none touch-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      />

      {/* Floating Map Navigation Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setZoom((z) => Math.min(16, z * 1.35))}
          className="w-10 h-10 rounded-full bg-[#FFFDF9] shadow-md border border-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] hover:bg-white active:scale-95 transition-transform"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.9, z / 1.35))}
          className="w-10 h-10 rounded-full bg-[#FFFDF9] shadow-md border border-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] hover:bg-white active:scale-95 transition-transform"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setZoom(1.0);
            setPan({ x: 0, y: 0 });
          }}
          className="w-10 h-10 rounded-full bg-[#FFFDF9] shadow-md border border-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] hover:bg-white active:scale-95 transition-transform"
          title="Reset to Full India View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
