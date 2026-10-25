package com.upsc.maptrainer.quiz

import com.upsc.maptrainer.data.FactQuestion
import com.upsc.maptrainer.data.Place
import com.upsc.maptrainer.data.QuestionType
import com.upsc.maptrainer.data.QuizMode
import com.upsc.maptrainer.data.Topic
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import kotlin.random.Random

class QuizEngineTest {

    private fun createSampleTopic(id: String = "test_topic"): Topic {
        val places = listOf(
            Place("Jharia", 23.742, 86.413, "Jharkhand", "Coking Coal", "India's sole storehouse of prime coking coal in Damodar Valley."),
            Place("Bokaro", 23.784, 85.962, "Jharkhand", "Coking Coal", "Vital medium-coking coal source in Damodar Valley."),
            Place("Raniganj", 23.619, 87.129, "West Bengal", "Non-Coking Coal", "Oldest commercial coalfield opened in 1774."),
            Place("Talcher", 20.950, 85.216, "Odisha", "Non-Coking Coal", "Massive non-coking coal reserve along Brahmani river."),
            Place("Korba", 22.359, 82.684, "Chhattisgarh", "Non-Coking Coal", "Hasdeo river basin field powering thermal plants."),
            Place("Singrauli", 24.199, 82.664, "Madhya Pradesh", "Non-Coking Coal", "Son river valley field with Purewa seam."),
            Place("Neyveli", 11.536, 79.486, "Tamil Nadu", "Lignite", "Largest open-cast brown coal deposit."),
            Place("Palana", 27.842, 73.268, "Rajasthan", "Lignite", "Tertiary lignite basin in Bikaner."),
            Place("Makum", 27.300, 95.750, "Assam", "Non-Coking Coal", "Upper Assam tertiary coalfield."),
            Place("Kothagudem", 17.551, 80.618, "Telangana", "Non-Coking Coal", "Singareni Collieries Godavari valley field.")
        )
        val questions = listOf(
            FactQuestion(
                "Which river valley hosts Jharia?",
                "Damodar Valley",
                listOf("Son Valley", "Mahanadi Valley", "Godavari Valley"),
                "Damodar Valley hosts Jharia."
            ),
            FactQuestion(
                "Which state holds largest lignite?",
                "Tamil Nadu",
                listOf("Rajasthan", "Gujarat", "Odisha"),
                "Tamil Nadu holds 80% lignite."
            )
        )
        return Topic(
            id = id,
            title = "Test Coal Fields",
            emoji = "⛏️",
            color = "#475569",
            syllabus = "GS1 · Geography",
            noun = "coalfield",
            blurb = "Coal deposits across India.",
            categories = listOf("Coking Coal", "Non-Coking Coal", "Lignite"),
            places = places,
            questions = questions
        )
    }

    @Test
    fun testHaversineDistanceAccuracy() {
        // Delhi (28.61, 77.20) to Mumbai (19.07, 72.87) is approx 1150-1160 km
        val dist = QuizEngine.haversineDistanceKm(28.6139, 77.2090, 19.0760, 72.8777)
        assertTrue("Distance Delhi-Mumbai should be ~1150 km, got $dist", dist in 1130.0..1180.0)
    }

    @Test
    fun testSpacedRepetitionIntervals() {
        val now = 1000000L
        // 1. Initial review correct -> level 1, interval 1 day
        var srs = QuizEngine.calculateNextReview(null, "coal", "Jharia", isCorrect = true, now = now)
        assertEquals(1, srs.mastery)
        assertEquals(1, srs.intervalDays)
        assertEquals(now + 1 * QuizEngine.ONE_DAY_MS, srs.nextReviewAt)

        // 2. Second review correct -> level 2, interval 3 days
        srs = QuizEngine.calculateNextReview(srs, "coal", "Jharia", isCorrect = true, now = now + 1 * QuizEngine.ONE_DAY_MS)
        assertEquals(2, srs.mastery)
        assertEquals(3, srs.intervalDays)

        // 3. Third review correct -> level 3, interval 7 days
        srs = QuizEngine.calculateNextReview(srs, "coal", "Jharia", isCorrect = true, now = now + 4 * QuizEngine.ONE_DAY_MS)
        assertEquals(3, srs.mastery)
        assertEquals(7, srs.intervalDays)

        // 4. Lapse / wrong answer -> drops mastery, resets interval to 1 day
        val wrongSrs = QuizEngine.calculateNextReview(srs, "coal", "Jharia", isCorrect = false, now = now + 11 * QuizEngine.ONE_DAY_MS)
        assertEquals(2, wrongSrs.mastery)
        assertEquals(1, wrongSrs.intervalDays)
        assertEquals(1, wrongSrs.lapses)
    }

