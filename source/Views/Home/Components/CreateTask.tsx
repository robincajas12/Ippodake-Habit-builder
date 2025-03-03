import { Pressable, Text, View } from "react-native";
import _vw from "../../../utils/sizeConversors";
import stylesCreateTask from "../styles/stylesCreateTask";
import TimeCounter from "./TimeCounter";
import { useEffect, useState } from "react";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import Task from "../../../Models/Task";
export default function CreateTask({ selectedTask,setSelectTask, styleView}: any)
{
    const [clockIsRunning, setClockIsRunning] = useState(true)
      const [time, setTime] = useState(()=>  {
          const time = new Date();
          return time;
      });
      
      useEffect(()=>{
        if(clockIsRunning)
        {
            const interval = setInterval(()=>{
                if(!clockIsRunning) clearInterval(interval)
                else   setTime(new Date())
            },1000)
        }
      }, [])

      function onPress()
      {
            setClockIsRunning(false)
            if(NativeTodayTasksHandler.createTaskForToday(1))
            {
                setSelectTask(()=>{
                        if(NativeTodayTasksHandler.getAllTaskTypes() != "[]" && NativeTodayTasksHandler.getTaskForToday(1) != "[]")
                        {
                            const today = JSON.parse(NativeTodayTasksHandler
                                .getTaskForToday(JSON.parse(NativeTodayTasksHandler.getTaskForToday(1))[0]["id"]))[0]
                            return Task.fromJSON(JSON.stringify(today))
                        }
                        return null
                    })
                if(selectedTask)
                {
                    setTime(t=>{
                        const date = new Date()
                        date.setDate(0)
                        date.setHours(0)
                        date.setMinutes(0)
                        date.setSeconds(0)
                        date.setMilliseconds(0)
                        date.setMilliseconds(selectedTask.t - selectedTask.tCompleted)
                        return date
                    })
                }
            }
      }
    return (<View style={styleView}>
        <View style={stylesCreateTask.container}>
            <Text style={stylesCreateTask.textH1}>✨ Welcome to Ippodake ✨</Text>
            <TimeCounter time={time}></TimeCounter>
            <Pressable style={stylesCreateTask.pressable} onPress={onPress}>
                <Text style={stylesCreateTask.pressableText}>Start challenge</Text>
            </Pressable>
        </View>
    </View>);
}