package com.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.utils.TimeUtil
import java.util.Calendar
import java.util.Date

@Dao
interface DatesDao {
    @Query("SELECT * FROM Dates WHERE date = :date")
    fun getDay(date: Date = TimeUtil.today.getStartOfToday()): List<Dates>


    @Query("SELECT * FROM Dates")
    fun getAllDays() : List<Dates>
    @Insert
    fun createDates(date : Dates)
}