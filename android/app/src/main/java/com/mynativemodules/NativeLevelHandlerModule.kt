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

public class NativeLevelHandlerModule (reactContext : ReactApplicationContext) : NativeLevelHandlerSpec(reactContext)
{
    private val userDao = DatabaseHelper.DataBaseProvider.getDatabase(reactContext).userDao()
    override fun getUserLevel(): Double {
        val user = userDao.getAll().first()
        userDao.updateUser(User(user.uid, user.streak+1, user.level+1))
        return userDao.getAll().first().level.toDouble()
    }

    override fun getStreak(): Double {
        return userDao.getAll().first().streak.toDouble()
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