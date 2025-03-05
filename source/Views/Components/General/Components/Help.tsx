import { Pressable, ScrollView, Text, View } from "react-native";
import stylesHelp from "../../Styles/stylesHelp";

export default function Help({setIsHelpCardVisible} : {setIsHelpCardVisible : (t:boolean)=> void})
{
    return <View style={stylesHelp.containerHelpCard}>
            <Pressable style={stylesHelp.pressableHelpCard} onPressIn={()=>{setIsHelpCardVisible(false)}}>
                <Text style={stylesHelp.closeHelpCardIcon}>X</Text>
            </Pressable>
            <Text>Hellow world</Text>
        </View>
}