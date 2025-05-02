import { useEffect, useState } from "react";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import TaskType from "../../../Models/TaskType";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import MyItem from "./MyItem";
import NativeLevelHandler from "../../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../../Enums/LocalStorageKeys";
import CreateNewTask from "../../Create/CreateNewTask";
import NotificationController from "../../../Controllers/NotificationController";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors, { lightColors } from "../../Components/Styles/colors";
import _vw, { _vh } from "../../../utils/sizeConversors";
import { AdsConsent, BannerAd, BannerAdSize, RequestOptions, TestIds } from "react-native-google-mobile-ads";
import stylesMainContainer from "../../Components/Styles/stylesMainContainer";


type selectedTaskTypeeProps = {
    idTaskType : number | null,
    setIdTaskType : (idTaskType : number) => void,
    canShowAds: boolean
}
export default function SelectTaskType({idTaskType,setIdTaskType, canShowAds} : selectedTaskTypeeProps)
{
    const {width, height} = useWindowDimensions();
     const [resquestOption, setResquestOption] = useState<RequestOptions | null>(null);
     useEffect(()=>{
        const isTaskTypeTableEmpty = NativeTodayTasksHandler.getAllTaskTypes() === "[]";
        if(isTaskTypeTableEmpty){
            setRenderHabitCreator(true);
        }
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
        if(canShowAds == true) loadAds();
    }, [canShowAds, setResquestOption])
    const  [taskTypes, setTaskType] = useState<TaskType[] | null>(()=>{
        const taskTypes  = JSON.parse(NativeTodayTasksHandler.getAllTaskTypes());
        if(taskTypes == "[]") return null;
        return taskTypes.map((taskType : TaskType) => {
            console.log("taskType", taskType)
            TaskType.fromJSON(JSON.stringify(taskType))
            return taskType
        })
    })
    const [showCreateNewTask, setShowCreateNewTask] = useState(false)
    const [renderHabitCreator, setRenderHabitCreator] = useState(false);
         useEffect(()=>{
            const isTaskTypeTableEmpty = NativeTodayTasksHandler.getAllTaskTypes() === "[]" && showCreateNewTask == false;
            if(isTaskTypeTableEmpty){
                setRenderHabitCreator(true);
            }
            setTaskType(()=>{
                const taskTypes  = JSON.parse(NativeTodayTasksHandler.getAllTaskTypes());
                if(taskTypes == "[]") return null;
                return taskTypes.map((taskType : TaskType) => {
                    console.log("taskType", taskType)
                    TaskType.fromJSON(JSON.stringify(taskType))
                    return taskType
                })
            })
            return () => {
                
            }
        
    }, [ renderHabitCreator]);

    function action(taskType : TaskType)
    {
        if(taskType.id .toString()!= NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))
        {
            NativeLevelHandler.setItem(ELocalStorageKeys.CURRENT_DATE, NativeTodayTasksHandler.getToday())
            if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER))
            {
              clearInterval(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)))
            }
            NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER)
            NativeLevelHandler.removeItem(ELocalStorageKeys.CLOCK_STATUS)
            NotificationController.get().cancelTriggerNotification()
            const idActiveNot = NativeLevelHandler.getItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)
            if(idActiveNot)
            {
                NotificationController.get().cancelNotification(idActiveNot)
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)
            }
            NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE);
            NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASK);
        }

        setIdTaskType(taskType.id)
        NativeLevelHandler.setItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE, taskType.id.toString())
    }
    function renderItem(taskType : TaskType)
    {
        return <MyItem key={taskType.id} taskType={taskType} action={action} selected={idTaskType == taskType.id}/>
    }
    const styles = StyleSheet.create({
        container: {
            padding: _vw(5),
            backgroundColor: colors.primaryColor_darker,
            display: "flex",
            flex: 1,
            gap: _vw(3),
        },
        containerTitle:{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: width < height ? _vw(5) : _vw(2),
        },
        text: {
            color: colors.font,
            fontSize: width < height ? _vw(8) : _vw(5),
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
            padding: _vw(5),
        },
        btnCreateNewTask:{
            backgroundColor: colors.nonDanger,
            padding: _vw(3),
            borderRadius: _vw(3),
            width: 'auto',
            alignSelf: 'center',
        },
        adContainer:{
            width: width < height ? _vw(100) : width,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: _vw(0),
        }
    });
    return <View style={{ display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent:"space-between",
        alignItems: "stretch",
        backgroundColor: colors.primaryColor_darker}}>{renderHabitCreator ?  <CreateNewTask setRenderHabitCreator={setRenderHabitCreator} canShowAds={canShowAds}></CreateNewTask> : 
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.containerTitle}>
            <Text style={styles.text}>My Habits</Text>
            {!renderHabitCreator &&  <Pressable style={styles.btnCreateNewTask} onPress={()=>{
                setShowCreateNewTask(true)
                setRenderHabitCreator(true)
            }}>
            <Text style={{color: lightColors.font}}>Create New Task</Text>
        </Pressable>}
        </View>
        <View style={styles.container}>
        {taskTypes?.map((taskType : TaskType) => {
            return renderItem(taskType)
        })}
        </View>
    </ScrollView>}
   <View style={styles.adContainer}>
   { canShowAds && resquestOption!= null && <BannerAd unitId={__DEV__ ? TestIds.BANNER :"ca-app-pub-5187514759339848/9400096840"} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={resquestOption}></BannerAd>}
   </View>
    </View>
}