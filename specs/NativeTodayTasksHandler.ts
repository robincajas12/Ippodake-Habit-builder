import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule
{
    getToday() : string
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeTodayTasksHandler')