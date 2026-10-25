import React, { useState, useMemo } from 'react';
import { Place, SRSRecord, Topic, UserRewards } from '../types';
import { getRankForXp, getNextRank, ASPIRANT_RANKS } from '../utils/srsEngine';
import {
  Trophy,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Compass,
  ArrowRight,
  BookOpen,
  Filter
} from 'lucide-react';

interface InteractiveProgressBarProps {
  topics: Topic[];
  masteryMap: Record<string, number>;
  srsRecords: Record<string, SRSRecord>;
  rewards: UserRewards;
  dueCount: number;
  onSelectTopicPlace?: (topic: Topic, place: Place) => void;
  onStartPlaceQuiz?: (topic: Topic) => void;
  onOpenBadges?: () => void;
}

export type MasteryFilterTier = 'ALL' | 'MASTERED' | 'LEARNING' | 'STRUGGLING' | 'DUE';

export const InteractiveProgressBar: React.FC<InteractiveProgressBarProps> = ({
  topics,
  masteryMap,
  srsRecords,
  rewards,
  dueCount,
  onSelectTopicPlace,
  onStartPlaceQuiz,
  onOpenBadges
}) => {
  const [selectedTier, setSelectedTier] = useState<MasteryFilterTier>('ALL');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeMilestoneHover, setActiveMilestoneHover] = useState<number | null>(null);

  // Compute all places flattened with their mastery status
  const allPlacesFlattened = useMemo(() => {
    const list: {
      place: Place;
      topic: Topic;
      mastery: number;
      isDue: boolean;
      srs?: SRSRecord;
    }[] = [];

    topics.forEach((t) => {
      t.places.forEach((p) => {
        const key = `${t.id}|${p.name}`;
        const mastery = masteryMap[key] || 0;
        const srs = srsRecords[key];
        const isDue = srs ? srs.nextReviewAt <= Date.now() : false;
        list.push({ place: p, topic: t, mastery, isDue, srs });
      });
    });

    return list;
  }, [topics, masteryMap, srsRecords]);

  const totalPlacesCount = allPlacesFlattened.length || 226;
  const masteredList = useMemo(() => allPlacesFlattened.filter((item) => item.mastery >= 4), [allPlacesFlattened]);
  const learningList = useMemo(
    () => allPlacesFlattened.filter((item) => item.mastery >= 2 && item.mastery < 4),
    [allPlacesFlattened]
  );
  const strugglingList = useMemo(
    () => allPlacesFlattened.filter((item) => item.mastery < 2),
    [allPlacesFlattened]
  );
  const dueList = useMemo(() => allPlacesFlattened.filter((item) => item.isDue), [allPlacesFlattened]);

  const masteredCount = masteredList.length;
  const learningCount = learningList.length;
  const strugglingCount = strugglingList.length;

  const masteredPct = Math.round((masteredCount / totalPlacesCount) * 100);
  const learningPct = Math.round((learningCount / totalPlacesCount) * 100);
  const strugglingPct = Math.max(0, 100 - masteredPct - learningPct);

  // Overall syllabus mastery %
  const totalPossibleMastery = totalPlacesCount * 5;
  const currentTotalMastery = allPlacesFlattened.reduce((acc, cur) => acc + cur.mastery, 0);
  const overallMasteryPct = totalPossibleMastery > 0 ? Math.round((currentTotalMastery / totalPossibleMastery) * 100) : 0;

  const rank = getRankForXp(rewards?.xp || 0);
  const nextRankInfo = getNextRank(rewards?.xp || 0);

  // Milestones
  const milestones = [
    { pct: 0, label: 'Beginner', title: 'District Explorer', minXp: 0, emoji: '🧭' },
    { pct: 25, label: '25% Cadre', title: 'Cadre Trainee', minXp: 150, emoji: '📜' },
    { pct: 50, label: '50% Halfway', title: 'Sub-Divisional Magistrate', minXp: 400, emoji: '⚖️' },
    { pct: 75, label: '75% Advanced', title: 'District Collector', minXp: 850, emoji: '🏛️' },
    { pct: 100, label: '100% Master', title: 'Surveyor General of India', minXp: 1600, emoji: '🇮🇳' }
  ];

  // Filter list based on selected tier and search
  const displayedPlaces = useMemo(() => {
    let base = allPlacesFlattened;
    if (selectedTier === 'MASTERED') base = masteredList;
    else if (selectedTier === 'LEARNING') base = learningList;
    else if (selectedTier === 'STRUGGLING') base = strugglingList;
    else if (selectedTier === 'DUE') base = dueList;

    if (!searchFilter.trim()) return base;
    const q = searchFilter.toLowerCase();
    return base.filter(
      (item) =>
        item.place.name.toLowerCase().includes(q) ||
        item.place.state.toLowerCase().includes(q) ||
        item.topic.title.toLowerCase().includes(q) ||
        item.place.fact.toLowerCase().includes(q)
    );
  }, [allPlacesFlattened, selectedTier, masteredList, learningList, strugglingList, dueList, searchFilter]);

  const handleTierClick = (tier: MasteryFilterTier) => {
    if (selectedTier === tier && isExpanded) {
      setIsExpanded(false);
    } else {
      setSelectedTier(tier);
      setIsExpanded(true);
    }
  };

  return (
    <div className="bg-[#FFFDF9] rounded-[24px] border border-[#1F3A4D]/12 shadow-sm p-4 sm:p-5 mb-5 transition-all">
      {/* Top Header: Syllabus Mastery & Rank Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A3F] bg-[#E07A3F]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Syllabus Coverage Tracker
            </span>
            <span className="text-xs text-[#1F3A4D]/60 font-medium">
              Interactive Milestone Bar
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="font-serif-title font-bold text-xl sm:text-2xl text-[#1F3A4D]">
              {overallMasteryPct}% Prelims Map Syllabus Mastered
            </h2>
            <span className="text-xs font-semibold text-[#1F3A4D]/60">
              ({masteredCount} of {totalPlacesCount} locations at Lv 4–5)
            </span>
          </div>
        </div>

        {/* Cadet Rank Card Widget */}
        <div
          onClick={onOpenBadges}
          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 cursor-pointer border border-[#1F3A4D]/10 transition group"
          title="Click to view all Badges and Rank milestones"
        >
          <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg">
            {rank.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#1F3A4D] group-hover:text-[#E07A3F] transition-colors">
                {rank.name}
              </span>
              <span className="text-[10px] text-[#E07A3F] font-bold">· {rewards?.xp || 0} XP</span>
            </div>
            <p className="text-[10px] text-[#1F3A4D]/60">
              {nextRankInfo.nextRank
                ? `${nextRankInfo.neededXp} XP to ${nextRankInfo.nextRank.name}`
                : 'Highest Cadre Rank Achieved!'}
            </p>
          </div>
        </div>
      </div>

      {/* The Interactive Segmented Progress Bar */}
      <div className="relative pt-1 pb-4">
        {/* The Track with segments */}
        <div className="w-full h-4 rounded-full bg-[#1F3A4D]/10 overflow-hidden flex shadow-inner cursor-pointer relative">
          {/* Mastered Segment (Green) */}
          <div
            style={{ width: `${masteredPct}%` }}
            onClick={() => handleTierClick('MASTERED')}
            className="h-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-500 relative group"
            title={`Mastered: ${masteredCount} places (${masteredPct}%)`}
          />

          {/* Learning Segment (Amber) */}
          <div
            style={{ width: `${learningPct}%` }}
            onClick={() => handleTierClick('LEARNING')}
            className="h-full bg-amber-500 hover:bg-amber-400 transition-all duration-500 relative group"
            title={`In Progress: ${learningCount} places (${learningPct}%)`}
          />

          {/* Weak / Unlearned Segment (Slate / Rose) */}
          <div
            style={{ width: `${strugglingPct}%` }}
            onClick={() => handleTierClick('STRUGGLING')}
            className="h-full bg-[#1F3A4D]/25 hover:bg-[#1F3A4D]/35 transition-all duration-500 relative group"
            title={`Needs Practice: ${strugglingCount} places (${strugglingPct}%)`}
          />
        </div>

        {/* Milestone Indicator Nodes */}
        <div className="relative w-full h-0">
          {milestones.map((m, idx) => {
            const isReached = overallMasteryPct >= m.pct;
            return (
              <div
                key={m.pct}
                style={{ left: `${m.pct}%` }}
                className="absolute -top-3.5 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
                onClick={() => {
                  setActiveMilestoneHover(idx);
                  setIsExpanded(true);
                }}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center ${
                    isReached
                      ? 'bg-emerald-600 border-white shadow-sm scale-110'
                      : 'bg-white border-[#1F3A4D]/40'
                  }`}
                />
                <span className="text-[9px] font-bold text-[#1F3A4D]/60 mt-2.5 hidden sm:block whitespace-nowrap">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1F3A4D]/10">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleTierClick('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedTier === 'ALL' && isExpanded
                ? 'bg-[#1F3A4D] text-white shadow-sm'
                : 'bg-[#1F3A4D]/5 text-[#1F3A4D] hover:bg-[#1F3A4D]/10'
            }`}
          >
            <span>All</span>
            <span className="text-[10px] opacity-75">({totalPlacesCount})</span>
          </button>

          <button
            onClick={() => handleTierClick('MASTERED')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedTier === 'MASTERED' && isExpanded
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Mastered (Lv 4–5)</span>
            <span className="text-[10px] opacity-75">({masteredCount})</span>
          </button>

          <button
            onClick={() => handleTierClick('LEARNING')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedTier === 'LEARNING' && isExpanded
                ? 'bg-amber-700 text-white shadow-sm'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>In Review (Lv 2–3)</span>
            <span className="text-[10px] opacity-75">({learningCount})</span>
          </button>

          <button
            onClick={() => handleTierClick('STRUGGLING')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedTier === 'STRUGGLING' && isExpanded
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Needs Practice</span>
            <span className="text-[10px] opacity-75">({strugglingCount})</span>
          </button>

          {dueCount > 0 && (
            <button
              onClick={() => handleTierClick('DUE')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTier === 'DUE' && isExpanded
                  ? 'bg-[#C62828] text-white shadow-sm animate-none'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 animate-pulse'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Due Today</span>
              <span className="text-[10px] opacity-90">({dueCount})</span>
            </button>
          )}
        </div>

        {/* Expand / Collapse Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-[#1F3A4D]/70 hover:text-[#1F3A4D] flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#1F3A4D]/5 transition"
        >
          <span>{isExpanded ? 'Hide Location Drilldown' : 'Drill Down Locations'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Drilldown Drawer */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#1F3A4D]/10 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Bar inside drawer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1F3A4D]/40" />
              <input
                type="text"
                placeholder="Search location, state, mineral..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F7F2EA] text-xs text-[#1F3A4D] placeholder-[#1F3A4D]/40 border border-[#1F3A4D]/15 focus:outline-none focus:border-[#E07A3F]"
              />
            </div>

            <span className="text-[11px] text-[#1F3A4D]/60 self-start sm:self-auto font-medium">
              Showing {displayedPlaces.length} matching locations
            </span>
          </div>

          {/* List of locations */}
          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {displayedPlaces.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#1F3A4D]/60">
                No locations match your filter.
              </div>
            ) : (
              displayedPlaces.slice(0, 40).map((item) => {
                const badgeColor =
                  item.mastery >= 4
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : item.mastery >= 2
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-rose-100 text-rose-900 border-rose-300';

                return (
                  <div
                    key={`${item.topic.id}-${item.place.name}`}
                    className="p-3 rounded-xl bg-white border border-[#1F3A4D]/10 shadow-xs hover:border-[#E07A3F]/50 transition flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="text-base flex-shrink-0 mt-0.5">{item.topic.emoji}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif-title font-bold text-sm text-[#1F3A4D] group-hover:text-[#E07A3F] transition-colors truncate">
                            {item.place.name}
                          </span>
                          <span className="text-[10px] text-[#1F3A4D]/60 font-semibold">
                            ({item.place.state})
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badgeColor}`}>
                            Level {item.mastery}/5
                          </span>
                          {item.isDue && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-600 text-white animate-pulse">
                              SRS Due
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#1F3A4D]/75 line-clamp-1 mt-0.5">
                          {item.place.fact}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => onSelectTopicPlace?.(item.topic, item.place)}
                        className="h-8 px-2.5 rounded-lg bg-[#1F3A4D] hover:bg-[#152734] text-white text-[11px] font-bold flex items-center gap-1 transition shadow-xs"
                        title="Locate on Interactive Map & Study"
                      >
                        <Compass className="w-3 h-3 text-[#E07A3F]" />
                        <span className="hidden sm:inline">Explore</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {displayedPlaces.length > 40 && (
              <p className="text-center text-[11px] text-[#1F3A4D]/60 pt-2 pb-1 font-medium">
                Showing first 40 of {displayedPlaces.length} locations. Use search box above to narrow down.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
