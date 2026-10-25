import React, { useState, useEffect } from 'react';
import { Sparkles, Tv, X, Award, ExternalLink } from 'lucide-react';
import { isNativePlatform, showRewardedAd, showBannerAd, hideBannerAd } from '../utils/monetization';

interface AdBannerWidgetProps {
  onEarnXpBonus?: (amount: number) => void;
  onGrantClueHint?: () => void;
  position?: 'INLINE' | 'FIXED_BOTTOM';
}

export const AdBannerWidget: React.FC<AdBannerWidgetProps> = ({
  onEarnXpBonus,
  onGrantClueHint,
  position = 'INLINE'
}) => {
  const [adState, setAdState] = useState<'READY' | 'WATCHING' | 'REWARDED'>('READY');
  const [countdown, setCountdown] = useState<number>(5);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dismissedBanner, setDismissedBanner] = useState<boolean>(false);

  const isNative = isNativePlatform();

  useEffect(() => {
    // Show AdMob Native Banner on native platform
    if (isNative) {
      showBannerAd();
    }
    return () => {
      if (isNative) {
        hideBannerAd();
      }
    };
  }, [isNative]);

  useEffect(() => {
    let timer: any;
    if (adState === 'WATCHING' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (adState === 'WATCHING' && countdown === 0) {
      setAdState('REWARDED');
      if (onEarnXpBonus) onEarnXpBonus(25);
      if (onGrantClueHint) onGrantClueHint();
    }
    return () => clearInterval(timer);
  }, [adState, countdown, onEarnXpBonus, onGrantClueHint]);

  const handleStartRewardAd = async () => {
    if (isNative) {
      showRewardedAd((amount) => {
        if (onEarnXpBonus) onEarnXpBonus(amount || 25);
        if (onGrantClueHint) onGrantClueHint();
        setAdState('REWARDED');
      });
    } else {
      // Launch Interactive Web Rewarded Simulation
      setShowModal(true);
      setAdState('WATCHING');
      setCountdown(5);
    }
  };

  if (dismissedBanner && !showModal) return null;

  if (position === 'FIXED_BOTTOM') {
    return (
      <>
        {/* Standard Fixed AdMob / AdSense Bottom Banner View (50px / 60px height reserved) */}
        {!dismissedBanner && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#152734] border-t border-[#E07A3F]/30 shadow-2xl px-3 py-2 flex items-center justify-between gap-3 text-white max-w-4xl mx-auto rounded-t-2xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 flex-shrink-0">
                Ad
              </span>
              <div className="truncate">
                <span className="font-serif-title font-bold text-xs text-amber-200 block truncate">
                  {isNative ? 'AdMob Standard Banner' : 'UPSC Prelims Geography Prep Sponsor'}
                </span>
                <span className="text-[10px] text-white/70 block truncate">
                  Master 226 syllabus locations · 100% Offline SRS Trainer
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleStartRewardAd}
                className="px-2.5 py-1 rounded-lg bg-[#E07A3F] hover:bg-[#d46a30] text-white font-bold text-[10px] flex items-center gap-1 shadow-xs active:scale-95 transition"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>+25 XP Ad</span>
              </button>

              <button
                onClick={() => setDismissedBanner(true)}
                className="w-5 h-5 rounded-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition text-xs"
                title="Hide Ad View"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Web Rewarded Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#E07A3F] shadow-2xl max-w-md w-full p-6 text-[#1F3A4D] relative overflow-hidden">
              {adState === 'WATCHING' ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#E07A3F]/15 border-2 border-[#E07A3F]/30 text-[#E07A3F] flex items-center justify-center mx-auto text-2xl animate-pulse">
                    📺
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#E07A3F] block">
                      Sponsored Study Video
                    </span>
                    <h3 className="font-serif-title font-bold text-xl mt-1 text-[#1F3A4D]">
                      UPSC Prelims Map Booster
                    </h3>
                    <p className="text-xs text-[#1F3A4D]/70 mt-1">
                      Please hold for <strong>{countdown} seconds</strong> to claim your study reward!
                    </p>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1F3A4D]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#E07A3F] transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 border-2 border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto text-3xl">
                    🎉
                  </div>
                  <div>
                    <h3 className="font-serif-title font-bold text-2xl text-[#1F3A4D]">
                      Reward Unlocked!
                    </h3>
                    <p className="text-xs text-[#1F3A4D]/80 mt-1">
                      You earned <strong>+25 XP Bonus</strong> and unlocked a free <strong>UPSC Clue Hint</strong>!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setAdState('READY');
                    }}
                    className="w-full py-3 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-sm shadow-md transition"
                  >
                    Continue Studying
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {/* Standard Inline Banner */}
      {!dismissedBanner && (
        <div className="w-full my-3 bg-gradient-to-r from-[#1F3A4D] via-[#2A4B63] to-[#1F3A4D] text-white rounded-2xl p-3 border border-[#E07A3F]/30 shadow-md flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#E07A3F] flex items-center justify-center text-white font-bold flex-shrink-0 shadow-xs">
              <Tv className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-title font-bold text-xs text-amber-300">
                  {isNative ? 'AdMob Sponsored Study Spot' : 'Web AdSense & Sponsored Hint'}
                </span>
                <span className="text-[9px] font-bold text-white/70 bg-white/10 px-1.5 py-0.2 rounded-md uppercase">
                  Ad
                </span>
              </div>
              <p className="text-[10px] text-white/80 truncate mt-0.5">
                Watch 5-sec sponsor video to gain <strong>+25 XP Bonus</strong> & <strong>Free UPSC Hints</strong>!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleStartRewardAd}
              className="px-3 py-1.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs active:scale-95 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Watch Ad (+25 XP)</span>
            </button>

            <button
              onClick={() => setDismissedBanner(true)}
              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition"
              title="Hide Ad Banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Web Rewarded Ad Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#E07A3F] shadow-2xl max-w-md w-full p-6 text-[#1F3A4D] relative overflow-hidden">
            {adState === 'WATCHING' ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-[#E07A3F]/15 border-2 border-[#E07A3F]/30 text-[#E07A3F] flex items-center justify-center mx-auto text-2xl animate-pulse">
                  📺
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#E07A3F] block">
                    Sponsored Study Video
                  </span>
                  <h3 className="font-serif-title font-bold text-xl mt-1 text-[#1F3A4D]">
                    UPSC Prelims Map Booster
                  </h3>
                  <p className="text-xs text-[#1F3A4D]/70 mt-1">
                    Please hold for <strong>{countdown} seconds</strong> to claim your study reward!
                  </p>
                </div>

                <div className="w-full h-2 rounded-full bg-[#1F3A4D]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#E07A3F] transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                  💡 <strong>Did You Know?</strong> Gondwana coalfields located along the Damodar Valley (Jharia, Bokaro) produce 98% of India’s metallurgical coking coal!
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 border-2 border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto text-3xl">
                  🎉
                </div>

                <div>
                  <h3 className="font-serif-title font-bold text-2xl text-[#1F3A4D]">
                    Reward Unlocked!
                  </h3>
                  <p className="text-xs text-[#1F3A4D]/80 mt-1">
                    You earned <strong>+25 XP Bonus</strong> and unlocked a free <strong>UPSC Clue Hint</strong>!
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>+25 XP Added to your Cadet Rank</span>
                </div>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setAdState('READY');
                  }}
                  className="w-full py-3 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-sm shadow-md transition"
                >
                  Continue Studying
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
