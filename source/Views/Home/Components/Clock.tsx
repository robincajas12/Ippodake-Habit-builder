import { Pressable, Text, View } from "react-native";
import stylesClock from "../styles/stylesClock";
import { useEffect, useState } from "react";
import notifee, { AndroidImportance, AndroidNotificationSetting, TimestampTrigger } from '@notifee/react-native';
import {IntervalTrigger, TriggerType, TimeUnit} from '@notifee/react-native';
import { addTime } from "../../../utils/timeDiference";
import NotificationController from "../../../Controllers/NotificationController";
import TaskType from "../../../Models/Task";
export default function ({setClockStarted, setTime, updateTimer} : any)
{
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskType>(new TaskType(
        1,                   // id
        101,                 // uid
        "Read a novel",         // title
        2,                   // level
        10,                  // exp
        "Medium",            // difficulty
        undefined,           // until (optional)
        undefined,           // repeatDays (optional)
        "TIME",              // type (this will be parsed as ETaskType.TIME)
        undefined,           // subtasks (optional)
        undefined,           // setsNumber (optional)
        undefined,           // repsPerSet (optional)
        30                   // time (in minutes)
    ))
    const  miControler = NotificationController.get()
    const [notfID, setNotfID] = useState<String | null >(null)
    async function createBackgroundService() {
        setNotfID(await miControler.lauchChronometer(selectedTask))
    }
    
    async function onClickClock() {
        try {
            if(!isPlaying)
            {
                await createBackgroundService();
                setIsPlaying(true)
            }else{
                if(notfID != null)
                {
                    if(selectedTask.type != undefined) await miControler.cancelNotification(notfID.toString())
                    setNotfID(null);
                }
                setIsPlaying(false);
            }
        } catch (error) {
            console.error('Error handling clock click:', error);
        }
    }
    return <View style={stylesClock.view}>
        <Pressable style={stylesClock.container} onTouchEnd={onClickClock}>
            <Text style={stylesClock.btn}>{isPlaying?'⏸️': '▶️'}</Text>
            {/*⏸ ▶️⏸️*/}
        </Pressable>
    </View>
}