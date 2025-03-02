import { Pressable, Text, View } from "react-native";
import stylesClock from "../styles/stylesClock";
import { useEffect, useState } from "react";
import notifee from '@notifee/react-native';
import NotificationController from "../../../Controllers/NotificationController";
import TaskType, { ETaskType } from "../../../Models/TaskType";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import Task from "../../../Models/Task";

export default function ({ setClockStarted,clockStarted,setTime,selectedTask, setSelectedTask}: any) {
    const [t, setT] = useState(0)
    console.log(clockStarted)
    const [notfID, setNotfID] = useState<string | null>(null);
    /*
           jsonObject.put("id", chronometer.id)
        jsonObject.put("isTimerActive", chronometer.isTimerActive)
        jsonObject.put("start", chronometer.start)
        jsonObject.put("finish",chronometer.finish)
    */
    const [chronometerInfo, setChronometerInfo] = useState<{id:number, isTimerActive: boolean, start: number, finish: number} | null>(null) 
    const miController = NotificationController.get();

    async function createBackgroundService() {
        if(selectedTask == null) return;
        if(selectedTask.t - selectedTask.tCompleted <=0) return;
        const notificationId: string = (await miController.lauchChronometerWithTask(selectedTask, ETaskType.TIME)).toString();
        setNotfID(notificationId);
    }
    let timer: NodeJS.Timeout | null = null;
    useEffect(() => {
        if (clockStarted) {
            timer = setInterval(() => {
                if(chronometerInfo) {
                }
                if(selectedTask && selectedTask.t && selectedTask.idTaskType && chronometerInfo?.id)
                    {
                        setSelectedTask(()=>{
                            if(NativeTodayTasksHandler.getAllTaskTypes() != "[]" && NativeTodayTasksHandler.getTaskForToday(1) != "[]")
                                {
                                    const today = JSON.parse(NativeTodayTasksHandler
                                        .getTaskForToday(1))[0]
                                    return Task.fromJSON(JSON.stringify(today))
                                }
                                return null
                        })
                        setTime((t: Date) => {
                            if(chronometerInfo)
                            {
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
                            NativeTodayTasksHandler.recordDay(selectedTask.id, 
                            selectedTask.t - NativeTodayTasksHandler.getChronometerTimeRemaining(chronometerInfo.id))
                        if(NativeTodayTasksHandler.getChronometerTimeRemaining(chronometerInfo.id) <=0 && timer) 
                        {
                            setClockStarted(false)
                            clearInterval(timer)
                        }
                    }
            }, 1000);
        } else if (timer) {
            clearInterval(timer);
        }


    }, [clockStarted]);

    async function onClickClock() {
        try {
            if (clockStarted == false) {
                await createBackgroundService();
                console.log("hola")
                if(selectedTask?.t)
                {
                    console.log("Uwu")
                    const idChronometer = NativeTodayTasksHandler.createChronometer(selectedTask.t - selectedTask.tCompleted)
                    const chronometer = NativeTodayTasksHandler.getChronometer(idChronometer)
                    if(chronometer != "{}")
                    {
                        setClockStarted(true)
                        const getChronometerInfo = NativeTodayTasksHandler.updateChronometerStatus(idChronometer, true)
                        const chonometer = NativeTodayTasksHandler.getChronometer(idChronometer)
                        const parsedChronometer = JSON.parse(chonometer);
                        setChronometerInfo({id : parsedChronometer.id, isTimerActive : parsedChronometer.isTimerActive, start: Number(parsedChronometer.start), finish: Number(parsedChronometer.finish)})
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
            } else {
                if (notfID) {
                    await miController.cancelNotification(notfID);
                    
                    setNotfID(null);
                }
                setClockStarted(false);
                if(timer) clearInterval(timer)
                if(chronometerInfo && chronometerInfo.id)
                {
                    NativeTodayTasksHandler.updateChronometerStatus(Number(chronometerInfo?.id), false)
                }
            }
        } catch (error) {
            console.error('Error handling clock click:', error);
            if(timer) clearInterval(timer)
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
