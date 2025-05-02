import { StyleSheet, useWindowDimensions } from "react-native";
import { Dimensions } from "react-native";
import colors from "./colors";

function  stylesMainContainer() {
    const { width, height } = useWindowDimensions();
    const stylesMainContainer = StyleSheet.create({
        view: {
            display:'flex',
            flex: 1,
            flexDirection: width > height ? 'row':'column',
            backgroundColor: colors.primaryColor_darker
        }
    })
    return stylesMainContainer;
}
export default stylesMainContainer = stylesMainContainer;