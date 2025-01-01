package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Tasks(
    @PrimaryKey(autoGenerate = true) val id : Int = 0,
    val idTaskType : Int,
    val completed: ECompletedTask,
)
