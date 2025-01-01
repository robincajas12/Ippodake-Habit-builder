package com.database

import androidx.room.TypeConverter

class ETaskTypeConverter {
    @TypeConverter
    fun fromEtaskType(taskType: ETaskType) : Int
    {
        return taskType.ordinal
    }
    @TypeConverter
    fun toETaskType(taskType : Int) : ETaskType
    {
        return ETaskType.entries[taskType]
    }
}