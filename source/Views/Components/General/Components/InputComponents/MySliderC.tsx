import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";
import colors, { lightColors } from "../../../Styles/colors";
import { useEffect, useRef, useState } from "react";
import _vw from "../../../../../utils/sizeConversors";
import { trunc } from "../../../../../utils/mathForDummies";


export default function MySliderC({
    action,
    txtTitle,
    initialValue,
    min,
    max,
    propertyToChange,
}: {
    action: (val: number, propertyToChange: string) => void,
    txtTitle: string,
    initialValue: number,
    min: number,
    max: number,
    propertyToChange: string
}) {
    const value = useRef(initialValue)

    useEffect(() => {
        value.current = initialValue;
    }, [initialValue]);

    const styles = StyleSheet.create({
        containerInput: {
            padding: _vw(4),
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 'auto',
        },
        title: {
            position: 'absolute',
            backgroundColor: colors.white_blue,
            top: _vw(-3),
            left: _vw(1),
            fontSize: _vw(3),
            color: lightColors.font,
            fontFamily: 'Roboto-Regular',
            padding: _vw(1),
            borderRadius: _vw(3),
            zIndex: 1,
        },
        sliderContainer: {
            flex: 10,
            justifyContent: 'center',
            backgroundColor: colors.primaryColor,
            borderColor: colors.white_blue,
            borderWidth: _vw(0.3),
            borderRadius: _vw(3),
            paddingHorizontal: _vw(2),
            height: _vw(15),
        },
        valueText: {
            flex: 2,
            fontSize: _vw(5),
            color: colors.font,
            textAlign: 'center',
        },
        slider: {
            width: '100%',
            height: _vw(4),
        },
    });

    function onChange(val: number) {
        action(val, propertyToChange);
    }

    return (
        <View style={styles.containerInput}>
            <View style={styles.container}>
                <Text style={styles.title}>{txtTitle} : {trunc(value.current,1)}</Text>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        value={value.current}
                        minimumValue={min}
                        maximumValue={max}
                        minimumTrackTintColor={colors.white_blue}
                        maximumTrackTintColor={colors.font}
                        thumbTintColor={colors.white_blue}
                        step={0.1}
                        onValueChange={(v)=> {
                            value.current =v;
                            action(v, propertyToChange)
                        }}

                    />
                </View>
            </View>
        </View>
    );
}
