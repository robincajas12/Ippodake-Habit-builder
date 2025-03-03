import { TurboModule,TurboModuleRegistry } from "react-native";
export interface Spec extends TurboModule
{
    getUserLevel() : number
    getStreak(): number
    setItem(key: string, value: string) : void
    getItem(key: string) : string
    removeItem(key: string) : void
}
export default TurboModuleRegistry.getEnforcing<Spec>('NativeLevelHandler');
