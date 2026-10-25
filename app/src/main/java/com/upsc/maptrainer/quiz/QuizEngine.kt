package com.upsc.maptrainer.quiz

import com.upsc.maptrainer.data.FactQuestion
import com.upsc.maptrainer.data.Place
import com.upsc.maptrainer.data.QuestionType
import com.upsc.maptrainer.data.QuizMode
import com.upsc.maptrainer.data.QuizQuestion
import com.upsc.maptrainer.data.SRSRecord
import com.upsc.maptrainer.data.Topic
import kotlin.math.asin
import kotlin.math.cos
import kotlin.math.pow
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.random.Random

object QuizEngine {

    const val ONE_DAY_MS = 24L * 60 * 60 * 1000

    // Spaced repetition intervals in days for mastery levels 0 through 5
    val SRS_INTERVAL_DAYS = listOf(0, 1, 3, 7, 16, 35)

    // Approximate centroids for Indian States and Major UTs for realistic geographical distractors
    val STATE_CENTROIDS = mapOf(
        "Andhra Pradesh" to Pair(15.91, 79.74),
        "Arunachal Pradesh" to Pair(28.21, 94.72),
        "Assam" to Pair(26.20, 92.93),
        "Bihar" to Pair(25.09, 85.31),
        "Chhattisgarh" to Pair(21.27, 81.86),
        "Goa" to Pair(15.29, 74.12),
        "Gujarat" to Pair(22.25, 71.19),
        "Haryana" to Pair(29.05, 76.08),
        "Himachal Pradesh" to Pair(31.10, 77.17),
        "Jharkhand" to Pair(23.61, 85.27),
        "Karnataka" to Pair(15.31, 75.71),
        "Kerala" to Pair(10.85, 76.27),
        "Madhya Pradesh" to Pair(22.97, 78.65),
        "Maharashtra" to Pair(19.75, 75.71),
        "Manipur" to Pair(24.66, 93.90),
        "Meghalaya" to Pair(25.46, 91.36),
        "Mizoram" to Pair(23.16, 92.93),
        "Nagaland" to Pair(26.15, 94.56),
        "Odisha" to Pair(20.95, 85.09),
        "Punjab" to Pair(31.14, 75.34),
        "Rajasthan" to Pair(27.02, 74.21),
        "Sikkim" to Pair(27.53, 88.51),
        "Tamil Nadu" to Pair(11.12, 78.65),
        "Telangana" to Pair(18.11, 79.01),
        "Tripura" to Pair(23.94, 91.98),
        "Uttar Pradesh" to Pair(26.84, 80.94),
        "Uttarakhand" to Pair(30.06, 79.01),
        "West Bengal" to Pair(22.98, 87.85),
        "Jammu & Kashmir" to Pair(33.77, 74.52),
        "Ladakh" to Pair(34.15, 77.57),
        "Delhi" to Pair(28.70, 77.10),
        "Andaman & Nicobar Islands" to Pair(11.74, 92.65),
        "Puducherry" to Pair(11.94, 79.80)
    )

    val EXCLUDED_DISTRACTOR_UTS = setOf(
        "Chandigarh", "Dadra & Nagar Haveli", "Daman & Diu", "Lakshadweep", "Delhi", "Puducherry"
    )

    fun haversineDistanceKm(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
        val r = 6371.0
        val dLat = Math.toRadians(lat2 - lat1)
        val dLon = Math.toRadians(lon2 - lon1)
        val a = sin(dLat / 2).pow(2) +
                cos(Math.toRadians(lat1)) * cos(Math.toRadians(lat2)) *
                sin(dLon / 2).pow(2)
        val c = 2 * asin(sqrt(a))
        return r * c
    }

    /**
     * Calculates the new SRS record for a place based on whether the answer was correct.
     * When correct: mastery increases (up to 5), interval expands (1d -> 3d -> 7d -> 16d -> 35d).
     * When wrong: mastery decreases, interval resets to 1 day for tomorrow review.
     */
    fun calculateNextReview(
        existing: SRSRecord?,
        topicId: String,
        placeName: String,
        isCorrect: Boolean,
        now: Long = System.currentTimeMillis()
    ): SRSRecord {
        val currentMastery = existing?.mastery ?: 0
        val currentReps = existing?.reps ?: 0
        val currentLapses = existing?.lapses ?: 0

        return if (isCorrect) {
            val newMastery = (currentMastery + 1).coerceAtMost(5)
            val intervalDays = SRS_INTERVAL_DAYS[newMastery]
            val nextReviewAt = now + intervalDays * ONE_DAY_MS
            SRSRecord(
                placeKey = "$topicId|$placeName",
                topicId = topicId,
                placeName = placeName,
                mastery = newMastery,
                intervalDays = intervalDays,
                lastReviewedAt = now,
                nextReviewAt = nextReviewAt,
                reps = currentReps + 1,
                lapses = currentLapses
            )
        } else {
            val newMastery = (currentMastery - 1).coerceAtLeast(0)
            val intervalDays = 1 // scheduled for tomorrow
            val nextReviewAt = now + intervalDays * ONE_DAY_MS
            SRSRecord(
                placeKey = "$topicId|$placeName",
                topicId = topicId,
                placeName = placeName,
                mastery = newMastery,
                intervalDays = intervalDays,
                lastReviewedAt = now,
                nextReviewAt = nextReviewAt,
                reps = currentReps + 1,
                lapses = currentLapses + 1
            )
        }
    }

