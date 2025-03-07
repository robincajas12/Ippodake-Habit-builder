package com.mynativemodules

import com.database.UserDao
import androidx.room.Database
import androidx.room.Room
import com.controllers.NotificationController
import com.database.AppDatabase
import com.database.DatabaseHelper
import com.database.LocalStorage
import com.facebook.react.bridge.ReactApplicationContext
import com.database.User
import java.util.Calendar

public class NativeLevelHandlerModule (reactContext : ReactApplicationContext) : NativeLevelHandlerSpec(reactContext)
{
    private val userDao = DatabaseHelper.DataBaseProvider.getDatabase(reactContext).userDao()
    override fun getUserLevel(): Double {
        val user = userDao.getAll().first()
        return userDao.getAll().first().level.toDouble()
    }

    override fun getStreak(): Double {
            val datesDao = DatabaseHelper.DataBaseProvider.getDatabase((this.reactApplicationContext)).datesDao()
            val pastNDays = 21
            val taskDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).
            tasksDao()
            val calendar = Calendar.getInstance().apply { time = datesDao.getDay().first().date }
            calendar.add(Calendar.DAY_OF_MONTH, -pastNDays.toInt())
            val taskType =  taskDao.getTaskType().first()
            val count = taskDao.getCountTaskSinceCertainDate(taskType.id, calendar.time)
            return count

    }

    override fun setItem(key: String?, value: String?) {
        if(key == null || value == null) return
       val lStorage = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).localStorageDao()
        lStorage.upsert(LocalStorage(key, value))
    }

    override fun getItem(key: String?): String {
        val lStorage = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).localStorageDao()
        if(key == null) return ""
        val items = lStorage.getByKey(key)
        if(items.isEmpty()) return ""
        return items.first().value
    }

    override fun removeItem(key: String?) {
        if(key == null) return
        val lStorage = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).localStorageDao()
        lStorage.deleteById(key)
    }

    override fun getName() = NAME

    companion object{
        const val NAME = "NativeLevelHandler"
    }
}