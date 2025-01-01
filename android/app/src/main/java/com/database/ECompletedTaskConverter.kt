package com.database

import androidx.room.TypeConverter

class ECompletedTaskConverter {
    @TypeConverter
    fun fromECompletedTaskConverter(completedTask: ECompletedTask) : Int
    {
        return completedTask.ordinal
    }
    @TypeConverter
    fun toECompletedTaskConverter(completedTask : Int) : ECompletedTask
    {
        return ECompletedTask.entries[completedTask]
    }
}