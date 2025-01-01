package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class User (
    @PrimaryKey(autoGenerate = true) val uid: Int = 0,
    val streak:Int,
    val level : Int
)