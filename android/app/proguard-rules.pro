# ProGuard Rules for UPSC Map Trainer (Google AdMob + Jetpack Compose + Capacitor)

# Preserve Line Numbers and Attributes for Debugging & Crash Reports
-keepattributes SourceFile,LineNumberTable,Signature,InnerClasses,EnclosingMethod,*Annotation*

# ============================================================================
# Google Play Services & AdMob SDK Rules
# ============================================================================
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.ads.** { *; }
-keep interface com.google.android.gms.ads.** { *; }
-keep interface com.google.ads.** { *; }

# Preserve Javascript interface methods invoked by AdMob WebViews
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve Custom Ad Views and Custom Layouts
-keeppublicclass struct * extends android.view.View {
    public <init>(android.content.Context);
    public <init>(android.content.Context, android.util.AttributeSet);
    public <init>(android.content.Context, android.util.AttributeSet, int);
    public void set*(...);
}

# Don't warn for missing AdMob optional dependencies
-dontwarn com.google.android.gms.ads.**
-dontwarn com.google.ads.**

# ============================================================================
# Jetpack Compose Rules
# ============================================================================
-keep class androidx.compose.ui.platform.** { *; }
-keep class androidx.compose.runtime.** { *; }
-keep class androidx.compose.material3.** { *; }
-keepclassmembers class * extends androidx.compose.runtime.State { *; }

# Prevent obfuscation of Compose Layout inspection methods
-keepclassmembers class * {
    @androidx.compose.runtime.Composable *;
}

# ============================================================================
# Capacitor Native Bridge & AdMob Plugin Rules
# ============================================================================
-keep class com.getcapacitor.** { *; }
-keep class com.getcapacitor.community.admob.** { *; }
-keep class com.upsc.maptrainer.** { *; }

# Preserve Plugin methods invoked via reflection
-keepclassmembers class * extends com.getcapacitor.Plugin {
    public *;
}
