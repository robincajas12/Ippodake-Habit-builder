import { Pressable, Text, View } from "react-native";
import stylesFooter from "./Styles/stylesFooter";
import listView from "./listViews";
export default function Footer({setMain})
{
    function touchEnd(viewToShow)
    {
        setMain(viewToShow)
    }
    return <View style={stylesFooter.Container}>
        <Pressable style={stylesFooter.btn} onTouchEnd={()=>touchEnd('Home')}>
            <Text style={stylesFooter.text}>Home</Text>
        </Pressable>
        <Pressable style={stylesFooter.btn} onTouchEnd={()=>touchEnd('History')}>
            <Text style={stylesFooter.text}>History</Text>
        </Pressable>
        <Pressable style={stylesFooter.btn} onTouchEnd={()=>touchEnd('Todo')}>
            <Text style={stylesFooter.text}>Todo</Text>
        </Pressable>
    </View>
}