package com.hrsmodels


class HabitFormationModel(
    initialTime: Double,
    private val targetTime: Double,
    private val alpha: Double,
    private val beta: Double
) {
    private var currentTime: Double = initialTime
    private val minTime: Double = initialTime

    // Actualiza el tiempo basado en el cumplimiento (0 a 1)
    fun updateTime(completionRatio: Double) {
        currentTime = when {
            completionRatio >= 0.99 -> minOf(targetTime, currentTime * (1 + alpha))
            completionRatio <= 0.90 -> maxOf(minTime, currentTime * (1 - beta))
            else -> {
                val adjustment = alpha * completionRatio - beta * (1 - completionRatio)
                maxOf(minTime, minOf(targetTime, currentTime * (1 + adjustment)))
            }
        }
    }

    fun getCurrentTime(): Double = currentTime
}
