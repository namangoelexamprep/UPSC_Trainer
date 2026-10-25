package com.upsc.maptrainer

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import com.upsc.maptrainer.ui.screens.HomeScreen
import com.upsc.maptrainer.ui.screens.QuizScreen
import com.upsc.maptrainer.ui.screens.ResultScreen
import com.upsc.maptrainer.ui.screens.TopicMapScreen
import com.upsc.maptrainer.ui.theme.PaperBackground
import com.upsc.maptrainer.ui.theme.UPSCTrainerTheme
import com.upsc.maptrainer.ui.viewmodel.MainViewModel
import com.upsc.maptrainer.ui.viewmodel.Screen

class MainActivity : ComponentActivity() {

    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            UPSCTrainerTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = PaperBackground
                ) {
                    val currentScreen by viewModel.screen.collectAsState()

                    // BackHandler for system back button navigation
                    BackHandler(enabled = currentScreen !is Screen.Home) {
                        when (currentScreen) {
                            is Screen.TopicMap -> viewModel.navigateToHome()
                            is Screen.Quiz -> viewModel.navigateToHome()
                            is Screen.Result -> viewModel.navigateToHome()
                            Screen.Home -> { /* Finish activity handled by OS */ }
                        }
                    }

                    AnimatedContent(
                        targetState = currentScreen,
                        transitionSpec = {
                            fadeIn(animationSpec = tween(220)) togetherWith
                                    fadeOut(animationSpec = tween(180))
                        },
                        label = "screenTransition"
                    ) { targetScreen ->
                        when (targetScreen) {
                            is Screen.Home -> {
                                HomeScreen(
                                    dataProvider = viewModel.dataProvider,
                                    onTopicSelected = { topic -> viewModel.openTopicMap(topic) },
                                    onDailyQuizClick = { viewModel.startDailyMixedQuiz() },
                                    onResetClick = { viewModel.resetAllProgress() }
                                )
                            }
                            is Screen.TopicMap -> {
                                TopicMapScreen(
                                    topic = targetScreen.topic,
                                    states = viewModel.dataProvider.states,
                                    onBackClick = { viewModel.navigateToHome() },
                                    onStartQuizClick = { viewModel.startQuiz(targetScreen.topic) }
                                )
                            }
                            is Screen.Quiz -> {
                                QuizScreen(
                                    quiz = targetScreen,
                                    states = viewModel.dataProvider.states,
                                    onCloseClick = { viewModel.navigateToHome() },
                                    onAnswerSubmit = { optIdx, lat, lon, correct, dist ->
                                        viewModel.recordQuizAnswer(
                                            currentQuiz = targetScreen,
                                            userOptionIndex = optIdx,
                                            userTapLat = lat,
                                            userTapLon = lon,
                                            isCorrect = correct,
                                            distanceKm = dist
                                        )
                                    }
                                )
                            }
                            is Screen.Result -> {
                                ResultScreen(
                                    result = targetScreen,
                                    onRetryMissedClick = { viewModel.retryMissedQuestions(targetScreen) },
                                    onDoneClick = { viewModel.navigateToHome() }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
