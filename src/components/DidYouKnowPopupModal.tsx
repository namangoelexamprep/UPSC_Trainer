import React, { useState, useEffect } from 'react';
import { DID_YOU_KNOW_FACTS, GeographyFact } from '../data/didYouKnowFacts';
import { Topic, Place } from '../types';
import { Sparkles, ChevronLeft, ChevronRight, RefreshCw, Compass, Lightbulb, Copy, Check, X } from 'lucide-react';

interface DidYouKnowPopupModalProps {
  topics?: Topic[];
  onClose: () => void;
  onSelectTopic?: (topic: Topic) => void;
  onSelectTopicPlace?: (topic: Topic, place: Place) => void;
}

export const DidYouKnowPopupModal: React.FC<DidYouKnowPopupModalProps> = ({
  topics = [],
  onClose,
  onSelectTopic,
  onSelectTopicPlace
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFact: GeographyFact = DID_YOU_KNOW_FACTS[currentIndex] || DID_YOU_KNOW_FACTS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DID_YOU_KNOW_FACTS.length) % DID_YOU_KNOW_FACTS.length);
  };

  const handleShuffle = () => {
    let rand = Math.floor(Math.random() * DID_YOU_KNOW_FACTS.length);
    if (rand === currentIndex) rand = (rand + 1) % DID_YOU_KNOW_FACTS.length;
    setCurrentIndex(rand);
  };

  const handleCopyFact = () => {
    const text = `💡 [UPSC Geography Fact: ${currentFact.headline}]\n\n${currentFact.fact}\n\n🎯 ${currentFact.upscTip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigateToRelated = () => {
    if (!currentFact.relatedTopicId || topics.length === 0) return;
    const targetTopic = topics.find((t) => t.id === currentFact.relatedTopicId) || topics[0];
    if (currentFact.relatedPlaceName && onSelectTopicPlace) {
      const targetPlace = targetTopic.places.find(
        (p) => p.name.toLowerCase() === currentFact.relatedPlaceName?.toLowerCase()
      );
      if (targetPlace) {
        onClose();
        onSelectTopicPlace(targetTopic, targetPlace);
        return;
      }
    }
    if (onSelectTopic && targetTopic) {
      onClose();
      onSelectTopic(targetTopic);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F3A4D]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#1F3A4D]/20 shadow-2xl max-w-lg w-full overflow-hidden text-[#1F3A4D] relative animate-in zoom-in-95 duration-200">
        {/* Background Silhouette Accent */}
        <div className="absolute right-3 top-3 opacity-5 pointer-events-none text-8xl select-none">
          {currentFact.emoji}
        </div>

        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#1F3A4D]/10 bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-sm shadow-xs">
              💡
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#E07A3F] block">
                UPSC Daily Map Geography Fact
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-title font-bold text-base text-[#1F3A4D]">
                  Did You Know?
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#1F3A4D]/10 text-[#1F3A4D]">
                  {currentFact.emoji} {currentFact.categoryLabel}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D] transition"
            title="Close popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Fact Body */}
        <div className="p-5 space-y-4 relative z-10">
          <h4 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A4D] leading-snug">
            {currentFact.headline}
          </h4>

          <p className="text-xs sm:text-sm text-[#1F3A4D]/85 leading-relaxed">
            {currentFact.fact}
          </p>

          {/* High-Yield UPSC Prelims/Mains Tip Box */}
          <div className="p-3 rounded-2xl bg-amber-100/70 border border-amber-300/80 text-xs text-amber-950 font-medium leading-relaxed flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>{currentFact.upscTip}</span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShuffle}
                className="p-2 rounded-xl bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/15 transition"
                title="Shuffle random fact"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopyFact}
                className="p-2 rounded-xl bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/15 transition"
                title="Copy fact to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/15 transition"
                title="Previous fact"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-[#1F3A4D]/60 px-1 font-bold">
                {currentIndex + 1} / {DID_YOU_KNOW_FACTS.length}
              </span>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/15 transition"
                title="Next fact"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Explore Button & Dismiss */}
          <div className="pt-3 border-t border-[#1F3A4D]/10 flex items-center justify-between gap-3">
            {currentFact.relatedTopicId ? (
              <button
                onClick={handleNavigateToRelated}
                className="py-2.5 px-4 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm flex-1 justify-center"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Explore {currentFact.relatedPlaceName || 'Topic Map'} →</span>
              </button>
            ) : <div />}

            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] text-white font-bold text-xs shadow-sm transition active:scale-95"
            >
              Resume Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
