import { View, Text } from "react-native";
import colors from "../../Components/Styles/colors";
import { useState, useEffect } from "react";

export default function TimeCounter({ time, setTime }: any) {
  return (
    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center", color: colors.font, fontSize: 50 }}>
        {time.toTimeString().split(" ")[0]} {/* Muestra solo HH:MM:SS */}
      </Text>
    </View>
  );
}
