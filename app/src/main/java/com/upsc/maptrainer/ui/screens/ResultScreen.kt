package com.upsc.maptrainer.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Done
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.upsc.maptrainer.data.QuestionType
import com.upsc.maptrainer.ui.theme.CrimsonRed
import com.upsc.maptrainer.ui.theme.ForestGreen
import com.upsc.maptrainer.ui.theme.InkBlue
import com.upsc.maptrainer.ui.theme.InkBlueLight
import com.upsc.maptrainer.ui.theme.PaperBackground
import com.upsc.maptrainer.ui.theme.PaperCard
import com.upsc.maptrainer.ui.theme.SaffronOrange
import com.upsc.maptrainer.ui.viewmodel.Screen

@Composable
fun ResultScreen(
    result: Screen.Result,
    onRetryMissedClick: () -> Unit,
    onDoneClick: () -> Unit
) {
    val total = result.results.size
    val correct = result.results.count { it.isCorrect }
    val percentage = if (total > 0) (correct * 100) / total else 0
    val missedCount = total - correct

    val animProgress by animateFloatAsState(
        targetValue = percentage / 100f,
        animationSpec = tween(900),
        label = "resultScoreRing"
    )

    val (verdictEmoji, verdictTitle, verdictSubtitle) = when {
        percentage >= 90 -> Triple("🏆", "Outstanding Mastery!", "Exceptional geographical recall. High-yield UPSC marks locked in!")
        percentage >= 70 -> Triple("🌟", "Great Preparation!", "Strong command of locations and facts. Ready for the exam!")
        percentage >= 50 -> Triple("📈", "Good Effort!", "Solid baseline. Review missed questions to convert them to memory.")
        else -> Triple("🎯", "Keep Practicing!", "Maps take active recall. Retry the missed places to build instant memory.")
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(PaperBackground)
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Summary Card with Score Ring
        item {
            Spacer(modifier = Modifier.height(16.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(26.dp),
                colors = CardDefaults.cardColors(containerColor = PaperCard),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = verdictEmoji, fontSize = 36.sp)

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = verdictTitle,
                        fontFamily = FontFamily.Serif,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        color = InkBlue
                    )

                    Text(
                        text = verdictSubtitle,
                        fontSize = 12.sp,
                        color = InkBlueLight,
                        modifier = Modifier.padding(top = 4.dp, bottom = 18.dp)
                    )

                    // Animated circular score ring
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier.size(110.dp)
                    ) {
                        CircularProgressIndicator(
                            progress = { 1f },
                            modifier = Modifier.size(105.dp),
                            color = Color(0x181F3A4D),
                            strokeWidth = 10.dp
                        )
                        CircularProgressIndicator(
                            progress = { animProgress },
                            modifier = Modifier.size(105.dp),
                            color = if (percentage >= 70) ForestGreen else SaffronOrange,
                            strokeWidth = 10.dp,
                            strokeCap = StrokeCap.Round
                        )
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "$percentage%",
                                fontSize = 24.sp,
                                fontWeight = FontWeight.Bold,
                                color = InkBlue
                            )
                            Text(
                                text = "$correct / $total",
                                fontSize = 12.sp,
                                color = InkBlueLight
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        if (missedCount > 0) {
                            Button(
                                onClick = onRetryMissedClick,
                                modifier = Modifier
                                    .weight(1f)
                                    .height(44.dp),
                                shape = RoundedCornerShape(14.dp),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = SaffronOrange,
                                    contentColor = Color.White
                                )
                            ) {
                                Icon(Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(text = "Retry $missedCount Missed", fontSize = 13.sp, fontWeight = FontWeight.Bold)
                            }
                        }

                        Button(
                            onClick = onDoneClick,
                            modifier = Modifier
                                .weight(1f)
                                .height(44.dp),
                            shape = RoundedCornerShape(14.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = InkBlue,
                                contentColor = Color.White
                            )
                        ) {
                            Icon(Icons.Default.Done, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(text = "Done", fontSize = 13.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }

        // Section Title: Detailed Review
        item {
            Text(
                text = "Detailed Answer Review (${result.results.size})",
                fontFamily = FontFamily.Serif,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold,
                color = InkBlue,
                modifier = Modifier.padding(top = 8.dp)
            )
        }

        // List of question reviews
        itemsIndexed(result.results) { index, item ->
            val q = item.question
            val isCorrect = item.isCorrect

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = PaperCard),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(24.dp)
                                    .background(
                                        if (isCorrect) ForestGreen.copy(alpha = 0.15f) else CrimsonRed.copy(alpha = 0.15f),
                                        CircleShape
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = if (isCorrect) Icons.Default.Check else Icons.Default.Close,
                                    contentDescription = null,
                                    tint = if (isCorrect) ForestGreen else CrimsonRed,
                                    modifier = Modifier.size(15.dp)
                                )
                            }
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Q${index + 1}: ${q.prompt}",
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = InkBlue,
                                maxLines = 2,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    if (q.type == QuestionType.TAP_MAP) {
                        val dist = item.distanceKm?.toInt() ?: 0
                        Text(
                            text = if (isCorrect) "✓ Tapped within range: $dist km" else "✗ Tapped too far: $dist km (Target was ${q.targetPlace?.name})",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Medium,
                            color = if (isCorrect) ForestGreen else CrimsonRed
                        )
                    } else if (q.options.isNotEmpty()) {
                        val correctOption = q.options.getOrNull(q.correctOptionIndex) ?: ""
                        val userOption = q.options.getOrNull(item.userOptionIndex) ?: "Skipped"

                        if (!isCorrect) {
                            Text(
                                text = "Your answer: $userOption",
                                fontSize = 12.sp,
                                color = CrimsonRed
                            )
                        }
                        Text(
                            text = "Correct answer: $correctOption",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = ForestGreen
                        )
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = q.explanation,
                        fontSize = 12.sp,
                        lineHeight = 16.sp,
                        color = Color(0xB01F3A4D)
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
