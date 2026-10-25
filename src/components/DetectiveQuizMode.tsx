import React, { useState, useMemo, useEffect } from 'react';
import { Place, StateBoundary, Topic, SRSRecord } from '../types';
import { IndiaMapSvg } from './IndiaMapSvg';
import { WebMapMarker, WebMapLine } from './IndiaMapCanvas';
import { getPlaceDossier, UPSC_COAL_RIDDLES } from '../data/upscTopicDossiers';
import { haversineDistanceKm } from '../utils/quizEngine';
import { playSuccessChime, playHintSound, playFanfare } from '../utils/soundEffects';
import {
  Sparkles,
  HelpCircle,
  Lightbulb,
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Award,
  Zap,
  Target,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Flame,
  Check,
  Compass
} from 'lucide-react';

interface DetectiveQuizModeProps {
  topic: Topic;
  states: StateBoundary[];
  onClose: () => void;
  onCompleteQuiz?: (score: number, totalQuestions: number, xpEarned: number) => void;
  onRecordResult?: (placeKey: string, isCorrect: boolean, score: number) => void;
  initialPlaceName?: string | null;
}

type DetectiveStage = 'GUESS' | 'LOCATE' | 'FACTS';

export const DetectiveQuizMode: React.FC<DetectiveQuizModeProps> = ({
  topic,
  states,
  onClose,
  onCompleteQuiz,
  onRecordResult,
  initialPlaceName = null
}) => {
  // Build place question pool
  const placesPool = useMemo(() => {
    if (initialPlaceName) {
      const match = topic.places.find((p) => p.name === initialPlaceName);
      if (match) {
        const others = topic.places.filter((p) => p.name !== initialPlaceName).sort(() => 0.5 - Math.random());
        return [match, ...others.slice(0, 7)];
      }
    }
    // Shuffle all places in this topic
    return [...topic.places].sort(() => 0.5 - Math.random()).slice(0, Math.min(10, topic.places.length));
  }, [topic, initialPlaceName]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPlace: Place = placesPool[currentIndex] || topic.places[0];

  // Retrieve rich dossier for current place
  const dossier = useMemo(() => {
    return getPlaceDossier(currentPlace, topic);
  }, [currentPlace, topic]);

  // Options: 1 correct + 3 distractors, shuffled
  const options = useMemo(() => {
    const raw = [dossier.placeName, ...(dossier.distractors || ['Place A', 'Place B', 'Place C']).slice(0, 3)];
    // Deduplicate and pad if needed
    const unique = Array.from(new Set(raw));
    while (unique.length < 4) {
      const filler = topic.places.find((p) => !unique.includes(p.name));
      if (filler) unique.push(filler.name);
      else unique.push(`Site ${unique.length + 1}`);
    }
    return unique.sort(() => 0.5 - Math.random());
  }, [dossier, topic]);

  // Game Stage & State
  const [stage, setStage] = useState<DetectiveStage>('GUESS');
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [guessScore, setGuessScore] = useState<number>(100);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  // Map Locate State
  const [userTap, setUserTap] = useState<{ lat: number; lon: number } | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [mapBonus, setMapBonus] = useState<number>(0);

  // Facts Unlocked State
  const [unlockedMainsFact, setUnlockedMainsFact] = useState<boolean>(false);

  // Session Stats
  const [totalScore, setTotalScore] = useState<number>(0);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Reset per question
  useEffect(() => {
    setStage('GUESS');
    setHintsUsed(0);
    setGuessScore(100);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setAttempts(0);
    setUserTap(null);
    setDistanceKm(null);
    setMapBonus(0);
    setUnlockedMainsFact(false);
  }, [currentIndex]);

  // Handle Hint 1 & Hint 2
  const handleUseHint = (hintNum: number) => {
    if (hintsUsed < hintNum) {
      setHintsUsed(hintNum);
      setGuessScore((prev) => Math.max(25, prev - 25));
      playHintSound();
    }
  };

  // Handle Option Choice
  const handleSelectOption = (option: string) => {
    if (isAnswerCorrect === true) return; // Already passed
    setSelectedAnswer(option);
    setAttempts((prev) => prev + 1);

    if (option === dossier.placeName) {
      setIsAnswerCorrect(true);
      setStreak((s) => s + 1);
      playSuccessChime();
    } else {
      setIsAnswerCorrect(false);
      setStreak(0);
      setGuessScore((prev) => Math.max(10, prev - 20));
    }
  };

  // Handle Map Tap in Stage 2
  const handleMapTap = (lat: number, lon: number) => {
    if (stage !== 'LOCATE' || userTap !== null) return;

    setUserTap({ lat, lon });
    const dist = haversineDistanceKm(lat, lon, currentPlace.lat, currentPlace.lon);
    setDistanceKm(dist);

    let bonus = 5;
    if (dist < 100) bonus = 50;
    else if (dist < 250) bonus = 30;
    else if (dist < 500) bonus = 15;

    setMapBonus(bonus);

    const questionTotal = guessScore + bonus;
    setTotalScore((prev) => prev + questionTotal);
    setTotalXp((prev) => prev + Math.round(questionTotal / 5));

    if (onRecordResult) {
      onRecordResult(`${topic.id}|${currentPlace.name}`, true, questionTotal);
    }
  };

  // Map Markers and Line for Stage 2
  const mapMarkers: WebMapMarker[] = useMemo(() => {
    const list: WebMapMarker[] = [];
    if (userTap) {
      list.push({
        id: 'user_tap',
        lat: userTap.lat,
        lon: userTap.lon,
        label: 'Your Tap',
        color: '#2563EB',
        isSelected: false,
        hasPulseRing: false
      });
      list.push({
        id: 'actual_place',
        lat: currentPlace.lat,
        lon: currentPlace.lon,
        label: currentPlace.name,
        color: '#16A34A',
        isSelected: true,
        hasPulseRing: true
      });
    }
    return list;
  }, [userTap, currentPlace]);

  const mapLine: WebMapLine | null = useMemo(() => {
    if (userTap) {
      return {
        fromLat: userTap.lat,
        fromLon: userTap.lon,
        toLat: currentPlace.lat,
        toLon: currentPlace.lon,
        color: '#E07A3F'
      };
    }
    return null;
  }, [userTap, currentPlace]);

  // Next Question or Finish
  const handleNextQuestion = () => {
    if (currentIndex + 1 < placesPool.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      playFanfare();
      if (onCompleteQuiz) {
        onCompleteQuiz(totalScore, placesPool.length, totalXp);
      }
    }
  };

  if (quizFinished) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center p-4 bg-[#FFFDF9]">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-[#1F3A4D]/15 shadow-2xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-4xl mb-4 shadow-inner">
            🏆
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Investigation Closed
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3A4D] mb-1 font-serif">
            UPSC Cartographic Mastery!
          </h2>
          <p className="text-sm text-[#1F3A4D]/70 mb-6">
            You solved all cases in <span className="font-semibold">{topic.title}</span> using multi-tier geological clues and spatial deduction.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6 bg-[#F8F9FA] p-4 rounded-2xl border border-[#1F3A4D]/10">
            <div>
              <div className="text-xs text-[#1F3A4D]/60 font-medium">Total Score</div>
              <div className="text-2xl font-black text-[#E07A3F] font-mono">{totalScore}</div>
            </div>
            <div>
              <div className="text-xs text-[#1F3A4D]/60 font-medium">XP Earned</div>
              <div className="text-2xl font-black text-[#1976D2] font-mono">+{totalXp}</div>
            </div>
            <div>
              <div className="text-xs text-[#1F3A4D]/60 font-medium">Cases Solved</div>
              <div className="text-2xl font-black text-emerald-600 font-mono">{placesPool.length}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setQuizFinished(false);
                setTotalScore(0);
                setTotalXp(0);
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-[#1F3A4D]/20 text-[#1F3A4D] font-bold text-sm hover:bg-[#1F3A4D]/5 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" /> Replay Cases
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-[#E07A3F] text-white font-bold text-sm shadow-md hover:bg-[#C96832] flex items-center justify-center gap-2 transition"
            >
              Back to Map <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[550px] flex flex-col bg-[#F3F6F8] overflow-hidden select-none">
      {/* Top Detective Header Bar */}
      <div className="flex-none bg-[#FFFDF9] border-b border-[#1F3A4D]/15 px-4 py-2.5 shadow-sm flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10 transition"
          >
            ← Exit Case
          </button>
          <div className="h-4 w-[1px] bg-[#1F3A4D]/20" />
          <div className="flex items-center gap-2">
            <span className="text-base">{topic.emoji}</span>
            <span className="text-xs font-bold text-[#1F3A4D] hidden sm:inline">{topic.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold font-mono">
              Case {currentIndex + 1} of {placesPool.length}
            </span>
          </div>
        </div>

        {/* Live Score Ticker & Combo Streak */}
        <div className="flex items-center gap-3 font-mono">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak}x Combo</span>
            </div>
          )}
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#1F3A4D]/60 font-sans font-bold">Total Score</div>
            <div className="text-sm font-black text-[#E07A3F]">{totalScore} pts</div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Riddle & Detective Controls */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white border-r border-[#1F3A4D]/10 overflow-y-auto p-4 sm:p-6">
          {/* Stage Progress Pill */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase">
              <span
                className={`px-2.5 py-1 rounded-lg ${
                  stage === 'GUESS'
                    ? 'bg-[#1F3A4D] text-white shadow-sm'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                1. Deduce Landmark
              </span>
              <span className="text-[#1F3A4D]/30">➔</span>
              <span
                className={`px-2.5 py-1 rounded-lg ${
                  stage === 'LOCATE'
                    ? 'bg-[#E07A3F] text-white shadow-sm'
                    : stage === 'FACTS'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                2. Pinpoint on Map
              </span>
              <span className="text-[#1F3A4D]/30">➔</span>
              <span
                className={`px-2.5 py-1 rounded-lg ${
                  stage === 'FACTS' ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-100 text-gray-400'
                }`}
              >
                3. Mains Fact Dossier
              </span>
            </div>

            {stage === 'GUESS' && (
              <div className="text-xs font-bold font-mono px-2 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                🪙 Bounty: {guessScore} pts
              </div>
            )}
          </div>

          {/* STAGE 1: DEDUCE LANDMARK FROM CLUES */}
          {stage === 'GUESS' && (
            <div className="flex flex-col flex-1 animate-in fade-in duration-200">
              {/* Clue Statements Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1F3A4D] to-[#142633] text-white p-5 sm:p-6 shadow-md mb-4 border border-[#1F3A4D]/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-lg">
                    🕵️‍♂️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                      UPSC Prelims Clue Dossier
                    </div>
                    <div className="text-[11px] text-white/70">
                      Category: {currentPlace.category} · State Jurisdiction: Confidential
                    </div>
                  </div>
                </div>

                <div className="text-sm sm:text-base font-serif text-white/95 leading-relaxed whitespace-pre-line">
                  {dossier.whoAmIRiddle}
                </div>
              </div>

              {/* Hints Drawer / Actions */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1F3A4D]/70 px-1">
                  <span>Need an Investigation Clue?</span>
                  <span className="text-[11px] text-[#1F3A4D]/50 font-normal">Each hint deducts 25 pts</span>
                </div>

                {/* Hint 1 Button & Content */}
                {hintsUsed < 1 ? (
                  <button
                    onClick={() => handleUseHint(1)}
                    className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-400/80 bg-amber-50/50 hover:bg-amber-100/60 text-amber-900 text-xs font-bold flex items-center justify-between transition"
                  >
                    <span className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600" /> Reveal Clue 1 (Geological Basin)
                    </span>
                    <span className="text-[11px] font-mono text-amber-700 bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
                      -25 pts
                    </span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 animate-in fade-in duration-150">
                    <div className="font-bold text-amber-800 mb-0.5 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" /> Clue 1 (Geological Context):
                    </div>
                    {dossier.hint1}
                  </div>
                )}

                {/* Hint 2 Button & Content */}
                {hintsUsed >= 1 && (
                  hintsUsed < 2 ? (
                    <button
                      onClick={() => handleUseHint(2)}
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-400/80 bg-amber-50/50 hover:bg-amber-100/60 text-amber-900 text-xs font-bold flex items-center justify-between transition"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" /> Reveal Clue 2 (Landmark & UPSC Distinction)
                      </span>
                      <span className="text-[11px] font-mono text-amber-700 bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
                        -25 pts
                      </span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 animate-in fade-in duration-150">
                      <div className="font-bold text-amber-800 mb-0.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Clue 2 (UPSC Distinction):
                      </div>
                      {dossier.hint2}
                    </div>
                  )
                )}
              </div>

              {/* Options Grid */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-bold text-[#1F3A4D]/80 px-1">Identify the site:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {options.map((opt) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === dossier.placeName;

                    let btnStyle = 'bg-white border-[#1F3A4D]/15 text-[#1F3A4D] hover:bg-[#F8F9FA] hover:border-[#1F3A4D]/30';
                    if (isSelected) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30';
                      } else {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/30';
                      }
                    } else if (isAnswerCorrect && isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        disabled={isAnswerCorrect === true}
                        className={`p-3.5 rounded-xl border text-left font-semibold text-sm transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="font-sans font-bold">{opt}</span>
                        {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                        {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wrong Answer Diagnostic Hint */}
              {isAnswerCorrect === false && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 mb-4 animate-in fade-in duration-150">
                  <span className="font-bold">Not quite!</span> {selectedAnswer} is a different location. Try asking for a clue or selecting another candidate. (-20 pts)
                </div>
              )}

              {/* Success Banner -> Move to Stage 2: Locate on Map */}
              {isAnswerCorrect === true && (
                <div className="mt-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm animate-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Deduction Confirmed: {dossier.placeName}!</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 mb-3">
                    {dossier.fact1Core}
                  </p>
                  <button
                    onClick={() => setStage('LOCATE')}
                    className="w-full py-3 px-4 rounded-xl bg-[#E07A3F] text-white font-bold text-sm shadow-md hover:bg-[#C96832] flex items-center justify-center gap-2 transition active:scale-[0.99]"
                  >
                    <Target className="w-4 h-4" /> Stage 2: Pinpoint on India's Map ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STAGE 2: PINPOINT ON THE MAP */}
          {stage === 'LOCATE' && (
            <div className="flex flex-col flex-1 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900 mb-1">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Pinpoint Challenge: Locate {dossier.placeName} on the Map!</span>
                </div>
                <p className="text-xs text-amber-900/80">
                  Target State: <span className="font-bold">{dossier.state}</span>. Tap anywhere on India's map to test your spatial accuracy. Bullseye earns up to +50 bonus points!
                </p>
              </div>

              {/* Distance & Feedback Card */}
              {distanceKm !== null && (
                <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm mb-4 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#1F3A4D]/70 font-semibold">Haversine Distance:</span>
                    <span className="text-sm font-black font-mono text-[#1F3A4D]">{distanceKm.toFixed(0)} km</span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9FA] border border-[#1F3A4D]/10 text-xs mb-3">
                    <span className="text-lg">
                      {distanceKm < 100 ? '🎯' : distanceKm < 250 ? '⚡' : distanceKm < 500 ? '👍' : '🗺️'}
                    </span>
                    <div>
                      <div className="font-bold text-[#1F3A4D]">
                        {distanceKm < 100
                          ? 'Bullseye! Pinpoint Cartographic Mastery!'
                          : distanceKm < 250
                          ? 'Sharp Spatial Recall! Very Close!'
                          : distanceKm < 500
                          ? 'Good Regional Orientation!'
                          : 'Distant — Review state coordinates!'}
                      </div>
                      <div className="text-[11px] text-[#1F3A4D]/60 font-mono">
                        +{mapBonus} Map Accuracy Bonus Points
                      </div>
                    </div>
                  </div>

                  {/* Fact 2 Unlocked */}
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 mb-3">
                    <div className="font-bold text-blue-900 mb-0.5 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Spatial & Basin Insight (Unlocked):
                    </div>
                    {dossier.fact2MapSpatial}
                  </div>

                  <button
                    onClick={() => setStage('FACTS')}
                    className="w-full py-3 px-4 rounded-xl bg-purple-700 text-white font-bold text-sm shadow-md hover:bg-purple-800 flex items-center justify-center gap-2 transition"
                  >
                    View Complete UPSC Fact Dossier ➔
                  </button>
                </div>
              )}

              {distanceKm === null && (
                <div className="mt-auto p-4 rounded-xl bg-gray-50 border border-gray-200 text-center text-xs text-gray-500">
                  👆 Tap directly on the interactive India map on the right side.
                </div>
              )}
            </div>
          )}

          {/* STAGE 3: GRADUAL FACTS REVEAL ("Don't tell them all at once") */}
          {stage === 'FACTS' && (
            <div className="flex flex-col flex-1 animate-in fade-in duration-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1F3A4D] font-serif">{dossier.placeName}</h3>
                  <p className="text-xs text-[#1F3A4D]/60">{dossier.state} · {dossier.geologicalBasin}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  +{guessScore + mapBonus} Total Points
                </span>
              </div>

              {/* Fact 1: Core Identity (Unlocked) */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Fact 1: Core UPSC Identity
                </div>
                {dossier.fact1Core}
              </div>

              {/* Fact 2: Geological / Basin Context (Unlocked) */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950">
                <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-600" /> Fact 2: Geological Basin & Spatial Dynamics
                </div>
                {dossier.fact2MapSpatial}
              </div>

              {/* Fact 3: Mains Analysis & Environmental Linkage */}
              {!unlockedMainsFact ? (
                <button
                  onClick={() => {
                    setUnlockedMainsFact(true);
                    setTotalXp((prev) => prev + 10);
                  }}
                  className="w-full p-4 rounded-xl border border-dashed border-purple-400 bg-purple-50/70 hover:bg-purple-100/70 text-purple-950 text-left transition flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" /> Unlock Advanced UPSC Mains Perspective
                    </div>
                    <div className="text-[11px] text-purple-800/70">
                      Deep policy, environmental controversy & industrial linkages
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white text-purple-800 px-2.5 py-1 rounded-lg border border-purple-300">
                    +10 XP
                  </span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 animate-in fade-in duration-150">
                  <div className="font-bold text-purple-900 mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-purple-600" /> Fact 3: UPSC Mains Analytical & Policy Angle
                  </div>
                  {dossier.fact3MainsAdvanced}
                </div>
              )}

              {/* Next Case Button */}
              <div className="pt-2 mt-auto">
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#E07A3F] text-white font-bold text-sm shadow-md hover:bg-[#C96832] flex items-center justify-center gap-2 transition active:scale-[0.99]"
                >
                  {currentIndex + 1 < placesPool.length ? 'Investigate Next Case File ➔' : 'Complete Investigation Session 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive SVG India Map */}
        <div className="w-full lg:w-1/2 flex-1 h-[320px] lg:h-full relative bg-[#E6EFF4]">
          <IndiaMapSvg
            states={states}
            markers={mapMarkers}
            highlightStates={new Set(stage === 'LOCATE' && currentPlace.state ? [currentPlace.state] : [])}
            line={mapLine}
            onMapTap={handleMapTap}
            focus={
              stage === 'LOCATE' && userTap
                ? { lat: currentPlace.lat, lon: currentPlace.lon, zoom: 3.2 }
                : stage === 'LOCATE' && currentPlace.state
                ? undefined
                : undefined
            }
          />

          {/* Floating Instructions Overlay on the Map */}
          <div className="absolute bottom-3 left-3 right-3 max-w-sm pointer-events-none z-10">
            <div className="bg-[#FFFDF9]/95 backdrop-blur-md p-2.5 px-3 rounded-xl border border-[#1F3A4D]/15 shadow-md text-xs text-[#1F3A4D] pointer-events-auto flex items-center gap-2">
              <span className="text-base">📍</span>
              <div>
                {stage === 'GUESS' && (
                  <span>Solve the identity riddle on the left to activate map locating.</span>
                )}
                {stage === 'LOCATE' && !userTap && (
                  <span className="font-semibold text-amber-900">
                    Tap anywhere on India's map to pinpoint {dossier.placeName}!
                  </span>
                )}
                {stage === 'LOCATE' && userTap && (
                  <span>
                    Measured accuracy: <strong className="font-mono">{distanceKm?.toFixed(0)} km</strong> away.
                  </span>
                )}
                {stage === 'FACTS' && (
                  <span>Map confirmed! Explore the progressive Prelims and Mains facts.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
