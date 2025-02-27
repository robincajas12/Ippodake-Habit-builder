import { Pressable, Text, View } from "react-native";
import stylesClock from "../styles/stylesClock";
import { useEffect, useState } from "react";
import notifee from '@notifee/react-native';
import NotificationController from "../../../Controllers/NotificationController";
import TaskType from "../../../Models/Task";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";

export default function ({ setClockStarted, setTime, updateTimer }: any) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [notfID, setNotfID] = useState<string | null>(null);
    const selectedTask = new TaskType(
        1, 101, "Don't use your phone", 2, 10, "Medium", undefined, undefined, 
        "TIME", undefined, undefined, undefined, 30
    );

    const miController = NotificationController.get();

    async function createBackgroundService() {
        const notificationId: string = (await miController.lauchChronometer(selectedTask)).toString();
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
