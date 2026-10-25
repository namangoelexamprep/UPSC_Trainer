package com.upsc.maptrainer.ui.theme

import android.app.Activity
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val LightColorScheme = lightColorScheme(
    primary = InkBlue,
    onPrimary = PaperCard,
    secondary = SaffronOrange,
    onSecondary = PaperCard,
    tertiary = InkBlueLight,
    background = PaperBackground,
    onBackground = InkBlue,
    surface = PaperCard,
    onSurface = InkBlue,
    surfaceVariant = PaperCardSubtle,
    onSurfaceVariant = InkBlueLight
)

@Composable
fun UPSCTrainerTheme(content: @Composable () -> Unit) {
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as? Activity)?.window
            if (window != null) {
                window.statusBarColor = PaperBackground.toArgb()
                window.navigationBarColor = PaperBackground.toArgb()
                WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = true
                WindowCompat.getInsetsController(window, view).isAppearanceLightNavigationBars = true
            }
        }
    }

    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography,
        content = content
    )
}
