import { StyleSheet, useWindowDimensions } from "react-native";
import { Dimensions } from "react-native";
import colors from "./colors";

function  stylesMainContainer() {
    const {height, width} = useWindowDimensions()
    const stylesMainContainer = StyleSheet.create({
        view: {
            display:'flex',
            flex: 1,
            flexDirection: width < height ? 'column' : 'row-reverse',
            backgroundColor: colors.primaryColor_darker
        }
    })
    return stylesMainContainer;
}
export default stylesMainContainer = stylesMainContainer;