import { TurboModule,TurboModuleRegistry } from "react-native";
export interface Spec extends TurboModule
{
    getUserLevel() : number;
    getStreak(): number;
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeLevelHandler');