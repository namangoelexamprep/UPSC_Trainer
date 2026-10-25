import React, { useState } from 'react';
import { X, Copy, Check, FileCode, FolderTree, Terminal } from 'lucide-react';

interface AndroidProjectViewerProps {
  onClose: () => void;
}

const ANDROID_FILES: Record<string, { title: string; category: string; content: string }> = {
  'QuizEngine.kt': {
    title: 'app/src/main/java/com/upsc/maptrainer/quiz/QuizEngine.kt',
    category: 'Quiz Engine & SRS (Pure Kotlin)',
    content: `// Pure Kotlin Quiz Engine (zero Android dependencies, runnable on JVM)
// Supports TAP_MAP, IDENTIFY, STATE_MCQ, CATEGORY, CLUE, FACT, and SRS_DUE
// Spaced Repetition decay intervals: 0d (new), 1d, 3d, 7d, 16d, 35d
// Prioritizes overdue items and struggled locations (weight = 6 - mastery)
// Haversine distance within 150 km scored correct for map tap`
  },
  'IndiaMap.kt': {
    title: 'app/src/main/java/com/upsc/maptrainer/ui/map/IndiaMap.kt',
    category: 'Compose Canvas Map',
    content: `// Equirectangular projection: x = (lon - 67.5) * cos(22 deg), y = 38 - lat
// Gestures: pinch-zoom about centroid (0.9x to 16x) + pan + marker tap (<28dp)
// Pulsing halo ring, land drop shadow, camera glide animation (380ms)`
  },
  'IndiaSilhouette.kt': {
    title: 'app/src/main/java/com/upsc/maptrainer/ui/map/IndiaSilhouette.kt',
    category: 'Compose Canvas Map',
    content: `// Decorative, non-interactive India shape composable for Home hero`
  },
  'Models.kt': {
    title: 'app/src/main/java/com/upsc/maptrainer/data/Models.kt',
    category: 'Data Models & SRS',
    content: `// Place, Topic, FactQuestion, StateBoundary, QuizQuestion, QuizResultItem
// SRSRecord (placeKey, mastery 0..5, intervalDays, nextReviewAt, lapses)
// AspirantRank, Badge, UserRewards (xp, streakDays, badges)`
  },
  'DataProvider.kt': {
    title: 'app/src/main/java/com/upsc/maptrainer/data/DataProvider.kt',
    category: 'Data, SRS & Persistence',
    content: `// JSON parsing with org.json, SharedPreferences mastery storage (0..5)
// SRS nextReview timestamps, due queue calculation, XP & streak persistence`
  },
  'QuizEngineTest.kt': {
    title: 'app/src/test/java/com/upsc/maptrainer/quiz/QuizEngineTest.kt',
    category: 'Unit Tests',
    content: `// JVM Test Harness generating 50,000+ questions across modes
// Tests SRS interval progression: 1d -> 3d -> 7d -> 16d -> 35d
// Tests lapse reset to 1 day on incorrect review
// Asserts: 4 options, no duplicates, valid correct index, CLUE never leaks name`
  },
  'AdMobManager.kt': {
    title: 'app/src/main/java/com/upsc/maptrainer/monetization/AdMobManager.kt',
    category: 'Google AdMob & Monetization',
    content: `// Google AdMob Native SDK Integration for Android Play Store
// Initializes MobileAds, loads Rewarded Video Ads for Bonus XP & UPSC Clue Hints
// Automatic offline caching & background impression sync when reconnected
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

object AdMobManager {
    private var rewardedAd: RewardedAd? = null

    fun initialize(context: Context) {
        MobileAds.initialize(context)
        loadRewardedAd(context)
    }

    fun loadRewardedAd(context: Context) {
        val adRequest = AdRequest.Builder().build()
        RewardedAd.load(
            context,
            "ca-app-pub-3940256099942544/5224354917", // Test Ad Unit ID
            adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdLoaded(ad: RewardedAd) {
                    rewardedAd = ad
                }
            }
        )
    }
}`
  },
  'AndroidManifest.xml': {
    title: 'app/src/main/AndroidManifest.xml',
    category: 'Android Manifest & Permissions',
    content: `<!-- Android Manifest with Google AdMob App ID & Internet Permissions -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="UPSC Map Trainer"
        android:supportsRtl="true"
        android:theme="@style/Theme.UPSCMapTrainer">

        <!-- Google AdMob Application ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.UPSCMapTrainer">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },
  'app/build.gradle.kts': {
    title: 'app/build.gradle.kts',
    category: 'Gradle Configuration',
    content: `// minSdk 26, compileSdk 35, Compose BOM 2024.10.01, Kotlin 2.0.21, AGP 8.7.2
// Dependencies: play-services-ads:23.3.0, androidx.compose.material3
// R8 isMinifyEnabled + isShrinkResources signed with debug keystore`
  },
  'build-apk.yml': {
    title: '.github/workflows/build-apk.yml',
    category: 'CI / CD Workflow',
    content: `// GitHub Actions CI: ubuntu-latest, JDK 17, gradle/actions/setup-gradle@v4
// Assembles Debug & Release APKs, uploads artifacts`
  }
};

export const AndroidProjectViewer: React.FC<AndroidProjectViewerProps> = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('QuizEngine.kt');
  const [copied, setCopied] = useState<boolean>(false);

  const fileInfo = ANDROID_FILES[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(fileInfo.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F3A4D]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[26px] border border-[#1F3A4D]/20 shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F3A4D]/10 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1F3A4D] flex items-center justify-center text-white">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-title font-bold text-base text-[#1F3A4D]">
                Android Architecture & File Tree
              </h2>
              <p className="text-[11px] text-[#1F3A4D]/60">
                Kotlin 2.0.21 · Jetpack Compose BOM 2024.10.01 · Material 3 · 100% Offline
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

        {/* Modal Body: Sidebar + File Viewer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-[#1F3A4D]/10 bg-[#F7F2EA]/60 p-3 overflow-y-auto flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F3A4D]/50 px-2 py-1">
              Project Files
            </span>
            {Object.keys(ANDROID_FILES).map((key) => {
              const item = ANDROID_FILES[key];
              const isSelected = selectedFile === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFile(key)}
                  className={`w-full text-left p-2 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    isSelected
                      ? 'bg-[#1F3A4D] text-white shadow-sm'
                      : 'text-[#1F3A4D]/80 hover:bg-[#1F3A4D]/5'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{key}</span>
                </button>
              );
            })}

            <div className="mt-4 pt-3 border-t border-[#1F3A4D]/10 px-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F3A4D]/50 block mb-1.5">
                CLI Build Command
              </span>
              <div className="bg-[#1F3A4D] text-[#F7F2EA] p-2.5 rounded-xl text-[11px] font-mono leading-tight flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#E07A3F] flex-shrink-0" />
                <span>./gradlew assembleRelease</span>
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#132532] text-[#E8F1F5] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1720] border-b border-white/10 text-xs">
              <span className="font-mono text-[11px] text-white/70">{fileInfo.title}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Path'}</span>
              </button>
            </div>

            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed whitespace-pre text-emerald-400/90">
              {fileInfo.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
