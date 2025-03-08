
import colors from "../../Components/Styles/colors";
import _vw, { _vh } from "../../../utils/sizeConversors";
import { StyleSheet } from "react-native";
const stylesCreateTask = StyleSheet.create({
    pressable:{
        padding: _vw(5),
        backgroundColor: colors.primaryColor,
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        textAlign:'center',
        borderRadius: _vw(3),
        //borderWidth: _vw(0.1),
        boxShadow: _vw(1)+" "+_vw(1)+" " + _vw(5) + " " + colors.clock+"22",
    }
    ,
    pressableText:{
        fontSize: _vw(5),
        color: colors.font,
        fontFamily: 'Roboto-Regular'
    },
    container: {
        backgroundColor: colors.primaryColor_darker,
        display:'flex',
        justifyContent:"flex-start",
        alignItems:'center',
        flex:1
    },
    textH1:{
        fontSize:_vw(7),
        paddingVertical: _vw(7),
        color: colors.font,
        fontFamily: 'Roboto-Regular',

    },
    containerBtn:{
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: _vw(5),
        padding: 0,
        paddingHorizontal: _vw(3),
        margin: 0,
        flexDirection: 'row',
        
    },
    boostBtnStartsRequired:{
        fontSize: _vw(3),
        textAlign: 'right',
        fontFamily: 'Roboto-Bold',
        color: colors.font
    },
    boostBtnContainer: {
        backgroundColor: colors.primaryColor,
        borderRadius: _vw(5),
        paddingHorizontal: _vw(4),
        padding: _vw(3),
        gap: _vw(2),
        height: 'auto'
    },
    boostBtnContainerSelected: {
        boxShadow: _vw(1)+" "+_vw(1)+" " + _vw(5) + " " + colors.clock+"55",
        transform: [{scale: _vw(0.30)}]
    },
    boostBtnEmoji:{
        fontSize: _vw(15)
    },
    boostBtnEmojiSelected:{
        //fontSize: _vw(20)
    },
    boostBtnTxt:{
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.font,
        fontSize: _vw(4),
    },
    boostBtnTxtSelected: {
        fontFamily: 'Roboto-Bold'
    },
    containerBtnNotAvailable:{

    },
    boostBtnEmojiUnAvailable:{
        filter: 'blur(10)'
    },
    boostBtnTxtUnAvailable:{
        filter: 'blur(10)'
    },
    boostLockNotAvailable:{
        position: 'absolute',
        fontSize: _vw(15),
        top: "25%",
        left: "25%",
        opacity: 0.8

    },
    containerCreateTask:{
        display: 'flex',
        flexDirection: 'row'
    },
    boostBtnScrollView:{
        paddingVertical: _vw(5),
        display: 'flex',
        flexGrow: 0,
        flexDirection: 'row',
    },
    containerPressableAndIceBtn:{
        display: 'flex',
        flexDirection: 'row'
    },
    iceIcon: {
        fontSize: _vw(9),
        textAlign: 'center'
    },
    iceTxt: {
        fontSize: _vw(3), 
        fontFamily: 'Roboto-Regular',
        color: colors.font,
    },
    iceTxtSelected  : {
        fontFamily: 'Roboto-Bold',
        color: "rgb(1, 161, 224)"
    },
    iceBtn:{
        width: _vw(15),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        boxShadow: _vw(1)+" "+_vw(1)+" " + _vw(5) + " " + colors.clock+"22",
        borderRadius: _vw(2),
        marginRight:  _vw(5),
        width: _vw(20),
        height: _vw(20),
        //borderWidth: _vw(0.1),

    },
    iceBtnSelected: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryColor_darker,
        boxShadow: _vw(1)+" "+_vw(1)+" " + _vw(5) + " " + colors.clock+"66",
        borderRadius: _vw(2),
        marginRight:  _vw(5),
        width: _vw(20),
        height: _vw(20),
        opacity: 0.5
    }
});
export default stylesCreateTask