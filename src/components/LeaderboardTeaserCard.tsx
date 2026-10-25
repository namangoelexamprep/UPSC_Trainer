import React from 'react';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { UserRewards } from '../types';
import { getRankForXp } from '../utils/srsEngine';
import { Trophy, ChevronRight, Flame, Sparkles, Tv } from 'lucide-react';

interface LeaderboardTeaserCardProps {
  rewards: UserRewards;
  onOpenLeaderboard: () => void;
  onWatchAdForXp?: (amount?: number) => void;
}

export const LeaderboardTeaserCard: React.FC<LeaderboardTeaserCardProps> = ({
  rewards,
  onOpenLeaderboard,
  onWatchAdForXp
}) => {
  const userRank = getRankForXp(rewards?.xp || 0);
  const userXp = rewards?.xp || 0;

  // Find top 3 aspirants
  const top1 = INITIAL_LEADERBOARD[0]; // Radhika Sharma
  const top2 = INITIAL_LEADERBOARD[1]; // Ananya Verma

  return (
    <div className="my-4 bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE0] rounded-[24px] border border-[#1F3A4D]/15 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#1F3A4D]">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0 mt-0.5">
          🏆
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-title font-bold text-base text-[#1F3A4D]">
              All-India Cadet Leaderboard
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Ranks
            </span>
          </div>

          <p className="text-xs text-[#1F3A4D]/80 mt-1 leading-relaxed">
            Top Cadet: <strong>{top1.name}</strong> ({top1.xp} XP · {top1.state}) · Runner-up: <strong>{top2.name}</strong> ({top2.xp} XP).
            <br />
            Your Current Score: <strong>{userXp} XP</strong> ({userRank.name}). Gain +25 XP to jump higher!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
        {onWatchAdForXp && (
          <button
            onClick={() => onWatchAdForXp(25)}
            className="h-10 px-3.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-95 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
          >
            <Tv className="w-3.5 h-3.5 text-amber-200" />
            <span>+25 XP Ad</span>
          </button>
        )}

        <button
          onClick={onOpenLeaderboard}
          className="h-10 px-4 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] active:scale-95 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>View Leaderboard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
