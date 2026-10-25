import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { StateBoundary } from '../types';
import { WebMapMarker, WebMapLine } from './IndiaMapCanvas';
import { Plus, Minus, Maximize2, Compass, MapPin } from 'lucide-react';
import {
  MAJOR_RIVERS,
  PHYSIOGRAPHIC_ZONES,
  INFRASTRUCTURE_OVERLAYS,
  COAL_BASINS,
  RiverFeature,
  PhysiographicZone,
  InfrastructureOverlay,
  CoalBasinFeature
} from '../data/mapOverlayData';

export interface MapLayerConfig {
  showRivers?: boolean; // Rivers and graben channels (Damodar, Godavari, Ganga, etc.)
  showCoalFields?: boolean; // Gondwana coal basins and Tertiary lignite deposits
  showPhysical: boolean; // Physical relief zones
  showPolitical: boolean; // State borders and jurisdictions
  showInfrastructure: boolean; // Freight corridors, pipelines, waterways
}

interface IndiaMapSvgProps {
  states: StateBoundary[];
  markers?: WebMapMarker[];
  highlightStates?: Set<string>;
  selectedStateName?: string | null;
  line?: WebMapLine | null;
  focus?: { lat: number; lon: number; zoom?: number } | null;
  resetKey?: number;
  showAllLabels?: boolean;
  layerConfig?: MapLayerConfig;
  className?: string;
  onStateClick?: (stateName: string) => void;
  onMarkerTap?: (marker: WebMapMarker) => void;
  onMapTap?: (lat: number, lon: number) => void;
}

const COS_22 = Math.cos((22 * Math.PI) / 180); // ~0.92718385
const REF_LON = 67.5;
const REF_LAT = 38.0;
const SVG_SCALE = 35.7142857;

export function projectSvg(lon: number, lat: number): [number, number] {
  return [
    (lon - REF_LON) * COS_22 * SVG_SCALE,
    (REF_LAT - lat) * SVG_SCALE
  ];
}

export function unprojectSvg(x: number, y: number): [number, number] {
  const projX = x / SVG_SCALE;
  const projY = y / SVG_SCALE;
  const lon = projX / COS_22 + REF_LON;
  const lat = REF_LAT - projY;
  return [lon, lat];
}

