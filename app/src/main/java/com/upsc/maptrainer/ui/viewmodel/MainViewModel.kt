package com.upsc.maptrainer.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import com.upsc.maptrainer.data.DataProvider
import com.upsc.maptrainer.data.Place
import com.upsc.maptrainer.data.QuizMode
import com.upsc.maptrainer.data.QuizQuestion
import com.upsc.maptrainer.data.QuizResultItem
import com.upsc.maptrainer.data.Topic
import com.upsc.maptrainer.quiz.QuizEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

sealed class Screen {
    object Home : Screen()
    data class TopicMap(val topic: Topic) : Screen()
    data class Quiz(
        val topic: Topic,
        val mode: QuizMode,
        val questions: List<QuizQuestion>,
        val currentIndex: Int = 0,
        val streak: Int = 0,
        val results: List<QuizResultItem> = emptyList()
    ) : Screen()
    data class Result(
        val topic: Topic,
        val results: List<QuizResultItem>
    ) : Screen()
}

class MainViewModel(application: Application) : AndroidViewModel(application) {

    val dataProvider = DataProvider(application)

    private val _screen = MutableStateFlow<Screen>(Screen.Home)
    val screen: StateFlow<Screen> = _screen.asStateFlow()

    private val _selectedTopic = MutableStateFlow<Topic?>(null)
    val selectedTopic: StateFlow<Topic?> = _selectedTopic.asStateFlow()

    private val _selectedPlace = MutableStateFlow<Place?>(null)
    val selectedPlace: StateFlow<Place?> = _selectedPlace.asStateFlow()

    init {
        dataProvider.initialize()
    }

    fun navigateToHome() {
        _screen.value = Screen.Home
        _selectedPlace.value = null
    }

    fun openTopicMap(topic: Topic) {
        _selectedTopic.value = topic
        _selectedPlace.value = null
        _screen.value = Screen.TopicMap(topic)
    }

    fun selectPlace(place: Place?) {
        _selectedPlace.value = place
    }

    fun startQuiz(topic: Topic, mode: QuizMode = QuizMode.MIXED, length: Int = 10) {
        val mastery = dataProvider.getAllMastery()
        val questions = QuizEngine.generateQuiz(
            topic = topic,
            length = length,
            mode = mode,
            masteryMap = mastery
        )
        _screen.value = Screen.Quiz(
            topic = topic,
            mode = mode,
            questions = questions,
            currentIndex = 0,
            streak = 0,
            results = emptyList()
        )
    }

    fun startDailyMixedQuiz() {
        val allTopics = dataProvider.topics
        if (allTopics.isEmpty()) return
        // Pick random places across topics
        val sampleTopic = allTopics.random()
        startQuiz(sampleTopic, QuizMode.MIXED, length = 10)
    }

    fun recordQuizAnswer(
        currentQuiz: Screen.Quiz,
        userOptionIndex: Int = -1,
        userTapLat: Double? = null,
        userTapLon: Double? = null,
        isCorrect: Boolean,
        distanceKm: Double? = null
    ) {
        val q = currentQuiz.questions[currentQuiz.currentIndex]
        val resultItem = QuizResultItem(
            question = q,
            userOptionIndex = userOptionIndex,
            userTapLat = userTapLat,
            userTapLon = userTapLon,
            isCorrect = isCorrect,
            distanceKm = distanceKm
        )
        val updatedResults = currentQuiz.results + resultItem
        val newStreak = if (isCorrect) currentQuiz.streak + 1 else 0

        if (currentQuiz.currentIndex + 1 >= currentQuiz.questions.size) {
            // Quiz completed
            dataProvider.recordQuizResult(currentQuiz.topic.id, updatedResults)
            _screen.value = Screen.Result(
                topic = currentQuiz.topic,
                results = updatedResults
            )
        } else {
            _screen.value = currentQuiz.copy(
                currentIndex = currentQuiz.currentIndex + 1,
                streak = newStreak,
                results = updatedResults
            )
        }
    }

    fun retryMissedQuestions(result: Screen.Result) {
        val missed = result.results.filter { !it.isCorrect }.map { it.question }
        if (missed.isNotEmpty()) {
            _screen.value = Screen.Quiz(
                topic = result.topic,
                mode = QuizMode.MIXED,
                questions = missed,
                currentIndex = 0,
                streak = 0,
                results = emptyList()
            )
        } else {
            navigateToHome()
        }
    }

    fun resetAllProgress() {
        dataProvider.resetAllProgress()
        _screen.value = Screen.Home
    }
}
