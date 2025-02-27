package com.mynativemodules

import com.database.DatabaseHelper
import com.database.DatesDao
import com.database.ECompletedTask
import com.database.ETaskType
import com.database.TaskType
import com.database.Tasks
import com.database.TasksDao
import com.facebook.react.bridge.ReactApplicationContext
import com.hrsmodels.HabitTracker
import com.utils.TimeUtil
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.ZoneId
import java.util.Calendar
import java.util.Date
import kotlin.math.ceil

class NativeTodayTasksHandlerModule (reactContext : ReactApplicationContext) : NativeTodayTasksHandlerSpec(reactContext){
    private val datesDao : DatesDao = DatabaseHelper.DataBaseProvider.getDatabase(reactContext).datesDao()
    override fun getToday(): String {
        return datesDao.getDay().first().date.time.toString()
    }

    override fun recordDay(idtask: Double, timeSpent: Double): Boolean {
        val tasksDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).tasksDao()
        val tasks = tasksDao.getTaskById(idtask.toInt())
        if(tasks.isEmpty()) return false
        val taskTypes = tasksDao.getTaskType(tasks.first().idTaskType)
        if(taskTypes.isEmpty()) return false

        var isCompleted : Boolean= false
        if(tasks.first().tCompleted >= taskTypes.first().minT) isCompleted = true
        val task = tasks.first()
        task.tCompleted = ceil(timeSpent).toInt()
        task.completed = if(isCompleted)  ECompletedTask.COMPLETED else ECompletedTask.UNCOMPLETED
        tasksDao.updateTask(task)
        return true
    }


    override fun createTaskForToday(idtaskType: Double): Boolean {
        val tasksDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).tasksDao()
        val datesDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).datesDao()
        val taskType = tasksDao.getTaskType(idtaskType.toInt())
        if(taskType.isEmpty()) return false
        else {

            val habitTracker = HabitTracker(taskType.first().minT.toDouble(),
                taskType.first().maxT.toDouble(), 0.3,0.3)
            val number : Int = tasksDao.getTasksByTaskTypeId(idtaskType.toInt()).count()
            val dateCreated = taskType.first().creationDate
            val calendar : Calendar = Calendar.getInstance().apply { time = dateCreated }
            for(i in 1..number)
            {
                val newTime : Date = calendar.time
                val taskForThatDate = tasksDao.getTasksByDate(newTime)
                if(taskForThatDate.isEmpty()) habitTracker.recordDay(i, 0.0)
                else habitTracker.recordDay(i, taskForThatDate.first().t.toDouble())
                calendar.add(Calendar.DAY_OF_MONTH, 1)
            }
            tasksDao.createTask(Tasks(
                idTaskType = idtaskType.toInt(),
                completed = ECompletedTask.UNCOMPLETED,
                t = habitTracker.habitModel.getCurrentTime().toInt(),
                tCompleted = 0,
                date = datesDao.getDay().first().date))
            return true
        }
    }

    override fun getTaskForToday(id: Double): String {
        val jsonArray = JSONArray()
        val tasks = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).tasksDao().getTaskById(id.toInt())

        for (task in tasks)
        {
            val jsonObject = JSONObject();
            jsonObject.put("id", task.id)
            jsonObject.put("idTaskType", task.idTaskType)
            jsonObject.put("t", task.t)
            jsonObject.put("tCompleted",task.tCompleted)
            jsonObject.put("completed", task.completed)
            jsonObject.put("date", task.date.time)
            jsonArray.put(jsonObject)
        }
        return jsonArray.toString()
    }

    override fun getAllMainTasks(): String {
        val jsonArray = JSONArray()
        val tasks = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).tasksDao().getAllMainTasks()
        for (task in tasks)
        {
            val jsonObject = JSONObject();
            jsonObject.put("id", task.id)
            jsonObject.put("idTaskType", task.idTaskType)
            jsonObject.put("t", task.t)
            jsonObject.put("tCompleted",task.tCompleted)
            jsonObject.put("completed", task.completed)
            jsonObject.put("date", task.date.time)
            jsonArray.put(jsonObject)
        }
        return jsonArray.toString()
    }

    override fun getAllSubTasks(idtask: Double): String {
        val jsonArray = JSONArray()
        val tasks = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).tasksDao().getSubtasks(idtask.toInt())
        for (task in tasks)
        {
            val jsonObject = JSONObject();
            jsonObject.put("id", task.id)
            jsonObject.put("idTaskType", task.idTaskType)
            jsonObject.put("t", task.t)
            jsonObject.put("tCompleted",task.tCompleted)
            jsonObject.put("completed", task.completed)
            jsonObject.put("date", task.date.time)
            jsonArray.put(jsonObject)
        }
        return jsonArray.toString()
    }



    override fun getAllTaskTypes(): String {
        val jsonArray = JSONArray()
        val tasksTypes = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext)
            .tasksDao().getTaskType()
        for (taskType in tasksTypes)
        {
            val jsonObject = JSONObject();
            jsonObject.put("id", taskType.id)
            jsonObject.put("title", taskType.title)
            jsonObject.put("exp", taskType.exp)
            jsonObject.put("creationDate", taskType.creationDate)
            jsonArray.put(jsonObject)
        }
        return jsonArray.toString()
    }

    override fun createTaskType(
        type: String?,
        mainTaskType: Double,
        maxT: Double,
        minT: Double
    ): Boolean {
        val datesDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).datesDao()
        DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext)
            .tasksDao().createTaskType(TaskType(
                type = ETaskType.TIME,
                mainTaskType = null,
                maxT = maxT.toInt(),
                minT = minT.toInt(),
                title = "Stop using phone",
                creationDate = TimeUtil.today.getStartOfToday(),
                exp = 0,
                uid = 0
            ));
        return true
    }

    override fun getName() = NAME

    companion object{
        const val NAME = "NativeTodayTasksHandler"
    }
}