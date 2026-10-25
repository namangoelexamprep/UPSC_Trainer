import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  BannerAdOptions,
  RewardAdPluginEvents
} from '@capacitor-community/admob';

// Google AdMob Test Ad Unit IDs
export const ADMOB_TEST_UNITS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917'
};

let isAdMobInitialized = false;

/**
 * Returns true if the app is currently running in an Android environment
 */
export const isAndroidPlatform = (): boolean => {
  return Capacitor.getPlatform() === 'android';
};

/**
 * Handles the complete AdMob initialization lifecycle
 */
export const initializeAdMob = async (): Promise<boolean> => {
  if (isAdMobInitialized) return true;

  if (!isAndroidPlatform()) {
    console.log('ℹ️ Non-Android environment detected. AdMob SDK initialization bypassed.');
    return false;
  }

  try {
    await AdMob.initialize({
      testingDevices: ['2077569A84F88A30D08A4D2E2B8707C9']
    });
    isAdMobInitialized = true;
    console.log('✅ AdMob SDK Lifecycle Initialized on Android');
    return true;
  } catch (error) {
    console.warn('⚠️ AdMob SDK initialization error:', error);
    return false;
  }
};

/**
 * Displays an AdMob Banner Ad on Android
 */
export const showAndroidBanner = async (position: BannerAdPosition = BannerAdPosition.BOTTOM_CENTER): Promise<boolean> => {
  if (!isAndroidPlatform()) return false;

  try {
    await initializeAdMob();
    const options: BannerAdOptions = {
      adId: ADMOB_TEST_UNITS.banner,
      adSize: BannerAdSize.BANNER,
      position: position,
      margin: 0
    };
    await AdMob.showBanner(options);
    return true;
  } catch (error) {
    console.warn('⚠️ Failed to display Android AdMob Banner:', error);
    return false;
  }
};

/**
 * Hides the active AdMob Banner Ad
 */
export const hideAndroidBanner = async (): Promise<void> => {
  if (!isAndroidPlatform()) return;

  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.warn('⚠️ Failed to hide Android AdMob Banner:', error);
  }
};

/**
 * Displays a Rewarded Video Ad on Android and executes the reward callback
 */
export const showAndroidRewardedAd = async (
  onRewarded: (rewardAmount: number) => void,
  onFailed?: () => void
): Promise<void> => {
  if (!isAndroidPlatform()) {
    // Non-Android fallback reward execution
    onRewarded(25);
    return;
  }

  try {
    await initializeAdMob();
    const listener = await AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward) => {
        onRewarded(reward.amount || 25);
        listener.remove();
      }
    );

    await AdMob.prepareRewardVideoAd({ adId: ADMOB_TEST_UNITS.rewarded });
    await AdMob.showRewardVideoAd();
  } catch (error) {
    console.warn('⚠️ Android Rewarded Ad failed:', error);
    if (onFailed) onFailed();
  }
};
