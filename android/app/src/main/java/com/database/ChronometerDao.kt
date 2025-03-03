package com.database

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface ChronometerDao {
    @Query("select * from Chronometer where isTimerActive = 1")
    fun getAllActiveChronometers() : List<Chronometer>
    @Query("select * from Chronometer where isTimerActive = 0")
    fun getAllInactiveChronometers() : List<Chronometer>
    @Query("select * from Chronometer where id = :id")
    fun getById(id : Int) : List<Chronometer>
    @Query("update Chronometer set isTimerActive = 0 where isTimerActive = 1")
    fun desactivateAllChronometers()
    @Insert
    fun create(chronometer: Chronometer) : Long
    @Delete
    fun delete(chronometer: Chronometer)
    @Update
    fun update(chronometer: Chronometer)

}