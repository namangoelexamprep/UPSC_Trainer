import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Plus,
  Flame,
  CheckCircle2,
  History,
  Target,
  BarChart2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import {
  playFocusStartChime,
  playFocusCompleteChime,
  playFocusTick
} from '../utils/soundEffects';
import { DailyFocusStats, DeepWorkSessionRecord, Topic } from '../types';

interface DeepWorkFocusTimerProps {
  topics?: Topic[];
  onEarnXpBonus?: (amount?: number) => void;
  onOpenTopicMap?: (topic: Topic) => void;
  className?: string;
}

type TimerPreset = 'POMODORO_25' | 'PRELIMS_45' | 'MAINS_60' | 'CUSTOM' | 'OPEN';

const PRESET_DURATIONS: Record<TimerPreset, number> = {
  POMODORO_25: 25 * 60,
  PRELIMS_45: 45 * 60,
  MAINS_60: 60 * 60,
  CUSTOM: 30 * 60,
  OPEN: 0 // Stopwatch mode
};

const DEFAULT_MODULES = [
  'General Map Revision',
  'Rivers & Drainage Basins',
  'Coal, Lignite & Minerals',
  'National Parks & Biospheres',
  'Mountain Ranges & Passes',
  'Ramsar Wetlands & Lakes',
  'Himalayan Geomorphology',
  '15-Yr Prelims PYQ Drilling',
  'Mains GS1 Map Diagrams'
];

