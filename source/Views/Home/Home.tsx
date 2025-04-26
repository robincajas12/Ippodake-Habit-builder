import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, AppState, ScrollView, Pressable } from "react-native";
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
import { AdsConsent, BannerAd, BannerAdSize, RequestOptions, TestIds } from "react-native-google-mobile-ads";
import CreateNewTask from "../Create/CreateNewTask";
import traslations, { getTranslation } from "../../Languages/LangManager";
import TaskType from "../../Models/TaskType";
const adUnitId = __DEV__ ? TestIds.BANNER: 'ca-app-pub-5187514759339848/6240667800';
//const adUnitId = TestIds.BANNER
export default function Home( {canShowAds, idTaskType, setIdTaskType} : {idTaskType: number | null,canShowAds: boolean, setIdTaskType: (id :number| null) => void} ) {
  const [resquestOption, setResquestOption] = useState<RequestOptions | null>(null);
  const language : string = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE);

  // Traducciones
  const txt_home = getTranslation(traslations.Home, language)

  const [habit, setHabit] = useState(()=>{
    if(idTaskType == null) return ""
    const res = NativeTodayTasksHandler.getTaskTypeById(idTaskType)
    const taskType = JSON.parse(res)[0]
    return TaskType.fromJSON(JSON.stringify(taskType)).title
  });
  const context = useContext(Context);
  if (!context) {
    return null; // Manejo del caso null
  }
  const { selectedTask, setIsVsible, setSelectedTask, clockStarted, setClockStarted, time, setTime} : ContextProps = context;
  useEffect(()=>{
    const loadAds = async () => {
      const {
        selectPersonalisedAds,
      } = await AdsConsent.getUserChoices();
      console.log("selectPersonalisedAds", selectPersonalisedAds);
      const requestOptions: RequestOptions = {
        requestNonPersonalizedAdsOnly: !selectPersonalisedAds,
      };
      
      setResquestOption(requestOptions); // Set the request options after loading
    };
    console.log("can show ads? " ,canShowAds)
    if(canShowAds == true && clockStarted == false) loadAds();
}, [canShowAds, setResquestOption])
  useEffect(() => {
    if (selectedTask) {
      setTime((t) => {
        const date = new Date(t.getTime());
        date.setDate(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(selectedTask.t - selectedTask.tCompleted);
        return date;
      });
    }
    if (!selectedTask) {
      
      if (idTaskType !== null) {
        try{
          let task = getTaskForToday(idTaskType);
          if(task == undefined) NativeTodayTasksHandler.createTaskForToday(idTaskType)
          console.log("task-----------------------------------------------------------     11111", task)
          task = getTaskForToday(idTaskType);
          if (task) {
            if (task.id.toString() === NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASK)) {
              setSelectedTask(task);
            } else {
              setIsVsible(true);
            }
          }
        }catch(e){
          console.log("Error getting task for today", e);
          setIdTaskType(null)
          NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE);
          NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASK);
        }
      }
      setClockStarted(false);
    }
  }, [setTime, setSelectedTask, selectedTask, setResquestOption]);

  return (
    selectedTask == null ? (
      <CreateTask styleView={stylesMainContentView().view} selectedTask={selectedTask} setSelectTask={setSelectedTask} />
    ) : (
      <View style={stylesMainContentView().view}>
        <ScrollView>
          {__DEV__  && <Text style={{color: 'red'}}>DevMODE</Text>}
          {/*<CreateNewTask></CreateNewTask>*/}
          <Pressable onPress={()=>
              {
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE);
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASK);
                setIdTaskType(null);
                setSelectedTask(null);
                setClockStarted(false)
                NativeLevelHandler.setItem(ELocalStorageKeys.CURRENT_DATE, NativeTodayTasksHandler.getToday())
                if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER))
                {
                  clearInterval(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)))
                }
                setClockStarted(false)
                                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER)
                                NativeLevelHandler.removeItem(ELocalStorageKeys.CLOCK_STATUS)
                                NotificationController.get().cancelTriggerNotification()
                                const idActiveNot = NativeLevelHandler.getItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)
                                if(idActiveNot)
                                {
                                    notifee.cancelNotification(idActiveNot)
                                    NativeLevelHandler.removeItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)
                                }
              }}>
            <Text>XDDDD</Text>
          </Pressable>
          <View style={stylesHome.containerHabit}>
            <Text style={stylesHome.txtHabit}>{selectedTask.t ==selectedTask.tCompleted ? "Task completed, come back tomorrow" : txt_home.habit + ": " + habit}</Text>
          </View>
          <View style={stylesHome.mainContainer}>
            <View style={stylesHome.cardsContainer}>
              <Text style={stylesHome.cardTitle}>{txt_home.percentage}</Text>
              <Text style={stylesHome.cardValue}>{trunc((selectedTask.tCompleted * 100) / selectedTask.t)} %</Text>
            </View>
            <View style={stylesHome.cardsContainer}>
              <Text style={stylesHome.cardTitle}>{txt_home.avg}</Text>
              <Text style={stylesHome.cardValue}>{trunc(NativeTodayTasksHandler.getAVGTaskTCompleted(selectedTask.idTaskType,21) / (60 * 1000), 1)}</Text>
            </View>
            <View style={[stylesHome.cardsContainer, stylesHome.container]}>
              <TimeCounter txtColor={null} time={time} />
              {setClockStarted && (
                <Clock 
                  clockStarted={clockStarted} 
                  setClockStarted={setClockStarted} 
                  setTime={setTime} 
                  time={time} 
                  selectedTask={selectedTask} 
                  setSelectedTask={setSelectedTask} 
                />
              )}
            </View>
            {clockStarted === false && canShowAds && resquestOption != null  ? (
              <BannerAd unitId={adUnitId} size={BannerAdSize.LARGE_BANNER} requestOptions={resquestOption} />
            ) : (
              <View style={[stylesHome.cardsContainer]}>
                <Text style={stylesHome.cardValue}>{txt_home.info}</Text>
                <Text style={stylesHome.cardTitle}>{txt_home.reminder1}</Text>  
                <Text style={stylesHome.cardTitle}>{txt_home.reminder2}</Text>  
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    )
  );
}