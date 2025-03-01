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
export default function Home() {
  const context = useContext(Context);
  if (!context) {
    return null; // or handle the null case appropriately
  }
  const { selectedTask, setSelectedTask, clockStarted, setClockStarted, time, setTime} : ContextProps = context;
  function onValueChange()
  {
  }

  useEffect(()=>{
    if(selectedTask)
      {
        setTime(()=>{
          const date = new Date()
          date.setHours(0)
          date.setMinutes(0)
          date.setMilliseconds(selectedTask.t - selectedTask.tCompleted)
          return date
        })
      }
  },[setTime])
  return (
    selectedTask == null ? <CreateTask styleView={stylesMainContentView.view} selectedTask={selectedTask} setSelectTask={setSelectedTask}></CreateTask>:
    <View style={{ flex: 7, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Text>{time.getTime()/(1000*60)}</Text>
      <Slider minimumValue={0} maximumValue={1000} style={{width:_vw(90)}} value={time.getTime()/(1000*60)} onValueChange={onValueChange}></Slider>
      <View style={stylesHome.container}>
        <TimeCounter time={time} />
        <Clock clockStarted={clockStarted} setClockStarted={setClockStarted} setTime={setTime} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
      </View>
    </View>
  );
}
