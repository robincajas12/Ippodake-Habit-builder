import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../Styles/colors";
import { useRef, useState } from "react";

export default function MySlider(props: PropsForSlider)
{
    const [value, setValue] = useState<number>(props.initialValue);
    useRef(props.initialValue); 
    const styles = StyleSheet.create({
        slider: {
            width: "100%",
            height: 40,
        },
        text: {
            color: colors.font,
            fontSize: 20,
        },
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
    });
    return <View style={styles.container}>
        <Text style={styles.text}>{props.txtTitle} : {value}</Text>
        <Slider
            style={styles.slider}
            value={value}
            minimumValue={props.min}
            maximumValue={props.max}
            minimumTrackTintColor={colors.white_blue}
            maximumTrackTintColor={colors.font}
            thumbTintColor={colors.white_blue}
            step={1}
            onValueChange={(value) => {
                setValue(value);
                props.action(value, props.propertyToChange);
            }}
        />
    </View>
}