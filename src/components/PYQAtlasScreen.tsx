import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  MapPin,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Share2,
  Play,
  Lightbulb,
  Layers,
  PenTool
} from 'lucide-react';
import { UPSC_PYQ_DATABASE, getPyqsByTheme, getPyqsByYear } from '../data/upscPyqDatabase';
import { UPSCPYQuestion, PYQTheme, ExamSimulationResult, Topic, Place } from '../types';
import { OMRSheetModal } from './OMRSheetModal';
import { MainsDiagramPracticePad } from './MainsDiagramPracticePad';

interface PYQAtlasScreenProps {
  onBack: () => void;
  onSelectTopicPlace?: (topic: Topic, place: Place) => void;
  allTopics?: Topic[];
  onEarnXpBonus?: (amount?: number) => void;
}

const THEME_OPTIONS: { id: PYQTheme; label: string; icon: string }[] = [
  { id: 'ALL', label: 'All 15 Years (2011–2025)', icon: '📚' },
  { id: 'RIVERS_DRAINAGE', label: 'Rivers & Graben Drainage', icon: '🌊' },
  { id: 'PROTECTED_AREAS', label: 'National Parks & Biospheres', icon: '🌿' },
  { id: 'MINERALS_ENERGY', label: 'Minerals, Coal & Energy', icon: '⛏️' },
  { id: 'MOUNTAINS_PASSES', label: 'Mountain Passes & Peaks', icon: '🏔️' },
  { id: 'PORTS_INFRA', label: 'Ports & Corridors', icon: '⚓' },
  { id: 'PLACES_IN_NEWS', label: 'Global Conflict Zones', icon: '🌍' },
  { id: 'PHYSICAL_GEOLOGY', label: 'Geomorphology & Structure', icon: '🌋' }
];

const AVAILABLE_YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