export const DeepWorkFocusTimer: React.FC<DeepWorkFocusTimerProps> = ({
  topics = [],
  onEarnXpBonus,
  onOpenTopicMap,
  className = ''
}) => {
  // Timer Configuration State
  const [preset, setPreset] = useState<TimerPreset>('POMODORO_25');
  const [totalSeconds, setTotalSeconds] = useState<number>(PRESET_DURATIONS.POMODORO_25);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(PRESET_DURATIONS.POMODORO_25);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [ambientTick, setAmbientTick] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string>('General Map Revision');
  const [targetMinutes, setTargetMinutes] = useState<number>(120); // Default 2 hours daily target

  // Today's Date String in YYYY-MM-DD
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Today's Stats from LocalStorage
  const [todayStats, setTodayStats] = useState<DailyFocusStats>(() => {
    try {
      const saved = localStorage.getItem('upsc_deep_work_today');
      if (saved) {
        const parsed: DailyFocusStats = JSON.parse(saved);
        if (parsed.date === todayStr) {
          return parsed;
        }
      }
    } catch {}
    return {
      date: todayStr,
      totalMinutes: 0,
      targetMinutes: 120,
      sessionsCompleted: 0,
      modulesStudied: {}
    };
  });

  // Recent Sessions
  const [recentSessions, setRecentSessions] = useState<DeepWorkSessionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('upsc_deep_work_sessions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // 7-Day History for Streak Chart
  const [weeklyHistory, setWeeklyHistory] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('upsc_deep_work_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Timer Interval Ref
  const intervalRef = useRef<number | null>(null);

  // Sync today's stats to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('upsc_deep_work_today', JSON.stringify(todayStats));
      
      // Update weekly history dictionary
      setWeeklyHistory((prev) => {
        const updated = { ...prev, [todayStats.date]: todayStats.totalMinutes };
        localStorage.setItem('upsc_deep_work_history', JSON.stringify(updated));
        return updated;
      });
    } catch {}
  }, [todayStats]);

  // Save session records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('upsc_deep_work_sessions', JSON.stringify(recentSessions.slice(0, 30)));
    } catch {}
  }, [recentSessions]);

  // Timer Tick Engine
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        if (preset === 'OPEN') {
          // Stopwatch mode: counts up
          setStopwatchSeconds((prev) => {
            const next = prev + 1;
            if (ambientTick && next % 1 === 0) playFocusTick();
            return next;
          });
        } else {
          // Countdown mode
          setRemainingSeconds((prev) => {
            if (ambientTick && prev % 2 === 0) playFocusTick();

            if (prev <= 1) {
              // Session finished!
              clearInterval(intervalRef.current!);
              setIsRunning(false);
              setIsCompleted(true);
              handleSessionComplete(Math.round(totalSeconds / 60));
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, preset, totalSeconds, ambientTick]);

  // Handle Session Completion
  const handleSessionComplete = (minutesStudied: number) => {
    playFocusCompleteChime();

    // Haptic vibration feedback on mobile devices
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200, 100, 400]);
      } catch {}
    }

    const duration = Math.max(1, minutesStudied);
    
    // 1. Record session
    const newSession: DeepWorkSessionRecord = {
      id: 'sess-' + Date.now(),
      date: todayStr,
      durationMinutes: duration,
      moduleName: selectedModule,
      completedAt: Date.now(),
      mode: preset
    };
    setRecentSessions((prev) => [newSession, ...prev]);

    // 2. Update today's stats
    setTodayStats((prev) => {
      const updatedModules = { ...prev.modulesStudied };
      updatedModules[selectedModule] = (updatedModules[selectedModule] || 0) + duration;

      return {
        ...prev,
        totalMinutes: prev.totalMinutes + duration,
        sessionsCompleted: prev.sessionsCompleted + 1,
        modulesStudied: updatedModules
      };
    });

    // 3. Award XP reward proportional to deep focus duration (1 XP per minute, min 25 XP)
    if (onEarnXpBonus) {
      const xpEarned = Math.max(25, Math.min(100, duration * 1.2));
      onEarnXpBonus(Math.round(xpEarned));
    }
  };

  // Start / Pause Toggle
  const togglePlayPause = () => {
    if (!isRunning) {
      playFocusStartChime();
      setIsCompleted(false);
    }
    setIsRunning(!isRunning);
  };

  // Reset Timer
  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    if (preset === 'OPEN') {
      setStopwatchSeconds(0);
    } else {
      setRemainingSeconds(totalSeconds);
    }
  };

  // Stop open stopwatch session and record progress
  const handleFinishStopwatch = () => {
    if (stopwatchSeconds < 60) {
      setIsRunning(false);
      setStopwatchSeconds(0);
      return;
    }
    setIsRunning(false);
    const minutes = Math.round(stopwatchSeconds / 60);
    handleSessionComplete(minutes);
    setStopwatchSeconds(0);
  };

  // Preset Selector
  const selectPreset = (newPreset: TimerPreset) => {
    setPreset(newPreset);
    setIsRunning(false);
    setIsCompleted(false);
    const secs = PRESET_DURATIONS[newPreset];
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    setStopwatchSeconds(0);
  };

  // Add 5 Minutes quick boost
  const handleAddFiveMinutes = () => {
    setRemainingSeconds((prev) => prev + 300);
    setTotalSeconds((prev) => prev + 300);
  };

  // Format MM:SS or HH:MM:SS
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Progress Percentage for Circular Indicator
  const progressPercent = useMemo(() => {
    if (preset === 'OPEN') return 100;
    if (totalSeconds === 0) return 0;
    return Math.min(100, Math.max(0, ((totalSeconds - remainingSeconds) / totalSeconds) * 100));
  }, [preset, totalSeconds, remainingSeconds]);

  // Daily target progress percentage
  const dailyProgressPercent = useMemo(() => {
    const target = todayStats.targetMinutes || 120;
    return Math.min(100, Math.round((todayStats.totalMinutes / target) * 100));
  }, [todayStats]);

  // Last 7 days breakdown for consistency chart
  const last7Days = useMemo(() => {
    const days: { dateStr: string; label: string; minutes: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({
        dateStr: ds,
        label: i === 0 ? 'Today' : weekday,
        minutes: weeklyHistory[ds] || (ds === todayStr ? todayStats.totalMinutes : 0)
      });
    }
    return days;
  }, [weeklyHistory, todayStr, todayStats.totalMinutes]);

  // SVG Circle Dimensions
  const radius = 64;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      className={`bg-white/95 rounded-[24px] border border-[#1F3A4D]/15 shadow-md overflow-hidden transition-all ${className}`}
    >
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#1F3A4D] via-[#2A4C63] to-[#1F3A4D] px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-sm shadow-xs">
            ⏳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-title font-bold text-sm tracking-tight">
                Deep Work Map Focus Timer
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                UPSC Prep Hours
              </span>
            </div>
            <p className="text-[11px] text-white/70">
              Today: <strong className="text-amber-300">{Math.floor(todayStats.totalMinutes / 60)}h {todayStats.totalMinutes % 60}m</strong> / {todayStats.targetMinutes}m target ({dailyProgressPercent}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Ambient Ticking Sound Toggle */}
          <button
            type="button"
            onClick={() => setAmbientTick(!ambientTick)}
            title={ambientTick ? 'Mute focus ticking' : 'Enable gentle rhythmic clock tick'}
            className={`p-1.5 rounded-lg border transition ${
              ambientTick
                ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                : 'bg-white/10 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {ambientTick ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* History modal toggle */}
          <button
            type="button"
            onClick={() => setShowHistoryModal(!showHistoryModal)}
            title="View 7-Day Study Log"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition"
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>

          {/* Minimize / Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Daily Progress Bar (Always Visible) */}
      <div className="w-full bg-[#1F3A4D]/10 h-1.5">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-[#E07A3F] transition-all duration-500 ease-out"
          style={{ width: `${dailyProgressPercent}%` }}
        />
      </div>

      {/* Compact Mini Bar (when collapsed) */}
      {!isExpanded ? (
        <div className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayPause}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-sm transition active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-[#1F3A4D] text-white hover:bg-[#2A4C63]'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <span className="font-mono font-bold text-lg text-[#1F3A4D]">
                {preset === 'OPEN' ? formatTime(stopwatchSeconds) : formatTime(remainingSeconds)}
              </span>
              <span className="text-[11px] text-[#1F3A4D]/70 block truncate max-w-[180px] sm:max-w-xs">
                {selectedModule}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#1F3A4D]/80 hidden sm:inline">
              {todayStats.sessionsCompleted} session{todayStats.sessionsCompleted !== 1 ? 's' : ''} done
            </span>
            <button
              onClick={() => setIsExpanded(true)}
              className="text-xs font-bold text-[#E07A3F] px-2.5 py-1 rounded-lg hover:bg-amber-50"
            >
              Expand Controls
            </button>
          </div>
        </div>
      ) : (
        /* Full Expanded Focus Suite */
        <div className="p-4 sm:p-5">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
            <button
              type="button"
              onClick={() => selectPreset('POMODORO_25')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 flex items-center gap-1.5 ${
                preset === 'POMODORO_25'
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'bg-[#1F3A4D]/5 text-[#1F3A4D]/75 hover:bg-[#1F3A4D]/10'
              }`}
            >
              <span>🍅 25m Pomodoro</span>
            </button>

            <button
              type="button"
              onClick={() => selectPreset('PRELIMS_45')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 flex items-center gap-1.5 ${
                preset === 'PRELIMS_45'
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'bg-[#1F3A4D]/5 text-[#1F3A4D]/75 hover:bg-[#1F3A4D]/10'
              }`}
            >
              <span>🎯 45m Prelims Block</span>
            </button>

            <button
              type="button"
              onClick={() => selectPreset('MAINS_60')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 flex items-center gap-1.5 ${
                preset === 'MAINS_60'
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'bg-[#1F3A4D]/5 text-[#1F3A4D]/75 hover:bg-[#1F3A4D]/10'
              }`}
            >
              <span>📐 60m Mains Sprint</span>
            </button>

            <button
              type="button"
              onClick={() => selectPreset('OPEN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 flex items-center gap-1.5 ${
                preset === 'OPEN'
                  ? 'bg-[#E07A3F] text-white shadow-xs'
                  : 'bg-[#1F3A4D]/5 text-[#1F3A4D]/75 hover:bg-[#1F3A4D]/10'
              }`}
            >
              <span>⏱️ Open Stopwatch</span>
            </button>
          </div>

          {/* Module Selector & Daily Goal Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 text-xs">
            {/* Active Revision Topic */}
            <div>
              <label className="block text-[11px] font-bold text-[#1F3A4D]/70 uppercase tracking-wider mb-1">
                Active Map Module:
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full bg-[#F7F2EA] border border-[#1F3A4D]/20 rounded-xl px-3 py-2 text-xs font-semibold text-[#1F3A4D] focus:outline-none focus:ring-2 focus:ring-[#1F3A4D]/30"
              >
                {DEFAULT_MODULES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
                {topics.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.emoji} {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Daily Target Goal */}
            <div>
              <label className="block text-[11px] font-bold text-[#1F3A4D]/70 uppercase tracking-wider mb-1">
                Daily Revision Target:
              </label>
              <div className="flex items-center gap-1">
                {[60, 90, 120, 180].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setTargetMinutes(mins);
                      setTodayStats((prev) => ({ ...prev, targetMinutes: mins }));
                    }}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition ${
                      todayStats.targetMinutes === mins
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-[#F7F2EA] text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10'
                    }`}
                  >
                    {mins / 60}h
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Central Timer & Radial Progress Display */}
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            {/* Radial Circular Meter */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#E8E2D5"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Active Progress Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={isRunning ? '#E07A3F' : '#1F3A4D'}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-linear"
                />
              </svg>

              {/* Time Inside Ring */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono font-bold text-3xl sm:text-4xl text-[#1F3A4D] tracking-tight">
                  {preset === 'OPEN' ? formatTime(stopwatchSeconds) : formatTime(remainingSeconds)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F3A4D]/60 mt-0.5">
                  {isRunning ? 'Focused' : isCompleted ? 'Completed 🎉' : 'Paused'}
                </span>
                {isRunning && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mt-1" />
                )}
              </div>
            </div>

            {/* Action Buttons & Quick Controls */}
            <div className="flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2.5">
                {/* Main Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className={`px-6 py-3.5 rounded-2xl font-black text-sm tracking-wide shadow-md transition active:scale-95 flex items-center justify-center gap-2 ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                      : 'bg-[#1F3A4D] hover:bg-[#2A4C63] text-white shadow-[#1F3A4D]/20'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Focus</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>{remainingSeconds < totalSeconds ? 'Resume' : 'Start Focus'}</span>
                    </>
                  )}
                </button>

                {/* Reset Button */}
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Timer"
                  className="p-3.5 rounded-2xl bg-[#F7F2EA] hover:bg-[#1F3A4D]/10 text-[#1F3A4D] border border-[#1F3A4D]/10 transition active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* +5 Mins Quick Boost */}
                {preset !== 'OPEN' && (
                  <button
                    type="button"
                    onClick={handleAddFiveMinutes}
                    title="Add 5 Minutes"
                    className="px-3 py-3.5 rounded-2xl bg-[#F7F2EA] hover:bg-[#1F3A4D]/10 text-[#1F3A4D] font-bold text-xs border border-[#1F3A4D]/10 transition active:scale-95 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>5m</span>
                  </button>
                )}

                {/* Finish Stopwatch Button */}
                {preset === 'OPEN' && isRunning && (
                  <button
                    type="button"
                    onClick={handleFinishStopwatch}
                    className="px-4 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Log {Math.round(stopwatchSeconds / 60)}m</span>
                  </button>
                )}
              </div>

              {/* Status & Daily Prep Progress Indicator */}
              <div className="bg-[#FAF6F0] p-3 rounded-2xl border border-[#1F3A4D]/10 text-xs w-full max-w-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#1F3A4D]">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#E07A3F]" />
                    <span>Daily Map Goal:</span>
                  </span>
                  <strong className="font-bold">
                    {Math.round((todayStats.totalMinutes / (todayStats.targetMinutes || 120)) * 100)}%
                  </strong>
                </div>
                <div className="flex items-center justify-between text-[#1F3A4D]/70 text-[11px]">
                  <span>Sessions Completed:</span>
                  <span className="font-bold text-[#1F3A4D]">{todayStats.sessionsCompleted} sessions</span>
                </div>
                <div className="flex items-center justify-between text-[#1F3A4D]/70 text-[11px]">
                  <span>Deep Work Streak:</span>
                  <span className="font-bold text-amber-700 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                    <span>Active Today</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Syllabus Launch Hint */}
          <div className="mt-4 pt-3 border-t border-[#1F3A4D]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#1F3A4D]/70">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Complete sessions earn <strong>+25 to +50 XP</strong> for your All-India Cadet Rank!</span>
            </span>

            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className="text-[#E07A3F] font-bold hover:underline flex items-center gap-1"
            >
              <span>View Past 7 Days History</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 7-Day Consistency History Drawer / Modal */}
      {showHistoryModal && (
        <div className="border-t border-[#1F3A4D]/15 bg-[#FAF6F0] p-4 sm:p-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-serif-title font-bold text-sm text-[#1F3A4D] flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#1F3A4D]" />
              <span>7-Day Map Revision Consistency</span>
            </h4>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="text-xs font-bold text-[#1F3A4D]/60 hover:text-[#1F3A4D]"
            >
              ✕ Close
            </button>
          </div>

          {/* 7-Day Bar Chart */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
            {last7Days.map((day) => {
              const maxMinutes = Math.max(120, ...last7Days.map((d) => d.minutes));
              const heightPercent = Math.min(100, Math.round((day.minutes / maxMinutes) * 100));

              return (
                <div key={day.dateStr} className="flex flex-col items-center">
                  <div className="w-full bg-[#1F3A4D]/10 rounded-lg h-24 flex items-end p-1 justify-center">
                    <div
                      className={`w-full rounded-md transition-all duration-500 ${
                        day.minutes >= 60
                          ? 'bg-emerald-600'
                          : day.minutes > 0
                          ? 'bg-amber-500'
                          : 'bg-transparent'
                      }`}
                      style={{ height: `${Math.max(4, heightPercent)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#1F3A4D]/70 mt-1.5">{day.label}</span>
                  <span className="text-[10px] font-semibold text-[#1F3A4D]/50">{day.minutes}m</span>
                </div>
              );
            })}
          </div>

          {/* Today's Modules Breakdown */}
          {Object.keys(todayStats.modulesStudied).length > 0 && (
            <div className="bg-white/80 p-3 rounded-xl border border-[#1F3A4D]/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F3A4D]/70 block mb-2">
                Today's Module Distribution:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(todayStats.modulesStudied).map(([mod, mins]) => (
                  <span
                    key={mod}
                    className="bg-[#1F3A4D]/5 text-[#1F3A4D] px-2.5 py-1 rounded-lg text-xs font-semibold border border-[#1F3A4D]/10 flex items-center gap-1.5"
                  >
                    <span>{mod}:</span>
                    <strong className="text-amber-700">{mins}m</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
