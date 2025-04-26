import { Pressable, Text, View } from "react-native";
import TaskType from "../../../Models/TaskType";
import colors from "../../Components/Styles/colors";
import _vw from "../../../utils/sizeConversors";
export type myItemProps = {
    taskType: TaskType,
    action : (taskype : TaskType) => void,
    selected : boolean,
}

export default function MyItem({taskType, action, selected} : myItemProps)
{
    const styles = {
        container: {
            backgroundColor: colors.primaryColor,
            borderRadius: _vw(4),
            padding: _vw(2),
            borderWidth: _vw(1),
            borderColor: colors.primaryColor_darker,
        },
        selected: {
            backgroundColor: colors.danger,
        },
        text: {
            color: colors.font,
            fontSize: _vw(5)
        },
    }
    function event()
    {
        action(taskType)
    } 
    return <View style={[styles.container, selected && styles.selected]}>
        <Pressable onPress={event}>
            <Text style={styles.text}>{taskType.title}</Text>
        </Pressable>
    </View>
}