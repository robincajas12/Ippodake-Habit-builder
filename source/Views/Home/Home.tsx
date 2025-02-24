import { View } from "react-native"
import Clock from "./Components/Clock"
import TimeCounter from "./Components/TimeCounter"
import { useEffect, useState } from "react"
import getTimeDifference from "../../utils/timeDiference"
import Form from "../Components/General/Components/Form"
export default function Home()
{
    
    return(<View  style={{flex: 8, display:'flex',  alignContent:'center'}}>
        <Clock></Clock>
        <TimeCounter time={new Date()}></TimeCounter>
    </View>)
}