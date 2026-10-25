package com.upsc.maptrainer.ui.screens

import android.view.HapticFeedbackConstants
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.upsc.maptrainer.data.Place
import com.upsc.maptrainer.data.StateBoundary
import com.upsc.maptrainer.data.Topic
import com.upsc.maptrainer.ui.map.IndiaMap
import com.upsc.maptrainer.ui.map.MapFocus
import com.upsc.maptrainer.ui.map.MapMarker
import com.upsc.maptrainer.ui.theme.InkBlue
import com.upsc.maptrainer.ui.theme.InkBlueLight
import com.upsc.maptrainer.ui.theme.PaperBackground
import com.upsc.maptrainer.ui.theme.PaperCard
import com.upsc.maptrainer.ui.theme.SaffronOrange

// Distinct vibrant colors for categories
val CATEGORY_COLORS = listOf(
    Color(0xFFE07A3F), // Saffron
    Color(0xFF2E7D32), // Forest Green
    Color(0xFF1976D2), // Ocean Blue
    Color(0xFF7B1FA2), // Purple
    Color(0xFFC2185B), // Pink
    Color(0xFFF57C00), // Amber
    Color(0xFF00796B), // Teal
    Color(0xFF5D4037)  // Brown
)

@Composable
fun TopicMapScreen(
    topic: Topic,
    states: List<StateBoundary>,
    onBackClick: () -> Unit,
    onStartQuizClick: () -> Unit
) {
    val view = LocalView.current
    var selectedCategory by remember { mutableStateOf<String?>(null) }
    var selectedPlace by remember { mutableStateOf<Place?>(null) }
    var showAllLabels by remember { mutableStateOf(false) }

    // Map categories to colors
    val categoryColorMap = remember(topic) {
        topic.categories.mapIndexed { index, cat ->
            cat to CATEGORY_COLORS[index % CATEGORY_COLORS.size]
        }.toMap()
    }

    // Filter places
    val visiblePlaces = remember(selectedCategory, topic) {
        if (selectedCategory == null) topic.places
        else topic.places.filter { it.category == selectedCategory }
    }

    // Build markers
    val markers = remember(visiblePlaces, selectedPlace, categoryColorMap) {
        visiblePlaces.map { p ->
            val isSelected = selectedPlace?.name == p.name
            val markerColor = categoryColorMap[p.category] ?: InkBlue
            MapMarker(
                id = p.name,
                lat = p.lat,
                lon = p.lon,
                label = p.name,
                color = markerColor,
                isSelected = isSelected,
                hasPulseRing = isSelected
            )
        }
    }

    // State highlight
    val highlightStates = remember(selectedPlace) {
        val s = selectedPlace?.state
        if (!s.isNullOrBlank()) setOf(s) else emptySet()
    }

    val cameraFocus = remember(selectedPlace) {
        selectedPlace?.let { MapFocus(lat = it.lat, lon = it.lon, zoomFactor = 3.5f) }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        // Fullscreen Canvas Map
        IndiaMap(
            states = states,
            markers = markers,
            highlightStates = highlightStates,
            showAllLabels = showAllLabels,
            focus = cameraFocus,
            modifier = Modifier.fillMaxSize(),
            onMarkerTap = { marker ->
                view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP)
                val hit = topic.places.firstOrNull { it.name == marker.id }
                selectedPlace = hit
            },
            onMapTap = { _, _ ->
                selectedPlace = null
            }
        )

        // Floating Top Bar & Category Filters
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = PaperCard),
                elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 8.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = InkBlue)
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = topic.title,
                            fontFamily = FontFamily.Serif,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = InkBlue,
                            maxLines = 1
                        )
                        Text(
                            text = "${visiblePlaces.size} of ${topic.places.size} shown",
                            fontSize = 11.sp,
                            color = InkBlueLight
                        )
                    }

                    // Quiz Me action button in top bar
                    Button(
                        onClick = onStartQuizClick,
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = SaffronOrange,
                            contentColor = Color.White
                        ),
                        modifier = Modifier.height(36.dp)
                    ) {
                        Icon(Icons.Default.School, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(text = "Quiz", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Category Chips Row
            if (topic.categories.size > 1) {
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    // "All" chip
                    FilterChip(
                        selected = selectedCategory == null,
                        onClick = { selectedCategory = null },
                        label = { Text("All (${topic.places.size})", fontSize = 11.sp) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = InkBlue,
                            selectedLabelColor = Color.White,
                            containerColor = PaperCard,
                            labelColor = InkBlue
                        ),
                        shape = RoundedCornerShape(16.dp)
                    )

                    topic.categories.forEach { cat ->
                        val isCatSelected = selectedCategory == cat
                        val catColor = categoryColorMap[cat] ?: InkBlue
                        FilterChip(
                            selected = isCatSelected,
                            onClick = {
                                selectedCategory = if (isCatSelected) null else cat
                            },
                            leadingIcon = {
                                Box(
                                    modifier = Modifier
                                        .size(8.dp)
                                        .background(catColor, CircleShape)
                                )
                            },
                            label = { Text(cat, fontSize = 11.sp) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = InkBlue,
                                selectedLabelColor = Color.White,
                                containerColor = PaperCard,
                                labelColor = InkBlue
                            ),
                            shape = RoundedCornerShape(16.dp)
                        )
                    }
                }
            }
        }

        // Bottom Fact Card when a marker is tapped
        AnimatedVisibility(
            visible = selectedPlace != null,
            enter = slideInVertically(initialOffsetY = { it }),
            exit = slideOutVertically(targetOffsetY = { it }),
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            val place = selectedPlace
            if (place != null) {
                val catColor = categoryColorMap[place.category] ?: SaffronOrange

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = PaperCard),
                    elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = place.category.uppercase(),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = catColor,
                                letterSpacing = 1.sp,
                                modifier = Modifier
                                    .background(catColor.copy(alpha = 0.12f), RoundedCornerShape(6.dp))
                                    .padding(horizontal = 8.dp, vertical = 3.dp)
                            )

                            IconButton(
                                onClick = { selectedPlace = null },
                                modifier = Modifier.size(24.dp)
                            ) {
                                Icon(Icons.Default.Close, contentDescription = "Close", tint = Color(0x801F3A4D))
                            }
                        }

                        Spacer(modifier = Modifier.height(6.dp))

                        Text(
                            text = place.name,
                            fontFamily = FontFamily.Serif,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            color = InkBlue
                        )

                        if (place.state.isNotBlank()) {
                            Text(
                                text = "📍 ${place.state} (${String.format("%.2f°N, %.2f°E", place.lat, place.lon)})",
                                fontSize = 12.sp,
                                color = InkBlueLight,
                                modifier = Modifier.padding(top = 2.dp)
                            )
                        } else {
                            Text(
                                text = "📍 Offshore / Frontier (${String.format("%.2f°N, %.2f°E", place.lat, place.lon)})",
                                fontSize = 12.sp,
                                color = InkBlueLight,
                                modifier = Modifier.padding(top = 2.dp)
                            )
                        }

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            text = place.fact,
                            fontSize = 13.sp,
                            lineHeight = 18.sp,
                            color = InkBlue
                        )
                    }
                }
            }
        }
    }
}
