import { TurboModule,TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule
{
    startTimer(time : number) : boolean;
    stopTImer() : boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeClockHandler'
)