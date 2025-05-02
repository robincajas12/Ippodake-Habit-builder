import NativeLevelHandler from "../../specs/NativeLevelHandler";
import NativeTodayTasksHandler from "../../specs/NativeTodayTasksHandler";
import { ELocalStorageKeys } from "../Enums/LocalStorageKeys";
import Task from "../Models/Task";

export function getTaskForToday(idNumber: number) : Task | null | undefined
{
    if(NativeTodayTasksHandler.getTaskForToday(idNumber) != "[]")
    {
        const today = JSON.parse(NativeTodayTasksHandler
        .getTaskForToday(idNumber))[0]
        console.log("Estatarea sedevuelve", JSON.parse(NativeTodayTasksHandler
            .getTaskForToday(idNumber)))
        const task = Task.fromJSON(JSON.stringify(today))
        
        NativeLevelHandler.setItem(ELocalStorageKeys.ID_SELECTED_TASK, task.id.toString())
        return task
    }
    else null
}
