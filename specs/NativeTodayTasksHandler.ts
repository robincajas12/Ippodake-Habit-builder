import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule
{
    getToday() : string,
    recordDay(idtask : number, setCompleted : boolean): boolean
    createTaskForToday(idtaskType : number): boolean,
    getTaskForToday(id : number) : string,
    getAllMainTasks() : string,
    getAllSubTasks(idtask : number) : string,
    getAllTaskTypes() : string,
    createTaskType(
    type : string,
    mainTaskType : number,
    maxT : number,
    minT : number) : boolean
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeTodayTasksHandler');