export const IndiaMapSvg: React.FC<IndiaMapSvgProps> = ({
  states,
  markers = [],
  highlightStates = new Set(),
  selectedStateName = null,
  line = null,
  focus = null,
  resetKey = 0,
  showAllLabels = false,
  layerConfig = { showPhysical: true, showPolitical: true, showInfrastructure: false },
  className = '',
  onStateClick,
  onMarkerTap,
  onMapTap
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Pan & Zoom in SVG coordinate space
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Hover state for physical / infrastructure overlays
  const [hoveredOverlay, setHoveredOverlay] = useState<{
    title: string;
    category: string;
    notes: string;
    x: number;
    y: number;
  } | null>(null);

  // Pre-generate SVG river paths
  const riverPaths = useMemo(() => {
    return MAJOR_RIVERS.map((r) => {
      const d = r.points
        .map((pt, i) => {
          const [x, y] = projectSvg(pt[0], pt[1]);
          return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ');
      const [lblX, lblY] = projectSvg(r.labelPos[0], r.labelPos[1]);
      return { ...r, d, lblX, lblY };
    });
  }, []);

  // Pre-generate SVG physiographic zone paths
  const zonePaths = useMemo(() => {
    return PHYSIOGRAPHIC_ZONES.map((z) => {
      const d =
        z.polygon
          .map((pt, i) => {
            const [x, y] = projectSvg(pt[0], pt[1]);
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
          })
          .join(' ') + ' Z';
      const [lblX, lblY] = projectSvg(z.labelPos[0], z.labelPos[1]);
      return { ...z, d, lblX, lblY };
    });
  }, []);

  // Pre-generate SVG infrastructure corridor paths
  const infraPaths = useMemo(() => {
    return INFRASTRUCTURE_OVERLAYS.map((inf) => {
      const d = inf.points
        .map((pt, i) => {
          const [x, y] = projectSvg(pt[0], pt[1]);
          return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ');
      const [lblX, lblY] = projectSvg(inf.labelPos[0], inf.labelPos[1]);
      const hubs = inf.keyHubs.map((h) => {
        const [hx, hy] = projectSvg(h.lon, h.lat);
        return { ...h, hx, hy };
      });
      return { ...inf, d, lblX, lblY, hubs };
    });
  }, []);

  // Pre-generate SVG coal basin polygon paths
  const coalBasinPaths = useMemo(() => {
    return COAL_BASINS.map((b) => {
      const d =
        b.polygon
          .map((pt, i) => {
            const [x, y] = projectSvg(pt[0], pt[1]);
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
          })
          .join(' ') + ' Z';
      const [lblX, lblY] = projectSvg(b.labelPos[0], b.labelPos[1]);
      return { ...b, d, lblX, lblY };
    });
  }, []);

  // Dragging & Gesture interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragDistRef = useRef<number>(0);
  const pinchDistRef = useRef<number | null>(null);
  const focusAnimRef = useRef<number | null>(null);

  // Pulse animation for selected pin
  const [pulseScale, setPulseScale] = useState(1);
  useEffect(() => {
    let animId: number;
    let t = 0;
    const animate = () => {
      t = (t + 0.03) % (Math.PI * 2);
      setPulseScale(1 + Math.sin(t) * 0.25);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Reset transforms when resetKey changes
  useEffect(() => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  }, [resetKey]);

  // Count how many topic places are inside each state
  const placesPerState = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of markers) {
      if (m.state) {
        counts[m.state] = (counts[m.state] || 0) + 1;
        // Also associate Ladakh with J&K polygon if needed
        if (m.state === 'Ladakh') {
          counts['Jammu & Kashmir'] = (counts['Jammu & Kashmir'] || 0) + 1;
        }
      }
    }
    return counts;
  }, [markers]);

  // Pre-generate SVG path strings for each state
  const statePathData = useMemo(() => {
    const paths: Record<string, string> = {};
    for (const state of states) {
      let d = '';
      for (const ring of state.rings) {
        if (ring.length < 3) continue;
        for (let i = 0; i < ring.length; i++) {
          const [lon, lat] = ring[i];
          const [x, y] = projectSvg(lon, lat);
          if (i === 0) {
            d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
          } else {
            d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
          }
        }
        d += 'Z ';
      }
      paths[state.name] = d.trim();
    }
    return paths;
  }, [states]);

  // Handle focus changes (smooth camera zoom & center)
  useEffect(() => {
    if (!focus) return;

    const [targetSvgX, targetSvgY] = projectSvg(focus.lon, focus.lat);
    const targetZoom = focus.zoom ? Math.min(8, Math.max(1.5, focus.zoom)) : 3.5;

    // In SVG viewBox 1000x1140, offset Y slightly up (480 instead of 570) to account for bottom cards
    const targetPanX = 500 - targetSvgX * targetZoom;
    const targetPanY = 480 - targetSvgY * targetZoom;

    const startZoom = zoom;
    const startPanX = pan.x;
    const startPanY = pan.y;
    const startTime = performance.now();
    const duration = 400; // ms

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
  }, [focus]);

  // Convert client mouse/touch position into SVG coordinates
  const clientToSvgCoords = useCallback(
    (clientX: number, clientY: number): [number, number] | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;

      // Fractional position inside client element
      const fx = (clientX - rect.left) / rect.width;
      const fy = (clientY - rect.top) / rect.height;

      // Base viewBox is 0 0 1000 1140
      const baseSvgX = fx * 1000;
      const baseSvgY = fy * 1140;

      // Invert pan and zoom transform
      const svgX = (baseSvgX - pan.x) / zoom;
      const svgY = (baseSvgY - pan.y) / zoom;

      return [svgX, svgY];
    },
    [pan, zoom]
  );

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return; // left click only
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragDistRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragDistRef.current += Math.hypot(dx, dy);
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      // Scale screen dx/dy to viewBox units (1000 / rect.width)
      const rect = svgRef.current?.getBoundingClientRect();
      const scaleX = rect && rect.width > 0 ? 1000 / rect.width : 1;
      const scaleY = rect && rect.height > 0 ? 1140 / rect.height : 1;

      setPan((prev) => ({
        x: prev.x + dx * scaleX,
        y: prev.y + dy * scaleY
      }));
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    const wasDrag = dragDistRef.current > 6;
    isDraggingRef.current = false;

    if (!wasDrag && onMapTap) {
      const coords = clientToSvgCoords(e.clientX, e.clientY);
      if (coords) {
        const [lon, lat] = unprojectSvg(coords[0], coords[1]);
        onMapTap(lat, lon);
      }
    }
  };

  // Touch handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragDistRef.current = 0;
      pinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      dragDistRef.current += Math.hypot(dx, dy);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const rect = svgRef.current?.getBoundingClientRect();
      const scaleX = rect && rect.width > 0 ? 1000 / rect.width : 1;
      const scaleY = rect && rect.height > 0 ? 1140 / rect.height : 1;

      setPan((prev) => ({
        x: prev.x + dx * scaleX,
        y: prev.y + dy * scaleY
      }));
    } else if (e.touches.length === 2 && pinchDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = dist / pinchDistRef.current;
      pinchDistRef.current = dist;
      const newZoom = Math.min(16, Math.max(0.5, zoom * factor));

      const svg = svgRef.current;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const midClientX = (t1.clientX + t2.clientX) / 2;
          const midClientY = (t1.clientY + t2.clientY) / 2;
          const fx = (midClientX - rect.left) / rect.width;
          const fy = (midClientY - rect.top) / rect.height;
          const baseSvgX = fx * 1000;
          const baseSvgY = fy * 1140;

          const cursorSvgX = (baseSvgX - pan.x) / zoom;
          const cursorSvgY = (baseSvgY - pan.y) / zoom;

          setPan({
            x: baseSvgX - cursorSvgX * newZoom,
            y: baseSvgY - cursorSvgY * newZoom
          });
        }
      }
      setZoom(newZoom);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>) => {
    isDraggingRef.current = false;
    pinchDistRef.current = null;
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(16, zoom * 1.4);
    const cx = 500;
    const cy = 570;
    const cursorSvgX = (cx - pan.x) / zoom;
    const cursorSvgY = (cy - pan.y) / zoom;
    setPan({
      x: cx - cursorSvgX * newZoom,
      y: cy - cursorSvgY * newZoom
    });
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(0.5, zoom / 1.4);
    const cx = 500;
    const cy = 570;
    const cursorSvgX = (cx - pan.x) / zoom;
    const cursorSvgY = (cy - pan.y) / zoom;
    setPan({
      x: cx - cursorSvgX * newZoom,
      y: cy - cursorSvgY * newZoom
    });
    setZoom(newZoom);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = Math.min(16, Math.max(0.5, zoom * factor));

    const svg = svgRef.current;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const fx = (e.clientX - rect.left) / rect.width;
        const fy = (e.clientY - rect.top) / rect.height;
        const baseSvgX = fx * 1000;
        const baseSvgY = fy * 1140;

        // Unproject point under cursor in SVG coordinates
        const cursorSvgX = (baseSvgX - pan.x) / zoom;
        const cursorSvgY = (baseSvgY - pan.y) / zoom;

        // Reposition pan so point under cursor stays fixed under mouse
        setPan({
          x: baseSvgX - cursorSvgX * newZoom,
          y: baseSvgY - cursorSvgY * newZoom
        });
      }
    }
    setZoom(newZoom);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[350px] overflow-hidden select-none bg-[#E6EFF4] ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1140"
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <defs>
          {/* Subtle drop shadow under landmass */}
          <filter id="landShadow" x="-5%" y="-5%" width="115%" height="115%">
            <feDropShadow dx="3" dy="4" stdDeviation="5" floodColor="#1B3545" floodOpacity="0.12" />
          </filter>

          {/* Active selection glow for clicked state */}
          <filter id="selectionGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E07A3F" floodOpacity="0.6" />
          </filter>

          {/* Sea gradient */}
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6EFF4" />
            <stop offset="100%" stopColor="#D2E3ED" />
          </linearGradient>
        </defs>

        {/* Sea Background */}
        <rect width="1000" height="1140" fill="url(#seaGrad)" />

        {/* Scaled & Panned Group */}
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* 1. Indian State Boundaries (SVG Vector Outlines) */}
          <g filter="url(#landShadow)">
            {states.map((state) => {
              const pathD = statePathData[state.name];
              if (!pathD) return null;

              const isExplicitlySelected =
                selectedStateName === state.name ||
                (selectedStateName === 'Ladakh' && state.name === 'Jammu & Kashmir');

              const isHighlighted =
                highlightStates.has(state.name) ||
                (highlightStates.has('Ladakh') && state.name === 'Jammu & Kashmir');

              const isHovered = hoveredState === state.name;
              const hasPlaces = (placesPerState[state.name] || 0) > 0;

              // Color resolution
              let fill = '#FAF8F3';
              let stroke = layerConfig.showPolitical ? '#CFBEA7' : 'transparent';
              let strokeWidth = 0.8 / zoom;

              if (isExplicitlySelected) {
                fill = '#FDE68A'; // Warm radiant amber
                stroke = '#E07A3F';
                strokeWidth = 2.4 / zoom;
              } else if (isHighlighted) {
                fill = '#FFE7B8'; // Warm peach highlight
                stroke = '#E07A3F';
                strokeWidth = 1.8 / zoom;
              } else if (isHovered) {
                fill = '#FFF8E7';
                stroke = '#1F3A4D';
                strokeWidth = 1.6 / zoom;
              } else if (hasPlaces) {
                fill = '#FCFAF5';
                stroke = layerConfig.showPolitical ? '#C2B39E' : 'transparent';
                strokeWidth = 0.9 / zoom;
              }

              return (
                <path
                  key={state.name}
                  d={pathD}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="transition-colors duration-150 cursor-pointer"
                  style={{
                    filter: isExplicitlySelected ? 'url(#selectionGlow)' : undefined
                  }}
                  onMouseEnter={() => setHoveredState(state.name)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dragDistRef.current < 6 && onStateClick) {
                      onStateClick(state.name);
                    }
                  }}
                >
                  <title>
                    {state.name}
                    {hasPlaces ? ` (${placesPerState[state.name]} places)` : ''}
                  </title>
                </path>
              );
            })}
          </g>

          {/* 2. Physical Relief Zones */}
          {layerConfig.showPhysical && (
            <g>
              {/* Physiographic zones */}
              {zonePaths.map((zone) => (
                <g key={zone.id}>
                  <path
                    d={zone.d}
                    fill={zone.fillColor}
                    stroke={zone.strokeColor}
                    strokeWidth={1.5 / zoom}
                    strokeDasharray={`${6 / zoom},${4 / zoom}`}
                    onMouseEnter={(e) => {
                      const rect = containerRef.current?.getBoundingClientRect();
                      if (rect) {
                        setHoveredOverlay({
                          title: zone.name,
                          category: `Physiography: ${zone.type}`,
                          notes: zone.notes,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredOverlay(null)}
                    className="cursor-pointer"
                  />
                  {zoom >= 1.3 && (
                    <text
                      x={zone.lblX}
                      y={zone.lblY}
                      fill={zone.strokeColor}
                      fontSize={`${11 / zoom}px`}
                      fontWeight="bold"
                      textAnchor="middle"
                      opacity={0.85}
                      fontFamily="serif"
                      pointerEvents="none"
                    >
                      {zone.name}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )}

          {/* 3. Gondwana Coal Basins & Tertiary Lignite Overlays */}
          {(layerConfig.showCoalFields ?? true) && (
            <g>
              {coalBasinPaths.map((basin) => (
                <g key={basin.id}>
                  <path
                    d={basin.d}
                    fill={basin.color}
                    stroke={basin.strokeColor}
                    strokeWidth={2 / zoom}
                    strokeDasharray="4,2"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onMouseEnter={(e) => {
                      const rect = containerRef.current?.getBoundingClientRect();
                      if (rect) {
                        setHoveredOverlay({
                          title: basin.name,
                          category: `Coal/Lignite Basin: ${basin.type}`,
                          notes: basin.notes,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredOverlay(null)}
                  />
                  {zoom >= 1.2 && (
                    <g transform={`translate(${basin.lblX}, ${basin.lblY})`}>
                      <rect
                        x={-(basin.name.length * 3.2 + 4) / zoom}
                        y={-8 / zoom}
                        width={(basin.name.length * 6.4 + 8) / zoom}
                        height={16 / zoom}
                        rx={3 / zoom}
                        fill="rgba(255, 253, 249, 0.92)"
                        stroke={basin.strokeColor}
                        strokeWidth={1 / zoom}
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={basin.strokeColor}
                        fontSize={`${8.5 / zoom}px`}
                        fontWeight="bold"
                      >
                        ⚡ {basin.name.split('(')[0].trim()}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </g>
          )}

          {/* 4. Major Rivers & Graben Channels */}
          {(layerConfig.showRivers ?? true) && (
            <g>
              {riverPaths.map((river) => {
                const isDamodar = river.id === 'damodar';
                return (
                  <g key={river.id}>
                    {/* Glowing highlight for Damodar coal river */}
                    {isDamodar && (
                      <path
                        d={river.d}
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth={7 / zoom}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={0.6}
                      />
                    )}
                    <path
                      d={river.d}
                      fill="none"
                      stroke={river.color}
                      strokeWidth={(isDamodar ? 4 : river.strokeWidth) / zoom}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onMouseEnter={(e) => {
                        const rect = containerRef.current?.getBoundingClientRect();
                        if (rect) {
                          setHoveredOverlay({
                            title: river.name,
                            category: `River Basin: ${river.category}`,
                            notes: river.upscSignificance,
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredOverlay(null)}
                    />
                    {/* River Label */}
                    {(zoom >= 1.4 || isDamodar) && (
                      <g transform={`translate(${river.lblX}, ${river.lblY})`}>
                        <rect
                          x={-(river.name.length * 3.4 + 4) / zoom}
                          y={-8 / zoom}
                          width={(river.name.length * 6.8 + 8) / zoom}
                          height={16 / zoom}
                          rx={3 / zoom}
                          fill="rgba(255, 255, 255, 0.9)"
                          stroke="#0284C7"
                          strokeWidth={0.8 / zoom}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#0369A1"
                          fontSize={`${9 / zoom}px`}
                          fontWeight="bold"
                          fontStyle="italic"
                        >
                          🌊 {river.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* 3. Major Infrastructure Overlays (DFC, Gas Grid, Waterways) */}
          {layerConfig.showInfrastructure && (
            <g>
              {infraPaths.map((inf) => (
                <g key={inf.id}>
                  <path
                    d={inf.d}
                    fill="none"
                    stroke={inf.color}
                    strokeWidth={(inf.strokeWidth || 3) / zoom}
                    strokeDasharray={
                      inf.strokeDash
                        ? inf.strokeDash
                            .split(',')
                            .map((v) => Number(v) / zoom)
                            .join(',')
                        : undefined
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onMouseEnter={(e) => {
                      const rect = containerRef.current?.getBoundingClientRect();
                      if (rect) {
                        setHoveredOverlay({
                          title: inf.name,
                          category: `Infrastructure: ${inf.type}`,
                          notes: inf.upscSignificance,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredOverlay(null)}
                  />
                  {/* Hub nodes */}
                  {inf.hubs.map((hub) => (
                    <g key={hub.name} transform={`translate(${hub.hx}, ${hub.hy})`}>
                      <circle r={4 / zoom} fill="#FFFFFF" stroke={inf.color} strokeWidth={2 / zoom} />
                      {zoom >= 1.8 && (
                        <text
                          y={-6 / zoom}
                          fontSize={`${8 / zoom}px`}
                          fill={inf.color}
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {hub.name}
                        </text>
                      )}
                    </g>
                  ))}
                  {/* Corridor Label */}
                  {zoom >= 1.4 && (
                    <g transform={`translate(${inf.lblX}, ${inf.lblY})`}>
                      <rect
                        x={-(inf.name.length * 3.5 + 4) / zoom}
                        y={-8 / zoom}
                        width={(inf.name.length * 7 + 8) / zoom}
                        height={16 / zoom}
                        rx={3 / zoom}
                        fill="rgba(31, 58, 77, 0.9)"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#FFFFFF"
                        fontSize={`${8.5 / zoom}px`}
                        fontWeight="bold"
                      >
                        {inf.name}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </g>
          )}

          {/* 4. Optional Measurement Line (e.g. for quiz tap distance) */}
          {line && (
            <line
              x1={projectSvg(line.fromLon, line.fromLat)[0]}
              y1={projectSvg(line.fromLon, line.fromLat)[1]}
              x2={projectSvg(line.toLon, line.toLat)[0]}
              y2={projectSvg(line.toLon, line.toLat)[1]}
              stroke={line.color}
              strokeWidth={2.5 / zoom}
              strokeDasharray={`${5 / zoom},${4 / zoom}`}
            />
          )}

          {/* 5. Interactive Topic Place Markers (SVG Pins & Badges) */}
          <g>
            {markers.map((m) => {
              const [sx, sy] = projectSvg(m.lon, m.lat);
              const isSelected = !!m.isSelected;
              const shouldShowLabel = true;

              return (
                <g
                  key={m.id}
                  transform={`translate(${sx}, ${sy})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dragDistRef.current < 12 && onMarkerTap) {
                      onMarkerTap(m);
                    }
                  }}
                >
                  {/* Invisible enlarged hit target circle for effortless tapping on mobile & desktop */}
                  <circle
                    r={Math.max(16, 26 / zoom)}
                    fill="transparent"
                    pointerEvents="all"
                    className="cursor-pointer"
                  />

                  {/* Pulsing halo ring on active pin */}
                  {m.hasPulseRing && (
                    <circle
                      r={14 * pulseScale}
                      fill="none"
                      stroke="#E07A3F"
                      strokeWidth={2.5 / zoom}
                      opacity={0.8 - (pulseScale - 1) * 2}
                    />
                  )}

                  {/* Marker drop shadow */}
                  <circle
                    cx={1.2 / zoom}
                    cy={1.8 / zoom}
                    r={(isSelected ? 9 : 6.5) / zoom}
                    fill="rgba(0,0,0,0.22)"
                  />

                  {/* White outer border */}
                  <circle
                    r={(isSelected ? 8.5 : 6) / zoom}
                    fill="#FFFFFF"
                  />

                  {/* Colored center core */}
                  <circle
                    r={(isSelected ? 6 : 4) / zoom}
                    fill={m.color}
                  />

                  {/* Text label with backdrop pill */}
                  {shouldShowLabel && m.label && (
                    <g transform={`translate(0, ${-(isSelected ? 22 : 18) / zoom})`}>
                      <rect
                        x={-(m.label.length * 3.8 + 6) / zoom}
                        y={-9 / zoom}
                        width={(m.label.length * 7.6 + 12) / zoom}
                        height={18 / zoom}
                        rx={4 / zoom}
                        fill={isSelected ? '#1F3A4D' : 'rgba(255, 255, 255, 0.95)'}
                        stroke={isSelected ? '#E07A3F' : 'rgba(31, 58, 77, 0.2)'}
                        strokeWidth={1 / zoom}
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isSelected ? '#FFFFFF' : '#1F3A4D'}
                        fontSize={`${10 / zoom}px`}
                        fontWeight={isSelected ? 'bold' : '600'}
                        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                      >
                        {m.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Hover State Tooltip Pill */}
      {hoveredState && tooltipPos && !isDraggingRef.current && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 bg-[#1F3A4D] text-white px-3 py-1.5 rounded-xl shadow-lg border border-white/10 text-xs font-semibold whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="flex items-center gap-1.5">
            <span>🏛️ {hoveredState}</span>
            {(placesPerState[hoveredState] || 0) > 0 && (
              <span className="bg-[#E07A3F] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {placesPerState[hoveredState]} places
              </span>
            )}
          </div>
          <span className="text-[10px] text-white/70 block mt-0.5">Click to explore & quiz</span>
        </div>
      )}

      {/* Physical & Infrastructure Hover Tooltip */}
      {hoveredOverlay && !hoveredState && !isDraggingRef.current && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 bg-[#FFFDF9]/95 backdrop-blur-md text-[#1F3A4D] px-3.5 py-2 rounded-2xl shadow-xl border border-[#1F3A4D]/20 text-xs max-w-xs animate-in fade-in zoom-in-95 duration-100"
          style={{ left: hoveredOverlay.x, top: hoveredOverlay.y }}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-serif-title font-bold text-xs text-[#1F3A4D]">
              {hoveredOverlay.title}
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#0284C7]/15 text-[#0284C7]">
              {hoveredOverlay.category}
            </span>
          </div>
          <p className="text-[11px] text-[#1F3A4D]/80 leading-snug">
            {hoveredOverlay.notes}
          </p>
        </div>
      )}

      {/* Floating State Mode Prompt */}
      <div className="absolute top-3 left-3 bg-[#FFFDF9]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#1F3A4D]/15 shadow-sm text-xs font-bold text-[#1F3A4D] flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
        <span>SVG Vector Map · Tap any State boundary or Pin</span>
      </div>

      {/* Floating Zoom & Reset Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-full bg-[#FFFDF9] shadow-md border border-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] hover:bg-white active:scale-95 transition-transform"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
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
