import { Pressable, Text, View } from "react-native";
import stylesClock from "../styles/stylesClock";
import { useEffect, useState } from "react";
import notifee from '@notifee/react-native';
import NotificationController from "../../../Controllers/NotificationController";
import TaskType, { ETaskType } from "../../../Models/TaskType";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import Task from "../../../Models/Task";

export default function ({ setClockStarted, setTime, updateTimer }: any) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [notfID, setNotfID] = useState<string | null>(null);
    /*
           jsonObject.put("id", chronometer.id)
        jsonObject.put("isTimerActive", chronometer.isTimerActive)
        jsonObject.put("start", chronometer.start)
        jsonObject.put("finish",chronometer.finish)
    */
    const [chronometerInfo, setChronometerInfo] = useState<{id:number, isTimerActive: boolean, start: number, finish: number} | null>(null)
    const [selectedTaskType, setSelectTaskType] = useState(null);
    const [selectedTask, setSelectTask] = useState<Task | null>(()=>{
        if(NativeTodayTasksHandler.getAllTaskTypes() != "[]" && NativeTodayTasksHandler.getAllMainTasks() != "[]")
        {
            const today = JSON.parse(NativeTodayTasksHandler
                .getTaskForToday(JSON.parse(NativeTodayTasksHandler.getAllTaskTypes())[0]["id"]))[0]
            return Task.fromJSON(JSON.stringify(today))
        }
        return null
    })
    
    const miController = NotificationController.get();

    async function createBackgroundService() {
        if(selectedTask == null) return;
        const notificationId: string = (await miController.lauchChronometerWithTask(selectedTask, ETaskType.TIME)).toString();
        setNotfID(notificationId);
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        
        if (isPlaying) {
            timer = setInterval(() => {
                setTime((t: Date) => {
                    if(chronometerInfo)
                    {
                        setIsPlaying(true)
                        const date : Date = new  Date()
                        date.setHours(0)
                        date.setMinutes(0)
                        date.setSeconds(0)
                        date.setMilliseconds(0)
                        date.setMilliseconds(NativeTodayTasksHandler.getChronometerTimeRemaining(chronometerInfo.id))
                        return date
                    }
                        
                    const newTime = new Date(); // Crear una nueva instancia
                    newTime.setHours(0),
                    newTime.setMinutes(0),
                    newTime.setSeconds(0),
                    newTime.setMilliseconds(0)
                    return newTime;
                });
            }, 1000);
        } else if (timer) {
            clearInterval(timer);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isPlaying]);

    async function onClickClock() {
        try {
            if (!isPlaying) {
                await createBackgroundService();
                console.log("hola")
                if(selectedTask?.t)
                {
                    console.log("Uwu")
                    const idChronometer = NativeTodayTasksHandler.createChronometer(selectedTask.t)
                    const chronometer = NativeTodayTasksHandler.getChronometer(idChronometer)
                    if(chronometer != "{}")
                    {
                        const getChronometerInfo = NativeTodayTasksHandler.updateChronometerStatus(idChronometer, true)
                        const chonometer = NativeTodayTasksHandler.getChronometer(idChronometer)
                        const parsedChronometer = JSON.parse(chonometer);
                        setChronometerInfo({id : parsedChronometer.id, isTimerActive : parsedChronometer.isTimerActive, start: Number(parsedChronometer.start), finish: Number(parsedChronometer.finish)})
                        setIsPlaying(true)
                        const date : Date = new  Date()
                        date.setHours(0)
                        date.setMinutes(0)
                        date.setSeconds(0)
                        date.setMilliseconds(0)
                        date.setMilliseconds(NativeTodayTasksHandler.getChronometerTimeRemaining(idChronometer))
                        console.log(NativeTodayTasksHandler.getChronometerTimeRemaining(idChronometer))
                        setTime(date)
                    }
                    
                }
                setIsPlaying(true);
            } else {
                if (notfID) {
                    await miController.cancelNotification(notfID);
                    if(chronometerInfo && chronometerInfo.id)
                    {
                        NativeTodayTasksHandler.updateChronometerStatus(Number(chronometerInfo?.id), false)
                    }
                    
                    setNotfID(null);
                }
                setIsPlaying(false);
            }
        } catch (error) {
            console.error('Error handling clock click:', error);
        }
    }

    return (
        <View style={stylesClock.view}>
            <Pressable style={stylesClock.container} onPress={onClickClock}>
                <Text style={stylesClock.btn}>{isPlaying ? '⏸️' : '▶️'}</Text>
            </Pressable>
        </View>
    );
}
