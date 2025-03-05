import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import TimeCounter from "./Components/TimeCounter";
import Clock from "./Components/Clock";
import stylesHome from "./styles/stylesHome";
import Slider from "@react-native-community/slider";
import _vw from "../../utils/sizeConversors";
import CreateTask from "./Components/CreateTask";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import { Context, ContextProps } from "../../../App";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
import Task from "../../Models/Task";
export default function Home() {
  const context = useContext(Context);
  if (!context) {
    return null; // or handle the null case appropriately
  }
  const { selectedTask,setIsVsible, setSelectedTask, clockStarted, setClockStarted, time, setTime} : ContextProps = context;
  function onValueChange()
  {
  }

  useEffect(()=>{
    console.log(selectedTask)
    if(selectedTask)
      {
        setTime((t)=>{
          const date = new Date(t.getTime())
          date.setDate(0)
          date.setHours(0)
          date.setMinutes(0)
          date.setSeconds(0)
          date.setMilliseconds(selectedTask.t - selectedTask.tCompleted)
          return date
        })
      }
      if(selectedTask == null)
      {
        console.log(selectedTask, "selected")
        console.log(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))
        const idTaskType = NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)
        if(idTaskType != "")
        {
          const res = NativeTodayTasksHandler.getTaskForToday(Number(idTaskType))
          if(res  != "[]")
          {
            const json = JSON.parse(res)[0]
            const task = Task.fromJSON(JSON.stringify(json))
            if(task.id.toString() == NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASK))
            {
              setSelectedTask(task)
            }
            else{
              setIsVsible(true)
            }
            
          }
        }
        
      }
  },[setTime, setSelectedTask,selectedTask])
  return (
    selectedTask == null ? <CreateTask styleView={stylesMainContentView.view} selectedTask={selectedTask} setSelectTask={setSelectedTask}></CreateTask>:
    <View style={{ flex: 7, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Text>{time.getTime()/(1000*60)}</Text>
      <View style={stylesHome.container}>
        <TimeCounter time={time} />
        {setClockStarted && <Clock clockStarted={clockStarted} setClockStarted={setClockStarted} setTime={setTime} time={time} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>}
      </View>
    </View>
  );
}
