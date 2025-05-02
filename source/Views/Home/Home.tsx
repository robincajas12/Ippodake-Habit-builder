import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, Button, AppState, ScrollView, Pressable, Alert } from "react-native";
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
import MyCards from "../Components/General/Components/InputComponents/MyCards";
import MySlider from "../Components/General/Components/InputComponents/MySlider";
import MySliderC from "../Components/General/Components/InputComponents/MySliderC";
const adUnitId = __DEV__ ? TestIds.BANNER: 'ca-app-pub-5187514759339848/6240667800';
//const adUnitId = TestIds.BANNER
export default function Home( {canShowAds, idTaskType, setIdTaskType} : {idTaskType: number,canShowAds: boolean, setIdTaskType: (id :number| null) => void} ) {
  const [resquestOption, setResquestOption] = useState<RequestOptions | null>(null);
  const language : string = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE);

  // Traducciones
  const txt_home = getTranslation(traslations.Home, language)
  const [habit, setHabit] = useState(()=>{
    const res = JSON.stringify(JSON.parse(NativeTodayTasksHandler.getTaskTypeById(idTaskType))[0]);
    console.log("res", res)
    return TaskType.fromJSON(res).title;
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
          console.log("idTaskType", idTaskType)
          const task = getTaskForToday(idTaskType);

          if(!task){
            setSelectedTask(null);
            setIsVsible(true);
          }
          console.log("task-----------------------------------------------------------     11111", task)
          if (task) {
              setSelectedTask(task);
            } else {
              setIsVsible(true);
            }
          }
        
      
      setClockStarted(false);
    }
  }, [setTime, setSelectedTask, selectedTask, setResquestOption]);
  useEffect(()=>{
    if(selectedTask)
    {
      if(selectedTask.idTaskType != idTaskType)
      {
        NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASK);
        setSelectedTask(null);
      }
    }
  })
  enum btn {
    MANUAL_ENTRY = "📝",
    CLOCK = "⌛",
    CHECKBOX = "✅"
  }
  const [selectedCard, setSelectedCard] = useState(btn.CLOCK)
  const buttons = [
    { id: btn.CLOCK, emoji: btn.CLOCK, name: "Clock" },
    { id: btn.MANUAL_ENTRY, emoji: btn.MANUAL_ENTRY, name: "Input" },
    { id: btn.CHECKBOX, emoji: btn.CHECKBOX, name: "Tick" }
  ];
  
  
  function btnAction(id : string)
  {
    if(id === btn.CLOCK)
    {
      if(clockStarted) setClockStarted(false)
      setSelectedCard(btn.CLOCK)
      return
    }
    if(id === btn.MANUAL_ENTRY)
    {
        if(clockStarted) setClockStarted(false)
        setSelectedCard(btn.MANUAL_ENTRY)
        return
    }
    if(id === btn.CHECKBOX)
      {
        Alert.alert(
          "Confirm Action",
          "✨ Are you sure you want to mark this task as completed?\n\nOnce checked, it will be recorded for today.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                // Cancel pressed, do nothing
              }
            },
            {
              text: "Yes, complete it!",
              onPress: () => {
                if (clockStarted) setClockStarted(false);
                setSelectedCard(btn.CHECKBOX);
        
                if (selectedTask) {
               
                  NativeTodayTasksHandler.recordDay(selectedTask.id, selectedTask.t);
                  const task = getTaskForToday(selectedTask?.idTaskType);
                  if (task) setSelectedTask(task);
                }
              }
            }
          ],
          { cancelable: true }
        );
        
      }
  }
  const valueSlider = useRef(0);
  function changeTaskTypeWithSlider(t : number, prop : string){
    valueSlider.current = t;
    console.log()
    if(selectedTask)
      { 
        NativeTodayTasksHandler.recordDay(selectedTask.id, t*60*1000);
        const task =getTaskForToday(selectedTask.idTaskType)
        console.log("aaaa" + task)
        if(task) 
        {
          setSelectedTask(task);
          setTime((prev) => {
            const date = new Date(prev.getTime());
            date.setDate(0);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(t*60*100);
            return date;})
        }
      }
  }
  return (
    selectedTask == null ? (
      <CreateTask styleView={stylesMainContentView().view} selectedTask={selectedTask} setSelectTask={setSelectedTask} />
    ) : (
      <View style={stylesMainContentView().view}>
        <ScrollView>
          {__DEV__  && <Text style={{color: 'red'}}>DevMODE</Text>}
          {/*<CreateNewTask></CreateNewTask>*/}
          <View style={stylesHome.containerHabit}>
            <Text style={stylesHome.txtHabit}>{selectedTask.t ==selectedTask.tCompleted ? "Task completed, come back tomorrow" : txt_home.habit + ": " + habit}</Text>
          </View>
          <View style={stylesHome.mainContainer}>
            {/*<View style={stylesHome.cardsContainer}>
              <Text style={stylesHome.cardTitle}>{txt_home.percentage}</Text>
              <Text style={stylesHome.cardValue}>{trunc((selectedTask.tCompleted * 100) / selectedTask.t)} %</Text>
            </View>*/}
            <View style={{}}>
              {/*<Text style={stylesHome.cardTitle}>{txt_home.setCompleted}</Text>
              <Pressable>
                  <Text style={stylesHome.cardValue}>{"🐒"}</Text>
              </Pressable>*/}
              {!clockStarted && <MyCards buttons={buttons} onSelect={btnAction} ></MyCards>}
            </View>
         
            <View style={[stylesHome.cardsContainer, stylesHome.container, selectedCard !== btn.CLOCK && {flexDirection: 'column', paddingVertical: _vw(5), borderRadius: _vw(10), padding: 0, margin: 0}]}>
              <TimeCounter txtColor={null} time={time} />
              {selectedCard === btn.MANUAL_ENTRY && <View style={{width: _vw(60)}}>
              <MySlider action={changeTaskTypeWithSlider} propertyToChange="t" min={0} max={trunc(selectedTask.t /(60*1000),5)} txtTitle="value" initialValue={(selectedTask.tCompleted/(60*1000))}></MySlider>
              </View>}
              {setClockStarted && selectedCard === btn.CLOCK && (
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