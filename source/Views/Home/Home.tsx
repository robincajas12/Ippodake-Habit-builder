import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, AppState, ScrollView } from "react-native";
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
import { UserKeys } from "../../Enums/UserKeys";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9679713412722657/5646158476';

export default function Home() {
  const [habit, setHabit] = useState(NativeLevelHandler.getItem(UserKeys.GOAL_NAME));
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
    <View style={stylesMainContentView.view}>
      <ScrollView>
        <View style={stylesHome.containerHabit}>
          <Text style={stylesHome.txtHabit}>{habit}</Text>
        </View>
        <View style={stylesHome.mainContainer}>
            <View style={stylesHome.cardsContainer}>
            <Text style={stylesHome.cardTitle}>Percentaje</Text>
              <Text style={stylesHome.cardValue}>{trunc((selectedTask.tCompleted * 100) / selectedTask.t)} %</Text>
            </View>
            <View style={stylesHome.cardsContainer}>
              <Text style={stylesHome.cardTitle}>AVG (21 days)</Text>
              <Text style={stylesHome.cardValue}>{trunc(NativeTodayTasksHandler.getRealAVG(21)/(60*1000),1)}</Text>
            </View>
            <View style={[stylesHome.cardsContainer, stylesHome.container]}>
              <TimeCounter txtColor={null} time={time} />
              {setClockStarted && <Clock clockStarted={clockStarted} setClockStarted={setClockStarted} setTime={setTime} time={time} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>}
            </View>
            {clockStarted==false && selectedTask.t != selectedTask.tCompleted && <BannerAd unitId={adUnitId} size={BannerAdSize.LARGE_BANNER} requestOptions={{requestNonPersonalizedAdsOnly: true,}}></BannerAd>}
        </View>
      </ScrollView>
    </View>
  );
}
