import NativeLevelHandler from "../../specs/NativeLevelHandler";
import NativeTodayTasksHandler from "../../specs/NativeTodayTasksHandler";
import { ELocalStorageKeys } from "../Enums/LocalStorageKeys";
import Task from "../Models/Task";

export function getTaskForToday() : Task | null | undefined
{
    if(NativeTodayTasksHandler.getAllTaskTypes() != "[]" && NativeTodayTasksHandler.getTaskForToday(1) != "[]")
    {
        const today = JSON.parse(NativeTodayTasksHandler
        .getTaskForToday(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))))[0]
        const task = Task.fromJSON(JSON.stringify(today))
        NativeLevelHandler.setItem(ELocalStorageKeys.ID_SELECTED_TASK, task.id.toString())
        return task
    }
    else null
}