import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  RotateCcw,
  Undo2,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  PenTool,
  Eraser,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { MAINS_DIAGRAM_TEMPLATES } from '../data/upscPyqDatabase';
import { MainsDiagramTemplate } from '../types';

interface MainsDiagramPracticePadProps {
  onClose: () => void;
  onEarnXpBonus?: (amount?: number) => void;
}

export const MainsDiagramPracticePad: React.FC<MainsDiagramPracticePadProps> = ({
  onClose,
  onEarnXpBonus
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<string>('#1E3A8A'); // Navy ink
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showStencil, setShowStencil] = useState<boolean>(true);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const currentTemplate: MainsDiagramTemplate =
    MAINS_DIAGRAM_TEMPLATES[selectedTemplateIndex] || MAINS_DIAGRAM_TEMPLATES[0];

  // Initialize and reset canvas
  useEffect(() => {
    setTimeLeft(currentTemplate.recommendedTimeSeconds);
    setIsTimerRunning(false);
    clearCanvas();
  }, [selectedTemplateIndex]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(-15), snap]);
    } catch {}
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const prev = newHistory[newHistory.length - 1];
    if (prev) {
      ctx.putImageData(prev, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHistory(newHistory);
  };

  // Drawing mouse handlers
  const startDrawing = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    setIsDrawing(true);
    if (!isTimerRunning && timeLeft > 0) {
      setIsTimerRunning(true);
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#FFFDF9' : activeColor;
    ctx.lineWidth = isEraser ? strokeWidth * 4 : strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (x: number, y: number) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.closePath();
    }
  };

  // Coordinates resolution helper
  const getCanvasCoords = (clientX: number, clientY: number): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
  };

  const handleCompletePractice = () => {
    if (onEarnXpBonus) {
      onEarnXpBonus(40);
    }
    alert(`🎉 Great practice! You earned +40 XP for practicing Mains Diagram: ${currentTemplate.title}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F3A4D]/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#1F3A4D]/25 shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden text-[#1F3A4D] animate-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#1F3A4D]/10 bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E07A3F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ✏️
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#E07A3F] block">
                UPSC Mains GS Paper 1 & 3 Diagram Practice
              </span>
              <h3 className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D]">
                {currentTemplate.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              timeLeft <= 15 ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse' : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15'
            }`}>
              <Clock className="w-3.5 h-3.5 text-[#E07A3F]" />
              <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] transition"
              title="Close Diagram Practice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Template Selector Carousel */}
        <div className="px-4 py-2 bg-[#FAF7F0] border-b border-[#1F3A4D]/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 flex-nowrap">
            {MAINS_DIAGRAM_TEMPLATES.map((tmpl, idx) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplateIndex(idx)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedTemplateIndex === idx
                    ? 'bg-[#1F3A4D] text-white shadow-xs'
                    : 'bg-white text-[#1F3A4D]/70 border border-[#1F3A4D]/10 hover:text-[#1F3A4D]'
                }`}
              >
                #{idx + 1} {tmpl.theme.split('&')[0].trim()}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full flex-shrink-0">
            {currentTemplate.difficulty}
          </span>
        </div>

        {/* Main Workspace (Canvas + Prompt Sidebar) */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Canvas Area */}
          <div className="flex-1 relative bg-[#FFFDF9] flex flex-col items-center justify-center p-2 select-none touch-none min-h-[320px]">
            {/* Guide Stencil (Faint Outline of India for Speed Sketching Practice) */}
            {showStencil && (
              <svg
                viewBox="0 0 1000 1140"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              >
                <path
                  d="M 380 60 Q 420 40 450 70 L 480 120 L 460 170 L 410 190 L 370 230 L 320 270 L 260 320 L 220 370 L 230 430 L 260 480 L 290 550 L 330 650 L 370 780 L 430 920 L 460 970 L 470 940 L 510 880 L 580 800 L 640 700 L 710 580 L 780 470 L 820 420 L 780 370 L 730 330 L 650 310 L 560 300 L 500 280 L 460 220 Z"
                  fill="none"
                  stroke="#1F3A4D"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                />
                {/* Reference point coordinates */}
                {currentTemplate.referencePoints.map((pt) => (
                  <g key={pt.name} transform={`translate(${pt.x}, ${pt.y})`}>
                    <circle r="6" fill="#E07A3F" opacity="0.6" />
                    <text
                      y="-10"
                      fontSize="14"
                      fill="#1F3A4D"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            )}

            {/* Model Diagram Answer Comparison Overlay */}
            {showModelAnswer && (
              <div className="absolute inset-2 bg-white/95 backdrop-blur-md rounded-2xl border border-amber-300 p-4 shadow-xl z-20 overflow-y-auto animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏆</span>
                    <h4 className="font-serif-title font-bold text-sm text-[#1F3A4D]">
                      Topper Model Answer Diagram Reference
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowModelAnswer(false)}
                    className="text-xs font-bold text-[#1F3A4D]/60 hover:text-[#1F3A4D]"
                  >
                    ✕ Close Model
                  </button>
                </div>
                <p className="text-xs text-[#1F3A4D]/85 leading-relaxed font-sans mb-3">
                  {currentTemplate.modelDiagramDescription}
                </p>
                <div className="space-y-1.5 text-xs text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="font-bold block mb-1">Mains GS1 Scoring Checklist:</span>
                  {currentTemplate.keyChecklistItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={1000}
              height={1140}
              className="w-full h-full block cursor-crosshair border border-[#1F3A4D]/10 rounded-2xl shadow-inner bg-transparent"
              onMouseDown={(e) => {
                const [x, y] = getCanvasCoords(e.clientX, e.clientY);
                startDrawing(x, y);
              }}
              onMouseMove={(e) => {
                const [x, y] = getCanvasCoords(e.clientX, e.clientY);
                draw(x, y);
              }}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const [x, y] = getCanvasCoords(touch.clientX, touch.clientY);
                startDrawing(x, y);
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                const [x, y] = getCanvasCoords(touch.clientX, touch.clientY);
                draw(x, y);
              }}
              onTouchEnd={stopDrawing}
            />

            {/* Drawing Tools Floating Ribbon */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl border border-[#1F3A4D]/20 shadow-xl px-3 py-2 flex items-center gap-2 z-10">
              {/* Color Swatches */}
              <div className="flex items-center gap-1.5 pr-2 border-r border-[#1F3A4D]/15">
                {[
                  { color: '#1E3A8A', label: 'Ink Blue' },
                  { color: '#DC2626', label: 'Mineral Red' },
                  { color: '#0284C7', label: 'River Cyan' },
                  { color: '#78350F', label: 'Graben Brown' },
                  { color: '#16A34A', label: 'Forest Green' }
                ].map((swatch) => (
                  <button
                    key={swatch.color}
                    onClick={() => {
                      setActiveColor(swatch.color);
                      setIsEraser(false);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      activeColor === swatch.color && !isEraser
                        ? 'border-white ring-2 ring-[#E07A3F] scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.label}
                  />
                ))}
              </div>

              {/* Stroke Width Toggle */}
              <div className="flex items-center gap-1 pr-2 border-r border-[#1F3A4D]/15">
                {[2, 4, 8].map((w) => (
                  <button
                    key={w}
                    onClick={() => setStrokeWidth(w)}
                    className={`w-6 h-6 rounded-lg font-mono text-[10px] font-bold flex items-center justify-center transition ${
                      strokeWidth === w && !isEraser
                        ? 'bg-[#1F3A4D] text-white'
                        : 'bg-black/5 text-[#1F3A4D]/70 hover:bg-black/10'
                    }`}
                    title={`${w}px stroke width`}
                  >
                    {w}p
                  </button>
                ))}
              </div>

              {/* Eraser Toggle */}
              <button
                onClick={() => setIsEraser((v) => !v)}
                className={`p-1.5 rounded-xl transition ${
                  isEraser ? 'bg-[#E07A3F] text-white shadow-xs' : 'bg-black/5 text-[#1F3A4D]/70 hover:bg-black/10'
                }`}
                title="Eraser tool"
              >
                <Eraser className="w-4 h-4" />
              </button>

              {/* Undo */}
              <button
                onClick={handleUndo}
                className="p-1.5 rounded-xl bg-black/5 hover:bg-black/10 text-[#1F3A4D]/70 transition"
                title="Undo last stroke"
              >
                <Undo2 className="w-4 h-4" />
              </button>

              {/* Clear Canvas */}
              <button
                onClick={clearCanvas}
                className="p-1.5 rounded-xl bg-black/5 hover:bg-rose-100 hover:text-rose-700 text-[#1F3A4D]/70 transition"
                title="Clear sketch pad"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Instructions & Checklist */}
          <div className="w-full md:w-80 bg-[#FAF7F0] border-t md:border-t-0 md:border-l border-[#1F3A4D]/10 p-4 flex flex-col justify-between overflow-y-auto max-h-[300px] md:max-h-none">
            <div className="space-y-3.5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
                  UPSC Question Prompt
                </span>
                <p className="text-xs font-serif text-[#1F3A4D] font-medium leading-relaxed mt-1">
                  "{currentTemplate.prompt}"
                </p>
              </div>

              {/* Checklist */}
              <div className="p-3 rounded-2xl bg-white border border-[#1F3A4D]/10 space-y-2">
                <span className="text-[11px] font-bold text-[#1F3A4D] block">
                  Examiner Checklist Items:
                </span>
                {currentTemplate.keyChecklistItems.map((item, idx) => (
                  <label key={idx} className="flex items-start gap-2 text-[11px] text-[#1F3A4D]/80 leading-snug cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded text-[#E07A3F] focus:ring-0" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStencil((v) => !v)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                    showStencil
                      ? 'bg-[#1F3A4D] text-white border-transparent'
                      : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{showStencil ? 'Hide Outline' : 'Show Outline'}</span>
                </button>

                <button
                  onClick={() => setShowModelAnswer((v) => !v)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                    showModelAnswer
                      ? 'bg-amber-600 text-white border-transparent'
                      : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Model Answer</span>
                </button>
              </div>
            </div>

            {/* Complete & Earn XP Button */}
            <button
              onClick={handleCompletePractice}
              className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish & Claim +40 XP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
