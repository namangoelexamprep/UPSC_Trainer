package com.upsc.maptrainer.data

data class StateBoundary(
    val name: String,
    val rings: List<List<Pair<Double, Double>>> // [lon, lat] pairs
)

data class Place(
    val name: String,
    val lat: Double,
    val lon: Double,
    val state: String,
    val category: String,
    val fact: String
)

data class FactQuestion(
    val question: String,
    val correct: String,
    val wrong: List<String>,
    val explanation: String
)

data class Topic(
    val id: String,
    val title: String,
    val emoji: String,
    val color: String,
    val syllabus: String,
    val noun: String,
    val blurb: String,
    val categories: List<String>,
    val places: List<Place>,
    val questions: List<FactQuestion>
)

enum class QuestionType {
    TAP_MAP,
    IDENTIFY,
    STATE_MCQ,
    CATEGORY,
    CLUE,
    FACT
}

enum class QuizMode(val label: String) {
    MIXED("Mixed"),
    MAP_ONLY("Map Only"),
    QUESTIONS_ONLY("Questions Only"),
    SRS_DUE("SRS Due Review")
}

data class QuizQuestion(
    val type: QuestionType,
    val topicId: String,
    val topicTitle: String,
    val prompt: String,
    val targetPlace: Place? = null,
    val options: List<String> = emptyList(),
    val correctOptionIndex: Int = -1,
    val explanation: String = "",
    val clueText: String = "",
    val handwrittenQuestion: FactQuestion? = null
)

data class QuizResultItem(
    val question: QuizQuestion,
    val userOptionIndex: Int = -1,
    val userTapLat: Double? = null,
    val userTapLon: Double? = null,
    val isCorrect: Boolean,
    val distanceKm: Double? = null
)

data class SRSRecord(
    val placeKey: String, // "topicId|placeName"
    val topicId: String,
    val placeName: String,
    val mastery: Int, // 0..5
    val intervalDays: Int,
    val lastReviewedAt: Long,
    val nextReviewAt: Long,
    val reps: Int = 0,
    val lapses: Int = 0
)

data class Badge(
    val id: String,
    val title: String,
    val description: String,
    val emoji: String,
    val unlocked: Boolean = false,
    val progress: Int = 0,
    val maxProgress: Int = 1
)

data class AspirantRank(
    val name: String,
    val minXp: Int,
    val title: String,
    val badgeEmoji: String
)

data class UserRewards(
    val xp: Int = 0,
    val streakDays: Int = 0,
    val lastActiveDate: String = "",
    val badges: Map<String, Boolean> = emptyMap()
)
