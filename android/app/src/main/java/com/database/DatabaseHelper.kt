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
                val taskDao = appDatabase!!.tasksDao()
                if(userDao.getAll().isEmpty())
                {
                    userDao.createUser(User(streak=0,level = 0))
                    val localStorage = appDatabase!!.localStorageDao()
                    localStorage.upsert(LocalStorage("STARS", "0"))
                }
                val dateDao = appDatabase!!.datesDao()
                val user = userDao.getAll().first()
                if(dateDao.getDay().isEmpty())
                {
                    dateDao.createDates(Dates(uid = user.uid, level = user.level, streak = user.streak, date = TimeUtil.today.getStartOfToday()))
                }
                if(taskDao.getTaskType().isEmpty())
                {
                    taskDao.createTaskType(TaskType(
                        uid = userDao.getAll().first().uid,
                        title = "",
                        type = ETaskType.TIME,
                        exp = 100,
                        minT = 3*1000*60,
                        maxT = 60*1000*60,
                        creationDate = TimeUtil.today.getStartOfToday(),
                        mainTaskType = null))
                }
                val sessionStorageDao = appDatabase!!.localStorageDao()
                val key = "ID_SELECTED_TASKTYPE"
                if(sessionStorageDao.getByKey(key).equals(""))
                {
                    sessionStorageDao.upsert(LocalStorage(key, taskDao.getTaskType().first().id.toString()))
                }

            }
            return appDatabase!!;
        }
    }
}