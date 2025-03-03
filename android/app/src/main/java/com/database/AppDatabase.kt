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
        Dates::class,
        Tasks::class,
        TaskType::class,
        Chronometer::class,
        LocalStorage::class
    ],
    version = 1)
@TypeConverters(DateConverter::class, ETaskTypeConverter::class)
abstract class AppDatabase : RoomDatabase(){
    abstract fun userDao() : UserDao
    abstract fun datesDao() : DatesDao
    abstract fun tasksDao() : TasksDao
    abstract fun chronometerDao() : ChronometerDao
    abstract fun localStorageDao() : LocalStorageDao
}