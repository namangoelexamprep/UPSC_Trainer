import React, { useState } from 'react';
import { UserRewards, SRSRecord } from '../types';
import { BADGES_CATALOG, getRankForXp, getNextRank } from '../utils/srsEngine';
import { X, Award, Flame, Zap, Shield, CheckCircle2, Lock } from 'lucide-react';

interface BadgesModalProps {
  rewards: UserRewards;
  srsRecords: Record<string, SRSRecord>;
  onClose: () => void;
  onLaunchSRSReview: () => void;
  dueCount: number;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  rewards,
  srsRecords,
  onClose,
  onLaunchSRSReview,
  dueCount
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'unlocked' | 'locked'>('all');

  const userXp = rewards?.xp || 0;
  const userBadges = rewards?.badges || {};
  const rank = getRankForXp(userXp);
  const nextRankInfo = getNextRank(userXp);

  // Categorize places by SRS mastery
  const allRecords = Object.values(srsRecords || {});
  const masteredCount = allRecords.filter((r) => r.mastery >= 5).length;
  const learningCount = allRecords.filter((r) => r.mastery >= 2 && r.mastery < 5).length;
  const strugglingCount = allRecords.filter((r) => r.mastery === 1 || r.lapses > 1).length;

  const badges = BADGES_CATALOG.map((cat) => {
    const record = userBadges[cat.id] || { unlocked: false, progress: 0 };
    return {
      ...cat,
      unlocked: record.unlocked,
      progress: Math.min(cat.maxProgress, record.progress || 0),
      unlockedAt: record.unlockedAt
    };
  });

  const filteredBadges = badges.filter((b) => {
    if (filterCategory === 'unlocked') return b.unlocked;
    if (filterCategory === 'locked') return !b.unlocked;
    return true;
  });

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-[#1F3A4D]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[28px] border border-[#1F3A4D]/20 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 px-6 border-b border-[#1F3A4D]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E07A3F]/15 flex items-center justify-center text-xl">
              🏆
            </div>
            <div>
              <h2 className="font-serif-title font-bold text-lg text-[#1F3A4D]">
                Rewards & UPSC Cadet Ranks
              </h2>
              <p className="text-[11px] text-[#1F3A4D]/60 font-medium">
                {unlockedCount} of {badges.length} Badges Unlocked · {rewards.xp} Total XP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D]/70 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5">
          {/* Aspirant Rank Card */}
          <div className="bg-gradient-to-br from-[#1F3A4D] to-[#2E5570] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-white/15 px-2.5 py-0.5 rounded-md">
                    {rank.title}
                  </span>
                  <h3 className="font-serif-title text-xl font-bold mt-1.5 flex items-center gap-2">
                    <span>{rank.badgeEmoji}</span>
                    <span>{rank.name}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-[#E07A3F] px-3 py-1 rounded-xl font-bold text-xs shadow-sm">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{rewards.xp} XP</span>
                </div>
              </div>

              {/* Next rank progress */}
              {nextRankInfo.nextRank ? (
                <div className="mt-4 pt-3 border-t border-white/15">
                  <div className="flex items-center justify-between text-xs text-white/80 mb-1.5 font-medium">
                    <span>Next: {nextRankInfo.nextRank.name}</span>
                    <span>{nextRankInfo.neededXp} XP to go</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden">
                    <div
                      className="h-full bg-[#E07A3F] rounded-full transition-all duration-500"
                      style={{ width: `${nextRankInfo.progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-xs text-green-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Maximum Official Rank Achieved!</span>
                </div>
              )}
            </div>
          </div>

          {/* Daily Streak & Retention Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#FFFDF9] rounded-2xl p-3 border border-[#1F3A4D]/10 text-center shadow-xs">
              <div className="w-7 h-7 rounded-full bg-[#E07A3F]/15 flex items-center justify-center text-[#E07A3F] mx-auto mb-1">
                <Flame className="w-4 h-4 fill-[#E07A3F]" />
              </div>
              <span className="text-base font-bold text-[#1F3A4D] block leading-tight">
                {rewards.streakDays} Days
              </span>
              <span className="text-[10px] text-[#1F3A4D]/60 font-medium">Active Streak</span>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl p-3 border border-[#1F3A4D]/10 text-center shadow-xs">
              <div className="w-7 h-7 rounded-full bg-[#2E7D32]/15 flex items-center justify-center text-[#2E7D32] mx-auto mb-1">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-[#2E7D32] block leading-tight">
                {masteredCount}
              </span>
              <span className="text-[10px] text-[#1F3A4D]/60 font-medium">Level 5 Mastered</span>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl p-3 border border-[#1F3A4D]/10 text-center shadow-xs">
              <div className="w-7 h-7 rounded-full bg-[#E07A3F]/15 flex items-center justify-center text-[#E07A3F] mx-auto mb-1">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-[#1F3A4D] block leading-tight">
                {learningCount}
              </span>
              <span className="text-[10px] text-[#1F3A4D]/60 font-medium">In Learning</span>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl p-3 border border-[#1F3A4D]/10 text-center shadow-xs">
              <div className="w-7 h-7 rounded-full bg-[#C62828]/15 flex items-center justify-center text-[#C62828] mx-auto mb-1">
                ⚠️
              </div>
              <span className="text-base font-bold text-[#C62828] block leading-tight">
                {dueCount}
              </span>
              <span className="text-[10px] text-[#1F3A4D]/60 font-medium">Due for Review</span>
            </div>
          </div>

          {/* Quick SRS Action Banner if items are due */}
          {dueCount > 0 && (
            <div className="bg-[#FFF3E0] rounded-2xl p-4 border border-[#E07A3F]/30 flex items-center justify-between gap-3">
              <div>
                <span className="font-serif-title font-bold text-sm text-[#1F3A4D] block">
                  {dueCount} Locations scheduled for review today
                </span>
                <span className="text-xs text-[#1F3A4D]/75">
                  Spaced repetition optimizes your memory right before decay starts.
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onLaunchSRSReview();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#E07A3F] hover:bg-[#d66e34] active:scale-95 text-white font-bold text-xs whitespace-nowrap shadow-sm transition"
              >
                Start SRS Review
              </button>
            </div>
          )}

          {/* Badge Filter Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif-title font-bold text-base text-[#1F3A4D]">
                Achievement Badges
              </h4>
              <div className="flex items-center gap-1 bg-[#1F3A4D]/5 p-0.5 rounded-lg text-xs">
                {(['all', 'unlocked', 'locked'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterCategory(tab)}
                    className={`px-2.5 py-1 rounded-md font-semibold transition ${
                      filterCategory === tab
                        ? 'bg-white text-[#1F3A4D] shadow-xs'
                        : 'text-[#1F3A4D]/60 hover:text-[#1F3A4D]'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredBadges.map((badge) => {
                const percent = Math.round((badge.progress / badge.maxProgress) * 100);

                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl p-3.5 border transition-all ${
                      badge.unlocked
                        ? 'bg-[#FFFDF9] border-[#1F3A4D]/15 shadow-xs'
                        : 'bg-[#1F3A4D]/3 border-[#1F3A4D]/10 opacity-75'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                          badge.unlocked ? 'bg-[#E07A3F]/10' : 'bg-gray-200/50 grayscale'
                        }`}
                      >
                        {badge.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif-title font-bold text-sm text-[#1F3A4D] truncate">
                            {badge.title}
                          </h5>
                          {badge.unlocked ? (
                            <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              Unlocked
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-[#1F3A4D]/50 flex items-center gap-0.5">
                              <Lock className="w-3 h-3" />
                              {badge.progress}/{badge.maxProgress}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#1F3A4D]/75 line-clamp-2 mt-0.5 leading-snug">
                          {badge.description}
                        </p>

                        {!badge.unlocked && (
                          <div className="w-full h-1.5 rounded-full bg-[#1F3A4D]/10 overflow-hidden mt-2">
                            <div
                              className="h-full bg-[#E07A3F] rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
