package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

@Entity
data class Dates(
    @PrimaryKey val date : Date,
    val uid : Int,
    var level : Int,
    val streak : Int
)
