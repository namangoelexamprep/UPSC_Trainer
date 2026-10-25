# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /path/to/proguard-android-optimize.txt.

-keepattributes *Annotation*
-keepclassmembers class * {
    @androidx.compose.runtime.Composable *;
}

# Preserve data classes and JSON models
-keep class com.upsc.maptrainer.data.** { *; }
-keepclassmembers class com.upsc.maptrainer.data.** { *; }