    /**
     * Generate a quiz session of the given length and mode.
     */
    fun generateQuiz(
        topic: Topic,
        length: Int = 10,
        mode: QuizMode = QuizMode.MIXED,
        masteryMap: Map<String, Int> = emptyMap(),
        random: Random = Random.Default
    ): List<QuizQuestion> {
        val questions = mutableListOf<QuizQuestion>()
        val targetCount = length.coerceAtMost(topic.places.size + topic.questions.size)
        if (targetCount <= 0) return emptyList()

        val factBudget = when (mode) {
            QuizMode.MAP_ONLY -> 0
            QuizMode.QUESTIONS_ONLY -> (targetCount * 0.35).toInt().coerceAtMost(topic.questions.size)
            QuizMode.MIXED, QuizMode.SRS_DUE -> (targetCount * 0.25).toInt().coerceAtMost(topic.questions.size)
        }

        val availableFactQuestions = topic.questions.shuffled(random).take(factBudget)
        for (fq in availableFactQuestions) {
            questions.add(buildFactQuestion(topic, fq, random))
        }

        val remainingCount = targetCount - questions.size
        if (remainingCount <= 0) return questions.shuffled(random)

        val selectedPlaces = sampleWeightedWithoutReplacement(
            topic.places,
            remainingCount,
            random
        ) { place ->
            val key = "${topic.id}|${place.name}"
            val mastery = masteryMap[key]?.coerceIn(0, 5) ?: 0
            6 - mastery
        }

        val allowedTypes = when (mode) {
            QuizMode.MAP_ONLY -> listOf(QuestionType.TAP_MAP, QuestionType.IDENTIFY)
            QuizMode.QUESTIONS_ONLY -> listOf(QuestionType.STATE_MCQ, QuestionType.CATEGORY, QuestionType.CLUE)
            QuizMode.MIXED, QuizMode.SRS_DUE -> listOf(
                QuestionType.TAP_MAP,
                QuestionType.IDENTIFY,
                QuestionType.STATE_MCQ,
                QuestionType.CATEGORY,
                QuestionType.CLUE
            )
        }

        for (place in selectedPlaces) {
            val candidateTypes = allowedTypes.filter { type ->
                when (type) {
                    QuestionType.STATE_MCQ -> place.state.isNotBlank()
                    QuestionType.CATEGORY -> topic.categories.size > 1
                    else -> true
                }
            }
            val chosenType = if (candidateTypes.isNotEmpty()) {
                candidateTypes.random(random)
            } else {
                QuestionType.TAP_MAP
            }

            val q = when (chosenType) {
                QuestionType.TAP_MAP -> buildTapMapQuestion(topic, place)
                QuestionType.IDENTIFY -> buildIdentifyQuestion(topic, place, random)
                QuestionType.STATE_MCQ -> buildStateQuestion(topic, place, random)
                QuestionType.CATEGORY -> buildCategoryQuestion(topic, place, random)
                QuestionType.CLUE -> buildClueQuestion(topic, place, random)
                QuestionType.FACT -> buildTapMapQuestion(topic, place)
            }
            questions.add(q)
        }

        return questions.shuffled(random)
    }

    private fun buildTapMapQuestion(topic: Topic, place: Place): QuizQuestion {
        return QuizQuestion(
            type = QuestionType.TAP_MAP,
            topicId = topic.id,
            topicTitle = topic.title,
            prompt = "Tap the location of ${place.name} on the map.",
            targetPlace = place,
            explanation = "${place.name} is in ${place.state.ifBlank { "offshore/boundary region" }}. ${place.fact}"
        )
    }

    private fun buildIdentifyQuestion(topic: Topic, place: Place, random: Random): QuizQuestion {
        val distractors = topic.places
            .filter { it.name != place.name }
            .sortedBy { haversineDistanceKm(place.lat, place.lon, it.lat, it.lon) }
            .map { it.name }
            .distinct()
            .take(3)

        val options = (distractors + place.name).shuffled(random)
        val correctIndex = options.indexOf(place.name)

        return QuizQuestion(
            type = QuestionType.IDENTIFY,
            topicId = topic.id,
            topicTitle = topic.title,
            prompt = "Identify the ${topic.noun} highlighted with the marker on the map.",
            targetPlace = place,
            options = options,
            correctOptionIndex = correctIndex,
            explanation = "${place.name}: ${place.fact}"
        )
    }

