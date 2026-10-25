import React, { useState } from 'react';
import { Place, Topic, SRSRecord } from '../types';
import { getComprehensivePlaceDossier, DeepPlaceDossier } from '../data/comprehensivePlaceDossiers';
import { Sparkles, RotateCw, CheckCircle2, ChevronRight, BookOpen, Brain, Zap, Clock, Lightbulb } from 'lucide-react';

interface DailyFlashcardCardProps {
  topics: Topic[];
  srsRecords: Record<string, SRSRecord>;
  onReviewCard: (topicId: string, placeName: string, passed: boolean) => void;
  onOpenTopicMap: (topic: Topic, place: Place) => void;
}

export const DailyFlashcardCard: React.FC<DailyFlashcardCardProps> = ({
  topics = [],
  srsRecords = {},
  onReviewCard,
  onOpenTopicMap
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Collect all places from topics
  const allPlacesList: { topic: Topic; place: Place }[] = [];
  for (const t of topics) {
    for (const p of t.places) {
      allPlacesList.push({ topic: t, place: p });
    }
  }

  if (allPlacesList.length === 0) return null;

  // Pick deterministic or rotating flashcard based on day or index
  const item = allPlacesList[currentIndex % allPlacesList.length];
  const { topic, place } = item;

  const dossier: DeepPlaceDossier = getComprehensivePlaceDossier(
    place.name,
    topic.id,
    place.state || '',
    place.category,
    place.lat,
    place.lon,
    place.fact
  );

  const srsKey = `${topic.id}|${place.name}`;
  const record = srsRecords[srsKey];
  const intervalDays = record ? record.intervalDays : 1;

  const handleNextCard = (passed: boolean) => {
    onReviewCard(topic.id, place.name, passed);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % allPlacesList.length);
  };

  return (
    <div className="my-5 bg-[#FFFDF9] rounded-[26px] border-2 border-[#1F3A4D]/15 shadow-md p-4 sm:p-6 text-[#1F3A4D] relative overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1F3A4D]/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm shadow-xs">
            🧠
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-purple-800 block">
              SRS Spaced Repetition Flashcard
            </span>
            <h3 className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D]">
              Daily Flashcard: {dossier.name} ({dossier.state})
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
            Interval: {intervalDays}d
          </span>
          <span className="text-xs text-[#1F3A4D]/60 font-mono">
            Card {currentIndex + 1}/{allPlacesList.length}
          </span>
        </div>
      </div>

      {/* Flashcard Content (Flip Area) */}
      <div className="my-4 min-h-[140px] flex flex-col justify-center">
        {!isFlipped ? (
          <div className="space-y-3 text-center py-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#E07A3F] bg-[#E07A3F]/10 px-3 py-1 rounded-md inline-block">
              Active Recall Question
            </span>
            <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A4D] max-w-xl mx-auto leading-snug">
              What is the key geological formation, river basin, and economic significance of <strong>{dossier.name}</strong>?
            </h4>
            <p className="text-xs text-[#1F3A4D]/60 italic">
              Tap below to flip card and verify your UPSC retrieval.
            </p>
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-200 text-xs sm:text-sm">
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
              <span className="font-bold text-[#E07A3F] text-[11px] block mb-0.5 uppercase tracking-wider">
                Prelims Core Summary:
              </span>
              <p className="font-serif text-[#1F3A4D] leading-relaxed">
                {dossier.corePrelimsSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white border border-[#1F3A4D]/10">
                <span className="font-bold text-[#1F3A4D]/60 uppercase block">Epoch / Basin:</span>
                <span className="font-semibold text-[#1F3A4D]">{dossier.geologicalEpoch || dossier.riverBasinOrGeomorphology}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#1F3A4D]/10">
                <span className="font-bold text-[#1F3A4D]/60 uppercase block">Operating PSU:</span>
                <span className="font-semibold text-[#1F3A4D]">{dossier.operatingAuthority || 'Union Sector'}</span>
              </div>
            </div>

            {dossier.upscPrelimsTraps.length > 0 && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-[11px]">
                <span className="font-bold block mb-0.5">⚠️ Prelims Trap Warning:</span>
                <p>{dossier.upscPrelimsTraps[0]}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-[#1F3A4D]/10 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => onOpenTopicMap(topic, place)}
          className="px-3 py-2 rounded-xl bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 text-[#1F3A4D] font-bold text-xs flex items-center gap-1.5 transition"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Inspect on Vector Map</span>
        </button>

        {!isFlipped ? (
          <button
            onClick={() => setIsFlipped(true)}
            className="flex-1 max-w-xs py-2.5 px-4 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            <span>Flip Flashcard (Reveal Answer)</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              onClick={() => handleNextCard(false)}
              className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs transition"
              title="Review again tomorrow"
            >
              🔄 Hard (Review Tomorrow)
            </button>
            <button
              onClick={() => handleNextCard(true)}
              className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              title="Easy recall (Expand SRS interval)"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Easy (Recall +3d)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
