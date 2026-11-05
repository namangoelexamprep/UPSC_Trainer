import React, { useState, useEffect } from 'react';
import { Place, Topic, UPSCPYQuestion } from '../types';
import { getComprehensivePlaceDossier, DeepPlaceDossier } from '../data/comprehensivePlaceDossiers';
import { getPyqsForPlace } from '../data/upscPyqDatabase';
import {
  X,
  MapPin,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  AlertTriangle,
  Factory,
  Layers,
  ShieldAlert,
  GraduationCap,
  Copy,
  Check,
  ChevronUp,
  Eye,
  Volume2,
  Square,
  HelpCircle
} from 'lucide-react';

interface PlaceDetailModalProps {
  place: Place;
  topic: Topic;
  allPlacesInTopic?: Place[];
  onClose: () => void;
  onSelectPlace?: (place: Place) => void;
  onLaunchClueMode?: (placeName: string) => void;
  onSelectState?: (stateName: string) => void;
  categoryColorMap?: Record<string, string>;
  onLaunchDeepDive?: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  topic,
  allPlacesInTopic = [],
  onClose,
  onSelectPlace,
  onLaunchClueMode,
  onSelectState,
  categoryColorMap = {},
  onLaunchDeepDive
}) => {
  const [activeTab, setActiveTab] = useState<'VITALS' | 'ECONOMIC' | 'UPSC_CONTEXT' | 'ENVIRONMENT' | 'GEOLOGY' | 'TRAPS' | 'PYQS'>('VITALS');
  const [copied, setCopied] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const dossier: DeepPlaceDossier = getComprehensivePlaceDossier(
    place.name,
    topic.id,
    place.state || '',
    place.category,
    place.lat,
    place.lon,
    place.fact
  );

  const placePyqs: UPSCPYQuestion[] = getPyqsForPlace(dossier.name);

  const handleToggleAudioGuide = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = `UPSC Geography Audio Guide for ${dossier.name}, located in ${dossier.state || 'India'}. `;
    if (activeTab === 'VITALS') {
      textToSpeak += `Prelims Vitals: ${dossier.corePrelimsSummary}. Geological Epoch: ${dossier.geologicalEpoch || 'Peninsular Shield'}. Operating Authority: ${dossier.operatingAuthority || 'Union Sector'}.`;
    } else if (activeTab === 'ECONOMIC') {
      textToSpeak += `Economic Significance: ${dossier.economicSignificance || dossier.economicAndStrategicSignificance}`;
    } else if (activeTab === 'UPSC_CONTEXT') {
      textToSpeak += `UPSC Contextual Relevance: ${dossier.upscContextualRelevance || 'Core GS Paper 1 and 3 syllabus item.'}`;
    } else if (activeTab === 'ENVIRONMENT') {
      textToSpeak += `Environmental Impact: ${dossier.environmentalImpact || dossier.mainsIssuesAndEnvironment}`;
    } else if (activeTab === 'GEOLOGY') {
      textToSpeak += `Geological Genesis: ${dossier.geologicalGenesis}`;
    } else if (activeTab === 'TRAPS') {
      textToSpeak += `Prelims Traps: ${dossier.upscPrelimsTraps.join('. ')}`;
    } else if (activeTab === 'PYQS') {
      textToSpeak += `UPSC Past Year Questions related to ${dossier.name}: ${placePyqs.length} questions available.`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const currentIndex = allPlacesInTopic.findIndex((p) => p.name === place.name);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allPlacesInTopic.length - 1;

  const handlePrev = () => {
    if (hasPrev && onSelectPlace) {
      onSelectPlace(allPlacesInTopic[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext && onSelectPlace) {
      onSelectPlace(allPlacesInTopic[currentIndex + 1]);
    }
  };

  const handleCopyNote = () => {
    const text = `[UPSC Geography Revision Note: ${dossier.name}]
State: ${dossier.state}${dossier.district ? ` (${dossier.district})` : ''}
Category: ${dossier.category}
Geological Epoch: ${dossier.geologicalEpoch || 'N/A'}
Basin: ${dossier.riverBasinOrGeomorphology || 'N/A'}
Operating PSU: ${dossier.operatingAuthority || 'N/A'}

Prelims Overview:
${dossier.corePrelimsSummary}

Economic Significance:
${dossier.economicSignificance || dossier.economicAndStrategicSignificance}

UPSC Contextual Relevance:
${dossier.upscContextualRelevance || 'GS1 & GS3 Core Syllabus Item'}

Environmental Impact:
${dossier.environmentalImpact || dossier.mainsIssuesAndEnvironment}

Geology & Genesis:
${dossier.geologicalGenesis}

Prelims Traps:
${dossier.upscPrelimsTraps.map((t) => `• ${t}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeColor = categoryColorMap[place.category] || '#E07A3F';

  // =========================================================================
  // 1. SLEEK COLLAPSED PEEK BOTTOM SHEET (95% MAP VIEWPORT CLEAR)
  // =========================================================================
  if (isCollapsed) {
    return (
      <div className="fixed bottom-3 left-2 right-2 max-w-2xl mx-auto z-50 animate-in slide-in-from-bottom-3 duration-200">
        <div className="bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl border-2 border-[#1F3A4D]/25 shadow-2xl p-3 flex items-center justify-between gap-3 text-[#1F3A4D]">
          <div
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
            onClick={() => setIsCollapsed(false)}
            title="Click to expand full multi-paragraph dossier"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md"
              style={{ backgroundColor: badgeColor }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div className="truncate min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-serif-title font-bold text-base text-[#1F3A4D] truncate">
                  {dossier.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: badgeColor }}>
                  {dossier.category}
                </span>
                {dossier.state && (
                  <span className="text-[10px] font-semibold text-[#1F3A4D]/80 bg-black/5 px-2 py-0.5 rounded">
                    📍 {dossier.state}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#1F3A4D]/75 truncate mt-0.5 font-serif">
                {dossier.corePrelimsSummary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="px-3.5 py-2 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition touch-manipulation cursor-pointer"
              title="Unfold full multi-paragraph dossier"
            >
              <ChevronUp className="w-4 h-4 text-emerald-400" />
              <span>Unfold Dossier</span>
            </button>

            {onLaunchClueMode && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchClueMode(dossier.name);
                }}
                className="hidden xs:flex items-center gap-1 px-2.5 py-2 rounded-xl bg-[#E07A3F]/15 hover:bg-[#E07A3F]/25 text-[#E07A3F] font-bold text-xs transition touch-manipulation cursor-pointer"
                title="Test clue for this landmark"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clue</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#1F3A4D]/70 hover:text-[#1F3A4D] transition text-sm font-bold touch-manipulation cursor-pointer"
              title="Close dossier sheet"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. FULL EXPANDED BOTTOM SHEET (RESPONSIVE, FULL VISIBILITY, NON-CLIPPING)
  // =========================================================================
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-3xl mx-auto px-1 sm:px-4">
      <div className="bg-[#FFFDF9] rounded-t-[26px] border-t-2 border-x border-[#1F3A4D]/25 shadow-2xl flex flex-col max-h-[82vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
        
        {/* DRAG HANDLE & RESPONSIVE HEADER */}
        <div className="bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] border-b border-[#1F3A4D]/15 pt-2 pb-2.5 px-3 sm:px-5 flex-shrink-0">
          {/* Centered Pull Down Bar */}
          <div
            className="w-12 h-1.5 rounded-full bg-[#1F3A4D]/25 mx-auto mb-2 cursor-pointer hover:bg-[#1F3A4D]/40 transition"
            onClick={() => setIsCollapsed(true)}
            title="Click to collapse sheet and peek at map pin"
          />

          {/* Row 1: Place Name + Major Actions */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white flex items-center justify-center shadow-md flex-shrink-0"
                style={{ backgroundColor: badgeColor }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D] leading-tight truncate">
                    {dossier.name}
                  </h2>
                  {dossier.state ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectState && dossier.state) {
                          onClose();
                          onSelectState(dossier.state);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E07A3F] bg-[#E07A3F]/10 hover:bg-[#E07A3F]/20 px-2 py-0.5 rounded-md transition cursor-pointer"
                      title={`View all topics in ${dossier.state}`}
                    >
                      <span>📍 {dossier.state}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#1F3A4D]/70 bg-black/5 px-2 py-0.5 rounded-md">
                      📍 Offshore / Coastal
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Header Utility Buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleToggleAudioGuide}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-2xs touch-manipulation cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-[#1F3A4D] hover:bg-[#152734] text-white'
                }`}
                title="Audio narration guide"
              >
                {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
              </button>

              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="px-2.5 py-1.5 rounded-xl bg-[#1F3A4D]/10 hover:bg-[#1F3A4D]/20 text-[#1F3A4D] font-bold text-xs flex items-center gap-1 transition touch-manipulation cursor-pointer"
                title="Collapse sheet to see map pin clearly"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden xs:inline">Peek Map</span>
              </button>

              <button
                type="button"
                onClick={handleCopyNote}
                className="p-2 rounded-xl bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/15 transition touch-manipulation cursor-pointer"
                title="Copy revision note"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white hover:bg-black/5 text-[#1F3A4D]/70 hover:text-[#1F3A4D] border border-[#1F3A4D]/15 transition touch-manipulation cursor-pointer"
                title="Close dossier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Row 2: Metadata Badges (Horizontally flowing, never awkward vertical stacking) */}
          <div className="flex items-center gap-2 mt-2 text-xs flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-2xs"
              style={{ backgroundColor: badgeColor }}
            >
              {dossier.category}
            </span>

            {dossier.district && (
              <span className="text-[10px] font-semibold text-[#1F3A4D]/80 bg-white px-2 py-0.5 rounded border border-[#1F3A4D]/15">
                {dossier.district} District
              </span>
            )}

            <span className="font-mono text-[10px] text-[#1F3A4D]/70 bg-black/5 px-2 py-0.5 rounded">
              {dossier.lat.toFixed(3)}°N, {dossier.lon.toFixed(3)}°E
            </span>

            <span className="text-[10px] font-semibold text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300/60">
              {topic.title}
            </span>
          </div>
        </div>

        {/* TAB NAVIGATION BAR (SMOOTH HORIZONTAL TOUCH SCROLL) */}
        <div className="flex items-center border-b border-[#1F3A4D]/15 bg-[#FAF7F0] px-3 sm:px-4 overflow-x-auto no-scrollbar gap-1.5 py-2 flex-shrink-0 touch-pan-x">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('VITALS'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'VITALS'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/75 hover:bg-white/80 hover:text-[#1F3A4D]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Prelims Vitals</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('ECONOMIC'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'ECONOMIC'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/75 hover:bg-white/80 hover:text-[#1F3A4D]'
            }`}
          >
            <Factory className="w-3.5 h-3.5 text-blue-400" />
            <span>Economic Significance</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('UPSC_CONTEXT'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'UPSC_CONTEXT'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/75 hover:bg-white/80 hover:text-[#1F3A4D]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>UPSC Context</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('ENVIRONMENT'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'ENVIRONMENT'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/75 hover:bg-white/80 hover:text-[#1F3A4D]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-emerald-400" />
            <span>Environmental Impact</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('GEOLOGY'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'GEOLOGY'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/75 hover:bg-white/80 hover:text-[#1F3A4D]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Geology & Genesis</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('TRAPS'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'TRAPS'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'text-rose-900/80 hover:bg-rose-50 hover:text-rose-950'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
            <span>Prelims Traps</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('PYQS'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap touch-manipulation cursor-pointer ${
              activeTab === 'PYQS'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-purple-900/80 hover:bg-purple-50 hover:text-purple-950'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-300" />
            <span>UPSC PYQs</span>
            {placePyqs.length > 0 && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {placePyqs.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB CONTENT BODY (SCROLLABLE MULTI-PARAGRAPH FACT-SHEET) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-[#1F3A4D]">
          
          {/* TAB 1: PRELIMS VITALS */}
          {activeTab === 'VITALS' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300/60 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-[#E07A3F] tracking-wider uppercase font-mono">
                    Essential UPSC Prelims Fact
                  </span>
                </div>
                <p className="font-serif text-[#1F3A4D] text-sm sm:text-base leading-relaxed font-medium">
                  {dossier.corePrelimsSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1F3A4D]/50 block mb-0.5">
                    Geological Epoch & Age
                  </span>
                  <p className="font-semibold text-xs sm:text-sm text-[#1F3A4D]">
                    {dossier.geologicalEpoch || 'Peninsular Shield / Fluvial Basin'}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1F3A4D]/50 block mb-0.5">
                    River Basin / Physiography
                  </span>
                  <p className="font-semibold text-xs sm:text-sm text-[#1F3A4D]">
                    {dossier.riverBasinOrGeomorphology || `${dossier.state || 'Regional'} Basin`}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1F3A4D]/50 block mb-0.5">
                    Operating PSU / Ministry
                  </span>
                  <p className="font-semibold text-xs sm:text-sm text-[#1F3A4D]">
                    {dossier.operatingAuthority || 'Union Sector Undertaking'}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1F3A4D]/50 block mb-0.5">
                    Quality / Grade / Capacity
                  </span>
                  <p className="font-semibold text-xs sm:text-sm text-[#1F3A4D]">
                    {dossier.gradeOrQuality || `${dossier.category} Benchmark`}
                  </p>
                </div>
              </div>

              {dossier.keyKeywords && dossier.keyKeywords.length > 0 && (
                <div className="p-3 rounded-2xl bg-white/70 border border-[#1F3A4D]/10">
                  <span className="text-[10px] font-bold text-[#1F3A4D]/60 uppercase tracking-wider block mb-1.5">
                    Syllabus Keywords for Answer Writing
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dossier.keyKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-lg bg-[#1F3A4D]/5 text-[#1F3A4D] font-semibold text-[11px]"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ECONOMIC SIGNIFICANCE */}
          {activeTab === 'ECONOMIC' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-[#1F3A4D]">
                  <Factory className="w-4 h-4 text-blue-700" />
                  <h3 className="font-serif-title font-bold text-sm sm:text-base">
                    Economic Significance & Value Chain Analysis
                  </h3>
                </div>
                <p className="font-sans leading-relaxed text-[#1F3A4D]/90 whitespace-pre-line text-xs sm:text-sm">
                  {dossier.economicSignificance || dossier.economicAndStrategicSignificance}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950">
                <span className="font-bold block mb-1 text-xs">UPSC Economic Geography Focus:</span>
                <p className="text-xs leading-relaxed opacity-95">
                  Resource nodes determine industrial location, freight logistics density, and regional growth poles. Inter-regional trade and pipeline/rail networks convert localized geological assets into national economic capacity.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: UPSC CONTEXTUAL RELEVANCE */}
          {activeTab === 'UPSC_CONTEXT' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-[#1F3A4D]">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <h3 className="font-serif-title font-bold text-sm sm:text-base">
                    UPSC Contextual Relevance & Syllabus Mapping
                  </h3>
                </div>
                <p className="font-sans leading-relaxed text-[#1F3A4D]/90 whitespace-pre-line text-xs sm:text-sm">
                  {dossier.upscContextualRelevance || 'Core GS Paper 1 Physical & Human Geography and GS Paper 3 Infrastructure.'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
                <span className="font-bold block mb-1 text-xs">High-Yield Revision Strategy:</span>
                <p className="text-xs leading-relaxed opacity-95">
                  In Prelims, focus on matching the exact river basin, geological epoch, and operating authority. In Mains, connect location-based assets to policy initiatives such as PM Gati Shakti, NITI Aayog infrastructure goals, and local tribal welfare (PESA / DMF).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: ENVIRONMENTAL IMPACT */}
          {activeTab === 'ENVIRONMENT' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-rose-800">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-serif-title font-bold text-sm sm:text-base">
                    Environmental Impact & Policy Governance
                  </h3>
                </div>
                <p className="font-sans leading-relaxed text-[#1F3A4D]/90 whitespace-pre-line text-xs sm:text-sm">
                  {dossier.environmentalImpact || dossier.mainsIssuesAndEnvironment}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                <span className="font-bold block mb-1 text-xs">GS3 Environmental Policy Note:</span>
                <p className="text-xs leading-relaxed opacity-95">
                  Sustainable industrial growth demands strict enforcement of EIA 2006, Zero Liquid Discharge (ZLD), continuous emission monitoring, and fair community rehabilitation under FRA 2006 / RFCTLARR 2013.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: GEOLOGY & GENESIS */}
          {activeTab === 'GEOLOGY' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/10 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-[#1F3A4D]">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-serif-title font-bold text-sm sm:text-base">
                    Geological Genesis & Formation Process
                  </h3>
                </div>
                <p className="font-sans leading-relaxed text-[#1F3A4D]/90 whitespace-pre-line text-xs sm:text-sm">
                  {dossier.geologicalGenesis}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                <span className="font-bold block mb-1 text-xs">UPSC Physical Geography Principle:</span>
                <p className="text-xs leading-relaxed opacity-95">
                  Mineral and energy resources are not distributed uniformly across the Indian landmass; their concentration is tightly controlled by paleogeography, tectonic rifting (grabens), and ancient continental plate collisions.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: PRELIMS TRAPS */}
          {activeTab === 'TRAPS' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="space-y-2">
                {dossier.upscPrelimsTraps.map((trap, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">{trap}</p>
                  </div>
                ))}
              </div>

              {dossier.pyqReference && (
                <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200 text-purple-950">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-purple-700" />
                    <span className="font-bold text-xs uppercase tracking-wider">UPSC PYQ Citation</span>
                  </div>
                  <p className="text-xs leading-relaxed">{dossier.pyqReference}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: UPSC 15-YEAR SOLVED PYQS FOR THIS LANDMARK */}
          {activeTab === 'PYQS' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200 text-purple-950 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-title font-bold text-xs sm:text-sm">
                    UPSC Prelims Geography Solved Questions
                  </h4>
                  <p className="text-[11px] text-purple-900/75 mt-0.5">
                    Official questions testing {dossier.name} or related {topic.title} concepts.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-700 text-white font-mono text-xs font-bold shadow-2xs">
                  {placePyqs.length} Found
                </span>
              </div>

              {placePyqs.length > 0 ? (
                <div className="space-y-4">
                  {placePyqs.map((q) => {
                    const isRevealed = !!revealedKeys[q.id];
                    const chosen = selectedAnswers[q.id];

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-2xs space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#1F3A4D] text-white font-mono text-[10px] font-bold">
                            UPSC CSE {q.year}
                          </span>
                          <span className="text-[10px] font-bold text-[#E07A3F]">
                            {q.themeLabel}
                          </span>
                        </div>

                        <p className="font-serif font-medium text-xs sm:text-sm leading-relaxed text-[#1F3A4D]">
                          {q.questionText}
                        </p>

                        {q.statements && q.statements.length > 0 && (
                          <div className="space-y-1 bg-black/5 p-2.5 rounded-xl text-xs font-mono">
                            {q.statements.map((st, sIdx) => (
                              <div key={sIdx} className="leading-relaxed">
                                {st}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Interactive Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt) => {
                            const isChosen = chosen === opt.key;
                            const isCorrect = opt.key === q.correctOption;
                            let btnStyle = 'bg-white border-[#1F3A4D]/15 hover:border-[#E07A3F] text-[#1F3A4D]';

                            if (isRevealed) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-[#1F3A4D] text-white border-transparent font-bold';
                            }

                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => {
                                  setSelectedAnswers((prev) => ({ ...prev, [q.id]: opt.key }));
                                  setRevealedKeys((prev) => ({ ...prev, [q.id]: true }));
                                }}
                                className={`p-2.5 rounded-xl border text-left text-xs transition flex items-start gap-2 touch-manipulation cursor-pointer ${btnStyle}`}
                              >
                                <span className="font-mono font-bold">{opt.key}.</span>
                                <span>{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Official Key & Elimination Trick */}
                        {isRevealed && (
                          <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs space-y-1.5 animate-in fade-in duration-150">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                              <Check className="w-4 h-4 text-emerald-600" />
                              <span>Official UPSC Key: Option ({q.correctOption})</span>
                            </div>
                            <p className="leading-relaxed">{q.detailedExplanation}</p>
                            <div className="pt-1.5 border-t border-amber-200">
                              <span className="font-bold text-[#E07A3F]">⚡ Topper Elimination Technique: </span>
                              <span>{q.eliminationTechnique}</span>
                            </div>
                          </div>
                        )}

                        {!isRevealed && (
                          <button
                            type="button"
                            onClick={() => setRevealedKeys((prev) => ({ ...prev, [q.id]: true }))}
                            className="text-xs font-bold text-[#E07A3F] hover:underline cursor-pointer"
                          >
                            Reveal Official UPSC Answer Key & Explanation →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/10 text-center space-y-2">
                  <p className="text-xs text-[#1F3A4D]/75">
                    No verbatim past prelims question matches the name "{dossier.name}" directly. However, its broad theme ({topic.title}) is heavily tested every year.
                  </p>
                  <p className="text-xs font-semibold text-[#E07A3F]">
                    Tip: Visit the 15-Year UPSC PYQ Atlas from Dashboard to practice all thematic questions with Digital OMR Sheet!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* COMPACT FOOTER NAVIGATION CAROUSEL */}
        <div className="p-2.5 sm:p-3 border-t border-[#1F3A4D]/15 bg-[#FAF7F0] flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border transition touch-manipulation cursor-pointer ${
                hasPrev
                  ? 'bg-white hover:bg-[#1F3A4D]/5 text-[#1F3A4D] border-[#1F3A4D]/15'
                  : 'bg-white/40 text-[#1F3A4D]/30 border-transparent cursor-not-allowed'
              }`}
              title="Previous location in topic"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Prev</span>
            </button>

            <span className="text-[11px] font-mono text-[#1F3A4D]/60 px-1.5">
              {currentIndex >= 0 ? `${currentIndex + 1}/${allPlacesInTopic.length}` : ''}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasNext}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border transition touch-manipulation cursor-pointer ${
                hasNext
                  ? 'bg-white hover:bg-[#1F3A4D]/5 text-[#1F3A4D] border-[#1F3A4D]/15'
                  : 'bg-white/40 text-[#1F3A4D]/30 border-transparent cursor-not-allowed'
              }`}
              title="Next location in topic"
            >
              <span className="hidden xs:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {onLaunchDeepDive && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchDeepDive();
                }}
                className="px-3 py-1.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition active:scale-95 touch-manipulation cursor-pointer"
                title="Launch Deep Dive critical thinking quiz for this location"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Deep Dive Quiz</span>
              </button>
            )}

            {onLaunchClueMode && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchClueMode(dossier.name);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-[#E07A3F]/15 hover:bg-[#E07A3F]/25 text-[#E07A3F] font-bold text-xs flex items-center gap-1 transition touch-manipulation cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden xs:inline">Clue Mode</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="px-2.5 py-1.5 rounded-xl bg-[#1F3A4D]/10 hover:bg-[#1F3A4D]/20 text-[#1F3A4D] font-bold text-xs transition touch-manipulation cursor-pointer"
            >
              Collapse
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-xs shadow-2xs transition touch-manipulation cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
