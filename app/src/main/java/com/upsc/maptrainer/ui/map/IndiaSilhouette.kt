package com.upsc.maptrainer.ui.map

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import com.upsc.maptrainer.data.StateBoundary

@Composable
fun IndiaSilhouette(
    states: List<StateBoundary>,
    modifier: Modifier = Modifier,
    fillColor: Color = Color(0x151F3A4D),
    strokeColor: Color = Color(0x301F3A4D)
) {
    // Pre-calculate combined path once in normalized projection space [0..28, 0..32]
    val normalizedPaths = remember(states) {
        val paths = mutableListOf<Path>()
        for (state in states) {
            for (ring in state.rings) {
                if (ring.isEmpty()) continue
                val p = Path()
                val (firstX, firstY) = MapProjection.project(ring[0].first, ring[0].second)
                p.moveTo(firstX, firstY)
                for (i in 1 until ring.size) {
                    val (x, y) = MapProjection.project(ring[i].first, ring[i].second)
                    p.lineTo(x, y)
                }
                p.close()
                paths.add(p)
            }
        }
        paths
    }

    Canvas(modifier = modifier.fillMaxSize()) {
        val canvasWidth = size.width
        val canvasHeight = size.height

        // India projection bounds: x in approx [0.5, 27.5], y in approx [0.5, 31.5]
        val minX = 0.5f
        val maxX = 27.5f
        val minY = 0.5f
        val maxY = 31.5f

        val projWidth = maxX - minX
        val projHeight = maxY - minY

        val scale = minOf(canvasWidth / projWidth, canvasHeight / projHeight) * 0.95f
        val offsetX = (canvasWidth - projWidth * scale) / 2f - minX * scale
        val offsetY = (canvasHeight - projHeight * scale) / 2f - minY * scale

        for (path in normalizedPaths) {
            val transformed = Path()
            transformed.addPath(path, Offset(offsetX, offsetY))
            // We scale via transform
            drawPath(
                path = path,
                color = fillColor,
                style = Fill
            )
            drawPath(
                path = path,
                color = strokeColor,
                style = Stroke(width = 1f)
            )
        }
    }
}
