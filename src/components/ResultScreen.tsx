import React, { useEffect } from 'react';
import { Badge, QuizResultItem, Topic } from '../types';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Home, CheckCircle2, XCircle, Zap, Clock } from 'lucide-react';
import { AdBannerWidget } from './AdBannerWidget';
import { BannerAd } from './BannerAd';

interface ResultScreenProps {
  topic: Topic;
  results: QuizResultItem[];
  xpEarned?: number;
  newlyUnlockedBadges?: Badge[];
  onRetryMissed: () => void;
  onDone: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  topic,
  results,
  xpEarned = 0,
  newlyUnlockedBadges = [],
  onRetryMissed,
  onDone
}) => {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct * 100) / total) : 0;
  const missedCount = total - correct;
  const totalHintsUsed = results.reduce((sum, r) => sum + (r.hintsUsed || 0), 0);
  const totalHintPenalty = results.reduce((sum, r) => sum + (r.hintPenalty || 0), 0);

  useEffect(() => {
    if (percentage >= 70 || newlyUnlockedBadges.length > 0) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage, newlyUnlockedBadges]);

  const verdict =
    percentage >= 90
      ? { emoji: '🏆', title: 'Outstanding Mastery!', desc: 'Exceptional geographical precision. UPSC prelims marks locked in.' }
      : percentage >= 70
      ? { emoji: '🌟', title: 'Great Preparation!', desc: 'Solid recall of locations and syllabus facts. Ready for the exam!' }
      : percentage >= 50
      ? { emoji: '📈', title: 'Good Effort!', desc: 'Fair foundation. Revise the missed places to lock them into long-term memory.' }
      : { emoji: '🎯', title: 'Keep Training!', desc: 'Active recall takes practice. Retry missed questions to build instant map muscle memory.' };

  return (
    <div className="min-h-screen bg-[#F7F2EA] px-4 py-6 max-w-2xl mx-auto pb-28">
      {/* Unlocked Badges Banner */}
      {newlyUnlockedBadges.length > 0 && (
        <div className="mb-4 bg-gradient-to-r from-[#E07A3F] to-[#f0945e] text-white rounded-2xl p-4 shadow-md animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎉</span>
            <span className="font-bold text-xs uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              New Badge Unlocked!
            </span>
          </div>
          {newlyUnlockedBadges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-3 bg-white/10 rounded-xl p-2.5 mt-1.5">
              <span className="text-2xl">{badge.emoji}</span>
              <div>
                <h4 className="font-bold text-sm leading-tight">{badge.title}</h4>
                <p className="text-[11px] text-white/90">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Score Summary Card */}
      <div className="bg-[#FFFDF9] rounded-[28px] p-6 border border-[#1F3A4D]/15 shadow-sm text-center">
        <div className="text-4xl mb-2">{verdict.emoji}</div>
        <h1 className="font-serif-title text-2xl font-bold text-[#1F3A4D]">
          {verdict.title}
        </h1>
        <p className="text-xs text-[#1F3A4D]/75 mt-1 max-w-sm mx-auto">
          {verdict.desc}
        </p>

        {/* Circular Score Indicator */}
        <div className="relative w-28 h-28 mx-auto my-5 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#1F3A4D]/10"
              strokeWidth="3.2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={percentage >= 70 ? 'text-[#2E7D32]' : 'text-[#E07A3F]'}
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              strokeWidth="3.2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-bold leading-none">{percentage}%</span>
            <span className="text-[10px] block text-[#1F3A4D]/60 mt-0.5">
              {correct} / {total} Correct
            </span>
          </div>
        </div>

        {/* Rewards Earned Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-[#1F3A4D]/5 rounded-xl py-2 px-4 max-w-md mx-auto text-xs font-bold text-[#1F3A4D]">
          <span className="flex items-center gap-1 text-[#E07A3F]">
            <Zap className="w-3.5 h-3.5" />
            <span>+{xpEarned} XP Earned</span>
            {totalHintPenalty > 0 && (
              <span className="text-[10px] text-amber-800 bg-amber-100/80 font-mono px-2 py-0.5 rounded-full ml-1">
                (-{totalHintPenalty} XP from {totalHintsUsed} hint{totalHintsUsed > 1 ? 's' : ''})
              </span>
            )}
          </span>
          <span className="text-[#1F3A4D]/30 hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-[#2E7D32]">
            <Clock className="w-3.5 h-3.5" />
            <span>SRS Schedules Updated</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-5">
          {missedCount > 0 && (
            <button
              onClick={onRetryMissed}
              className="flex-1 h-11 rounded-xl bg-[#E07A3F] hover:bg-[#d66e34] active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry {missedCount} Missed</span>
            </button>
          )}

          <button
            onClick={onDone}
            className="flex-1 h-11 rounded-xl bg-[#1F3A4D] hover:bg-[#132532] active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Detailed Review Section */}
      <div className="mt-8">
        <h2 className="font-serif-title font-bold text-lg text-[#1F3A4D] mb-3">
          Question Review & Spaced Intervals ({results.length})
        </h2>

        <div className="flex flex-col gap-3">
          {results.map((item, idx) => {
            const q = item.question;
            const isCorrect = item.isCorrect;

            return (
              <div
                key={idx}
                className="bg-[#FFFDF9] rounded-[20px] p-4 border border-[#1F3A4D]/10 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#C62828] flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F3A4D]/50">
                        Q{idx + 1} · {q.type}
                      </span>
                      {q.targetPlace && (
                        <span className="text-[10px] font-medium text-[#1F3A4D]/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {isCorrect ? 'Interval expanded' : 'Scheduled for tomorrow'}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-title font-bold text-sm text-[#1F3A4D] mt-0.5">
                      {q.prompt}
                    </h3>

                    {q.type === 'TAP_MAP' && (
                      <p className={`text-xs mt-1.5 font-medium ${isCorrect ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>
                        {isCorrect
                          ? `✓ Accurately tapped within ${Math.round(item.distanceKm || 0)} km`
                          : `✗ Tapped ${Math.round(item.distanceKm || 0)} km away (Target: ${q.targetPlace?.name})`}
                      </p>
                    )}

                    {q.type !== 'TAP_MAP' && q.options && (
                      <div className="mt-1.5 text-xs">
                        {!isCorrect && item.userOptionIndex !== undefined && item.userOptionIndex >= 0 && (
                          <p className="text-[#C62828] font-medium">
                            Your answer: {q.options[item.userOptionIndex]}
                          </p>
                        )}
                        <p className="text-[#2E7D32] font-semibold">
                          Correct: {q.options[q.correctOptionIndex || 0]}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-[#1F3A4D]/75 mt-2 bg-[#1F3A4D]/5 p-2.5 rounded-xl leading-relaxed">
                      💡 {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standard AdMob Fixed Bottom Banner for Android */}
      <AdBannerWidget position="FIXED_BOTTOM" />
      <BannerAd position="BOTTOM" />
    </div>
  );
};
