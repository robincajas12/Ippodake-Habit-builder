import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MyInput from "../Components/General/Components/InputComponents/MyInput";
import { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";
import MySlider from "../Components/General/Components/InputComponents/MySlider";
import _vw from "../../utils/sizeConversors";
import colors, { darkColors, lightColors } from "../Components/Styles/colors";
import MyCards from "../Components/General/Components/InputComponents/MyCards";
import { AdsConsent, BannerAd, BannerAdSize, RequestOptions, TestIds } from "react-native-google-mobile-ads";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import { ETaskType } from "../../Models/TaskType";

export default function CreateNewTask({canShowAds, setRenderHabitCreator}: {canShowAds: boolean, setRenderHabitCreator: (t:boolean)=>void})
{
    const [resquestOption, setResquestOption] = useState<RequestOptions | null>(null);
     useEffect(()=>{
        const isTaskTypeTableEmpty = NativeTodayTasksHandler.getAllTaskTypes() === "[]";
        if(isTaskTypeTableEmpty){
            setRenderHabitCreator(true);
        }
        const loadAds = async () => {
          const {
            selectPersonalisedAds,
          } = await AdsConsent.getUserChoices();
          console.log("selectPersonalisedAds", selectPersonalisedAds);
          const requestOptions: RequestOptions = {
            requestNonPersonalizedAdsOnly: !selectPersonalisedAds,
          };
          
          setResquestOption(requestOptions); // Set the request options after loading
        };
        console.log("can show ads? " ,canShowAds)
        if(canShowAds == true) loadAds();
    }, [canShowAds, setResquestOption])
    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primaryColor_darker,
        },
        title:{
            fontSize: _vw(8),
            padding: _vw(4),
            fontFamily: 'Roboto-Italic',
            textAlign: 'center',
            color: colors.font,
        },
        habitLevel: {
            fontSize: _vw(5),
            padding: _vw(2),
            fontFamily: 'Roboto-Italic',
            textAlign: 'center',
            color: colors.font,
        },
        btnCreateHabit: {
            backgroundColor: colors.white_blue,
            padding: _vw(4),
            borderRadius: _vw(3),
            marginTop: _vw(5),
            width: 'auto',
            alignSelf: 'center',
        },
        btnCreateHabitTxt: {
            color: lightColors.font,
            fontSize: _vw(4),
        },
        btnContainer:{
            display: 'flex',
            flexDirection: 'row',
            gap: _vw(2),
            justifyContent: 'center',
        },
        btnCancelTxt: {
            color: colors.font,
            fontSize: _vw(4),
        },
        btnCancel: {
            backgroundColor: colors.danger,
            color: darkColors.font,
            padding: _vw(4),
            borderRadius: _vw(3),
            marginTop: _vw(5),
            width: 'auto',
            alignSelf: 'center',
        }
    })
    const values = useRef<{task_name: string, t_min: number,t_max:number}>({task_name: "", t_min:3*60*1000,t_max: 5*60*1000})
    const [minTaskTime, setMinTaskTime] = useState(3)
    const [maxTaskTime, setMaxTaskTime] = useState(60)
    enum EPropertyToChange {
        TASK_NAME="TASK_NAME",
        T_MIN="TIME_MIN",
        T_MAX="TIME_MAX",
    }
    function updateTxt(value: string | number, change: string)
    {
        console.log(value)
        if(change === EPropertyToChange.TASK_NAME) values.current = {...values.current, task_name: value.toString()}
        if(change === EPropertyToChange.T_MIN) {
            values.current = {...values.current, t_min: value as number * 60 * 1000}
            setMinTaskTime(value as number);
            if(value as number > maxTaskTime) {
                setMaxTaskTime(value as number);
                values.current = {...values.current, t_max: value as number * 60 * 1000}
            }
        }
        if(change === EPropertyToChange.T_MAX) {
            values.current = {...values.current, t_max: value as number * 60 * 1000}
            setMaxTaskTime(value as number);
            
        }
    }
    function onPressPressable()
    {
        if(values.current.task_name === "") {
            Alert.alert(
                "✨ Habit Name Required",  // More engaging title with emoji
                `To create your new habit, we need a name first! \nTip: Make it specific like "Morning Yoga" instead of just "Exercise"`,  // Using template literals for cleaner formatting
                [
                  { 
                    text: "Got It!"
                  }]
                );
            return
        }
        if(values.current.t_min > values.current.t_max) return
        const id = NativeTodayTasksHandler.createTaskType(values.current.task_name, ETaskType.TIME, -1,values.current.t_min, values.current.t_max);
        console.log("id", id);
        setRenderHabitCreator(false);
    
    }
    function onPressCancel()
    {
        setRenderHabitCreator(false);
    }
    enum CardButtonType {
        BEGINNER = "BEGINNER",
        INTERMEDIATE = "INTERMEDIATE",
        ADVANCED = "ADVANCED",
        CUSTOM = "CUSTOM",
    }
    
    const buttons = [
        { id: CardButtonType.BEGINNER, name: "3 minutes", emoji: "🌱" },
        { id: CardButtonType.INTERMEDIATE, name: "15 minutes", emoji: "🌿" },
        { id: CardButtonType.ADVANCED, name: "30 minutes", emoji: "🌳" },
        { id: CardButtonType.CUSTOM, name: "Custom", emoji: "🛠️" },
    ];
    const [selectedButton, setSelectedButton] = useState("beginner");
    return <View style={style.container}>
        <ScrollView>
            <View>
                <Text style={style.title}>Habit Creator</Text>
                <MyInput propertyToChange={EPropertyToChange.TASK_NAME as string} action={updateTxt} txtTitle={"Habit name"} initialText={""}></MyInput>
                <Text style={style.habitLevel}>I want to start with {minTaskTime} minutes {"\n"} (if the habit is new please start small)</Text>
                <MyCards buttons={buttons} onSelect={function (id: string): void {
                    setSelectedButton(id);
                    if(id === CardButtonType.BEGINNER) {
                        updateTxt(3, EPropertyToChange.T_MIN);
                        updateTxt(60, EPropertyToChange.T_MAX);
                    }
                    if(id === CardButtonType.INTERMEDIATE) {
                        updateTxt(15, EPropertyToChange.T_MIN);
                        updateTxt(60, EPropertyToChange.T_MAX);
                    }
                    if(id === CardButtonType.ADVANCED) {
                        updateTxt(30, EPropertyToChange.T_MIN);
                        updateTxt(60, EPropertyToChange.T_MAX);
                    }
                    
                } }></MyCards>
                { selectedButton == CardButtonType.CUSTOM && <MySlider min={3} max={60} propertyToChange={EPropertyToChange.T_MIN} action={updateTxt} txtTitle="min task time" initialValue={minTaskTime}></MySlider>}
                <Text style={style.habitLevel}>My  goal is to do this habit for {maxTaskTime} minutes every day </Text>
                <MySlider min={minTaskTime} max={60} propertyToChange={EPropertyToChange.T_MAX} action={updateTxt} txtTitle="max task time" initialValue={maxTaskTime}></MySlider>
            </View>
            <View style={style.btnContainer}>
            
                <Pressable style={style.btnCreateHabit} onPress={onPressPressable}>
                    <Text style={style.btnCreateHabitTxt}>Create new Habit</Text>
                </Pressable>
                <Pressable style={style.btnCancel} onPress={onPressCancel}>
                    <Text style={style.btnCancelTxt}>Cancel</Text>
                </Pressable>
            </View>
        </ScrollView>
        { canShowAds && resquestOption!= null && <BannerAd unitId={__DEV__ ? TestIds.BANNER :"ca-app-pub-5187514759339848/9400096840"} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={resquestOption}></BannerAd>}
    </View>
}