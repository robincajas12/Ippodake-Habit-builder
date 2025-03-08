import { Pressable, Text, View } from "react-native";
import TaskType, { ETaskType } from "../../../Models/TaskType";
import { useState } from "react";
import liStyles from "./Styles/liStyles";
export type propsCheckItem = {
    task : TaskType
}
export default function CheckItem({task} : propsCheckItem)
{
    const [isChecked, setIsChecked] = useState<boolean>(false)
    function onPressCheckItem()
    {
        setIsChecked(prev=> !prev);
    }
    return <View style={liStyles.liView}>
        <Pressable style={liStyles.liPressable} onPress={onPressCheckItem}><Text>{isChecked ? '✅':'❌'}</Text></Pressable>
        <Text style={liStyles.liText}>{task.title} {task.exp} exp </Text>
    </View>
}