import { Image, Pressable, Text, View } from "react-native";
import TaskType, { ETaskType } from "../../../Models/Task";
import { useState } from "react";
import liStyles from "./Styles/liStyles";
export type propsCheckItem = {
    task : TaskType
}
export default function CheckItem({task} : propsCheckItem)
{
    const [isChecked, setIsChecked] = useState<boolean>(false)

    function getCheckIcon()
    {
        //return isChecked ? <Image style={liStyles.liImage} source={require('../../../Images/Icons/check.png')}/> : <Image style={liStyles.liImage}  source={require('../../../Images/Icons/cancel.png')}/>
        //return <Text>{isChecked ? '✅' : '❎'} xd</Text>
        return null
    }

    function onPressCheckItem()
    {
        setIsChecked(prev=> !prev);
    }

    return <Pressable onPress={onPressCheckItem}>
        <View style={liStyles.liView} pointerEvents="box-none">
            {getCheckIcon()}
            <Text onPress={onPressCheckItem} style={liStyles.liText}>{isChecked ? '✅' : '❌'}  {task.title} {task.exp} exp </Text>
        </View>
    </Pressable>
}