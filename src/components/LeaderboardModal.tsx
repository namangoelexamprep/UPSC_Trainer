import React, { useState, useEffect } from 'react';
import { INITIAL_LEADERBOARD, LeaderboardEntry } from '../data/leaderboardData';
import { UserRewards } from '../types';
import { getRankForXp } from '../utils/srsEngine';
import {
  Trophy,
  Flame,
  Award,
  Zap,
  Sparkles,
  X,
  TrendingUp,
  Tv,
  Play,
  UserCheck,
  RefreshCw,
  Crown
} from 'lucide-react';

interface LeaderboardModalProps {
  rewards: UserRewards;
  onClose: () => void;
  onWatchAdForXp?: (amount?: number) => void;
  onStartSprint?: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  rewards,
  onClose,
  onWatchAdForXp,
  onStartSprint
}) => {
  const [activeTab, setActiveTab] = useState<'WEEKLY' | 'ALL_TIME'>('WEEKLY');
  const [peers, setPeers] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [livePulseId, setLivePulseId] = useState<string | null>(null);

  const userRank = getRankForXp(rewards?.xp || 0);

  // Periodically simulate small live XP gains for peers to make leaderboard feel alive & changing
  useEffect(() => {
    const timer = setInterval(() => {
      setPeers((prevPeers) => {
        const randomIndex = Math.floor(Math.random() * prevPeers.length);
        const target = prevPeers[randomIndex];
        if (!target) return prevPeers;

        const bonusXp = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
        setLivePulseId(target.id);
        setTimeout(() => setLivePulseId(null), 2500);

        return prevPeers.map((p) =>
          p.id === target.id
            ? { ...p, xp: p.xp + bonusXp }
            : p
        );
      });
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  // Construct combined list including Current User
  const currentUserEntry: LeaderboardEntry = {
    id: 'current-user-me',
    name: 'You (UPSC Aspirant)',
    avatarEmoji: userRank.badgeEmoji || '🎯',
    state: 'India',
    xp: rewards?.xp || 0,
    streakDays: rewards?.streakDays || 0,
    badgeTitle: userRank.name,
    isCurrentUser: true
  };

  const combinedList = [...peers, currentUserEntry].sort((a, b) => b.xp - a.xp);
  const userPosition = combinedList.findIndex((item) => item.isCurrentUser) + 1;

  return (
    <div className="fixed inset-0 z-50 bg-[#1F3A4D]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[28px] border border-[#1F3A4D]/20 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1F3A4D]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1F3A4D]/10 bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A3F] font-mono">
                  Live Aspirants Arena
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h2 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D] leading-tight">
                All-India Cadet Leaderboard
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D] transition"
            title="Close leaderboard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Current Position Spotlight Bar */}
        <div className="p-3.5 bg-[#1F3A4D] text-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-[#1F3A4D] font-black flex items-center justify-center text-sm shadow-xs">
              #{userPosition}
            </div>
            <div>
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <span>{currentUserEntry.name}</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded text-white font-mono">
                  {userRank.name}
                </span>
              </div>
              <div className="text-[11px] text-white/80">
                {rewards?.xp || 0} XP Total · {rewards?.streakDays || 0} Day Streak
              </div>
            </div>
          </div>

          {/* Quick XP Boost Action Buttons inside Leaderboard */}
          <div className="flex items-center gap-1.5">
            {onWatchAdForXp && (
              <button
                onClick={() => onWatchAdForXp(25)}
                className="px-3 py-1.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition active:scale-95"
              >
                <Tv className="w-3.5 h-3.5 text-amber-200" />
                <span>+25 XP (Watch Ad)</span>
              </button>
            )}

            {onStartSprint && (
              <button
                onClick={() => {
                  onClose();
                  onStartSprint();
                }}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-[#1F3A4D] font-bold text-[11px] flex items-center gap-1 shadow-xs transition active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Solve Sprint</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-[#1F3A4D]/10 bg-[#FAF7F0] px-4 py-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('WEEKLY')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'WEEKLY'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/70 hover:bg-white/80'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Weekly Sprint Leaders</span>
          </button>

          <button
            onClick={() => setActiveTab('ALL_TIME')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'ALL_TIME'
                ? 'bg-[#1F3A4D] text-white shadow-xs'
                : 'text-[#1F3A4D]/70 hover:bg-white/80'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>All-Time Cadet Ranks</span>
          </button>
        </div>

        {/* Leaderboard List Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
          {combinedList.map((entry, idx) => {
            const rankNum = idx + 1;
            const isMe = entry.isCurrentUser;
            const isPulsing = livePulseId === entry.id;

            return (
              <div
                key={entry.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isMe
                    ? 'bg-amber-500/15 border-amber-400 shadow-sm ring-2 ring-amber-400/40'
                    : isPulsing
                    ? 'bg-emerald-50 border-emerald-300 shadow-md scale-[1.01]'
                    : 'bg-white border-[#1F3A4D]/10 hover:border-[#1F3A4D]/25'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      rankNum === 1
                        ? 'bg-amber-400 text-[#1F3A4D] shadow-xs'
                        : rankNum === 2
                        ? 'bg-slate-300 text-[#1F3A4D]'
                        : rankNum === 3
                        ? 'bg-amber-700/30 text-amber-900'
                        : 'bg-[#1F3A4D]/5 text-[#1F3A4D]/70'
                    }`}
                  >
                    {rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : rankNum === 3 ? '🥉' : `#${rankNum}`}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-[#1F3A4D]/5 flex items-center justify-center text-lg flex-shrink-0">
                    {entry.avatarEmoji}
                  </div>

                  {/* Aspirant Details */}
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-xs sm:text-sm truncate ${isMe ? 'text-[#E07A3F]' : 'text-[#1F3A4D]'}`}>
                        {entry.name}
                      </span>
                      {isMe && (
                        <span className="text-[9px] font-black text-white bg-[#E07A3F] px-1.5 py-0.2 rounded uppercase">
                          YOU
                        </span>
                      )}
                      {isPulsing && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded animate-bounce">
                          +XP Active!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[#1F3A4D]/60 mt-0.5">
                      <span>📍 {entry.state}</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-800">{entry.badgeTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Right Metrics (XP & Streak) */}
                <div className="flex items-center gap-3 flex-shrink-0 text-right">
                  {entry.streakDays > 0 && (
                    <div className="flex items-center gap-0.5 text-[11px] font-bold text-[#E07A3F]" title="Daily Streak">
                      <Flame className="w-3.5 h-3.5 fill-[#E07A3F]" />
                      <span>{entry.streakDays}d</span>
                    </div>
                  )}

                  <div className="bg-[#1F3A4D]/5 px-2.5 py-1 rounded-xl font-bold text-xs text-[#1F3A4D] whitespace-nowrap">
                    {entry.xp} <span className="text-[10px] text-[#E07A3F]">XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Motivation Banner */}
        <div className="p-3.5 border-t border-[#1F3A4D]/10 bg-[#FAF7F0] flex items-center justify-between gap-3 text-xs text-[#1F3A4D]/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              <strong>Pro Aspirant Tip:</strong> Complete 10-Q Sprints & watch sponsored study spots to gain **+25 XP** and climb to AIR #1!
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-xs shadow-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
