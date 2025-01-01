import { Dimensions, StyleSheet } from "react-native"
import _vw from "../../../../utils/sizeConversors"
import colors from "../../../Components/Styles/colors"
const liStyles = StyleSheet.create({
    liView : {
        backgroundColor: colors.primaryColor_darker,
        width: _vw(90),
        height: _vw(10),
        padding: _vw(5),
        display : 'flex',
        flexDirection: 'row'
    },
    liPressable : {
        width: _vw(5),
        height: _vw(5)
    },
    liText:{
        fontSize: _vw(4),
        color: colors.font
    }
})
export default liStyles