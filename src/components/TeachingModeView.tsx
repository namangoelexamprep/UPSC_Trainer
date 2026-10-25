import React, { useState } from 'react';
import { Place, StateBoundary, Topic } from '../types';
import { getTopicTheory, UPSC_COAL_RIDDLES, getPlaceDossier } from '../data/upscTopicDossiers';
import { PlaceDetailModal } from './PlaceDetailModal';
import {
  BookOpen,
  Globe2,
  FileText,
  AlertTriangle,
  MapPin,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Flame,
  Factory,
  Layers,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  XCircle,
  Compass
} from 'lucide-react';

interface TeachingModeViewProps {
  topic: Topic;
  onSelectPlaceForQuiz: (placeName: string) => void;
  onStartFullDetectiveQuiz: () => void;
  onSelectPlaceOnMap?: (place: Place) => void;
}

type TheoryTab = 'THEORY' | 'ECONOMY' | 'POLICY' | 'TRAPS' | 'SITES';

export const TeachingModeView: React.FC<TeachingModeViewProps> = ({
  topic,
  onSelectPlaceForQuiz,
  onStartFullDetectiveQuiz,
  onSelectPlaceOnMap
}) => {
  const [activeTab, setActiveTab] = useState<TheoryTab>('THEORY');
  const [searchSite, setSearchSite] = useState<string>('');
  const [selectedDossierPlace, setSelectedDossierPlace] = useState<Place | null>(null);

  const theory = getTopicTheory(topic.id, topic);

  // Filtered places for sites tab
  const filteredPlaces = topic.places.filter(
    (p) =>
      p.name.toLowerCase().includes(searchSite.toLowerCase()) ||
      p.state.toLowerCase().includes(searchSite.toLowerCase()) ||
      p.category.toLowerCase().includes(searchSite.toLowerCase()) ||
      p.fact.toLowerCase().includes(searchSite.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF9F5] overflow-hidden text-[#1F3A4D]">
      {/* Dossier Header */}
      <div className="flex-none bg-[#FFFDF9] border-b border-[#1F3A4D]/15 p-4 sm:px-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                UPSC Syllabus Master Dossier
              </span>
              <span className="text-xs text-[#1F3A4D]/60 font-mono">{theory.tagline}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-serif text-[#1F3A4D] flex items-center gap-2">
              <span>{topic.emoji}</span>
              <span>{theory.conceptTitle}</span>
            </h1>
          </div>

          {/* Quick CTA to Test */}
          <button
            onClick={onStartFullDetectiveQuiz}
            className="flex-shrink-0 py-2.5 px-4 rounded-xl bg-[#E07A3F] hover:bg-[#C96832] text-white font-bold text-xs shadow-md transition flex items-center gap-2 self-start md:self-auto active:scale-95"
          >
            <span>🕵️‍♂️ Launch Clue Investigator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 mt-4 overflow-x-auto scrollbar-none pb-1 border-t border-[#1F3A4D]/10 pt-3">
          <button
            onClick={() => setActiveTab('THEORY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'THEORY'
                ? 'bg-[#1F3A4D] text-white shadow-sm'
                : 'text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> 1. Geological Genesis & Types
          </button>

          <button
            onClick={() => setActiveTab('ECONOMY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ECONOMY'
                ? 'bg-[#1F3A4D] text-white shadow-sm'
                : 'text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" /> 2. Trade, Imports & Economy
          </button>

          <button
            onClick={() => setActiveTab('POLICY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'POLICY'
                ? 'bg-[#1F3A4D] text-white shadow-sm'
                : 'text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10'
            }`}
          >
            <Factory className="w-3.5 h-3.5" /> 3. Reforms & Environment
          </button>

          <button
            onClick={() => setActiveTab('TRAPS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'TRAPS'
                ? 'bg-[#1F3A4D] text-white shadow-sm'
                : 'text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> 4. Prelims Traps
          </button>

          <button
            onClick={() => setActiveTab('SITES')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'SITES'
                ? 'bg-[#1F3A4D] text-white shadow-sm'
                : 'text-[#1F3A4D]/70 hover:bg-[#1F3A4D]/10'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> 5. Place Dossiers ({topic.places.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* TAB 1: GEOLOGICAL GENESIS & TYPES */}
        {activeTab === 'THEORY' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Definition Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E07A3F] uppercase tracking-wider mb-2 font-mono">
                <Layers className="w-4 h-4" /> Comprehensive Geological Definition
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#1F3A4D]">
                {theory.definition}
              </p>
            </div>

            {/* Coal Classification Stages Table (if applicable) */}
            {theory.coalificationStages && (
              <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black font-serif text-[#1F3A4D]">
                      Four Stages of Coalification (Rank & Carbon Content)
                    </h3>
                    <p className="text-xs text-[#1F3A4D]/70">
                      Standard UPSC classification by thermal maturity, calorific value, and volatile matter.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    High Prelims Yield
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#1F3A4D]/15 text-[#1F3A4D]/70 uppercase tracking-wider font-mono">
                        <th className="py-2.5 px-3">Coal Type</th>
                        <th className="py-2.5 px-3">Carbon %</th>
                        <th className="py-2.5 px-3">Moisture</th>
                        <th className="py-2.5 px-3">Calorific Value</th>
                        <th className="py-2.5 px-3">Indian Occurrences</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F3A4D]/10">
                      {theory.coalificationStages.map((stage, idx) => (
                        <tr key={idx} className="hover:bg-[#F9FAFB] transition">
                          <td className="py-3 px-3 font-bold text-[#1F3A4D] whitespace-nowrap">
                            {stage.stage}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-[#E07A3F] whitespace-nowrap">
                            {stage.carbon}
                          </td>
                          <td className="py-3 px-3 text-[#1F3A4D]/80 whitespace-nowrap">
                            {stage.moisture}
                          </td>
                          <td className="py-3 px-3 font-mono text-[#1F3A4D]/80 whitespace-nowrap">
                            {stage.calorific}
                          </td>
                          <td className="py-3 px-3 text-[#1F3A4D]/80">
                            <span className="font-medium text-[#1F3A4D]">{stage.places}</span>
                            <div className="text-[11px] text-[#1F3A4D]/60 mt-0.5">{stage.notes}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Gondwana vs Tertiary Geological Epochs */}
            {theory.geologicalEpochs && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {theory.geologicalEpochs.map((epoch, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#1F3A4D]/10 text-[#1F3A4D]">
                          {epoch.agePeriod}
                        </span>
                        <span className="text-xs font-bold text-emerald-700">{epoch.share}</span>
                      </div>
                      <h4 className="text-base font-bold font-serif text-[#1F3A4D] mb-2">{epoch.name}</h4>
                      <p className="text-xs leading-relaxed text-[#1F3A4D]/80 mb-3">
                        {epoch.characteristics}
                      </p>

                      <div className="text-xs font-bold text-[#1F3A4D] mb-1">Key Rift Basins & Fields:</div>
                      <ul className="text-xs text-[#1F3A4D]/70 space-y-1 pl-4 list-disc mb-3">
                        {epoch.riftBasins.map((basin, bIdx) => (
                          <li key={bIdx}>{basin}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#1F3A4D]/10 text-[11px]">
                      <span className="font-bold text-[#1F3A4D]">Distribution: </span>
                      <span className="text-[#1F3A4D]/80">{epoch.distribution}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Why is it Found There? (Tectonic & Geomorphological Rationale) */}
            <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm space-y-3">
              <h3 className="text-base font-black font-serif text-[#1F3A4D] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#E07A3F]" />
                <span>Why is it Found There? (Tectonic & Geomorphological Rationale)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {theory.whyFoundThere.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F9FA] border border-[#1F3A4D]/10">
                    <h5 className="font-bold text-sm text-[#1F3A4D] mb-1">{item.title}</h5>
                    <p className="text-xs text-[#1F3A4D]/80 leading-relaxed mb-2">
                      {item.geologicalContext}
                    </p>
                    <div className="text-[11px] text-[#E07A3F] font-medium border-t border-[#1F3A4D]/10 pt-2">
                      ⚡ {item.tectonicProcess}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRADE, IMPORTS & ECONOMY */}
        {activeTab === 'ECONOMY' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Global Standing Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm">
                <div className="text-xs font-bold text-[#1F3A4D]/60 uppercase tracking-wider font-mono">
                  Global Reserves
                </div>
                <div className="text-lg font-black text-[#1F3A4D] mt-1">{theory.indiaStanding.reservesRank}</div>
                <div className="text-xs text-[#1F3A4D]/70 mt-1">{theory.indiaStanding.reservesFigure}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm">
                <div className="text-xs font-bold text-[#1F3A4D]/60 uppercase tracking-wider font-mono">
                  Global Production
                </div>
                <div className="text-lg font-black text-emerald-700 mt-1">{theory.indiaStanding.productionRank}</div>
                <div className="text-xs text-[#1F3A4D]/70 mt-1">{theory.indiaStanding.productionFigure}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm">
                <div className="text-xs font-bold text-[#1F3A4D]/60 uppercase tracking-wider font-mono">
                  Import Volume
                </div>
                <div className="text-lg font-black text-[#E07A3F] mt-1">{theory.indiaStanding.importVolume}</div>
                <div className="text-xs text-[#1F3A4D]/70 mt-1">{theory.indiaStanding.exportFootprint}</div>
              </div>
            </div>

            {/* The Classic UPSC Mains Question: Why does India import coal when it is 2nd in production? */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#F5EFE6] border-2 border-[#E07A3F]/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E07A3F] text-white text-[11px] font-bold font-mono">
                  UPSC Mains Core Question
                </span>
                <span className="text-xs font-bold text-[#1F3A4D]">Paper 1 & Paper 3 Model Analytical Framework</span>
              </div>

              <h3 className="text-lg font-black font-serif text-[#1F3A4D]">
                Why Does India Import Massive Coal Despite Possessing the 5th Largest Geological Reserves?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className="p-4 rounded-xl bg-white border border-[#1F3A4D]/10">
                  <div className="font-black text-sm text-[#1F3A4D] mb-1 flex items-center gap-1.5">
                    <span>🔥</span> 1. Prime Coking Coal Deficit for Steel
                  </div>
                  <p className="text-[#1F3A4D]/80 mb-2">
                    {theory.indiaStanding.importRationale.coking}
                  </p>
                  <div className="font-semibold text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200">
                    Crucial Fact: Steel blast furnaces require coke with &lt;10% ash. Gondwana coal has 35-50% ash, causing high slag and damaging furnace walls!
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1F3A4D]/10">
                  <div className="font-black text-sm text-[#1F3A4D] mb-1 flex items-center gap-1.5">
                    <span>🚢</span> 2. Coastal Freight Economics (Thermal Coal)
                  </div>
                  <p className="text-[#1F3A4D]/80 mb-2">
                    {theory.indiaStanding.importRationale.thermal}
                  </p>
                  <div className="font-semibold text-blue-800 bg-blue-50 p-2 rounded-lg border border-blue-200">
                    Logistics Rationale: Transporting coal via railways from Jharkhand to Gujarat (~1,800 km) costs more per ton than ocean shipping from Kalimantan (Indonesia)!
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-[#1F3A4D]/10 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-[#1F3A4D]">Key Source Countries:</span>
                {theory.indiaStanding.sourceCountries.map((c, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Forward and Backward Industrial Linkages */}
            <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm space-y-3">
              <h3 className="text-base font-black font-serif text-[#1F3A4D]">
                Industrial Linkages & Economic Multipliers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {theory.economicAndIndustrialUses.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F9FA] border border-[#1F3A4D]/10">
                    <div className="text-xs font-mono font-bold text-[#E07A3F]">{item.sharePct}</div>
                    <h5 className="font-bold text-sm text-[#1F3A4D] mb-1">{item.sector}</h5>
                    <p className="text-xs text-[#1F3A4D]/80 mb-2">{item.role}</p>
                    <div className="text-[11px] text-[#1F3A4D]/60 pt-2 border-t border-[#1F3A4D]/10">
                      <strong>Linkage: </strong>{item.forwardBackwardLinkage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REFORMS & ENVIRONMENT */}
        {activeTab === 'POLICY' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Legislative Reforms */}
            <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black font-serif text-[#1F3A4D]">
                  Statutory & Policy Reforms in Mineral Governance
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  GS Paper 3
                </span>
              </div>

              <div className="space-y-3">
                {theory.reformsAndPolicy.map((reform, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F9FA] border border-[#1F3A4D]/10">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-[#1F3A4D]">{reform.actPolicy}</h4>
                      <span className="text-xs font-mono font-bold text-[#E07A3F]">{reform.year}</span>
                    </div>
                    <p className="text-xs text-[#1F3A4D]/80 leading-relaxed mb-2">
                      <strong className="text-[#1F3A4D]">Key Provision: </strong>{reform.keyProvision}
                    </p>
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <strong>UPSC Impact: </strong>{reform.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Flashpoints & Green Transition */}
            <div className="p-5 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black font-serif text-[#1F3A4D] flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-600" />
                  <span>Environmental Flashpoints & Ecological Dilemmas</span>
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  GS Paper 3 Ecology
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {theory.environmentalIssues.map((env, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-rose-50/50 border border-rose-200">
                    <h5 className="font-bold text-sm text-rose-950 mb-1">{env.topic}</h5>
                    <p className="text-xs text-rose-900/80 leading-relaxed mb-3">
                      {env.details}
                    </p>
                    <div className="text-[11px] text-[#1F3A4D] bg-white p-2 rounded-lg border border-rose-200">
                      <strong>State Response: </strong>{env.governmentInitiative}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRELIMS TRAPS & MEMORY MATRIX */}
        {activeTab === 'TRAPS' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950">
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>UPSC Prelims Question Setter Trap Matrix</span>
              </div>
              <p className="text-xs text-amber-900/80">
                UPSC Civil Services Prelims frequently tests candidates on subtle contradictions, absolute qualifiers ("all", "exclusively"), and inverse chemical properties. Master these core assertions:
              </p>
            </div>

            <div className="space-y-3">
              {theory.prelimsTraps.map((trap, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border shadow-sm ${
                    trap.isTrue
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-rose-50/60 border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#1F3A4D]/60">
                      Question Statement #{idx + 1}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-black font-mono flex items-center gap-1 ${
                        trap.isTrue
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {trap.isTrue ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {trap.isTrue ? 'VERIFIED TRUE' : 'FALSE / TRAP'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-[#1F3A4D] mb-2 font-serif">
                    "{trap.statement}"
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-[#1F3A4D]/10 text-xs text-[#1F3A4D]/80 mb-2">
                    <strong className="text-[#1F3A4D]">Why? </strong>
                    {trap.trapReason}
                  </div>

                  <div className="text-[11px] font-bold text-[#E07A3F] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prelims Tip: {trap.prelimsTip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PLACE-BY-PLACE PRELIMS DOSSIERS */}
        {activeTab === 'SITES' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Search Site Bar */}
            <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm">
              <Search className="w-4 h-4 text-[#1F3A4D]/50" />
              <input
                type="text"
                placeholder="Search by coalfield name, state, river basin or key fact..."
                value={searchSite}
                onChange={(e) => setSearchSite(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#1F3A4D] focus:outline-none"
              />
              {searchSite && (
                <button
                  onClick={() => setSearchSite('')}
                  className="text-xs text-[#1F3A4D]/50 hover:text-[#1F3A4D]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Place Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredPlaces.map((place) => {
                const dossier = getPlaceDossier(place, topic);

                return (
                  <div
                    key={place.name}
                    className="p-4 rounded-2xl bg-white border border-[#1F3A4D]/15 shadow-sm hover:border-[#E07A3F] transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#E07A3F]" />
                          <h4 className="font-black text-base text-[#1F3A4D] font-serif">{place.name}</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-100 text-amber-900">
                          {place.category}
                        </span>
                      </div>

                      <div className="text-xs text-[#1F3A4D]/60 font-medium mb-2">
                        {place.state} · <span className="font-mono">{place.lat.toFixed(2)}°N, {place.lon.toFixed(2)}°E</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#1F3A4D]/10 text-xs text-[#1F3A4D] mb-3">
                        <div className="font-bold text-[#E07A3F] text-[11px] uppercase tracking-wider mb-0.5">
                          UPSC Prelims Fact:
                        </div>
                        {dossier.fact1Core}
                      </div>

                      <div className="text-[11px] text-[#1F3A4D]/70 italic mb-3">
                        "{dossier.whoAmIRiddle.slice(0, 120)}..."
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1F3A4D]/10">
                      <button
                        onClick={() => setSelectedDossierPlace(place)}
                        className="w-full py-2 px-3 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>📖 Read Complete UPSC Dossier</span>
                      </button>

                      <div className="flex gap-2">
                        {onSelectPlaceOnMap && (
                          <button
                            onClick={() => onSelectPlaceOnMap(place)}
                            className="flex-1 py-1.5 px-2 rounded-xl border border-[#1F3A4D]/20 text-[#1F3A4D] hover:bg-[#1F3A4D]/5 font-semibold text-xs transition text-center"
                          >
                            Map 📍
                          </button>
                        )}
                        <button
                          onClick={() => onSelectPlaceForQuiz(place.name)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-[#E07A3F] hover:bg-[#C96832] text-white font-bold text-xs shadow-2xs transition text-center flex items-center justify-center gap-1"
                        >
                          <span>Clue 🕵️‍♂️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FULL UPSC DOSSIER MODAL */}
      {selectedDossierPlace && (
        <PlaceDetailModal
          place={selectedDossierPlace}
          topic={topic}
          allPlacesInTopic={filteredPlaces}
          onClose={() => setSelectedDossierPlace(null)}
          onSelectPlace={(p) => setSelectedDossierPlace(p)}
          onLaunchClueMode={(placeName) => {
            setSelectedDossierPlace(null);
            onSelectPlaceForQuiz(placeName);
          }}
          onSelectState={(st) => {
            setSelectedDossierPlace(null);
            if (onSelectPlaceOnMap && selectedDossierPlace) {
              onSelectPlaceOnMap(selectedDossierPlace);
            }
          }}
        />
      )}
    </div>
  );
};
