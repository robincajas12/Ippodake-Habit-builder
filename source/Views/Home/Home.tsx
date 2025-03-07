import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, AppState } from "react-native";
import TimeCounter from "./Components/TimeCounter";
import Clock from "./Components/Clock";
import stylesHome from "./styles/stylesHome";
import Slider from "@react-native-community/slider";
import _vw from "../../utils/sizeConversors";
import CreateTask from "./Components/CreateTask";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import { Context, ContextProps } from "../../ContextComponent";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
import Task from "../../Models/Task";
import NotificationController from "../../Controllers/NotificationController";
import notifee, { EventType } from '@notifee/react-native';
import { trunc } from "../../utils/mathForDummies";
import colors from "../Components/Styles/colors";
import { getTaskForToday } from "../../utils/getTaskForToday";
export default function Home() {
  const context = useContext(Context);
  if (!context) {
    return null; // or handle the null case appropriately
  }
  const { selectedTask,setIsVsible, setSelectedTask, clockStarted, setClockStarted, time, setTime} : ContextProps = context;



  useEffect(()=>{
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
        const idTaskType = NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)
        if(idTaskType != "")
        {
            const task = getTaskForToday()
            if(task)
            {
              if(task.id.toString() == NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASK))
                {
                  setSelectedTask(task)
                }
                else{
                  setIsVsible(true)
                }
            }
        }
        setClockStarted(false)
      }
  },[setTime, setSelectedTask,selectedTask])
  return (
    selectedTask == null ? <CreateTask styleView={stylesMainContentView.view} selectedTask={selectedTask} setSelectTask={setSelectedTask}></CreateTask>:
    <View style={{ flex: 7, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <Text style={{fontSize: _vw(25), color: colors.font}}>{trunc((selectedTask.tCompleted * 100) / selectedTask.t, 1)} %</Text>
      <View style={stylesHome.container}>
        <TimeCounter txtColor={null} time={time} />
        {setClockStarted && <Clock clockStarted={clockStarted} setClockStarted={setClockStarted} setTime={setTime} time={time} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>}
      </View>
    </View>
  );
}
