package com.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.utils.TimeUtil
import java.util.Date

@Dao
interface TasksDao {
    @Query("SELECT t.* FROM Tasks as t join TaskType as tp on t.idTaskType = tp.id where tp.mainTaskType is null")
    fun getAllMainTasks() : List<Tasks>
    @Query("SELECT t.* FROM Tasks as t join TaskType as tp on t.idTaskType = tp.id where tp.mainTaskType = :id")
    fun getSubtasks(id : Int) : List<Tasks>
    @Query("select * from TaskType where id = :id LIMIT 1")
    fun getTaskType(id : Int) : List<TaskType>
    @Query("select * from Tasks where idTaskType = :id")
    fun getTasksByTaskTypeId(id : Int) : List<Tasks>
    @Query("select * from Tasks where date = :date")
    fun getTasksByDate(date: Date = TimeUtil.today.getStartOfToday()) : List<Tasks>
    @Query("select * from Tasks where date = :date and idTaskType = :idTask")
    fun getTasksByTaskTypeIdAndDate(idTask : Int, date : String) : List<Tasks>
    @Insert
    fun createTaskType(taskType: TaskType)
    @Insert
    fun createTask(task : Tasks)
    @Update
    fun updateTaskType(taskType: TaskType)
    @Update
    fun updateTask(task : Tasks)
}