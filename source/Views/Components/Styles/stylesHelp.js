import { StyleSheet } from "react-native";
import _vw, { _vh } from "../../../utils/sizeConversors";
import colors from "./colors";

const stylesHelp = StyleSheet.create({
    containerHelpCard:{
        position: 'absolute',
        fontSize: _vw(15),
        top: _vw(0),
        left: 0,
        width: _vw(100),
        zIndex: 999,
        backgroundColor: 'red',
        minHeight: _vh(70)
    },
    pressableHelpCard:{
        borderWidth: _vw(0.5),
        borderColor: colors.font,
        transform: [{translateX: "850%"}, { translateY: "20%"}, {scale: _vw(0.2)}],
        borderRadius: _vw(50),
        width: _vw(10),
        height: _vw(10),
        boxShadow: _vw(0)+" "+_vw(0)+" " + _vw(10) + " " + colors.clock+"22"
    },
    closeHelpCardIcon:{
        fontSize: _vw(7),
        color: colors.font,
        fontFamily: 'Roboto-Bold',
        top: "-3%",
        textAlign: 'center'
    },
    
})
export default stylesHelp