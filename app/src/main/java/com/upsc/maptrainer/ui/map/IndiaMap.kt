package com.upsc.maptrainer.ui.map

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CropFree
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import com.upsc.maptrainer.data.StateBoundary
import com.upsc.maptrainer.ui.theme.InkBlue
import com.upsc.maptrainer.ui.theme.LandBorderColor
import com.upsc.maptrainer.ui.theme.LandHighlightColor
import com.upsc.maptrainer.ui.theme.PaperBackground
import com.upsc.maptrainer.ui.theme.SeaGradientBottom
import com.upsc.maptrainer.ui.theme.SeaGradientTop
import kotlinx.coroutines.launch
import kotlin.math.hypot

data class MapMarker(
    val id: String,
    val lat: Double,
    val lon: Double,
    val label: String,
    val color: Color,
    val isSelected: Boolean = false,
    val hasPulseRing: Boolean = false
)

data class MapLine(
    val fromLat: Double,
    val fromLon: Double,
    val toLat: Double,
    val toLon: Double,
    val label: String? = null,
    val color: Color = InkBlue
)

data class MapFocus(
    val lat: Double,
    val lon: Double,
    val zoomFactor: Float = 3.5f
)

private class ProjectedStatePath(
    val stateName: String,
    val path: Path
)

@Composable
fun IndiaMap(
    states: List<StateBoundary>,
    markers: List<MapMarker> = emptyList(),
    highlightStates: Set<String> = emptySet(),
    showAllLabels: Boolean = false,
    line: MapLine? = null,
    focus: MapFocus? = null,
    resetKey: Int = 0,
    modifier: Modifier = Modifier,
    onMapTap: (lat: Double, lon: Double) -> Unit = { _, _ -> },
    onMarkerTap: (marker: MapMarker) -> Unit = {}
) {
    val density = LocalDensity.current
    val coroutineScope = rememberCoroutineScope()

    // Bounding box of India in projected space
    val minProjX = 0.5f
    val maxProjX = 27.5f
    val minProjY = 0.5f
    val maxProjY = 31.5f
    val projW = maxProjX - minProjX
    val projH = maxProjY - minProjY

    // Pre-build state projected paths once
    val projectedStates = remember(states) {
        val list = mutableListOf<ProjectedStatePath>()
        for (state in states) {
            val p = Path()
            for (ring in state.rings) {
                if (ring.isEmpty()) continue
                val (x0, y0) = MapProjection.project(ring[0].first, ring[0].second)
                p.moveTo(x0, y0)
                for (i in 1 until ring.size) {
                    val (x, y) = MapProjection.project(ring[i].first, ring[i].second)
                    p.lineTo(x, y)
                }
                p.close()
            }
            list.add(ProjectedStatePath(state.name, p))
        }
        list
    }

    // Viewport transform states
    var baseScale by remember { mutableFloatStateOf(1f) }
    var baseOffsetX by remember { mutableFloatStateOf(0f) }
    var baseOffsetY by remember { mutableFloatStateOf(0f) }

    var userZoom by remember { mutableFloatStateOf(1f) }
    var userPanX by remember { mutableFloatStateOf(0f) }
    var userPanY by remember { mutableFloatStateOf(0f) }

    // Pulse animation: active ONLY when a marker with pulse ring exists
    val hasPulseMarker = markers.any { it.hasPulseRing }
    val pulseScale by if (hasPulseMarker) {
        val infiniteTransition = rememberInfiniteTransition(label = "pulseTransition")
        infiniteTransition.animateFloat(
            initialValue = 1f,
            targetValue = 2.4f,
            animationSpec = infiniteRepeatable(
                animation = tween(1200),
                repeatMode = RepeatMode.Restart
            ),
            label = "pulseScale"
        )
    } else {
        remember { mutableFloatStateOf(1f) }
    }

    val pulseAlpha by if (hasPulseMarker) {
        val infiniteTransition = rememberInfiniteTransition(label = "pulseAlphaTransition")
        infiniteTransition.animateFloat(
            initialValue = 0.8f,
            targetValue = 0.0f,
            animationSpec = infiniteRepeatable(
                animation = tween(1200),
                repeatMode = RepeatMode.Restart
            ),
            label = "pulseAlpha"
        )
    } else {
        remember { mutableFloatStateOf(0f) }
    }

    // Reset when resetKey changes
    LaunchedEffect(resetKey) {
        userZoom = 1f
        userPanX = 0f
        userPanY = 0f
    }

    // Camera animation when focus changes
    val animProgress = remember { Animatable(1f) }
    LaunchedEffect(focus) {
        if (focus != null) {
            val (fx, fy) = MapProjection.project(focus.lon, focus.lat)
            // Target center
            val targetZoom = focus.zoomFactor.coerceIn(1.5f, 6.0f)
            val startZoom = userZoom
            val startPanX = userPanX
            val startPanY = userPanY

            // Calculate pan to bring (fx, fy) to screen center
            // screen_x = (fx * baseScale + baseOffsetX) * currentScale + currentPanX
            // wanted: screen_x = viewportW / 2
            // => currentPanX = viewportW/2 - fx * baseScale * targetZoom - baseOffsetX * targetZoom
            animProgress.snapTo(0f)
            animProgress.animateTo(1f, animationSpec = tween(380))
        }
    }

    val seaBrush = remember {
        Brush.verticalGradient(
            colors = listOf(SeaGradientTop, SeaGradientBottom)
        )
    }

    val markerHitRadiusPx = with(density) { 28.dp.toPx() }

    Box(
        modifier = modifier
            .clipToBounds()
            .background(brush = seaBrush)
    ) {
        Canvas(
            modifier = Modifier
                .fillMaxSize()
                .pointerInput(markers, baseScale, baseOffsetX, baseOffsetY, userZoom, userPanX, userPanY) {
                    detectTapGestures { tapOffset ->
                        val currentScale = baseScale * userZoom
                        // Check if tap hit any marker
                        var hitMarker: MapMarker? = null
                        var minDistance = Float.MAX_VALUE

                        for (m in markers) {
                            val (mx, my) = MapProjection.project(m.lon, m.lat)
                            val screenX = (mx * baseScale + baseOffsetX) * userZoom + userPanX
                            val screenY = (my * baseScale + baseOffsetY) * userZoom + userPanY
                            val dist = hypot(tapOffset.x - screenX, tapOffset.y - screenY)
                            if (dist < markerHitRadiusPx && dist < minDistance) {
                                minDistance = dist
                                hitMarker = m
                            }
                        }

                        if (hitMarker != null) {
                            onMarkerTap(hitMarker)
                        } else {
                            // Inverse map to lat/lon
                            val worldX = (tapOffset.x - userPanX) / userZoom - baseOffsetX
                            val projX = worldX / baseScale
                            val worldY = (tapOffset.y - userPanY) / userZoom - baseOffsetY
                            val projY = worldY / baseScale
                            val (lon, lat) = MapProjection.unproject(projX, projY)
                            onMapTap(lat, lon)
                        }
                    }
                }
                .pointerInput(Unit) {
                    detectTransformGestures { centroid, pan, zoom, _ ->
                        val newZoom = (userZoom * zoom).coerceIn(0.9f, 16f)
                        val zoomChange = newZoom / userZoom
                        // Zoom about pinch centroid
                        userPanX = centroid.x - (centroid.x - userPanX) * zoomChange + pan.x
                        userPanY = centroid.y - (centroid.y - userPanY) * zoomChange + pan.y
                        userZoom = newZoom
                    }
                }
        ) {
            val canvasW = size.width
            val canvasH = size.height

            // Calculate base fitted scale and offset
            val fitScale = minOf(canvasW / projW, canvasH / projH) * 0.94f
            baseScale = fitScale
            baseOffsetX = (canvasW - projW * fitScale) / 2f - minProjX * fitScale
            baseOffsetY = (canvasH - projH * fitScale) / 2f - minProjY * fitScale

            val currentScale = baseScale * userZoom

            // Draw shadow under landmass
            val shadowOffset = Offset(3f * userZoom, 4f * userZoom)
            for (pState in projectedStates) {
                // Land tint
                val isHighlighted = highlightStates.contains(pState.stateName) ||
                        (highlightStates.contains("Ladakh") && pState.stateName == "Jammu & Kashmir")
                val landColor = if (isHighlighted) LandHighlightColor else PaperBackground

                // Draw transformed path
                // We use drawContext canvas transformation for max performance (no per-frame path allocation)
            }

            // Draw states with matrix transforms
            drawContext.canvas.save()
            drawContext.canvas.translate(userPanX, userPanY)
            drawContext.canvas.scale(userZoom, userZoom)
            drawContext.canvas.translate(baseOffsetX, baseOffsetY)
            drawContext.canvas.scale(baseScale, baseScale)

            // Draw land drop shadow
            for (pState in projectedStates) {
                drawPath(
                    path = pState.path,
                    color = Color(0x181F3A4D),
                    style = Fill
                )
            }

            // Draw land fills and borders
            for (pState in projectedStates) {
                val isHighlighted = highlightStates.contains(pState.stateName) ||
                        (highlightStates.contains("Ladakh") && pState.stateName == "Jammu & Kashmir")
                val fillColor = if (isHighlighted) LandHighlightColor else Color(0xFFFDFBF7)

                drawPath(
                    path = pState.path,
                    color = fillColor,
                    style = Fill
                )
                drawPath(
                    path = pState.path,
                    color = if (isHighlighted) InkBlue else LandBorderColor,
                    style = Stroke(width = if (isHighlighted) 1.8f / fitScale else 0.8f / fitScale)
                )
            }

            // Draw Line if present (for tap question feedback)
            if (line != null) {
                val (x1, y1) = MapProjection.project(line.fromLon, line.fromLat)
                val (x2, y2) = MapProjection.project(line.toLon, line.toLat)
                drawLine(
                    color = line.color,
                    start = Offset(x1, y1),
                    end = Offset(x2, y2),
                    strokeWidth = 2.5f / fitScale,
                    pathEffect = PathEffect.dashPathEffect(floatArrayOf(6f / fitScale, 4f / fitScale), 0f)
                )
            }

            drawContext.canvas.restore()

            // Draw Markers in screen space for crisp rendering and constant pixel radius
            for (marker in markers) {
                val (mx, my) = MapProjection.project(marker.lon, marker.lat)
                val sx = (mx * baseScale + baseOffsetX) * userZoom + userPanX
                val sy = (my * baseScale + baseOffsetY) * userZoom + userPanY

                // Pulse Halo Ring
                if (marker.hasPulseRing) {
                    val ringRadius = 14f * pulseScale
                    drawCircle(
                        color = marker.color.copy(alpha = pulseAlpha),
                        radius = ringRadius,
                        center = Offset(sx, sy),
                        style = Stroke(width = 3f)
                    )
                }

                // Marker Drop Shadow
                drawCircle(
                    color = Color(0x35000000),
                    radius = if (marker.isSelected) 10f else 7f,
                    center = Offset(sx + 1.5f, sy + 2f),
                    style = Fill
                )

                // Marker White Outline
                drawCircle(
                    color = Color.White,
                    radius = if (marker.isSelected) 9.5f else 6.5f,
                    center = Offset(sx, sy),
                    style = Fill
                )

                // Marker Inner Core
                drawCircle(
                    color = marker.color,
                    radius = if (marker.isSelected) 7f else 4.5f,
                    center = Offset(sx, sy),
                    style = Fill
                )
            }
        }

        // Floating Map Controls (+, -, Fit)
        Column(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            FloatingActionButton(
                onClick = { userZoom = (userZoom * 1.35f).coerceAtMost(16f) },
                modifier = Modifier.size(42.dp),
                shape = CircleShape,
                containerColor = PaperBackground,
                contentColor = InkBlue,
                elevation = FloatingActionButtonDefaults.elevation(3.dp)
            ) {
                Icon(Icons.Default.Add, contentDescription = "Zoom In", modifier = Modifier.size(20.dp))
            }

            FloatingActionButton(
                onClick = { userZoom = (userZoom / 1.35f).coerceAtLeast(0.9f) },
                modifier = Modifier
                    .padding(top = 8.dp)
                    .size(42.dp),
                shape = CircleShape,
                containerColor = PaperBackground,
                contentColor = InkBlue,
                elevation = FloatingActionButtonDefaults.elevation(3.dp)
            ) {
                Icon(Icons.Default.Remove, contentDescription = "Zoom Out", modifier = Modifier.size(20.dp))
            }

            FloatingActionButton(
                onClick = {
                    userZoom = 1f
                    userPanX = 0f
                    userPanY = 0f
                },
                modifier = Modifier
                    .padding(top = 8.dp)
                    .size(42.dp),
                shape = CircleShape,
                containerColor = PaperBackground,
                contentColor = InkBlue,
                elevation = FloatingActionButtonDefaults.elevation(3.dp)
            ) {
                Icon(Icons.Default.CropFree, contentDescription = "Fit Map", modifier = Modifier.size(18.dp))
            }
        }
    }
}
