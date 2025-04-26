package com.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.utils.TimeUtil
import java.util.Date

@Dao
interface TasksDao {
    @Query("SELECT t.* FROM Tasks as t join TaskType as tp on t.idTaskType = tp.id where tp.mainTaskType is null order by date desc")
    fun getAllMainTasks() : List<Tasks>
    @Query("SELECT t.* FROM Tasks as t join TaskType as tp on t.idTaskType = tp.id where tp.mainTaskType = :id order by date desc")
    fun getSubtasks(id : Int) : List<Tasks>
    @Query("select * from TaskType where id = :id LIMIT 1")
    fun getTaskType(id : Int) : List<TaskType>
    @Query("select * from TaskType")
    fun getTaskType() : List<TaskType>
    @Query("select * from Tasks where idTaskType = :id")
    fun getTasksByTaskTypeId(id : Int) : List<Tasks>
    @Query("select * from Tasks where id = :id")
    fun getTaskById(id : Int) : List<Tasks>
    @Query("select * from Tasks where date = :date")
    fun getTasksByDate(date: Date = TimeUtil.today.getStartOfToday()) : List<Tasks>

    @Query("select * from Tasks where date = :date and idTaskType = :idTask")
    fun getTasksByTaskTypeIdAndDate(idTask : Int,  date : Date = TimeUtil.today.getStartOfToday()) : List<Tasks>

    @Query("select * from Tasks  where idTaskType = :idTaskType and date >= :date order by date desc")
    fun getTaskSinceCertainDate(idTaskType: Int,date : Date) : List<Tasks>

    @Query("select avg(tCompleted) from Tasks where date >= :date and idTaskType = :idTaskType")
    fun getAVGTaskSinceCertainDate(idTaskType: Int,date : Date) : Double
    @Query("select sum(tCompleted) from Tasks where date >= :date and idTaskType = :idTaskType")
    fun getSumTaskSinceCertainDate(idTaskType: Int,date : Date) : Double
    @Query("select count(tCompleted) from Tasks where date >= :date and idTaskType = :idTaskType")
    fun getCountTaskSinceCertainDate(idTaskType: Int,date : Date) : Double
    @Insert
    fun createTaskType(taskType: TaskType) : Long
    @Insert
    fun createTask(task : Tasks) : Long
    @Update
    fun updateTaskType(taskType: TaskType)
    @Update
    fun updateTask(task : Tasks)
}