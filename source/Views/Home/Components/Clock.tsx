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
    const [selectedTaskType, setSelectTaskType] = useState(()=>{
        JSON.parse(NativeTodayTasksHandler.getAllTaskTypes())
    });
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
                    const newTime = new Date(t.getTime()); // Crear una nueva instancia
                    newTime.setSeconds(newTime.getSeconds() + 1);
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
                setIsPlaying(true);
            } else {
                if (notfID) {
                    await miController.cancelNotification(notfID);
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
