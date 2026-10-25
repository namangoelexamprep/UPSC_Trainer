package com.upsc.maptrainer.ui.screens

import android.view.HapticFeedbackConstants
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.mutableIntStateOf
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
import com.upsc.maptrainer.data.QuestionType
import com.upsc.maptrainer.data.StateBoundary
import com.upsc.maptrainer.quiz.QuizEngine
import com.upsc.maptrainer.ui.map.IndiaMap
import com.upsc.maptrainer.ui.map.MapLine
import com.upsc.maptrainer.ui.map.MapMarker
import com.upsc.maptrainer.ui.theme.CrimsonRed
import com.upsc.maptrainer.ui.theme.ForestGreen
import com.upsc.maptrainer.ui.theme.InkBlue
import com.upsc.maptrainer.ui.theme.InkBlueLight
import com.upsc.maptrainer.ui.theme.PaperBackground
import com.upsc.maptrainer.ui.theme.PaperCard
import com.upsc.maptrainer.ui.theme.SaffronOrange
import com.upsc.maptrainer.ui.viewmodel.Screen

@Composable
fun QuizScreen(
    quiz: Screen.Quiz,
    states: List<StateBoundary>,
    onCloseClick: () -> Unit,
    onAnswerSubmit: (userOptionIndex: Int, userTapLat: Double?, userTapLon: Double?, isCorrect: Boolean, distanceKm: Double?) -> Unit
) {
    val view = LocalView.current
    val q = quiz.questions[quiz.currentIndex]

    var selectedOptionIndex by remember(quiz.currentIndex) { mutableIntStateOf(-1) }
    var isAnswered by remember(quiz.currentIndex) { mutableStateOf(false) }

    // Tap Map specific state
    var userTapLat by remember(quiz.currentIndex) { mutableStateOf<Double?>(null) }
    var userTapLon by remember(quiz.currentIndex) { mutableStateOf<Double?>(null) }
    var tapDistanceKm by remember(quiz.currentIndex) { mutableStateOf<Double?>(null) }
    var isTapCorrect by remember(quiz.currentIndex) { mutableStateOf(false) }

    val correctCount = quiz.results.count { it.isCorrect }
    val progress = (quiz.currentIndex.toFloat() / quiz.questions.size.toFloat()).coerceIn(0f, 1f)
    val animatedProgress by animateFloatAsState(targetValue = progress, label = "quizProgress")

    val typeBadgeLabel = when (q.type) {
        QuestionType.TAP_MAP -> "MAP TAP QUIZ"
        QuestionType.IDENTIFY -> "IDENTIFY ON MAP"
        QuestionType.STATE_MCQ -> "STATE / UT LOCATION"
        QuestionType.CATEGORY -> "CLASSIFICATION"
        QuestionType.CLUE -> "EXAM FACT CLUE"
        QuestionType.FACT -> "UPSC PRELIMS FACT"
    }

    val optionLetters = listOf("A", "B", "C", "D")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(PaperBackground)
    ) {
        // Top Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            IconButton(onClick = onCloseClick) {
                Icon(Icons.Default.Close, contentDescription = "Close", tint = InkBlue)
            }

            Text(
                text = "Question ${quiz.currentIndex + 1} of ${quiz.questions.size}",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = InkBlue
            )

            Row(verticalAlignment = Alignment.CenterVertically) {
                if (quiz.streak >= 2) {
                    Row(
                        modifier = Modifier
                            .background(Color(0x20E07A3F), RoundedCornerShape(12.dp))
                            .padding(horizontal = 8.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            Icons.Default.LocalFireDepartment,
                            contentDescription = null,
                            tint = SaffronOrange,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(2.dp))
                        Text(
                            text = "${quiz.streak}",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = SaffronOrange
                        )
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                }

                Text(
                    text = "$correctCount pts",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = InkBlue,
                    modifier = Modifier
                        .background(Color(0x101F3A4D), RoundedCornerShape(12.dp))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                )
            }
        }

        // Progress Bar
        LinearProgressIndicator(
            progress = { animatedProgress },
            modifier = Modifier
                .fillMaxWidth()
                .height(4.dp),
            color = SaffronOrange,
            trackColor = Color(0x151F3A4D)
        )

        // Scrollable Question Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Prompt Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = PaperCard),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = typeBadgeLabel,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = SaffronOrange,
                        letterSpacing = 1.sp,
                        modifier = Modifier
                            .background(Color(0x15E07A3F), RoundedCornerShape(6.dp))
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = q.prompt,
                        fontFamily = FontFamily.Serif,
                        fontSize = 17.sp,
                        fontWeight = FontWeight.Bold,
                        color = InkBlue,
                        lineHeight = 23.sp
                    )

                    if (q.type == QuestionType.CLUE && q.clueText.isNotBlank()) {
                        Spacer(modifier = Modifier.height(10.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(Color(0x0A1F3A4D), RoundedCornerShape(12.dp))
                                .padding(12.dp)
                        ) {
                            Text(
                                text = "\"${q.clueText}\"",
                                fontSize = 14.sp,
                                fontFamily = FontFamily.Serif,
                                color = InkBlue,
                                lineHeight = 20.sp
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Map Component for TAP_MAP and IDENTIFY
            if (q.type == QuestionType.TAP_MAP || q.type == QuestionType.IDENTIFY) {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(330.dp),
                    shape = RoundedCornerShape(22.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    val mapMarkers = mutableListOf<MapMarker>()
                    var mapLine: MapLine? = null

                    if (q.type == QuestionType.IDENTIFY && q.targetPlace != null) {
                        mapMarkers.add(
                            MapMarker(
                                id = q.targetPlace.name,
                                lat = q.targetPlace.lat,
                                lon = q.targetPlace.lon,
                                label = if (isAnswered) q.targetPlace.name else "?",
                                color = SaffronOrange,
                                isSelected = true,
                                hasPulseRing = true
                            )
                        )
                    }

                    if (q.type == QuestionType.TAP_MAP && isAnswered && q.targetPlace != null) {
                        // True location marker
                        mapMarkers.add(
                            MapMarker(
                                id = "target",
                                lat = q.targetPlace.lat,
                                lon = q.targetPlace.lon,
                                label = q.targetPlace.name,
                                color = ForestGreen,
                                isSelected = true,
                                hasPulseRing = true
                            )
                        )
                        // User tap location marker
                        val uLat = userTapLat
                        val uLon = userTapLon
                        if (uLat != null && uLon != null) {
                            mapMarkers.add(
                                MapMarker(
                                    id = "user_tap",
                                    lat = uLat,
                                    lon = uLon,
                                    label = "Your tap",
                                    color = if (isTapCorrect) ForestGreen else CrimsonRed,
                                    isSelected = false
                                )
                            )
                            mapLine = MapLine(
                                fromLat = q.targetPlace.lat,
                                fromLon = q.targetPlace.lon,
                                toLat = uLat,
                                toLon = uLon,
                                color = if (isTapCorrect) ForestGreen else CrimsonRed
                            )
                        }
                    }

                    val highlightStates = if (isAnswered && q.targetPlace?.state?.isNotBlank() == true) {
                        setOf(q.targetPlace.state)
                    } else emptySet()

                    IndiaMap(
                        states = states,
                        markers = mapMarkers,
                        highlightStates = highlightStates,
                        line = mapLine,
                        modifier = Modifier.fillMaxSize(),
                        onMapTap = { tapLat, tapLon ->
                            if (q.type == QuestionType.TAP_MAP && !isAnswered && q.targetPlace != null) {
                                view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP)
                                val dist = QuizEngine.haversineDistanceKm(
                                    q.targetPlace.lat,
                                    q.targetPlace.lon,
                                    tapLat,
                                    tapLon
                                )
                                userTapLat = tapLat
                                userTapLon = tapLon
                                tapDistanceKm = dist
                                isTapCorrect = dist <= 150.0
                                isAnswered = true
                            }
                        }
                    )
                }

                if (q.type == QuestionType.TAP_MAP && !isAnswered) {
                    Text(
                        text = "👆 Tap on India map within 150 km of true location",
                        fontSize = 12.sp,
                        color = InkBlueLight,
                        modifier = Modifier.padding(top = 8.dp)
                    )
                }
            }

            // MCQ Options (for IDENTIFY, STATE_MCQ, CATEGORY, CLUE, FACT)
            if (q.type != QuestionType.TAP_MAP) {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    q.options.forEachIndexed { index, option ->
                        val letter = optionLetters.getOrElse(index) { "${index + 1}" }
                        val isCorrectOption = index == q.correctOptionIndex
                        val isUserPick = index == selectedOptionIndex

                        val (cardBg, borderCol, letterBg, letterCol) = when {
                            !isAnswered -> {
                                Quad(PaperCard, Color.Transparent, Color(0x121F3A4D), InkBlue)
                            }
                            isCorrectOption -> {
                                Quad(Color(0xFFE8F5E9), ForestGreen, ForestGreen, Color.White)
                            }
                            isUserPick -> {
                                Quad(Color(0xFFFFEBEE), CrimsonRed, CrimsonRed, Color.White)
                            }
                            else -> {
                                Quad(PaperCard.copy(alpha = 0.5f), Color.Transparent, Color(0x081F3A4D), Color(0x401F3A4D))
                            }
                        }

                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(16.dp))
                                .border(
                                    width = if (isAnswered && (isCorrectOption || isUserPick)) 1.5.dp else 0.dp,
                                    color = borderCol,
                                    shape = RoundedCornerShape(16.dp)
                                )
                                .clickable(enabled = !isAnswered) {
                                    view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP)
                                    selectedOptionIndex = index
                                    isAnswered = true
                                },
                            colors = CardDefaults.cardColors(containerColor = cardBg),
                            elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(horizontal = 14.dp, vertical = 12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(32.dp)
                                        .background(letterBg, CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = letter,
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = letterCol
                                    )
                                }

                                Spacer(modifier = Modifier.width(12.dp))

                                Text(
                                    text = option,
                                    fontSize = 14.sp,
                                    fontWeight = if (isAnswered && isCorrectOption) FontWeight.Bold else FontWeight.Medium,
                                    color = if (isAnswered && !isCorrectOption && !isUserPick) Color(0x601F3A4D) else InkBlue,
                                    modifier = Modifier.weight(1f)
                                )

                                if (isAnswered && isCorrectOption) {
                                    Icon(Icons.Default.Check, contentDescription = null, tint = ForestGreen, modifier = Modifier.size(20.dp))
                                } else if (isAnswered && isUserPick) {
                                    Icon(Icons.Default.Close, contentDescription = null, tint = CrimsonRed, modifier = Modifier.size(20.dp))
                                }
                            }
                        }
                    }
                }
            }

            // Feedback & Explanation Card
            AnimatedVisibility(
                visible = isAnswered,
                enter = fadeIn() + slideInVertically(initialOffsetY = { 40 })
            ) {
                val isCorrect = if (q.type == QuestionType.TAP_MAP) isTapCorrect else (selectedOptionIndex == q.correctOptionIndex)

                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 16.dp)
                ) {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isCorrect) Color(0xFFF1F8E9) else Color(0xFFFFF3E0)
                        )
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = if (isCorrect) "✓ Correct" else "✗ Needs Review",
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isCorrect) ForestGreen else CrimsonRed
                                )
                                if (q.type == QuestionType.TAP_MAP && tapDistanceKm != null) {
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = "(${tapDistanceKm!!.toInt()} km away)",
                                        fontSize = 12.sp,
                                        color = InkBlueLight
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(6.dp))

                            Text(
                                text = q.explanation,
                                fontSize = 13.sp,
                                lineHeight = 18.sp,
                                color = InkBlue
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = {
                            val correct = if (q.type == QuestionType.TAP_MAP) isTapCorrect else (selectedOptionIndex == q.correctOptionIndex)
                            onAnswerSubmit(
                                selectedOptionIndex,
                                userTapLat,
                                userTapLon,
                                correct,
                                tapDistanceKm
                            )
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp),
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = SaffronOrange,
                            contentColor = Color.White
                        )
                    ) {
                        Text(
                            text = if (quiz.currentIndex + 1 >= quiz.questions.size) "View Final Results" else "Next Question",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Icon(Icons.Default.ArrowForward, contentDescription = null, modifier = Modifier.size(16.dp))
                    }
                }
            }
        }
    }
}

private data class Quad<A, B, C, D>(val first: A, val second: B, val third: C, val fourth: D)
