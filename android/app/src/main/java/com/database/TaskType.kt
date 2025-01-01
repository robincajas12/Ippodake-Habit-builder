package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

@Entity
data class TaskType(
    @PrimaryKey(autoGenerate = true) val id : Int = 0,
    val uid : Int,
    var level : Int,
    var until : Date?,
    var repeatDays : String?,
    var type : TaskType?,
    var exp : Int,
    var subtasks : String?,
    var difficulty : String,
    var setsNumber: Int?,
    var repsPerSet : Int?,
    var time : Int?
)
