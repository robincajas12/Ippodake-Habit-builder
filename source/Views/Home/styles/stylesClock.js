import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import colors from "../../Components/Styles/colors";
import _vw from "../../../utils/sizeConversors";

const stylesClock = StyleSheet.create({
    view:{
        padding:Dimensions.get('screen').width*0.1
    },
    container: {
        padding:0,
        backgroundColor: colors.clock,
        width: _vw(20),
        height: _vw(20),
        borderRadius: _vw(5),
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        justifyContent:'center',
        borderColor: colors.clock_border,
        overflow:'hidden'
    },
    btn:{
        fontSize: _vw(10),
        margin:0
    }
});
export default stylesClock;