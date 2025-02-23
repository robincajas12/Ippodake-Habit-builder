package com.mynativemodules

import com.database.DatabaseHelper
import com.database.DatesDao
import com.database.ECompletedTask
import com.database.ETaskType
import com.database.TaskType
import com.database.Tasks
import com.facebook.react.bridge.ReactApplicationContext
import com.hrsmodels.HabitTracker
import com.utils.TimeUtil
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat

class NativeTodayTasksHandlerModule (reactContext : ReactApplicationContext) : NativeTodayTasksHandlerSpec(reactContext){
    private val datesDao : DatesDao = DatabaseHelper.DataBaseProvider.getDatabase(reactContext).datesDao()
    override fun getToday(): String {
        return datesDao.getDay().first().date.toString()
    }

    override fun recordDay(idtask: Double, actualTime: Double) {
        TODO("Not yet implemented")
    }

    override fun createTaskForToday(idtaskType: Double): Boolean {
        val tasksDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).tasksDao()
        val datesDao = DatabaseHelper.DataBaseProvider.getDatabase(this.reactApplicationContext).datesDao()
        val taskType = tasksDao.getTaskType(idtaskType.toInt())
        if(taskType.isEmpty()) return false
        else {

            val habitTracker = HabitTracker(taskType.first().minT.toDouble(),
                taskType.first().maxT.toDouble(), 0.3,0.3)
            val sdf = SimpleDateFormat("YYYY-MM-dd")
            val fechas = datesDao.obtenerSerieFechas(sdf.format(taskType.first().creationDate),
                sdf.format(datesDao.getDay()))
            var i = 1
            for (fecha in fechas)
            {
                if(fecha == sdf.format(datesDao.getDay())) break
                val taskOfThatDay = tasksDao.getTasksByTaskTypeIdAndDate(taskType.first().id, fecha)
                if(taskOfThatDay.isEmpty()) habitTracker.recordDay(i, 0.toDouble())
                else habitTracker.recordDay(i, taskOfThatDay.first().t.toDouble())
                i++

            }
            tasksDao.createTask(Tasks(
                idTaskType = idtaskType.toInt(),
                completed = ECompletedTask.UNCOMPLETED,
                t = habitTracker.habitModel.getCurrentTime().toInt(),
                date = datesDao.getDay().first().date))
            return true
        }
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
            jsonObject.put("completed", task.completed)
            jsonObject.put("date", task.date)
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
            jsonObject.put("completed", task.completed)
            jsonObject.put("date", task.date)
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
                title = "Prueba tarea",
                creationDate = datesDao.getDay().first().date,
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