export const PYQAtlasScreen: React.FC<PYQAtlasScreenProps> = ({
  onBack,
  onSelectTopicPlace,
  allTopics = [],
  onEarnXpBonus
}) => {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'SOLVED_ATLAS' | 'EXAM_SIMULATOR' | 'MAINS_DIAGRAMS'>('SOLVED_ATLAS');

  // Solved Atlas Filters
  const [selectedTheme, setSelectedTheme] = useState<PYQTheme>('ALL');
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Exam Simulator States
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<UPSCPYQuestion[]>([]);
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1200); // 20 mins for 10 Qs
  const [showOMRModal, setShowOMRModal] = useState<boolean>(false);
  const [showMainsPad, setShowMainsPad] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamSimulationResult | null>(null);

  // Load bookmarks safely from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('upsc_pyq_bookmarks');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBookmarkedIds(new Set(parsed));
      }
    } catch {}
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('upsc_pyq_bookmarks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filtered Questions for Solved Atlas
  const filteredAtlasQuestions = useMemo(() => {
    return UPSC_PYQ_DATABASE.filter((q) => {
      const matchTheme = selectedTheme === 'ALL' || q.theme === selectedTheme;
      const matchYear = selectedYear === 'ALL' || q.year === selectedYear;
      const qText = `${q.questionText} ${q.statements?.join(' ') || ''} ${q.detailedExplanation} ${q.associatedCoordinates.map((c) => c.placeName).join(' ')}`.toLowerCase();
      const matchSearch = !searchQuery.trim() || qText.includes(searchQuery.toLowerCase());
      return matchTheme && matchYear && matchSearch;
    });
  }, [selectedTheme, selectedYear, searchQuery]);

  // Start Exam Simulation
  const handleStartExam = (count: number = 10) => {
    // Shuffle and pick
    const shuffled = [...UPSC_PYQ_DATABASE].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count);
    setExamQuestions(picked);
    setExamCurrentIndex(0);
    setExamAnswers({});
    setFlaggedQuestions(new Set());
    setTimeRemainingSeconds(count * 120); // 2 mins per question
    setExamResult(null);
    setIsExamActive(true);
  };

  // Timer effect for Exam
  useEffect(() => {
    if (!isExamActive || examResult || timeRemainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamActive, examResult, timeRemainingSeconds]);

  // Submit Exam & Calculate UPSC Score
  const handleSubmitExam = () => {
    const totalQuestions = examQuestions.length;
    let correct = 0;
    let incorrect = 0;
    const themeMap: Record<string, { total: number; correct: number; incorrect: number }> = {};

    examQuestions.forEach((q) => {
      const userChoice = examAnswers[q.id];
      const themeKey = q.themeLabel;
      if (!themeMap[themeKey]) themeMap[themeKey] = { total: 0, correct: 0, incorrect: 0 };
      themeMap[themeKey].total++;

      if (userChoice) {
        if (userChoice === q.correctOption) {
          correct++;
          themeMap[themeKey].correct++;
        } else {
          incorrect++;
          themeMap[themeKey].incorrect++;
        }
      }
    });

    const unattempted = totalQuestions - (correct + incorrect);
    const grossMarks = correct * 2.0;
    const negativePenalty = Number((incorrect * 0.666).toFixed(2));
    const netScore = Number(Math.max(0, grossMarks - negativePenalty).toFixed(2));
    const maxScore = totalQuestions * 2.0;
    const accuracyRate = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;
    const estimatedPercentile = Math.min(99.5, Math.max(25, Math.round((netScore / maxScore) * 100 * 0.95 + 10)));

    const result: ExamSimulationResult = {
      totalQuestions,
      attempted: correct + incorrect,
      correct,
      incorrect,
      unattempted,
      grossMarks,
      negativePenalty,
      netScore,
      maxScore,
      accuracyRate,
      estimatedPercentile,
      themeBreakdown: themeMap,
      timeSpentSeconds: (totalQuestions * 120) - timeRemainingSeconds
    };

    setExamResult(result);
    if (onEarnXpBonus) {
      onEarnXpBonus(correct * 10 + 25);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] text-[#1F3A4D] font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#1F3A4D]/15 px-3 sm:px-6 py-3 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] transition active:scale-95"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏛️</span>
              <h1 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A4D] leading-tight">
                UPSC 15-Year PYQ Geospatial Atlas
              </h1>
              <span className="hidden sm:inline text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                2011–2025 Solved
              </span>
            </div>
            <p className="text-[11px] text-[#1F3A4D]/65 font-medium hidden xs:block">
              Civil Services Prelims & Mains Geography Database with OMR & Coordinate Mapping
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-[#1F3A4D]/10 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab('SOLVED_ATLAS');
                setIsExamActive(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'SOLVED_ATLAS' && !isExamActive
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'text-[#1F3A4D]/70 hover:text-[#1F3A4D]'
              }`}
            >
              📖 Solved Atlas
            </button>

            <button
              onClick={() => {
                setActiveTab('EXAM_SIMULATOR');
                if (!isExamActive && !examResult) handleStartExam(10);
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'EXAM_SIMULATOR' || isExamActive
                  ? 'bg-[#E07A3F] text-white shadow-xs'
                  : 'text-[#1F3A4D]/70 hover:text-[#1F3A4D]'
              }`}
            >
              ⏱️ Prelims Test
            </button>

            <button
              onClick={() => setShowMainsPad(true)}
              className="px-2.5 py-1.5 rounded-lg text-[#1F3A4D]/80 hover:text-[#1F3A4D] transition flex items-center gap-1"
              title="Open GS1 Mains Map Drawing Practice Pad"
            >
              <PenTool className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden sm:inline">Mains Pad</span>
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 1. SOLVED ATLAS MODE (EXPLORER) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'SOLVED_ATLAS' && !isExamActive && (
        <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 space-y-4">
          {/* Quick Stats Banner */}
          <div className="p-4 sm:p-5 rounded-[24px] bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] border border-[#1F3A4D]/15 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#E07A3F] block">
                Official UPSC Geography Questions
              </span>
              <h2 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D]">
                15 Years of Solved Map & Conceptual PYQs
              </h2>
              <p className="text-xs text-[#1F3A4D]/75 mt-0.5 leading-relaxed">
                Study every geography question asked by UPSC from 2011 through 2025, complete with official answer keys, statement traps, and geographic coordinate pins.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('EXAM_SIMULATOR');
                handleStartExam(10);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Timed OMR Simulator</span>
            </button>
          </div>

          {/* Search & Thematic Filter Strip */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#1F3A4D]/10 p-3 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#1F3A4D]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g. Teesta, Monazite, Jharia, Indus, Namdapha)..."
                  className="w-full bg-[#FAF7F0] border border-[#1F3A4D]/10 rounded-xl pl-9 pr-4 py-2 text-xs text-[#1F3A4D] focus:outline-none focus:border-[#E07A3F]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1F3A4D]/50 hover:text-[#1F3A4D]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Year Dropdown */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                className="bg-[#FAF7F0] border border-[#1F3A4D]/10 rounded-xl px-3 py-2 text-xs font-bold text-[#1F3A4D] focus:outline-none focus:border-[#E07A3F] w-full sm:w-auto"
              >
                <option value="ALL">All Years (2011–2025)</option>
                {AVAILABLE_YEARS.map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>

            {/* Theme Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedTheme === theme.id
                      ? 'bg-[#1F3A4D] text-white shadow-xs'
                      : 'bg-[#FAF7F0] text-[#1F3A4D]/70 hover:bg-black/5 hover:text-[#1F3A4D]'
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span>{theme.label.split('&')[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count Header */}
          <div className="flex items-center justify-between text-xs font-bold text-[#1F3A4D]/70 px-1">
            <span>Showing {filteredAtlasQuestions.length} UPSC Prelims Questions</span>
            {bookmarkedIds.size > 0 && (
              <span className="text-amber-800">
                ⭐ {bookmarkedIds.size} Bookmarked
              </span>
            )}
          </div>

          {/* Question Cards List */}
          <div className="space-y-4">
            {filteredAtlasQuestions.map((q, idx) => {
              const isRevealed = revealedAnswers.has(q.id);
              const isBookmarked = bookmarkedIds.has(q.id);

              return (
                <article
                  key={q.id}
                  className="bg-[#FFFDF9] rounded-[24px] border border-[#1F3A4D]/15 shadow-sm p-4 sm:p-6 text-[#1F3A4D] space-y-4 hover:border-[#1F3A4D]/30 transition"
                >
                  {/* Question Meta Header */}
                  <div className="flex items-center justify-between border-b border-[#1F3A4D]/10 pb-3 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-[#1F3A4D] text-white">
                        UPSC {q.year}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                        {q.themeLabel}
                      </span>
                      <span className="text-[10px] font-medium text-[#1F3A4D]/60 hidden xs:inline">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`p-1.5 rounded-xl border transition ${
                          isBookmarked
                            ? 'bg-amber-100 border-amber-400 text-amber-800'
                            : 'bg-white border-[#1F3A4D]/15 text-[#1F3A4D]/60 hover:text-[#1F3A4D]'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-2">
                    <p className="font-serif font-bold text-sm sm:text-base leading-relaxed text-[#1F3A4D]">
                      {q.questionText}
                    </p>

                    {/* Numbered Statements */}
                    {q.statements && q.statements.length > 0 && (
                      <div className="space-y-1.5 pl-3 border-l-2 border-[#1F3A4D]/15 my-2">
                        {q.statements.map((stmt, sIdx) => (
                          <p key={sIdx} className="text-xs sm:text-sm text-[#1F3A4D]/85 leading-relaxed font-sans">
                            {stmt}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt) => {
                        const isCorrectOpt = isRevealed && opt.key === q.correctOption;
                        return (
                          <div
                            key={opt.key}
                            className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border transition ${
                              isCorrectOpt
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-2xs'
                                : 'bg-white border-[#1F3A4D]/10 text-[#1F3A4D]/80'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] ${
                              isCorrectOpt ? 'bg-emerald-600 text-white' : 'bg-[#1F3A4D]/10 text-[#1F3A4D]'
                            }`}>
                              {opt.key}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Associated Geographic Coordinates */}
                  {q.associatedCoordinates.length > 0 && (
                    <div className="pt-2 border-t border-[#1F3A4D]/10 flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-[#1F3A4D]/60 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E07A3F]" />
                        <span>Mapped Landmarks:</span>
                      </span>
                      {q.associatedCoordinates.map((coord, cIdx) => (
                        <div
                          key={cIdx}
                          className="text-[11px] font-semibold bg-[#1F3A4D]/5 text-[#1F3A4D] px-2.5 py-1 rounded-lg border border-[#1F3A4D]/10 flex items-center gap-1.5"
                        >
                          <span>{coord.placeName}</span>
                          <span className="text-[10px] text-[#1F3A4D]/60">({coord.state})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Toggle Explanation Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleRevealAnswer(q.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                        isRevealed
                          ? 'bg-[#1F3A4D] text-white'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isRevealed ? 'Hide Official Solution' : 'Reveal Official Key & Elimination Trick'}</span>
                    </button>
                  </div>

                  {/* Detailed Official Key & Elimination Trick Accordion */}
                  {isRevealed && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-[#1F3A4D] space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold text-xs">
                          Official Answer: Option {q.correctOption}
                        </span>
                        <span className="text-[11px] font-medium text-[#1F3A4D]/80">
                          {q.officialKeyNote}
                        </span>
                      </div>

                      {/* Elimination Technique */}
                      <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
                          🎯 Topper Elimination Technique
                        </span>
                        <p className="leading-relaxed text-[#1F3A4D]/90">
                          {q.eliminationTechnique}
                        </p>
                      </div>

                      {/* Detailed Syllabus Explanation */}
                      <div className="space-y-1 text-[#1F3A4D]/85 leading-relaxed">
                        <span className="font-bold block text-[#1F3A4D]">
                          Comprehensive Explanation:
                        </span>
                        <p>{q.detailedExplanation}</p>
                      </div>

                      {/* Prelims Trap Warning */}
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">UPSC Examiner Trap Alert:</span>
                          <span className="text-[11px]">{q.prelimsTrapAlert}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </main>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. TIMED PRELIMS EXAM SIMULATOR MODE */}
      {/* ------------------------------------------------------------- */}
      {(activeTab === 'EXAM_SIMULATOR' || isExamActive) && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6 space-y-4">
          {!examResult ? (
            /* Active Exam Screen */
            <div className="bg-[#FFFDF9] rounded-[28px] border border-[#1F3A4D]/15 shadow-md p-4 sm:p-6 space-y-5">
              {/* Exam Top Bar with Clock and OMR Trigger */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1F3A4D]/10 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#1F3A4D] text-white">
                    Question {examCurrentIndex + 1} of {examQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-[#1F3A4D]/70">
                    UPSC {examQuestions[examCurrentIndex]?.year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Countdown Timer */}
                  <div className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${
                    timeRemainingSeconds <= 120
                      ? 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse'
                      : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-[#E07A3F]" />
                    <span>
                      {Math.floor(timeRemainingSeconds / 60)}:
                      {String(timeRemainingSeconds % 60).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Open OMR Button */}
                  <button
                    onClick={() => setShowOMRModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 flex items-center gap-1.5 transition"
                  >
                    <span>📝 OMR Sheet</span>
                    <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-mono">
                      {Object.keys(examAnswers).length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Current Question Body */}
              {examQuestions[examCurrentIndex] && (
                <div className="space-y-4">
                  <p className="font-serif font-bold text-base sm:text-lg text-[#1F3A4D] leading-relaxed">
                    {examQuestions[examCurrentIndex].questionText}
                  </p>

                  {/* Statements */}
                  {examQuestions[examCurrentIndex].statements && (
                    <div className="space-y-1.5 pl-3 border-l-2 border-[#1F3A4D]/20 my-3">
                      {examQuestions[examCurrentIndex].statements?.map((stmt, sIdx) => (
                        <p key={sIdx} className="text-xs sm:text-sm text-[#1F3A4D]/85 leading-relaxed">
                          {stmt}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Options (Selectable) */}
                  <div className="space-y-2 pt-2">
                    {examQuestions[examCurrentIndex].options.map((opt) => {
                      const isChosen = examAnswers[examQuestions[examCurrentIndex].id] === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => {
                            setExamAnswers((prev) => ({
                              ...prev,
                              [examQuestions[examCurrentIndex].id]: opt.key
                            }));
                          }}
                          className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm flex items-center gap-3 border transition active:scale-[0.99] ${
                            isChosen
                              ? 'bg-[#1F3A4D] text-white border-[#1F3A4D] shadow-sm font-semibold'
                              : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15 hover:border-[#E07A3F]'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                            isChosen ? 'bg-amber-500 text-white' : 'bg-black/5 text-[#1F3A4D]'
                          }`}>
                            {opt.key}
                          </span>
                          <span className="flex-1 leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Action Ribbon */}
              <div className="pt-4 border-t border-[#1F3A4D]/10 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (examCurrentIndex > 0) setExamCurrentIndex((prev) => prev - 1);
                    }}
                    disabled={examCurrentIndex === 0}
                    className="p-2.5 rounded-xl border border-[#1F3A4D]/15 text-[#1F3A4D] disabled:opacity-30 hover:bg-black/5 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const curId = examQuestions[examCurrentIndex].id;
                      setFlaggedQuestions((prev) => {
                        const next = new Set(prev);
                        if (next.has(curId)) next.delete(curId);
                        else next.add(curId);
                        return next;
                      });
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                      flaggedQuestions.has(examQuestions[examCurrentIndex]?.id)
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-[#1F3A4D]/70 border-[#1F3A4D]/15'
                    }`}
                  >
                    <span>🚩</span>
                    <span className="hidden xs:inline">
                      {flaggedQuestions.has(examQuestions[examCurrentIndex]?.id) ? 'Flagged' : 'Flag for Review'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      if (examCurrentIndex < examQuestions.length - 1) {
                        setExamCurrentIndex((prev) => prev + 1);
                      }
                    }}
                    disabled={examCurrentIndex >= examQuestions.length - 1}
                    className="p-2.5 rounded-xl border border-[#1F3A4D]/15 text-[#1F3A4D] disabled:opacity-30 hover:bg-black/5 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleSubmitExam}
                  className="px-5 py-2.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Test ({Object.keys(examAnswers).length}/{examQuestions.length})</span>
                </button>
              </div>
            </div>
          ) : (
            /* Exam Scorecard & Diagnostics */
            <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#1F3A4D]/20 shadow-2xl p-5 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-1">
                <span className="text-4xl">🎖️</span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
                  Official UPSC Prelims Diagnostic Report
                </span>
                <h3 className="font-serif-title font-bold text-2xl text-[#1F3A4D]">
                  Test Simulation Results
                </h3>
              </div>

              {/* Net Score & Marks Highlight */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Net Score</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-700">
                    {examResult.netScore} / {examResult.maxScore}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-300">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">Accuracy Rate</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-blue-700">
                    {examResult.accuracyRate}%
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Negative Penalty</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-rose-600">
                    -{examResult.negativePenalty}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-300">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block">Est. Percentile</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-purple-700">
                    {examResult.estimatedPercentile}th
                  </span>
                </div>
              </div>

              {/* Thematic Diagnostic Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#1F3A4D]/10 space-y-2.5">
                <h4 className="font-serif-title font-bold text-sm text-[#1F3A4D]">
                  Thematic Performance Diagnostics
                </h4>
                <div className="space-y-2">
                  {Object.entries(examResult.themeBreakdown).map(([theme, data]) => {
                    const themePct = Math.round((data.correct / data.total) * 100);
                    return (
                      <div key={theme} className="bg-white p-3 rounded-xl border border-[#1F3A4D]/10 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#1F3A4D] block">{theme}</span>
                          <span className="text-[10px] text-[#1F3A4D]/60 font-mono">
                            Correct: {data.correct} · Wrong: {data.incorrect} · Total: {data.total}
                          </span>
                        </div>
                        <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                          themePct >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {themePct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    setExamResult(null);
                    setIsExamActive(false);
                    setActiveTab('SOLVED_ATLAS');
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#1F3A4D]/20 text-[#1F3A4D] font-bold text-xs hover:bg-black/5 transition"
                >
                  Review Questions in Atlas
                </button>

                <button
                  onClick={() => handleStartExam(10)}
                  className="px-6 py-2.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Another Simulation</span>
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Digital OMR Sheet Modal */}
      {showOMRModal && isExamActive && (
        <OMRSheetModal
          questions={examQuestions}
          userAnswers={examAnswers}
          flaggedQuestions={flaggedQuestions}
          currentIndex={examCurrentIndex}
          onSelectQuestion={(idx) => setExamCurrentIndex(idx)}
          onBubbleAnswer={(qid, opt) => {
            setExamAnswers((prev) => ({ ...prev, [qid]: opt }));
          }}
          onClose={() => setShowOMRModal(false)}
          onSubmitExam={handleSubmitExam}
        />
      )}

      {/* GS Paper 1 Mains Diagram Pad */}
      {showMainsPad && (
        <MainsDiagramPracticePad
          onClose={() => setShowMainsPad(false)}
          onEarnXpBonus={onEarnXpBonus}
        />
      )}
    </div>
  );
};
