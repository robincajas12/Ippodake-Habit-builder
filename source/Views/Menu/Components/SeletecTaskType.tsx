import { useState } from "react";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import TaskType from "../../../Models/TaskType";
import { Text, View } from "react-native";
import MyItem from "./MyItem";
import NativeLevelHandler from "../../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../../Enums/LocalStorageKeys";

type selectedTaskTypeeProps = {
    idTaskType : number,
    setIdTaskType : (idTaskType : number) => void
}
export default function SelectTaskType({idTaskType,setIdTaskType} : selectedTaskTypeeProps)
{
    const  [taskTypes, setTaskType] = useState<TaskType[] | null>(()=>{
        const taskTypes  =JSON.parse(NativeTodayTasksHandler.getAllTaskTypes());
        console.log("taskTypes", taskTypes)
        return null
    })
    console.log("taskTypes", taskTypes)
    if(taskTypes == null) return null
    function action(taskType : TaskType)
    {
        setIdTaskType(taskType.id)
        NativeLevelHandler.setItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE, taskType.id.toString())
    }
    function renderItem(taskType : TaskType)
    {
        console.log(taskType)
        return <MyItem key={taskType.id} taskType={taskType} action={action} selected={idTaskType == taskType.id}/>
    }
    return <View>
        {/*taskTypes.map((taskType : TaskType) => {
            console.log("taskType", taskType)
            return renderItem(taskType)
        })*/}
        <Text>XDDD</Text>
    </View>
}