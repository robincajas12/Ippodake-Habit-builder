import { Animated, Pressable, Text, View } from "react-native";
import stylesFooter from "./Styles/stylesFooter";
import listView from "./listViews";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { useRef, useState } from "react";
export default function Footer({setMain})
{
    const [selected, setSelected] = useState("Home");
    const animatedValue = useRef(new Animated.Value(0)).current;
    function touchEnd(viewToShow)
    {
        setSelected(viewToShow)
        console.log(selected)
        setMain(viewToShow)
        
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    }
    
    return <View style={stylesFooter.Container}>
        <Pressable style={[stylesFooter.btn]} onTouchEnd={()=>touchEnd('Home')}>
            <Text style={[stylesFooter.text, selected === "Home" && stylesFooter.btnSelected]}>⏰</Text>
            <Text style={[stylesFooter.text,  selected === "Home" && stylesFooter.selectedText]}>Habit</Text>
        </Pressable>
        <Pressable style={[stylesFooter.btn]} onTouchEnd={()=>touchEnd('History')}>
            <Text style={[stylesFooter.text, selected === "History" && stylesFooter.btnSelected]}>📖</Text>
            <Text style={[stylesFooter.text,  selected === "History" && stylesFooter.selectedText]}>History</Text>
        </Pressable>
        <Pressable style={stylesFooter.btn} onTouchEnd={()=>touchEnd('Todo')}>
            <Text style={[stylesFooter.text, selected === "Todo" && stylesFooter.btnSelected]}>⚙️</Text>
            <Text style={[stylesFooter.text, selected === "Todo" && stylesFooter.selectedText]}>Settings</Text>
        </Pressable>
    </View>
}