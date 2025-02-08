import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import colors from "./colors";
const stylesMainContainer = StyleSheet.create({
    view: {
        display:'flex',
        flex: 1,
        flexDirection: 'column',
        height: Dimensions.get('screen').height,
        backgroundColor: colors.primaryColor_darker
    }
})
export default stylesMainContainer;