package com.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class LocalStorage(
    @PrimaryKey val key: String,
    var value: String
)
