
import colors from "../../Components/Styles/colors";
import _vw, { _vh } from "../../../utils/sizeConversors";
import { StyleSheet } from "react-native";
const stylesCreateTask = StyleSheet.create({
    pressable:{
        width: _vw(60),
        height:_vw(20),
        backgroundColor: colors.primaryColor,
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        textAlign:'center',
        borderRadius: _vw(3),
        borderColor: colors.white_blue,
        borderWidth: _vw(0.1)
    },
    pressableText:{
        fontSize: _vw(5),
        color: colors.font
    },
    container: {
        backgroundColor: colors.primaryColor_darker,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    textH1:{
        fontSize:_vw(5),
        paddingVertical: _vw(5),
        color: colors.font
    }
});
export default stylesCreateTask