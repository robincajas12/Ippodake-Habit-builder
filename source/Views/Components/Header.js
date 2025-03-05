import { StatusBar, View,Text, Button, Pressable } from "react-native";
import stylesHeader from "./Styles/stylesHeader";
import colors, { lightColors } from "./Styles/colors";
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
           NativeTodayTasksHandler.createTaskType("Task", 0, 60,5)
            console.log(NativeTodayTasksHandler.createTaskForToday(1))
            console.log(NativeTodayTasksHandler.getAllMainTasks())
    }
    return (
        <View style={stylesHeader.viewHeader}>
            <StatusBar hidden={false} backgroundColor={colors.primaryColor} barStyle={colors.primaryColor === lightColors.primaryColor ? "dark-content" : "light-content"}  />
            <Text style={stylesHeader.textHeader}>🌟 {streak}</Text>
            <Pressable style={stylesHeader.helpPressable}>
                <Text style={stylesHeader.helpText}>?</Text>
            </Pressable>
        </View>
    );
}    