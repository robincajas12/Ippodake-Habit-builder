import { View, Text } from "react-native";
import colors from "../../Components/Styles/colors";
import { useState, useEffect } from "react";
import _vw from "../../../utils/sizeConversors";

export default function TimeCounter({ time, txtColor}: { time: Date, txtColor:string | null}) {
  return (
    <View style={{}}>
      <Text style={{ fontFamily: 'Roboto-Bold',color: txtColor == null ? colors.font : txtColor, fontSize: _vw(10)}}>
        {time.toTimeString().split(" ")[0]} {/* Muestra solo HH:MM:SS */}
      </Text>
    </View>
  );
}
