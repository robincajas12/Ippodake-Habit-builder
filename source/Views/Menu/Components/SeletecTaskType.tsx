import { useEffect, useState } from "react";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import TaskType from "../../../Models/TaskType";
import { Pressable, Text, View } from "react-native";
import MyItem from "./MyItem";
import NativeLevelHandler from "../../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../../Enums/LocalStorageKeys";
import CreateNewTask from "../../Create/CreateNewTask";

type selectedTaskTypeeProps = {
    idTaskType : number | null,
    setIdTaskType : (idTaskType : number) => void,
    canShowAds: boolean
}
export default function SelectTaskType({idTaskType,setIdTaskType, canShowAds} : selectedTaskTypeeProps)
{
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
        setIdTaskType(taskType.id)
    }
    function renderItem(taskType : TaskType)
    {
        return <MyItem key={taskType.id} taskType={taskType} action={action} selected={idTaskType == taskType.id}/>
    }
    return renderHabitCreator ?  <CreateNewTask setRenderHabitCreator={setRenderHabitCreator} canShowAds={canShowAds}></CreateNewTask> : <View>
        <Text style={{color: 'white'}}>Select Task Type</Text>
        <Pressable onPress={()=>{
            setShowCreateNewTask(true)
            setRenderHabitCreator(true)
        }}>
        <Text style={{color: 'white'}}>Create New Task</Text>
        </Pressable>
        {taskTypes?.map((taskType : TaskType) => {
            return renderItem(taskType)
        })}
    </View>
}