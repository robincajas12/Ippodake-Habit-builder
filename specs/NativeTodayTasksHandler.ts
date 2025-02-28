import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule
{
    getToday() : string
    getChronometerTimeRemaining(id: number) : number
    deleteChronometer(id: number) : boolean
    createChronometer(time : number) : number,
    updateChronometerStatus(id : number, isActive:boolean) : boolean
    getChronometer(id: number) : string
    recordDay(idtask : number,timeSpent: number): boolean
    createTaskForToday(idtaskType : number): boolean
    getTaskForToday(id : number) : string
    getAllMainTasks() : string
    getAllSubTasks(idtask : number) : string
    getAllTaskTypes() : string,
    createTaskType(
    type : string,
    mainTaskType : number,
    maxT : number,
    minT : number) : boolean
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeTodayTasksHandler');
