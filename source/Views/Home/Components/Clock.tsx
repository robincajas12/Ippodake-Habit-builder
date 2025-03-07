import { AppState, Pressable, Text, View } from "react-native";
import stylesClock from "../styles/stylesClock";
import { useEffect } from "react";
import notifee from '@notifee/react-native';
import NotificationController from "../../../Controllers/NotificationController";
import TaskType, { ETaskType } from "../../../Models/TaskType";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import Task from "../../../Models/Task";
import NativeLevelHandler from "../../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../../Enums/LocalStorageKeys";
interface Props {
  time: Date;
  setClockStarted: (started: boolean) => void;
  clockStarted: boolean;
  setTime: (time: Date) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}

export default function ({ time, setClockStarted, clockStarted, setTime, selectedTask, setSelectedTask }: Props) {

    useEffect(() => {
        console.log(NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS))
        if (clockStarted) {
            console.log(NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS))
            const storedTimer = Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER));
            if (storedTimer) clearInterval(storedTimer);
            
            const newInterval = setInterval(clock, 1000);
            NativeLevelHandler.setItem(ELocalStorageKeys.ID_TIMER, newInterval.toString());
            
        } else {
            const storedTimer = Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER));
            if (storedTimer) {
                clearInterval(storedTimer);
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER);
            }
        }
        ()=>{
            console.log(("THis is my ssssssssss statis aaaa: " + NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS)))

        }
    }, [clockStarted, selectedTask]);

    function clock() {
        console.log("Clock status " +NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS))
        if (time && NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS) !== "true") {
            clearInterval(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)));
            setClockStarted(false);
            NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER);
        }
        setTime(new Date());
        console.log(new Date())
        console.log(("THis is my clokc statis aaaa: " + NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS)))
    }

    function changeClockStatus(status: boolean) {
        NativeLevelHandler.setItem(ELocalStorageKeys.CLOCK_STATUS, status.toString());
    }

    function onClickClock() {
        if (NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS) !== "true") {
            changeClockStatus(true);
            setClockStarted(true);
            if (!NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)) {
                const newInterval = setInterval(clock, 1000);
                NativeLevelHandler.setItem(ELocalStorageKeys.ID_TIMER, newInterval.toString());
            }
            if(selectedTask)
            {
                NativeLevelHandler.setItem(ELocalStorageKeys.ID_CHRONOMETER,NativeTodayTasksHandler.createChronometer(selectedTask.t).toString())

            }        
        } else {
            changeClockStatus(false);
            setClockStarted(false);
            const storedTimer = Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER));
            if (storedTimer) {
                clearInterval(storedTimer);
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER);
            }
        }
    }

    return (
        <View style={stylesClock.view}>
            <Pressable style={stylesClock.container} onPress={onClickClock}>
                <Text style={stylesClock.btn}>{clockStarted ? '⏸️' : '▶️'}</Text>
            </Pressable>
        </View>
    );
}