    private fun buildStateQuestion(topic: Topic, place: Place, random: Random): QuizQuestion {
        val targetState = place.state
        val centroid = STATE_CENTROIDS[targetState] ?: Pair(place.lat, place.lon)

        val candidates = STATE_CENTROIDS.keys
            .filter { it != targetState }
            .filter { candidate ->
                !(targetState == "Jammu & Kashmir" && candidate == "Ladakh") &&
                !(targetState == "Ladakh" && candidate == "Jammu & Kashmir")
            }
            .filter { candidate ->
                !EXCLUDED_DISTRACTOR_UTS.contains(candidate) || candidate == targetState
            }
            .sortedBy { candidate ->
                val c = STATE_CENTROIDS[candidate]!!
                haversineDistanceKm(centroid.first, centroid.second, c.first, c.second)
            }
            .take(10)
            .shuffled(random)
            .take(3)

        val options = (candidates + targetState).shuffled(random)
        val correctIndex = options.indexOf(targetState)

        return QuizQuestion(
            type = QuestionType.STATE_MCQ,
            topicId = topic.id,
            topicTitle = topic.title,
            prompt = "In which State or Union Territory is ${place.name} located?",
            targetPlace = place,
            options = options,
            correctOptionIndex = correctIndex,
            explanation = "${place.name} is situated in $targetState. ${place.fact}"
        )
    }

    private fun buildCategoryQuestion(topic: Topic, place: Place, random: Random): QuizQuestion {
        val correctCat = place.category
        val otherCats = topic.categories.filter { it != correctCat }.shuffled(random)
        val distractorCount = (4 - 1).coerceAtMost(otherCats.size)
        val chosenDistractors = otherCats.take(distractorCount)

        val options = (chosenDistractors + correctCat).shuffled(random)
        val correctIndex = options.indexOf(correctCat)

        return QuizQuestion(
            type = QuestionType.CATEGORY,
            topicId = topic.id,
            topicTitle = topic.title,
            prompt = "Which category or classification does ${place.name} belong to?",
            targetPlace = place,
            options = options,
            correctOptionIndex = correctIndex,
            explanation = "${place.name} is classified as '$correctCat'. ${place.fact}"
        )
    }

    private fun buildClueQuestion(topic: Topic, place: Place, random: Random): QuizQuestion {
        val maskedFact = maskPlaceNameInText(place.fact, place.name)

        val distractors = topic.places
            .filter { it.name != place.name }
            .shuffled(random)
            .map { it.name }
            .distinct()
            .take(3)

        val options = (distractors + place.name).shuffled(random)
        val correctIndex = options.indexOf(place.name)

        return QuizQuestion(
            type = QuestionType.CLUE,
            topicId = topic.id,
            topicTitle = topic.title,
            prompt = "Which ${topic.noun} matches this UPSC exam fact?",
            targetPlace = place,
            options = options,
            correctOptionIndex = correctIndex,
            clueText = maskedFact,
            explanation = "${place.name}: ${place.fact}"
        )
    }

    private fun buildFactQuestion(topic: Topic, fq: FactQuestion, random: Random): QuizQuestion {
        val options = (fq.wrong + fq.correct).shuffled(random)
        val correctIndex = options.indexOf(fq.correct)

        return QuizQuestion(
            type = QuestionType.FACT,
            topicId = topic.id,
            topicTitle = topic.title,
            prompt = fq.question,
            targetPlace = null,
            options = options,
            correctOptionIndex = correctIndex,
            explanation = fq.explanation,
            handwrittenQuestion = fq
        )
    }

    fun maskPlaceNameInText(text: String, placeName: String): String {
        var result = text
        val tokens = mutableListOf(placeName)
        if (placeName.contains("(") && placeName.contains(")")) {
            val mainPart = placeName.substringBefore("(").trim()
            val insidePart = placeName.substringAfter("(").substringBefore(")").trim()
            if (mainPart.isNotBlank()) tokens.add(mainPart)
            if (insidePart.isNotBlank()) tokens.add(insidePart)
        }

        for (token in tokens) {
            if (token.length >= 3) {
                val regex = Regex("(?i)\\b${Regex.escape(token)}\\b")
                result = regex.replace(result, "________")
            }
        }
        return result
    }

    private fun <T> sampleWeightedWithoutReplacement(
        items: List<T>,
        k: Int,
        random: Random,
        weightSelector: (T) -> Int
    ): List<T> {
        if (items.size <= k) return items.shuffled(random)
        val scored = items.map { item ->
            val w = weightSelector(item).coerceAtLeast(1).toDouble()
            val u = random.nextDouble().coerceAtLeast(1e-9)
            val score = u.pow(1.0 / w)
            Pair(item, score)
        }
        return scored.sortedByDescending { it.second }.take(k).map { it.first }
    }
}
