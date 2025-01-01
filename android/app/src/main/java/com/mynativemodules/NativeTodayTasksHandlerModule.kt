package com.mynativemodules

import com.database.DatabaseHelper
import com.database.DatesDao
import com.facebook.react.bridge.ReactApplicationContext

class NativeTodayTasksHandlerModule (reactContext : ReactApplicationContext) : NativeTodayTasksHandlerSpec(reactContext){
    private val datesDao : DatesDao = DatabaseHelper.DataBaseProvider.getDatabase(reactContext).datesDao()
    override fun getToday(): String {
        return datesDao.getDay().first().date.toString()
    }
    override fun getName() = NAME

    companion object{
        const val NAME = "NativeTodayTasksHandler"
    }
}