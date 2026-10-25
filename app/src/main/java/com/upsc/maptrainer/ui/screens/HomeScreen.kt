package com.upsc.maptrainer.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.upsc.maptrainer.data.DataProvider
import com.upsc.maptrainer.data.Topic
import com.upsc.maptrainer.ui.map.IndiaSilhouette
import com.upsc.maptrainer.ui.theme.InkBlue
import com.upsc.maptrainer.ui.theme.InkBlueLight
import com.upsc.maptrainer.ui.theme.PaperBackground
import com.upsc.maptrainer.ui.theme.PaperCard
import com.upsc.maptrainer.ui.theme.SaffronOrange

@Composable
fun HomeScreen(
    dataProvider: DataProvider,
    onTopicSelected: (Topic) -> Unit,
    onDailyQuizClick: () -> Unit,
    onResetClick: () -> Unit
) {
    val topics = dataProvider.topics
    val (totalAnswered, totalCorrect) = dataProvider.getOverallStats()
    val accuracy = if (totalAnswered > 0) (totalCorrect * 100) / totalAnswered else 0

    var selectedGroup by remember { mutableStateOf("All") }
    val syllabusGroups = listOf("All", "Geography", "Environment", "History")

    val filteredTopics = remember(selectedGroup, topics) {
        when (selectedGroup) {
            "Geography" -> topics.filter { it.syllabus.contains("Geography") }
            "Environment" -> topics.filter { it.syllabus.contains("Environment") }
            "History" -> topics.filter { it.syllabus.contains("History") || it.syllabus.contains("Culture") }
            else -> topics
        }
    }

    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        modifier = Modifier
            .fillMaxSize()
            .background(PaperBackground),
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Hero Section
        item(span = { GridItemSpan(2) }) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(26.dp)),
                colors = CardDefaults.cardColors(containerColor = PaperCard),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Box(modifier = Modifier.fillMaxWidth()) {
                    // India Silhouette background
                    IndiaSilhouette(
                        states = dataProvider.states,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(230.dp),
                        fillColor = Color(0x0C1F3A4D),
                        strokeColor = Color(0x181F3A4D)
                    )

                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = "UPSC Map Trainer",
                                    fontFamily = FontFamily.Serif,
                                    fontSize = 24.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = InkBlue
                                )
                                Text(
                                    text = "Prelims Location Mastery",
                                    fontSize = 13.sp,
                                    color = InkBlueLight,
                                    modifier = Modifier.padding(top = 2.dp)
                                )
                            }

                            // Circular Mastery Ring
                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier.size(62.dp)
                            ) {
                                val animAccuracy by animateFloatAsState(
                                    targetValue = accuracy / 100f,
                                    animationSpec = tween(800),
                                    label = "accuracyAnim"
                                )
                                CircularProgressIndicator(
                                    progress = { 1f },
                                    modifier = Modifier.size(60.dp),
                                    color = Color(0x201F3A4D),
                                    strokeWidth = 6.dp
                                )
                                CircularProgressIndicator(
                                    progress = { animAccuracy },
                                    modifier = Modifier.size(60.dp),
                                    color = SaffronOrange,
                                    strokeWidth = 6.dp,
                                    strokeCap = StrokeCap.Round
                                )
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        text = "$accuracy%",
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = InkBlue
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        // Stats Summary Row
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(Color(0x0A1F3A4D), RoundedCornerShape(12.dp))
                                .padding(vertical = 8.dp, horizontal = 12.dp),
                            horizontalArrangement = Arrangement.SpaceAround
                        ) {
                            Text(
                                text = "🎯 $totalAnswered answered",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Medium,
                                color = InkBlue
                            )
                            Text(
                                text = "✨ $totalCorrect correct",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Medium,
                                color = InkBlue
                            )
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Button(
                            onClick = onDailyQuizClick,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(46.dp),
                            shape = RoundedCornerShape(14.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = SaffronOrange,
                                contentColor = Color.White
                            )
                        ) {
                            Icon(Icons.Default.Bolt, contentDescription = null, modifier = Modifier.size(18.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "Daily Mixed Quiz",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // Syllabus Filter Chips
        item(span = { GridItemSpan(2) }) {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(vertical = 4.dp)
            ) {
                items(syllabusGroups) { group ->
                    val isSelected = selectedGroup == group
                    FilterChip(
                        selected = isSelected,
                        onClick = { selectedGroup = group },
                        label = {
                            Text(
                                text = group,
                                fontSize = 12.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                            )
                        },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = InkBlue,
                            selectedLabelColor = Color.White,
                            containerColor = PaperCard,
                            labelColor = InkBlue
                        ),
                        shape = RoundedCornerShape(20.dp)
                    )
                }
            }
        }

        // 2-Column Grid of Topics
        items(filteredTopics, key = { it.id }) { topic ->
            val (answered, correct, best) = dataProvider.getTopicStats(topic.id)
            val topicProgress = if (topic.places.isNotEmpty()) {
                val sumMastery = topic.places.sumOf { dataProvider.getPlaceMastery(topic.id, it.name) }
                val maxMastery = topic.places.size * 5
                (sumMastery.toFloat() / maxMastery.toFloat()).coerceIn(0f, 1f)
            } else 0f

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .clickable { onTopicSelected(topic) },
                colors = CardDefaults.cardColors(containerColor = PaperCard),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .background(Color(0x101F3A4D), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(text = topic.emoji, fontSize = 20.sp)
                        }

                        if (best > 0) {
                            Text(
                                text = "$best%",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = SaffronOrange,
                                modifier = Modifier
                                    .background(Color(0x15E07A3F), RoundedCornerShape(8.dp))
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = topic.title,
                        fontFamily = FontFamily.Serif,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = InkBlue,
                        maxLines = 2
                    )

                    Text(
                        text = "${topic.places.size} ${topic.noun}s",
                        fontSize = 11.sp,
                        color = InkBlueLight,
                        modifier = Modifier.padding(top = 2.dp)
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    LinearProgressIndicator(
                        progress = { topicProgress },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(5.dp)
                            .clip(RoundedCornerShape(3.dp)),
                        color = SaffronOrange,
                        trackColor = Color(0x151F3A4D)
                    )
                }
            }
        }

        // Footer Disclaimer & Reset Progress
        item(span = { GridItemSpan(2) }) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(horizontal = 16.dp)
                ) {
                    Icon(
                        Icons.Default.Info,
                        contentDescription = null,
                        tint = Color(0x601F3A4D),
                        modifier = Modifier.size(14.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "100% Offline · Map data sourced from Survey of India & datameet boundaries · Exam accurate coordinates.",
                        fontSize = 11.sp,
                        color = Color(0x801F3A4D),
                        lineHeight = 15.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = onResetClick,
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Transparent,
                        contentColor = Color(0x901F3A4D)
                    )
                ) {
                    Icon(Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(text = "Reset All Progress", fontSize = 12.sp)
                }
            }
        }
    }
}
