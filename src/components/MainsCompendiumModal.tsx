import React, { useState } from 'react';
import { MainsModelAnswer, GeomorphologicalProvince, Place, Topic } from '../types';
import { MAINS_MODEL_ANSWERS, searchMainsAnswers } from '../data/mainsSpatialCompendium';
import { GEOMORPHOLOGICAL_PROVINCES } from '../data/geomorphologicalFeatures';
import {
  X,
  BookOpen,
  MapPin,
  Layers,
  Sparkles,
  Search,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  PenTool,
  Bookmark,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface MainsCompendiumModalProps {
  onClose: () => void;
  onOpenDiagramPad?: () => void;
  onSelectPlace?: (place: Place, topic: Topic) => void;
  allTopics?: Topic[];
}

export const MainsCompendiumModal: React.FC<MainsCompendiumModalProps> = ({
  onClose,
  onOpenDiagramPad,
  onSelectPlace,
  allTopics = []
}) => {
  const [activeTab, setActiveTab] = useState<'ANSWERS' | 'PROVINCES'>('ANSWERS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>(MAINS_MODEL_ANSWERS[0]?.id || '');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>(GEOMORPHOLOGICAL_PROVINCES[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAnswers = searchMainsAnswers(searchQuery);

  const activeAnswer: MainsModelAnswer | undefined = MAINS_MODEL_ANSWERS.find(
    (a) => a.id === selectedAnswerId
  ) || filteredAnswers[0];

  const activeProvince: GeomorphologicalProvince | undefined = GEOMORPHOLOGICAL_PROVINCES.find(
    (p) => p.id === selectedProvinceId
  );

  const handleCopyAnswer = (answer: MainsModelAnswer) => {
    let text = `# UPSC Mains Model Answer (${answer.paper})
Question: ${answer.question}
Theme: ${answer.topicTheme} | Marks: ${answer.marks} | Words: ${answer.wordLimit}

## 1. Introduction:
${answer.introduction}

## 2. Core Discussion:
`;
    answer.coreBodyPoints.forEach((sec) => {
      text += `\n### ${sec.heading}\n`;
      sec.points.forEach((pt) => {
        text += `• ${pt}\n`;
      });
    });

    text += `\n## 3. Spatial Map & Diagram Strategy:\n${answer.mapDiagramStrategy}\n`;
    text += `\n## 4. Government Policies & Reforms:\n${answer.governmentSchemesAndPolicies.map((p) => `• ${p}`).join('\n')}\n`;
    text += `\n## 5. Forward-Looking Conclusion:\n${answer.conclusion}\n`;
    text += `\nKeywords: ${answer.syllabusKeywords.join(', ')}\n`;

    navigator.clipboard.writeText(text);
    setCopiedId(answer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#1F3A4D]/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#1F3A4D]/20 shadow-2xl max-w-5xl w-full flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#1F3A4D]/15 bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#1F3A4D] text-amber-300 flex items-center justify-center text-xl shadow-md flex-shrink-0">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#E07A3F] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  GS Paper 1 & 3
                </span>
                <span className="text-[11px] font-bold text-[#1F3A4D]/70 bg-black/5 px-2 py-0.5 rounded-md">
                  Topper Model Answers & Physiographic Atlas
                </span>
              </div>
              <h2 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D] leading-tight mt-0.5">
                UPSC Mains Spatial Answers & Geomorphology Compendium
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDiagramPad && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDiagramPad();
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-[#E07A3F] hover:from-amber-300 hover:to-[#f08548] text-[#1F3A4D] font-black text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5 cursor-pointer touch-manipulation"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Diagram Pad</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#1F3A4D]/70 hover:text-[#1F3A4D] transition text-sm font-bold touch-manipulation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOP SEGMENTED NAVIGATION BAR */}
        <div className="flex items-center justify-between border-b border-[#1F3A4D]/15 bg-[#FAF7F0] px-4 py-2 gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('ANSWERS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer touch-manipulation ${
                activeTab === 'ANSWERS'
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'text-[#1F3A4D]/70 hover:bg-white/80 hover:text-[#1F3A4D]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Model Answers ({MAINS_MODEL_ANSWERS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('PROVINCES')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer touch-manipulation ${
                activeTab === 'PROVINCES'
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'text-[#1F3A4D]/70 hover:bg-white/80 hover:text-[#1F3A4D]'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Geomorphological Provinces ({GEOMORPHOLOGICAL_PROVINCES.length})</span>
            </button>
          </div>

          {activeTab === 'ANSWERS' && (
            <div className="relative max-w-xs w-full hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1F3A4D]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. Gondwana, Western Ghats, Steel)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#1F3A4D]/20 text-[#1F3A4D] placeholder-[#1F3A4D]/40 outline-none focus:border-[#E07A3F]"
              />
            </div>
          )}
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          
          {/* TAB 1: MAINS MODEL ANSWERS */}
          {activeTab === 'ANSWERS' && (
            <>
              {/* Left Column: Question Selector List */}
              <div className="w-full md:w-80 border-r border-[#1F3A4D]/15 overflow-y-auto p-3 space-y-2 bg-[#FAF7F0]/60 flex-shrink-0">
                <div className="sm:hidden mb-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search model answers..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#1F3A4D]/20 text-[#1F3A4D]"
                  />
                </div>

                {filteredAnswers.map((a) => {
                  const isSelected = a.id === activeAnswer?.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setSelectedAnswerId(a.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition flex flex-col gap-1 cursor-pointer touch-manipulation ${
                        isSelected
                          ? 'bg-[#1F3A4D] text-white border-transparent shadow-sm'
                          : 'bg-white hover:bg-[#FFF8F2] border-[#1F3A4D]/10 text-[#1F3A4D]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#1F3A4D]/10 text-[#1F3A4D]'
                        }`}>
                          {a.paper} · {a.year}
                        </span>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-amber-300' : 'text-[#E07A3F]'}`}>
                          {a.marks}M · {a.wordLimit}W
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs line-clamp-2 leading-snug mt-1">
                        {a.question}
                      </h4>
                      <span className={`text-[10px] truncate ${isSelected ? 'text-white/70' : 'text-[#1F3A4D]/60'}`}>
                        {a.topicTheme}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Full Model Answer View */}
              {activeAnswer ? (
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 text-[#1F3A4D]">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#1F3A4D]/15 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1F3A4D] text-white font-mono text-[11px] font-bold">
                          {activeAnswer.paper} ({activeAnswer.year})
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                          {activeAnswer.marks} Marks · {activeAnswer.wordLimit} Words
                        </span>
                        <span className="text-xs font-bold text-[#E07A3F]">
                          {activeAnswer.topicTheme}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyAnswer(activeAnswer)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-black/5 border border-[#1F3A4D]/20 text-[#1F3A4D] font-bold text-xs flex items-center gap-1.5 transition touch-manipulation cursor-pointer"
                        title="Copy full model answer note"
                      >
                        {copiedId === activeAnswer.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A4D] leading-snug">
                      Q. {activeAnswer.question}
                    </h3>
                  </div>

                  {/* Section 1: Introduction */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300/60 shadow-2xs space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
                      1. Contextual Introduction (Topper Opening ~30 Words)
                    </span>
                    <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#1F3A4D]">
                      {activeAnswer.introduction}
                    </p>
                  </div>

                  {/* Section 2: Core Body Subheadings */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1F3A4D]/60 block">
                      2. Structured Body Sections with Empirical Points
                    </span>

                    {activeAnswer.coreBodyPoints.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-2xs space-y-2"
                      >
                        <h4 className="font-serif-title font-bold text-xs sm:text-sm text-[#1F3A4D] flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#1F3A4D]/10 text-[#1F3A4D] flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span>{sec.heading}</span>
                        </h4>

                        <div className="space-y-1.5 pl-7">
                          {sec.points.map((pt, pIdx) => (
                            <p key={pIdx} className="text-xs sm:text-sm leading-relaxed text-[#1F3A4D]/90">
                              • {pt}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section 3: Value Addition Hand-Drawn Map Strategy */}
                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-300/80 text-sky-950 space-y-2">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-sky-700" />
                      <h4 className="font-serif-title font-bold text-xs sm:text-sm">
                        3. Spatial Map & Diagram Value-Addition Strategy (Earns +2.5 Extra Marks)
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-sky-950/90 font-sans">
                      {activeAnswer.mapDiagramStrategy}
                    </p>
                    
                    {onOpenDiagramPad && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenDiagramPad();
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs shadow-2xs transition active:scale-95 touch-manipulation cursor-pointer"
                      >
                        <span>Practice Diagram on Canvas Pad</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Section 4: Government Schemes & Policies */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300/80 text-emerald-950 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-serif-title font-bold text-xs sm:text-sm">
                        4. Relevant Government Schemes & Policy Frameworks
                      </h4>
                    </div>
                    <div className="space-y-1 text-xs">
                      {activeAnswer.governmentSchemesAndPolicies.map((sch, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>{sch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 5: Forward-Looking Conclusion */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-[#FAF5EE] border border-amber-300/60 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
                      5. Way Forward & Sustainable Development Goals (SDG) Linkage
                    </span>
                    <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#1F3A4D]">
                      {activeAnswer.conclusion}
                    </p>
                  </div>

                  {/* Syllabus Keywords */}
                  <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-[#1F3A4D]/60 uppercase tracking-wider">
                      Core Keywords:
                    </span>
                    {activeAnswer.syllabusKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-lg bg-[#1F3A4D]/5 text-[#1F3A4D] font-mono font-semibold text-[10px]"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-8 text-center text-[#1F3A4D]/60">
                  No model answer matches the search query "{searchQuery}".
                </div>
              )}
            </>
          )}

          {/* TAB 2: GEOMORPHOLOGICAL & PHYSIOGRAPHIC ATLAS */}
          {activeTab === 'PROVINCES' && (
            <>
              {/* Left Column: Province Selector List */}
              <div className="w-full md:w-80 border-r border-[#1F3A4D]/15 overflow-y-auto p-3 space-y-2 bg-[#FAF7F0]/60 flex-shrink-0">
                {GEOMORPHOLOGICAL_PROVINCES.map((prov) => {
                  const isSelected = prov.id === activeProvince?.id;
                  return (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => setSelectedProvinceId(prov.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition flex flex-col gap-1 cursor-pointer touch-manipulation ${
                        isSelected
                          ? 'bg-[#1F3A4D] text-white border-transparent shadow-sm'
                          : 'bg-white hover:bg-[#FFF8F2] border-[#1F3A4D]/10 text-[#1F3A4D]'
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-amber-300' : 'text-[#E07A3F]'
                      }`}>
                        {prov.division}
                      </span>
                      <h4 className="font-serif font-bold text-xs sm:text-sm leading-snug">
                        {prov.name}
                      </h4>
                      <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-[#1F3A4D]/60'}`}>
                        {prov.geologicalAge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Province Detail View */}
              {activeProvince && (
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 text-[#1F3A4D]">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1F3A4D] text-white font-mono text-[11px] font-bold">
                        {activeProvince.division}
                      </span>
                      <span className="text-xs font-semibold text-[#1F3A4D]/70">
                        {activeProvince.geologicalAge}
                      </span>
                    </div>

                    <h3 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D]">
                      {activeProvince.name}
                    </h3>

                    {activeProvince.highestPeak && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold">
                        <span>🏔️ Highest Elevation: {activeProvince.highestPeak.name}</span>
                        <span className="font-mono text-[11px]">({activeProvince.highestPeak.elevationMeters} m)</span>
                      </div>
                    )}
                  </div>

                  {/* Rock Systems */}
                  <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-2xs space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1F3A4D]/60 block">
                      Stratigraphic Rock Systems & Formations
                    </span>
                    <div className="space-y-1">
                      {activeProvince.rockSystems.map((rs, idx) => (
                        <div key={idx} className="text-xs sm:text-sm text-[#1F3A4D] flex items-start gap-2">
                          <span className="text-[#E07A3F] font-bold">•</span>
                          <span>{rs}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sub-divisions */}
                  <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-2xs space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1F3A4D]/60 block">
                      Geographic Sub-Divisions & Regional Units
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeProvince.subDivisions.map((sd, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-black/5 font-semibold text-[#1F3A4D]">
                          📍 {sd}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High Yield Prelims Facts */}
                  <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-300/80 text-purple-950 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-900 block">
                      UPSC Prelims High-Yield Distinctions & Traps
                    </span>
                    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                      {activeProvince.prelimsHighYieldFacts.map((fact, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-purple-700 flex-shrink-0 mt-0.5" />
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Economic Minerals & Resources */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300/80 text-amber-950 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
                      Strategic Economic Minerals & Industrial Raw Materials
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProvince.economicMinerals.map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-xs font-semibold">
                          💎 {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mains Significance */}
                  <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-2xs space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1F3A4D]/60 block">
                      Mains GS Paper 1 Significance & Geographic Principle
                    </span>
                    <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#1F3A4D]">
                      {activeProvince.mainsSignificance}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
