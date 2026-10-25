import React, { useState, useMemo, useEffect } from 'react';
import { QuizQuestion, QuizResultItem, StateBoundary } from '../types';
import { IndiaMapCanvas, WebMapLine, WebMapMarker } from './IndiaMapCanvas';
import { haversineDistanceKm, maskPlaceNameInText } from '../utils/quizEngine';
import { playHintSound } from '../utils/soundEffects';
import {
  X,
  Flame,
  Check,
  ArrowRight,
  MapPin,
  Compass,
  Eye,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface QuizScreenProps {
  questions: QuizQuestion[];
  currentIndex: number;
  streak: number;
  results: QuizResultItem[];
  states: StateBoundary[];
  onClose: () => void;
  onAnswerSubmit: (
    userOptionIndex: number,
    userTapLat: number | null,
    userTapLon: number | null,
    isCorrect: boolean,
    distanceKm: number | null,
    hintsUsed?: number,
    hintPenalty?: number
  ) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentIndex,
  streak,
  results,
  states,
  onClose,
  onAnswerSubmit
}) => {
  const q = questions[currentIndex];

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Map Tap specific state
  const [userTapLat, setUserTapLat] = useState<number | null>(null);
  const [userTapLon, setUserTapLon] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [isTapCorrect, setIsTapCorrect] = useState<boolean>(false);
  const [showExplanationMap, setShowExplanationMap] = useState<boolean>(false);

  // Hint State
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setUserTapLat(null);
    setUserTapLon(null);
    setDistanceKm(null);
    setIsTapCorrect(false);
    setShowExplanationMap(false);
    setHintsRevealed(0);
  }, [currentIndex]);

  // Context-aware hints for the current question
  const { hint1Text, hint2Text } = useMemo(() => {
    let h1 = '';
    let h2 = '';

    if (q.targetPlace) {
      const p = q.targetPlace;
      if (q.type === 'STATE_MCQ') {
        h1 = `Geographical Coordinates: Located around ~${p.lat.toFixed(1)}°N, ~${p.lon.toFixed(1)}°E. Category: "${p.category}". Look for peninsular/coastal or Himalayan alignment.`;
      } else {
        h1 = `Spatial Context: Situated in the State of ${p.state}, classified under category "${p.category}".`;
      }
      const maskedFact = maskPlaceNameInText(p.fact, p.name);
      h2 = `UPSC Distinction: "${maskedFact}"`;
    } else if (q.handwrittenQuestion) {
      h1 = `Topic Syllabus: Key topic from ${q.topicTitle}. Focus on standard NCERT & Prelims geography fundamentals.`;
      h2 = `Core Concept: ${q.handwrittenQuestion.explanation.slice(0, 140)}...`;
    } else {
      h1 = `Focus on ${q.topicTitle}: Consider regional distribution patterns across India.`;
      h2 = `Clue Insight: ${q.explanation.slice(0, 130)}...`;
    }

    return { hint1Text: h1, hint2Text: h2 };
  }, [q]);

  const handleRevealHint = () => {
    if (hintsRevealed >= 2 || isAnswered) return;
    playHintSound();
    setHintsRevealed((prev) => prev + 1);
  };

  const correctCount = results.filter((r) => r.isCorrect).length;
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  const typeBadgeLabel = {
    TAP_MAP: '📍 MAP TAP LOCATION',
    IDENTIFY: '🔍 IDENTIFY MARKER',
    STATE_MCQ: '🏛️ STATE / UT JURISDICTION',
    CATEGORY: '🏷️ CLASSIFICATION',
    CLUE: '💡 EXAM FACT CLUE',
    FACT: '📜 UPSC PRELIMS FACT'
  }[q.type];

  // Map markers for TAP_MAP, IDENTIFY, or post-answer review
  const mapMarkers: WebMapMarker[] = [];
  let mapLine: WebMapLine | null = null;

  if (q.type === 'IDENTIFY' && q.targetPlace) {
    mapMarkers.push({
      id: q.targetPlace.name,
      lat: q.targetPlace.lat,
      lon: q.targetPlace.lon,
      label: isAnswered ? q.targetPlace.name : '?',
      color: '#E07A3F',
      isSelected: true,
      hasPulseRing: true
    });
  }

  if (q.type === 'TAP_MAP' && isAnswered && q.targetPlace) {
    // True target location
    mapMarkers.push({
      id: 'target',
      lat: q.targetPlace.lat,
      lon: q.targetPlace.lon,
      label: q.targetPlace.name,
      color: '#2E7D32',
      isSelected: true,
      hasPulseRing: true
    });

    if (userTapLat !== null && userTapLon !== null) {
      mapMarkers.push({
        id: 'tap',
        lat: userTapLat,
        lon: userTapLon,
        label: `Your tap (${Math.round(distanceKm || 0)} km)`,
        color: isTapCorrect ? '#2E7D32' : '#C62828',
        isSelected: false
      });

      mapLine = {
        fromLat: q.targetPlace.lat,
        fromLon: q.targetPlace.lon,
        toLat: userTapLat,
        toLon: userTapLon,
        color: isTapCorrect ? '#2E7D32' : '#C62828'
      };
    }
  }

  // If viewing review map for MCQ
  if (isAnswered && showExplanationMap && q.targetPlace) {
    mapMarkers.push({
      id: q.targetPlace.name,
      lat: q.targetPlace.lat,
      lon: q.targetPlace.lon,
      label: q.targetPlace.name,
      color: '#E07A3F',
      isSelected: true,
      hasPulseRing: true
    });
  }

  const highlightStates =
    isAnswered && q.targetPlace?.state ? new Set([q.targetPlace.state]) : new Set<string>();

  const handleMapTap = (lat: number, lon: number) => {
    if (q.type === 'TAP_MAP' && !isAnswered && q.targetPlace) {
      const dist = haversineDistanceKm(q.targetPlace.lat, q.targetPlace.lon, lat, lon);
      setUserTapLat(lat);
      setUserTapLon(lon);
      setDistanceKm(dist);
      setIsTapCorrect(dist <= 150.0);
      setIsAnswered(true);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    const isCorrect =
      q.type === 'TAP_MAP' ? isTapCorrect : selectedOptionIndex === q.correctOptionIndex;
    const penalty = hintsRevealed * 5;
    onAnswerSubmit(
      selectedOptionIndex ?? -1,
      userTapLat,
      userTapLon,
      isCorrect,
      distanceKm,
      hintsRevealed,
      penalty
    );
  };

  const optionLetters = ['A', 'B', 'C', 'D'];
  const shouldShowMapByDefault = q.type === 'TAP_MAP' || q.type === 'IDENTIFY';

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex flex-col max-w-2xl mx-auto pb-12">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-[#1F3A4D]/10 bg-[#FFFDF9]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D] transition"
            title="Quit Quiz"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="font-semibold text-xs text-[#1F3A4D]">
            Question {currentIndex + 1} of {questions.length}
          </span>

          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <div className="flex items-center gap-1 bg-[#E07A3F]/15 text-[#E07A3F] font-bold text-xs px-2.5 py-0.5 rounded-full animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-[#E07A3F]" />
                <span>{streak} Streak</span>
              </div>
            )}
            <span className="text-xs font-bold text-[#1F3A4D] bg-[#1F3A4D]/10 px-2.5 py-0.5 rounded-full">
              {correctCount} pts
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#1F3A4D]/10 rounded-full overflow-hidden mt-2.5">
          <div
            className="h-full bg-[#E07A3F] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="px-4 py-4 flex-1 flex flex-col gap-4">
        {/* Question Prompt Card */}
        <div className="bg-[#FFFDF9] rounded-[22px] p-5 border border-[#1F3A4D]/10 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#E07A3F] bg-[#E07A3F]/10 px-2.5 py-0.5 rounded-md inline-block">
              {typeBadgeLabel}
            </span>

            {/* Hint Trigger Button */}
            {!isAnswered && (
              <button
                onClick={handleRevealHint}
                disabled={hintsRevealed >= 2}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition active:scale-95 shadow-xs ${
                  hintsRevealed === 0
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                    : hintsRevealed === 1
                    ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400'
                    : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                }`}
                title="Reveal context-aware UPSC prelims clue (-5 XP penalty)"
              >
                <Lightbulb className="w-3 h-3 text-amber-600" />
                <span>
                  {hintsRevealed === 0
                    ? '💡 UPSC Clue Hint (-5 XP)'
                    : hintsRevealed === 1
                    ? '💡 Deeper Clue (-5 XP)'
                    : 'All Clues Revealed'}
                </span>
              </button>
            )}
          </div>

          <h2 className="font-serif-title font-bold text-lg text-[#1F3A4D] leading-snug">
            {q.prompt}
          </h2>

          {q.type === 'CLUE' && q.clueText && (
            <div className="mt-3 p-3.5 rounded-xl bg-[#1F3A4D]/5 border border-[#1F3A4D]/10 text-xs sm:text-sm font-serif italic text-[#1F3A4D] leading-relaxed">
              "{q.clueText}"
            </div>
          )}

          {/* Context-aware Hint Drawer */}
          {hintsRevealed > 0 && (
            <div className="mt-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 p-3.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>UPSC Syllabus Clue Dossier ({hintsRevealed}/2)</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  -{hintsRevealed * 5} XP Penalty
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-amber-950">
                <div className="p-2 rounded-xl bg-white/80 border border-amber-200/70 leading-relaxed font-sans">
                  <strong className="text-amber-900">🧭 Clue 1: </strong>
                  {hint1Text}
                </div>

                {hintsRevealed >= 2 && (
                  <div className="p-2 rounded-xl bg-white/80 border border-amber-200/70 leading-relaxed font-sans animate-in fade-in duration-200">
                    <strong className="text-amber-900">📜 Clue 2: </strong>
                    {hint2Text}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Map Display for Map Questions or post-answer review */}
        {(shouldShowMapByDefault || (isAnswered && showExplanationMap)) && (
          <div className="rounded-[22px] overflow-hidden border border-[#1F3A4D]/15 shadow-sm bg-[#E6EFF4] h-[340px] relative">
            <IndiaMapCanvas
              states={states}
              markers={mapMarkers}
              highlightStates={highlightStates}
              line={mapLine}
              onMapTap={handleMapTap}
            />

            {q.type === 'TAP_MAP' && !isAnswered && (
              <div className="absolute top-3 left-3 right-3 bg-[#FFFDF9]/95 backdrop-blur-md rounded-xl p-2.5 px-3 text-xs text-[#1F3A4D] font-semibold flex items-center gap-2 shadow-md pointer-events-none border border-[#1F3A4D]/10">
                <Compass className="w-4 h-4 text-[#E07A3F] animate-spin" />
                <span>Tap the location of the place on India's map (scoring within 150 km)</span>
              </div>
            )}
          </div>
        )}

        {/* MCQ Options List */}
        {q.type !== 'TAP_MAP' && q.options && (
          <div className="flex flex-col gap-2.5">
            {q.options.map((option, idx) => {
              const letter = optionLetters[idx] || `${idx + 1}`;
              const isCorrect = idx === q.correctOptionIndex;
              const isSelected = idx === selectedOptionIndex;

              let cardStyle =
                'bg-[#FFFDF9] border-[#1F3A4D]/10 text-[#1F3A4D] hover:border-[#1F3A4D]/30';
              let badgeStyle = 'bg-[#1F3A4D]/10 text-[#1F3A4D]';

              if (isAnswered) {
                if (isCorrect) {
                  cardStyle = 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32] shadow-sm font-bold';
                  badgeStyle = 'bg-[#2E7D32] text-white';
                } else if (isSelected) {
                  cardStyle = 'bg-[#FFEBEE] border-[#C62828] text-[#C62828] font-bold';
                  badgeStyle = 'bg-[#C62828] text-white';
                } else {
                  cardStyle = 'bg-[#FFFDF9]/60 border-transparent text-[#1F3A4D]/40';
                  badgeStyle = 'bg-[#1F3A4D]/5 text-[#1F3A4D]/40';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all active:scale-[0.99] ${cardStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${badgeStyle}`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-tight flex-1">
                    {option}
                  </span>
                  {isAnswered && isCorrect && <Check className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && (
                    <X className="w-4 h-4 text-[#C62828] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Answer Feedback Card */}
        {isAnswered && (
          <div className="bg-[#FFFDF9] rounded-[22px] p-5 border border-[#1F3A4D]/15 shadow-md animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between mb-2.5">
              {(q.type === 'TAP_MAP' ? isTapCorrect : selectedOptionIndex === q.correctOptionIndex) ? (
                <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct Hit! +10 XP</span>
                  {distanceKm !== null && ` (${Math.round(distanceKm)} km away)`}
                </span>
              ) : (
                <span className="text-xs font-bold text-[#C62828] bg-[#FFEBEE] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Review Scheduled</span>
                  {distanceKm !== null && ` (${Math.round(distanceKm)} km away)`}
                </span>
              )}

              {/* Toggle map view for MCQ to visually learn */}
              {!shouldShowMapByDefault && q.targetPlace && (
                <button
                  onClick={() => setShowExplanationMap((v) => !v)}
                  className="text-xs font-semibold text-[#1F3A4D] hover:text-[#E07A3F] flex items-center gap-1 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showExplanationMap ? 'Hide Map' : 'View on Map'}</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#1F3A4D]/90 leading-relaxed font-serif">
              {q.explanation}
            </p>

            {hintsRevealed > 0 && (
              <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{hintsRevealed} hint(s) consulted for this question</span>
                </span>
                <span className="font-mono font-bold text-amber-800">-{hintsRevealed * 5} XP</span>
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-4 w-full h-11 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>{currentIndex + 1 >= questions.length ? 'View Final Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
