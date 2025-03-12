import { Animated, Pressable, Text, View } from "react-native";
import stylesFooter from "./Styles/stylesFooter";
import listView from "./listViews";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { useRef, useState } from "react";
export default function Footer({setMain})
{
    const styles = stylesFooter();
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
    
    return <View style={styles.Container}>
        <Pressable style={[styles.btn]} onTouchEnd={()=>touchEnd('Home')}>
            <Text style={[styles.text, selected === "Home" && styles.btnSelected]}>⏰</Text>
            <Text style={[styles.text,  selected === "Home" && styles.selectedText]}>Habit</Text>
        </Pressable>
        <Pressable style={[styles.btn]} onTouchEnd={()=>touchEnd('History')}>
            <Text style={[styles.text, selected === "History" && styles.btnSelected]}>📖</Text>
            <Text style={[styles.text,  selected === "History" && styles.selectedText]}>History</Text>
        </Pressable>
        <Pressable style={styles.btn} onTouchEnd={()=>touchEnd('Settings')}>
            <Text style={[styles.text, selected === "Settings" && styles.btnSelected]}>⚙️</Text>
            <Text style={[styles.text, selected === "Settings" && styles.selectedText]}>Settings</Text>
        </Pressable>
    </View>
}