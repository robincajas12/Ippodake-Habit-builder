import { View } from "react-native"
import Clock from "./Components/Clock"
import TimeCounter from "./Components/TimeCounter"
export default function Home()
{
    
    return(<View  style={{flex: 8, display:'flex',  alignContent:'center'}}>
        <Clock></Clock>
        <TimeCounter time={new Date()}></TimeCounter>
    </View>)
}