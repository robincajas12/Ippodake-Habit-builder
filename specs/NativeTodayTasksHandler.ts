import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule
{
    getToday() : string,
    recordDay(idtask : number, actualTime: number): void,
    createTaskForToday(idtaskType : number): boolean,
    getAllMainTasks() : string,
    getAllSubTasks(idtask : number) : string,
    createTaskType(
    type : string,
    mainTaskType : number,
    maxT : number,
    minT : number) : boolean
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeTodayTasksHandler');
