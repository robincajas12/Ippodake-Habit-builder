import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import colors from "../../Components/Styles/colors";
import _vw from "../../../utils/sizeConversors";

const stylesHome = StyleSheet.create({
    container : {
        marginBottom: _vw(5),
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: _vw(90),
        height: _vw(35),
        backgroundColor: colors.primaryColor,
        borderRadius: _vw(5),
        paddingHorizontal: _vw(1),
        paddingVertical: _vw(0)
    }
})
export default stylesHome