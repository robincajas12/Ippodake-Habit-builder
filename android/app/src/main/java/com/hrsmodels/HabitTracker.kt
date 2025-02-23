package com.hrsmodels

import org.json.JSONObject
import org.json.JSONArray
class HabitTracker(
    initialTime: Double,
    targetTime: Double,
    alpha: Double,
    beta: Double
) {
    val habitModel = HabitFormationModel(initialTime, targetTime, alpha, beta)
    val history = mutableListOf<HabitEntry>()

    // Registra el desempeño diario (0-1)
    fun recordDay(day: Int, actualTime: Double) {
        val assignedTime = habitModel.getCurrentTime()
        val completionRatio = actualTime / assignedTime

        habitModel.updateTime(completionRatio)
        history.add(HabitEntry(day, assignedTime, actualTime, (actualTime / assignedTime) * 100))
    }

    // Retorna el progreso en formato JSON
    fun showProgress(): String {
        val jsonArray = JSONArray()
        history.forEach { entry ->
            val jsonObject = JSONObject()
            jsonObject.put("day", entry.day)
            jsonObject.put("assigned", entry.assigned)
            jsonObject.put("actual", entry.actual)
            jsonObject.put("progress", entry.progress)
            jsonArray.put(jsonObject)
        }
        return jsonArray.toString()
    }
}
