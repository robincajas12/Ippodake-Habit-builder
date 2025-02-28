package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

@Entity
data class Chronometer(
    @PrimaryKey(autoGenerate = true) val id : Int = 0,
    var isTimerActive : Boolean,
    var start : Date,
    var finish : Date
)
