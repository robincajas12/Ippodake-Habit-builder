import { StatusBar, View,Text, Button, Pressable } from "react-native";
import stylesHeader from "./Styles/stylesHeader";
import colors, { lightColors } from "./Styles/colors";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import { useEffect, useState } from "react";
import { UserKeys } from "../../Enums/UserKeys";
import { trunc } from "../../utils/mathForDummies";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
export default function Header()
{
    return (
        <View style={stylesHeader().viewHeader}>
            <StatusBar hidden={true} backgroundColor={colors.primaryColor} barStyle={colors.primaryColor === lightColors.primaryColor ? "dark-content" : "light-content"}  />
            <Text style={stylesHeader().textHeader}>🌟 {NativeLevelHandler.getStreak()}</Text>
            <Pressable style={stylesHeader().helpPressable}>
                <Text style={stylesHeader().helpText}>?</Text>
            </Pressable>
        </View>
    );
}    