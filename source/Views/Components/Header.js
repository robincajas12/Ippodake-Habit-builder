import { StatusBar, View,Text, Button } from "react-native";
import stylesHeader from "./Styles/stylesHeader";
import colors from "./Styles/colors";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import { useEffect, useState } from "react";
export default function Header()
{
    const [level, setLevel] = useState(NativeLevelHandler.getUserLevel());
    const [streak, setStreak] = useState(NativeLevelHandler.getStreak());
    function increase()
    {
        setLevel(NativeLevelHandler.getUserLevel())
        setStreak(NativeLevelHandler.getStreak())
           NativeTodayTasksHandler.createTaskType("e", 0, 60,5)
            console.log(NativeTodayTasksHandler.createTaskForToday(1))
            console.log(NativeTodayTasksHandler.getAllMainTasks())
    }
    return <View style = {stylesHeader.viewHeader}>

        <StatusBar hidden={false} backgroundColor={colors.primaryColor}>
        </StatusBar> 
        <Text style={stylesHeader.textHeader}>Level {level}</Text>
        <Text style={stylesHeader.textHeader}>🌟 {streak}</Text>
        {/*<Button onPress={()=>{increase()}} title={'PRESS ME'}></Button>*/}
    </View>
}