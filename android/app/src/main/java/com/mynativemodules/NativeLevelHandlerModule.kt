package com.mynativemodules

import com.database.UserDao
import androidx.room.Database
import androidx.room.Room
import com.controllers.NotificationController
import com.database.AppDatabase
import com.database.DatabaseHelper
import com.facebook.react.bridge.ReactApplicationContext
import com.database.User

public class NativeLevelHandlerModule (reactContext : ReactApplicationContext) : NativeLevelHandlerSpec(reactContext)
{
    private val userDao = DatabaseHelper.DataBaseProvider.getDatabase(reactContext).userDao()
    override fun getUserLevel(): Double {
        //NotificationController(reactApplicationContext).createNotification();
        val user = userDao.getAll().first()
        userDao.updateUser(User(user.uid, user.streak+1, user.level+1))

        return userDao.getAll().first().level.toDouble()
    }

    override fun getStreak(): Double {
        return userDao.getAll().first().streak.toDouble()
    }

    override fun getName() = NAME

    companion object{
        const val NAME = "NativeLevelHandler"
    }
}