    @Test
    fun testClueMaskingNeverLeaksPlaceName() {
        val fact = "Jamshedpur (TISCO) was founded by Jamsetji Tata in 1907 at Sakchi."
        val masked = QuizEngine.maskPlaceNameInText(fact, "Jamshedpur (TISCO)")
        assertFalse("Masked fact should not leak Jamshedpur: $masked", masked.contains("Jamshedpur", ignoreCase = true))
        assertFalse("Masked fact should not leak TISCO: $masked", masked.contains("TISCO", ignoreCase = true))
        assertTrue("Masked fact should contain placeholder blanks", masked.contains("________"))
    }

    @Test
    fun testExtensiveQuestionGenerationStress() {
        val topic = createSampleTopic()
        val random = Random(42)
        val iterations = 5000 // Multiplied by 10 questions per run = 50,000 questions tested!

        for (i in 0 until iterations) {
            val mode = when (i % 3) {
                0 -> QuizMode.MIXED
                1 -> QuizMode.MAP_ONLY
                else -> QuizMode.QUESTIONS_ONLY
            }
            val quiz = QuizEngine.generateQuiz(topic, length = 10, mode = mode, random = random)

            for (q in quiz) {
                when (q.type) {
                    QuestionType.TAP_MAP -> {
                        assertNotNull("TAP_MAP must have a target place", q.targetPlace)
                    }
                    QuestionType.IDENTIFY,
                    QuestionType.STATE_MCQ,
                    QuestionType.CATEGORY,
                    QuestionType.CLUE,
                    QuestionType.FACT -> {
                        // Assert exactly 4 options (unless category list has fewer, here 3)
                        val expectedOptionCount = if (q.type == QuestionType.CATEGORY) {
                            topic.categories.size.coerceAtMost(4)
                        } else {
                            4
                        }
                        assertEquals("Question ${q.prompt} option count mismatch", expectedOptionCount, q.options.size)

                        // Assert NO duplicate options
                        val distinctCount = q.options.distinct().size
                        assertEquals("Duplicate options found in: ${q.options}", q.options.size, distinctCount)

                        // Assert correctOptionIndex is within bounds
                        assertTrue("Correct index out of bounds: ${q.correctOptionIndex}", q.correctOptionIndex in q.options.indices)

                        val correctAnswer = q.options[q.correctOptionIndex]

                        if (q.type == QuestionType.STATE_MCQ) {
                            assertEquals("STATE_MCQ correct answer should match place state", q.targetPlace!!.state, correctAnswer)
                        } else if (q.type == QuestionType.CATEGORY) {
                            assertEquals("CATEGORY correct answer should match place category", q.targetPlace!!.category, correctAnswer)
                        } else if (q.type == QuestionType.IDENTIFY || q.type == QuestionType.CLUE) {
                            assertEquals("Correct answer should match place name", q.targetPlace!!.name, correctAnswer)
                        } else if (q.type == QuestionType.FACT) {
                            assertEquals("FACT correct answer should match handwritten correct", q.handwrittenQuestion!!.correct, correctAnswer)
                        }

                        // Assert CLUE never leaks the place name
                        if (q.type == QuestionType.CLUE) {
                            assertFalse(
                                "CLUE leaked target name '${q.targetPlace!!.name}' in '${q.clueText}'",
                                q.clueText.contains(q.targetPlace!!.name, ignoreCase = true)
                            )
                        }
                    }
                }
            }
        }
    }
}
