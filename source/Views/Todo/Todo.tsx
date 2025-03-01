import { ScrollView, Text, View, FlatList, Pressable, ListRenderItem } from "react-native";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import { useState } from "react";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import Li from "./Components/Li";
import TaskType from "../../Models/TaskType";
export default function Todo()
{
    const [today, SetToday ] = useState(new Date(Number(NativeTodayTasksHandler.getToday())))
    
    return <View style={stylesMainContentView.view}>
        <Text style = {{color: 'white'}}>{today.toString()} tasks</Text>
    </View>
}