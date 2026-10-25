package com.upsc.maptrainer.data

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONArray
import org.json.JSONObject
import java.io.InputStreamReader

class DataProvider(private val context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("upsc_map_trainer_prefs", Context.MODE_PRIVATE)

    var states: List<StateBoundary> = emptyList()
        private set

    var topics: List<Topic> = emptyList()
        private set

    fun initialize() {
        if (states.isEmpty()) {
            states = loadStatesFromAssets()
        }
        if (topics.isEmpty()) {
            topics = loadTopicsFromAssets()
        }
    }

    private fun loadStatesFromAssets(): List<StateBoundary> {
        val result = mutableListOf<StateBoundary>()
        try {
            val jsonString = context.assets.open("india_states.json").use { stream ->
                InputStreamReader(stream, "UTF-8").readText()
            }
            val array = JSONArray(jsonString)
            for (i in 0 until array.length()) {
                val obj = array.getJSONObject(i)
                val name = obj.getString("name")
                val ringsArray = obj.getJSONArray("rings")
                val rings = mutableListOf<List<Pair<Double, Double>>>()

                for (r in 0 until ringsArray.length()) {
                    val ringArray = ringsArray.getJSONArray(r)
                    val ring = mutableListOf<Pair<Double, Double>>()
                    for (p in 0 until ringArray.length()) {
                        val pt = ringArray.getJSONArray(p)
                        val lon = pt.getDouble(0)
                        val lat = pt.getDouble(1)
                        ring.add(Pair(lon, lat))
                    }
                    rings.add(ring)
                }
                result.add(StateBoundary(name, rings))
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return result
    }

    private fun loadTopicsFromAssets(): List<Topic> {
        val result = mutableListOf<Topic>()
        try {
            val jsonString = context.assets.open("topics.json").use { stream ->
                InputStreamReader(stream, "UTF-8").readText()
            }
            val array = JSONArray(jsonString)
            for (i in 0 until array.length()) {
                val obj = array.getJSONObject(i)
                val id = obj.getString("id")
                val title = obj.getString("title")
                val emoji = obj.getString("emoji")
                val color = obj.getString("color")
                val syllabus = obj.getString("syllabus")
                val noun = obj.getString("noun")
                val blurb = obj.getString("blurb")

                val catsArray = obj.getJSONArray("categories")
                val categories = mutableListOf<String>()
                for (c in 0 until catsArray.length()) {
                    categories.add(catsArray.getString(c))
                }

                val placesArray = obj.getJSONArray("places")
                val places = mutableListOf<Place>()
                for (p in 0 until placesArray.length()) {
                    val pObj = placesArray.getJSONObject(p)
                    places.add(
                        Place(
                            name = pObj.getString("name"),
                            lat = pObj.getDouble("lat"),
                            lon = pObj.getDouble("lon"),
                            state = pObj.optString("state", ""),
                            category = pObj.getString("category"),
                            fact = pObj.getString("fact")
                        )
                    )
                }

                val questionsArray = obj.getJSONArray("questions")
                val questions = mutableListOf<FactQuestion>()
                for (q in 0 until questionsArray.length()) {
                    val qObj = questionsArray.getJSONObject(q)
                    val wrongArray = qObj.getJSONArray("wrong")
                    val wrongList = mutableListOf<String>()
                    for (w in 0 until wrongArray.length()) {
                        wrongList.add(wrongArray.getString(w))
                    }
                    questions.add(
                        FactQuestion(
                            question = qObj.getString("question"),
                            correct = qObj.getString("correct"),
                            wrong = wrongList,
                            explanation = qObj.getString("explanation")
                        )
                    )
                }

                result.add(
                    Topic(
                        id = id,
                        title = title,
                        emoji = emoji,
                        color = color,
                        syllabus = syllabus,
                        noun = noun,
                        blurb = blurb,
                        categories = categories,
                        places = places,
                        questions = questions
                    )
                )
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return result
    }

    // --- Mastery and Progress Storage ---

    fun getPlaceMastery(topicId: String, placeName: String): Int {
        val key = "$topicId|$placeName"
        return prefs.getInt(key, 0).coerceIn(0, 5)
    }

    fun getAllMastery(): Map<String, Int> {
        val map = mutableMapOf<String, Int>()
        for ((key, value) in prefs.all) {
            if (key.contains("|") && value is Int) {
                map[key] = value.coerceIn(0, 5)
            }
        }
        return map
    }

    fun recordQuizResult(topicId: String, items: List<QuizResultItem>) {
        val editor = prefs.edit()
        var answered = prefs.getInt("${topicId}_answered", 0)
        var correct = prefs.getInt("${topicId}_correct", 0)

        for (item in items) {
            answered++
            if (item.isCorrect) correct++

            val place = item.question.targetPlace
            if (place != null) {
                val key = "$topicId|${place.name}"
                val current = prefs.getInt(key, 0)
                val updated = if (item.isCorrect) {
                    (current + 1).coerceAtMost(5)
                } else {
                    (current - 1).coerceAtLeast(0)
                }
                editor.putInt(key, updated)
            }
        }

        editor.putInt("${topicId}_answered", answered)
        editor.putInt("${topicId}_correct", correct)

        if (items.isNotEmpty()) {
            val scorePercent = (items.count { it.isCorrect } * 100) / items.size
            val prevBest = prefs.getInt("${topicId}_best_score", 0)
            if (scorePercent > prevBest) {
                editor.putInt("${topicId}_best_score", scorePercent)
            }
        }

        // Update XP and Spaced Repetition Schedules
        val now = System.currentTimeMillis()
        var xpEarned = items.count { it.isCorrect } * 15
        if (items.size >= 5) xpEarned += 50
        val currentXp = prefs.getInt("user_xp", 0)
        editor.putInt("user_xp", currentXp + xpEarned)

        for (item in items) {
            val p = item.question.targetPlace
            if (p != null) {
                val srsKey = "srs_${topicId}_${p.name}"
                val currentMastery = prefs.getInt("${topicId}|${p.name}", 0)
                val reps = prefs.getInt("${srsKey}_reps", 0) + 1
                val lapses = prefs.getInt("${srsKey}_lapses", 0) + (if (item.isCorrect) 0 else 1)
                val intervalDays = if (item.isCorrect) {
                    when (currentMastery) {
                        0 -> 1
                        1 -> 3
                        2 -> 7
                        3 -> 16
                        else -> 35
                    }
                } else {
                    1
                }
                val nextReview = now + intervalDays * 24L * 60 * 60 * 1000
                editor.putLong("${srsKey}_next", nextReview)
                editor.putLong("${srsKey}_last", now)
                editor.putInt("${srsKey}_interval", intervalDays)
                editor.putInt("${srsKey}_reps", reps)
                editor.putInt("${srsKey}_lapses", lapses)
            }
        }

        editor.apply()
    }

    fun getDuePlacesCount(): Int {
        val now = System.currentTimeMillis()
        var count = 0
        for (topic in topics) {
            for (place in topic.places) {
                val srsKey = "srs_${topic.id}_${place.name}"
                val next = prefs.getLong("${srsKey}_next", 0L)
                if (next in 1..now) {
                    count++
                }
            }
        }
        return count
    }

    fun getUserXp(): Int = prefs.getInt("user_xp", 0)

    fun getUserStreak(): Int = prefs.getInt("user_streak", 0)

    fun getTopicStats(topicId: String): Triple<Int, Int, Int> {
        val answered = prefs.getInt("${topicId}_answered", 0)
        val correct = prefs.getInt("${topicId}_correct", 0)
        val bestScore = prefs.getInt("${topicId}_best_score", 0)
        return Triple(answered, correct, bestScore)
    }

    fun getOverallStats(): Pair<Int, Int> {
        var totalAnswered = 0
        var totalCorrect = 0
        for (topic in topics) {
            totalAnswered += prefs.getInt("${topic.id}_answered", 0)
            totalCorrect += prefs.getInt("${topic.id}_correct", 0)
        }
        return Pair(totalAnswered, totalCorrect)
    }

    fun resetAllProgress() {
        prefs.edit().clear().apply()
    }
}
