import React, { useState, useEffect } from 'react';
import { DID_YOU_KNOW_FACTS, GeographyFact } from '../data/didYouKnowFacts';
import { Topic, Place } from '../types';
import { Sparkles, ChevronLeft, ChevronRight, RefreshCw, Compass, Lightbulb, Copy, Check } from 'lucide-react';

interface DidYouKnowBannerProps {
  topics?: Topic[];
  onSelectTopic?: (topic: Topic) => void;
  onSelectTopicPlace?: (topic: Topic, place: Place) => void;
}

export const DidYouKnowBanner: React.FC<DidYouKnowBannerProps> = ({
  topics = [],
  onSelectTopic,
  onSelectTopicPlace
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFact: GeographyFact = DID_YOU_KNOW_FACTS[currentIndex] || DID_YOU_KNOW_FACTS[0];

  // Auto-cycle every 9 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + DID_YOU_KNOW_FACTS.length) % DID_YOU_KNOW_FACTS.length);
  };

  const handleShuffle = () => {
    setIsAutoPlaying(false);
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
        onSelectTopicPlace(targetTopic, targetPlace);
        return;
      }
    }
    if (onSelectTopic && targetTopic) {
      onSelectTopic(targetTopic);
    }
  };

  return (
    <div className="my-4 rounded-[24px] bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] border border-[#1F3A4D]/15 shadow-sm p-4 sm:p-5 relative overflow-hidden transition-all duration-300">
      {/* Background Subtle Silhouette Accent */}
      <div className="absolute right-2 top-2 opacity-5 pointer-events-none text-7xl select-none">
        {currentFact.emoji}
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[#1F3A4D]/10 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-xs shadow-xs">
            💡
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#E07A3F] block">
              Daily UPSC Geography Inspiration
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-title font-bold text-xs sm:text-sm text-[#1F3A4D]">
                Did You Know?
              </span>
              <span className="text-[9px] font-bold px-2 py-0.2 rounded-md bg-[#1F3A4D]/10 text-[#1F3A4D]">
                {currentFact.emoji} {currentFact.categoryLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleShuffle}
            className="p-1.5 rounded-lg bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/10 transition"
            title="Shuffle random fact"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyFact}
            className="p-1.5 rounded-lg bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/10 transition"
            title="Copy fact to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/10 transition"
            title="Previous fact"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono text-[#1F3A4D]/60 px-1 font-bold">
            {currentIndex + 1}/{DID_YOU_KNOW_FACTS.length}
          </span>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/10 transition"
            title="Next fact"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Fact Body */}
      <div className="relative z-10 space-y-2">
        <h4 className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D] leading-snug">
          {currentFact.headline}
        </h4>

        <p className="text-xs text-[#1F3A4D]/85 leading-relaxed">
          {currentFact.fact}
        </p>

        {/* High-Yield UPSC Prelims/Mains Tip Box */}
        <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300/80 text-[11px] text-amber-950 font-medium leading-relaxed flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>{currentFact.upscTip}</span>
        </div>

        {/* Explore Related Topic Button */}
        {currentFact.relatedTopicId && (
          <button
            onClick={handleNavigateToRelated}
            className="mt-2 py-1 px-3 rounded-lg bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-[11px] inline-flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Explore {currentFact.relatedPlaceName || 'Topic Map'} on Vector Atlas →</span>
          </button>
        )}
      </div>
    </div>
  );
};
