import { Capacitor } from '@capacitor/core';
import { AdMob, BannerAdSize, BannerAdPosition, RewardAdPluginEvents } from '@capacitor-community/admob';

// Test Ad Unit IDs provided by Google AdMob for Development/Testing
const TEST_ADMOB_IDS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917'
};

export interface AdStatus {
  initialized: boolean;
  isNative: boolean;
  bannerVisible: boolean;
  adsBlockedOrOffline: boolean;
}

let isInitialized = false;

export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Initialize Google AdMob on Android Native or Google AdSense on Web
 */
export const initializeMonetization = async (): Promise<boolean> => {
  if (isInitialized) return true;

  try {
    if (Capacitor.isNativePlatform()) {
      await AdMob.initialize({
        testingDevices: ['2077569A84F88A30D08A4D2E2B8707C9']
      });
      isInitialized = true;
      console.log('✅ AdMob Native SDK Initialized Successfully');
      return true;
    } else {
      // Web Browser Environment (AdSense or Web Ad Fallback)
      if (typeof window !== 'undefined') {
        const existingScript = document.getElementById('adsense-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'adsense-script';
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
          script.async = true;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }
      }
      isInitialized = true;
      console.log('🌐 Web AdSense Engine Initialized');
      return true;
    }
  } catch (err) {
    console.warn('Monetization initialization notice (Offline mode active):', err);
    return false;
  }
};

/**
 * Show Sticky Banner Ad (Bottom of screen)
 */
export const showBannerAd = async (): Promise<boolean> => {
  try {
    await initializeMonetization();
    if (Capacitor.isNativePlatform()) {
      await AdMob.showBanner({
        adId: TEST_ADMOB_IDS.banner,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0
      });
      return true;
    }
    return true;
  } catch (e) {
    console.warn('Banner Ad display (offline fallback):', e);
    return false;
  }
};

/**
 * Hide Sticky Banner Ad
 */
export const hideBannerAd = async (): Promise<void> => {
  try {
    if (Capacitor.isNativePlatform()) {
      await AdMob.hideBanner();
    }
  } catch (e) {
    console.warn('Hide banner warning:', e);
  }
};

/**
 * Show Interstitial Ad (e.g. after completing 10-Q Sprint)
 */
export const showInterstitialAd = async (): Promise<boolean> => {
  try {
    await initializeMonetization();
    if (Capacitor.isNativePlatform()) {
      await AdMob.prepareInterstitial({
        adId: TEST_ADMOB_IDS.interstitial
      });
      await AdMob.showInterstitial();
      return true;
    }
    return true;
  } catch (e) {
    console.warn('Interstitial Ad notice:', e);
    return false;
  }
};

/**
 * Show Rewarded Video Ad (e.g., Watch Ad to receive Free Clue Hint or +25 XP)
 */
export const showRewardedAd = async (
  onSuccess: (rewardAmount: number) => void,
  onFailed?: () => void
): Promise<void> => {
  try {
    await initializeMonetization();
    if (Capacitor.isNativePlatform()) {
      // Register AdMob Rewarded listener
      const handleReward = await AdMob.addListener(
        RewardAdPluginEvents.Rewarded,
        (reward) => {
          onSuccess(reward.amount || 25);
          handleReward.remove();
        }
      );

      await AdMob.prepareRewardVideoAd({
        adId: TEST_ADMOB_IDS.rewarded
      });
      await AdMob.showRewardVideoAd();
    } else {
      // Web environment: Fallback to Web Reward callback
      onSuccess(25);
    }
  } catch (e) {
    console.warn('Rewarded ad failed or cancelled:', e);
    if (onFailed) onFailed();
  }
};
