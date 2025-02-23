package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

@Entity
data class TaskType(
    @PrimaryKey(autoGenerate = true) val id : Int = 0,
    val uid : Int,
    var title : String,
    var type : ETaskType?,
    var exp : Int,
    var mainTaskType : Int?,
    var maxT : Int, // goal
    var minT : Int, // starter
    var creationDate: Date
)
