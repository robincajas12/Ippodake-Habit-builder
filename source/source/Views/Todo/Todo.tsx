import { ScrollView, Text, View, FlatList, Pressable, ListRenderItem } from "react-native";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import { useState } from "react";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import Li from "./Components/Li";
import TaskType from "../../Models/Task";
export default function Todo()
{
    const [today, SetToday ] = useState(NativeTodayTasksHandler.getToday())
    const data : TaskType[] = [new TaskType(
            1,                   // id
            101,                 // uid
            "Read a novel",         // title
            2,                   // level
            10,                  // exp
            "Medium",            // difficulty
            undefined,           // until (optional)
            undefined,           // repeatDays (optional)
            "TIME",              // type (this will be parsed as ETaskType.TIME)
            undefined,           // subtasks (optional)
            undefined,           // setsNumber (optional)
            undefined,           // repsPerSet (optional)
            30                   // time (in minutes)
        ),new TaskType(
                2,                   // id
                101,                 // uid
                "Buy milk",         // title
                2,                   // level
                10,                  // exp
                "Medium",            // difficulty
                undefined,           // until (optional)
                undefined,           // repeatDays (optional)
                "TIME",              // type (this will be parsed as ETaskType.TIME)
                undefined,           // subtasks (optional)
                undefined,           // setsNumber (optional)
                undefined,           // repsPerSet (optional)
                2                   // time (in minutes)
    )];

    const renderData: ListRenderItem<TaskType> = ({ item }) => {
        return <Li key={item.id} task={item} />;
    };
    
    return <View style={stylesMainContentView.view}>
        <Text style = {{color: 'white'}}>{today} tasks</Text>
        <View> 
            <FlatList data={data} renderItem={renderData}></FlatList>
        </View>
    </View>
}