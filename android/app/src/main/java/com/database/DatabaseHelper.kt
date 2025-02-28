package com.database

import android.content.Context
import androidx.room.Room
import com.utils.TimeUtil

class DatabaseHelper {
    object DataBaseProvider{
        private var appDatabase : AppDatabase? = null
        fun getDatabase(context: Context) : AppDatabase{
            if(appDatabase == null)
            {
                appDatabase = Room.databaseBuilder(context,  AppDatabase::class.java, "db").build()
                val userDao = appDatabase!!.userDao()
                if(userDao.getAll().isEmpty())
                {
                    userDao.createUser(User(streak=0,level = 0))
                }
                val dateDao = appDatabase!!.datesDao()
                val user = userDao.getAll().first()
                if(dateDao.getDay().isEmpty())
                {
                    dateDao.createDates(Dates(uid = user.uid, level = user.level, streak = user.streak, date = TimeUtil.today.getStartOfToday()))
                }
            }
            return appDatabase!!;
        }
    }
}