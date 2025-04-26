import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule
{
    getToday() : string
    getHabitFormationModelCurrentTime(idtaskType : number) : number
    getAVGTaskTCompleted(pastNDays: number) : number
    getRealAVG(pastNDays:number) : number
    getChronometerTimeRemaining(id: number) : number
    deleteChronometer(id: number) : boolean
    createChronometer(time : number) : number
    updateChronometerStatus(id : number, isActive:boolean) : boolean
    updateTaskTypeName(idtaskType : number, name : string) : boolean
    updateTaskTypeMaxTime(idtaskType : number, time : number) : boolean
    updateTaskTypeMinTime(idtaskType : number, time : number) : boolean
    getChronometer(id: number) : string
    recordDay(idtask : number,timeSpent: number): boolean
    createTaskForToday(idtaskType : number): number
    createTaskForTodayWithTime(idtaskType : number, t: number): number
    getTaskForToday(id : number) : string
    getAllMainTasks() : string
    getAllSubTasks(idtask : number) : string
    getTaskTypeById(idtaskType : number) : string

    getAllTaskTypes() : string,
    createTaskType(
    name: string,
    type : string,
    mainTaskType : number,
    maxT : number,
    minT : number) : number
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeTodayTasksHandler');
