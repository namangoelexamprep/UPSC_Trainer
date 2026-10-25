import React, { useEffect, useState } from 'react';
import { isAndroidPlatform, showAndroidBanner, hideAndroidBanner } from '../utils/admob';
import { BannerAdPosition } from '@capacitor-community/admob';

interface BannerAdProps {
  position?: 'BOTTOM' | 'TOP';
  className?: string;
}

/**
 * BannerAd Component
 * Wraps the @capacitor-community/admob Banner API.
 * Ensures the banner ad is conditionally rendered ONLY when the environment is Android.
 */
export const BannerAd: React.FC<BannerAdProps> = ({
  position = 'BOTTOM',
  className = ''
}) => {
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);

  useEffect(() => {
    const checkAndroid = isAndroidPlatform();
    setIsAndroid(checkAndroid);

    if (checkAndroid) {
      const bannerPos =
        position === 'TOP'
          ? BannerAdPosition.TOP_CENTER
          : BannerAdPosition.BOTTOM_CENTER;

      showAndroidBanner(bannerPos).then((success) => {
        setAdLoaded(success);
      });

      return () => {
        hideAndroidBanner();
      };
    }
  }, [position]);

  // CRITICAL REQUIREMENT: Conditionally render ONLY when the environment is Android
  if (!isAndroid) {
    return null;
  }

  return (
    <div
      className={`fixed ${
        position === 'TOP' ? 'top-0' : 'bottom-0'
      } left-0 right-0 z-50 flex items-center justify-center bg-[#152734] border-t border-[#E07A3F]/30 h-[50px] sm:h-[60px] max-w-4xl mx-auto rounded-t-xl text-white shadow-2xl ${className}`}
      aria-label="AdMob Banner Container"
    >
      <div className="flex items-center gap-2 px-3">
        <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
          Ad
        </span>
        <span className="text-xs font-serif-title font-bold text-amber-200 truncate">
          Google AdMob Banner View (Android Native)
        </span>
      </div>
    </div>
  );
};
