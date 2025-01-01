package com.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters

@Database(
    entities =
    [
        User::class,
        Dates::class
    ],
    version = 1)
@TypeConverters(DateConverter::class)
abstract class AppDatabase : RoomDatabase(){
    abstract fun userDao() : UserDao
    abstract fun datesDao() : DatesDao
}