/*import { View } from "react-native"
import Clock from "./Components/Clock"
import TimeCounter from "./Components/TimeCounter"
export default function Home()
{
    
    
    return(<View  style={{flex: 8, display:'flex',  alignContent:'center'}}>
        <Clock></Clock>
        <TimeCounter time={new Date()}></TimeCounter>
    </View>)
}*/

import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import TimeCounter from "./Components/TimeCounter";
import Clock from "./Components/Clock";


export default function Home() {
  const [clockStarted, setClockStarted] = useState(false);
  const [time, setTime] = useState(()=>  {
      const time = new Date();
      time.setHours(0);
      time.setMinutes(0);
      time.setSeconds(0);
      return time;
  });

  return (
    <View style={{ flex: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Clock setClockStarted={setClockStarted} setTime={setTime} />
      <TimeCounter time={time} />
    </View>
  );
}
