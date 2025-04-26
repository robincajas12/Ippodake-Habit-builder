import { Pressable, ScrollView, Text, View } from "react-native";
import _vw from "../../../utils/sizeConversors";
import stylesCreateTask from "../styles/stylesCreateTask";
import TimeCounter from "./TimeCounter";
import { useEffect, useState } from "react";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import Task from "../../../Models/Task";
import NativeLevelHandler from "../../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../../Enums/LocalStorageKeys";
import TaskType from "../../../Models/TaskType";
import { trunc } from "../../../utils/mathForDummies";
import stylesClock from "../styles/stylesClock";
import Slider from "@react-native-community/slider";
import colors from "../../Components/Styles/colors";
import Help from "../../Components/General/Components/Help";
import { UserKeys } from "../../../Enums/UserKeys";
import traslations, { getTranslation } from "../../../Languages/LangManager";

enum boost {
    IPPODAKE = "🐢",
    AVG = "🐧",
    SAME = "❄️",
    MIN = "🐜"
}
type btnData = {
    startsRequired : number,
    type: boost,
    name: string,
    fun : (idTaskType: number) => number
}
const btns : btnData[] = [

    {
        startsRequired: 0,
        type: boost.AVG,
        name: "Avg + 10%",
        fun: (idTaskType:number)=>
        {
            return Math.ceil((NativeTodayTasksHandler.getAVGTaskTCompleted(idTaskType, 21))+ (NativeTodayTasksHandler.getHabitFormationModelCurrentTime(idTaskType)*0.1))
        }
    },
    {
        startsRequired: 0,
        type : boost.IPPODAKE,
        name: "Ippodake",
        fun: NativeTodayTasksHandler.getHabitFormationModelCurrentTime
    },
    {
        startsRequired: 0,
        type: boost.SAME,
        name: "Froze time",
        fun: (idTaskType: number) => {
            const frozenTime = NativeLevelHandler.getItem(ELocalStorageKeys.FROZEN_TIME)
            if(frozenTime)
            {
                const n = Number(frozenTime)
                if(n > 3*60*1000) return n
            }
            return 3*60*1000
        }
    },
    {
        startsRequired : 0,
        type: boost.MIN,
        name: "Min + 10%",
        fun: (idTaskType: number)=>{
            return Math.ceil(((3) * 60*1000) +  (NativeTodayTasksHandler.getHabitFormationModelCurrentTime(idTaskType)*0.1))
        }
    }
]
export default function CreateTask({ selectedTask,setSelectTask, styleView}: any)
{
    const idSelectedTask = NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)
    const [selectedBoost, setSelectedBoost] = useState(boost.IPPODAKE);
    const [taskType, setTaskType] = useState<TaskType | null>(null)
    const [timeForTask, setTimeForTask] = useState(0)
      const [time, setTime] = useState(()=>  {
          const time = new Date();
          time.setDate(0)
          time.setHours(0)
          time.setMinutes(0)
          time.setSeconds(0)
          time.setMilliseconds(0)
          return time;
      });
      useEffect(()=>{
            if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))
            {
                setTimeForTask(NativeTodayTasksHandler.getHabitFormationModelCurrentTime(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))))
            }
        
      }, [setTime])
      useEffect(()=>{
        if(timeForTask > 0)
        {
            setTime(t=>{
                const date = new Date(t.getDate())
                date.setDate(0)
                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(0)
                date.setMilliseconds(timeForTask)
                return date
            })

        }
      }, [timeForTask])

        function txt()
        {
            return getTranslation(traslations.CreateTask, NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE))
        }
      function renderItem(item : btnData)
      {
        if(idSelectedTask != "")
        {
        function onPressBtn()
        {       setSelectedBoost(item.type)
                if(idSelectedTask)
                {
                    const number = item.fun(Number(idSelectedTask))
                    console.log(number)
                    setTimeForTask(number)
                    setTime(t=>{
                        const date = new Date(t.getDate())
                        date.setDate(0)
                        date.setHours(0)
                        date.setMinutes(0)
                        date.setSeconds(0)
                        date.setMilliseconds(0)
                        date.setMilliseconds(timeForTask)
                        return date
                    })
                }
        }
        
        const btnText = <View key={item.type} style={[stylesCreateTask.boostBtnContainer, item.type == selectedBoost && stylesCreateTask.boostBtnContainerSelected]}>
            <Text style={stylesCreateTask.boostBtnStartsRequired}>{!(NativeLevelHandler.getStreak() >= item.startsRequired) ?  item.startsRequired + " 🌟": trunc(item.fun(Number(idSelectedTask))/(60*1000),1) + " min"}</Text>
            <Text style={[stylesCreateTask.boostBtnEmoji,item.type == selectedBoost && stylesCreateTask.boostBtnEmojiSelected, !(NativeLevelHandler.getStreak() >= item.startsRequired) && stylesCreateTask.boostBtnEmojiUnAvailable]}>{item.type}</Text>
            <Text style={[stylesCreateTask.boostBtnTxt, item.type == selectedBoost && stylesCreateTask.boostBtnTxtSelected, !(NativeLevelHandler.getStreak() >= item.startsRequired) && stylesCreateTask.boostBtnTxtUnAvailable]}>{item.name}</Text>
            {!(NativeLevelHandler.getStreak() >= item.startsRequired) && <Text style={stylesCreateTask.boostLockNotAvailable}>{ "🔒"}</Text>}
        </View>
            if(NativeLevelHandler.getStreak() >= item.startsRequired)
            {
                return <Pressable key={item.type} onPress={onPressBtn} onHoverIn={onPressBtn}>
                    {btnText}
                </Pressable>
            }
            return <View  key={item.type}style={stylesCreateTask.containerBtnNotAvailable}>
                {btnText}
            </View>
        }
        
      }
      function onPress(){

            if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE) == "") return 
            if(NativeTodayTasksHandler.createTaskForTodayWithTime(Number(idSelectedTask), timeForTask))
            {
                setSelectTask(()=>{
                        if(NativeTodayTasksHandler.getTaskForToday(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))) != "[]")
                        {
                            const today = JSON.parse(NativeTodayTasksHandler
                                .getTaskForToday(JSON.parse(NativeTodayTasksHandler.getTaskForToday(Number(idSelectedTask)))[0]["id"]))[0]
                            const task = Task.fromJSON(JSON.stringify(today)) 
                            return task
                        }
                        return null
                    })
                if(selectedTask)
                {
                    setTime(t=>{
                        const date = new Date(t.getDate())
                        date.setDate(0)
                        date.setHours(0)
                        date.setMinutes(0)
                        date.setSeconds(0)
                        date.setMilliseconds(0)
                        date.setMilliseconds(timeForTask)
                        return date
                    })
                }
            }
      }
      const btnIce = <View style={[(selectedBoost == boost.SAME) && stylesCreateTask.iceBtnSelected]}>
                            <Text style={stylesCreateTask.iceIcon}>🧊</Text>
                            <Text style={[stylesCreateTask.iceTxt]}>freeze time</Text></View>
      function onFreezeTimeBtnSelected()
      {
        setSelectedBoost(boost.SAME)
        if(timeForTask)
        {
            NativeLevelHandler.setItem(ELocalStorageKeys.FROZEN_TIME, timeForTask.toString())
        }
      }
    return (<ScrollView>
        <View style={[styleView]}>
        <View style={[stylesCreateTask.container]}>
            <Text style={stylesCreateTask.textH1}>{NativeLevelHandler.getItem(UserKeys.GOAL_NAME)}</Text>
            <Text style={[stylesCreateTask.pressableText ,{fontSize: _vw(6), fontFamily: 'Roboto-Italic'}]}>{txt().txtSubTitle}</Text>
            <ScrollView horizontal={true} scrollEnabled={true} style={[stylesCreateTask.boostBtnScrollView]} showsHorizontalScrollIndicator={false} >
            <View style={stylesCreateTask.containerBtn}>
                {btns.map(item => renderItem(item))}
            </View>
            </ScrollView>
            <View style={stylesCreateTask.containerTimeCounter}>
                <TimeCounter txtColor={selectedBoost == boost.SAME ? stylesCreateTask.iceTxtSelected.color: null} time={time}></TimeCounter>
            </View>
            <View style={stylesCreateTask.containerPressableAndIceBtn}>
                <View style={{}}>
                {selectedBoost != boost.SAME ?  <Pressable onPress={onFreezeTimeBtnSelected} style={[stylesCreateTask.iceBtn]}>
                    {btnIce}
                </Pressable> : btnIce}
                </View>
                <Pressable onPress={onPress} style={stylesCreateTask.pressable}>
                    <Text style={stylesCreateTask.pressableText}>{txt().pressableText}</Text>
                </Pressable>
            </View>
        </View>
    </View>
    </ScrollView>);
}

