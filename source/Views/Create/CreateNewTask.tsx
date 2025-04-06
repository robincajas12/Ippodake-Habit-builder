import { Pressable, ScrollView, Text, View } from "react-native";
import MyInput from "../Components/General/Components/InputComponents/MyInput";
import { useRef } from "react";
import Slider from "@react-native-community/slider";
import MySlider from "../Components/General/Components/InputComponents/MySlider";

export default function CreateNewTask()
{
    const values = useRef<{task_name: string, t_min: number,t_max:number}>({task_name: "", t_min:3*60*1000,t_max: 5*60*1000})
    enum EPropertyToChange {
        TASK_NAME="TASK_NAME",
        T_MIN="TIME_MIN",
        T_MAX="TIME_MAX",
    }
    function updateTxt(value: string | number, change: string)
    {
        if(change === EPropertyToChange.TASK_NAME) values.current = {...values.current, task_name: value.toString()}
        if(change === EPropertyToChange.T_MIN) values.current = {...values.current, t_min: value as number * 60 * 1000}
        if(change === EPropertyToChange.T_MAX) values.current = {...values.current, t_max: value as number * 60 * 1000}
    }
    function onPressPressable()
    {
        if(values.current.task_name === "") return
        if(values.current.t_min > values.current.t_max) return
        console.log(values.current)
    }
    return <View>
        <ScrollView>
            <MyInput propertyToChange={EPropertyToChange.TASK_NAME as string} action={updateTxt} txtTitle={"Task name"} initialText={""}></MyInput>
            <MySlider min={3} max={60} propertyToChange={EPropertyToChange.T_MIN} action={updateTxt} txtTitle="min" initialValue={3}></MySlider>
            <MySlider min={3} max={60} propertyToChange={EPropertyToChange.T_MAX} action={updateTxt} txtTitle="max" initialValue={3}></MySlider>
            <Pressable onPress={onPressPressable}>
                <Text>Create new task</Text>
            </Pressable>
        </ScrollView>
    </View>
}