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
import { getTaskForToday } from "../../../utils/getTaskForToday";
interface Props {
  time: Date;
  setClockStarted: (started: boolean) => void;
  clockStarted: boolean;
  setTime: (time : (prev: Date)=>Date) => void;
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
            console.log(("CLOCK STATUS " + NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS)))

        }
    }, [clockStarted, selectedTask]);

    function clock() {
        try{
            console.log(NativeLevelHandler.getItem(ELocalStorageKeys.CURRENT_DATE), NativeTodayTasksHandler.getToday())
            if(NativeLevelHandler.getItem(ELocalStorageKeys.CURRENT_DATE) == NativeTodayTasksHandler.getToday())
            {
                if (time && NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS) !== "true") {
                    clearInterval(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)));
                    setClockStarted(false);
                    NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER);
                }
                const idChrono = NativeLevelHandler.getItem(ELocalStorageKeys.ID_CHRONOMETER)
                if(idChrono && selectedTask)
                {
                    const time = NativeTodayTasksHandler.getChronometerTimeRemaining(Number(idChrono))
                    NativeTodayTasksHandler.recordDay(selectedTask.id, selectedTask.t - time)
                    const task= Task.fromJSON(JSON.stringify(JSON.parse(NativeTodayTasksHandler.getTaskForToday(selectedTask.idTaskType))[0]))
                    console.log(task)
                    setSelectedTask(task)
                    setTime((t)=>{
                        const newTime = new Date(t.getDate())
                        newTime.setDate(0)
                        newTime.setHours(0)
                        newTime.setMinutes(0)
                        newTime.setMilliseconds(0)
                        newTime.setMilliseconds(time)
                        return newTime
                    })
                    if(task.tCompleted >= task.t)
                    {
                        NativeTodayTasksHandler.deleteChronometer(Number(idChrono))
                        NativeLevelHandler.removeItem(ELocalStorageKeys.ID_CHRONOMETER)
                        setClockStarted(false)
                    }
                }
                console.log(new Date())
                console.log(("THis is my clokc statis aaaa: " + NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS)))
            }else{
                setClockStarted(false)
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER)
            }
        }catch(e)
        {
            if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER))
            {
                clearInterval(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)))
            }
            setClockStarted(false)
            NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER)
            NativeLevelHandler.removeItem(ELocalStorageKeys.CLOCK_STATUS)
        }


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
                NativeLevelHandler.setItem(ELocalStorageKeys.ID_CHRONOMETER,NativeTodayTasksHandler.createChronometer(selectedTask.t-selectedTask.tCompleted).toString())
            }        
        } else {
            changeClockStatus(false);
            setClockStarted(false);
            if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_CHRONOMETER)) NativeTodayTasksHandler.deleteChronometer(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_CHRONOMETER)))
            NativeLevelHandler.removeItem(ELocalStorageKeys.CLOCK_STATUS)
            NativeLevelHandler.removeItem(ELocalStorageKeys.ID_CHRONOMETER)
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
