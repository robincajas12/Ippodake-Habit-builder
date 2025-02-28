import { View, Text } from "react-native";
import colors from "../../Components/Styles/colors";
import { useState, useEffect } from "react";
import _vw from "../../../utils/sizeConversors";

export default function TimeCounter({ time}: { time: Date}) {
  return (
    <View style={{}}>
      <Text style={{color: colors.font, fontSize: _vw(10), padding: _vw(10)}}>
        {time.toTimeString().split(" ")[0]} {/* Muestra solo HH:MM:SS */}
      </Text>
    </View>
  );
}
