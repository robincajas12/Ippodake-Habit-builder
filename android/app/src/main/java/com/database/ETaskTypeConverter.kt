package com.database

import androidx.room.TypeConverter

class ETaskTypeConverter {
    @TypeConverter
    fun fromETaskType(taskType: ETaskType): Int {
        return taskType.ordinal
    }

    @TypeConverter
    fun toETaskType(taskType: Int): ETaskType {
        return ETaskType.entries.getOrNull(taskType) ?: throw IllegalArgumentException("Invalid task type: $taskType")
    }
}
