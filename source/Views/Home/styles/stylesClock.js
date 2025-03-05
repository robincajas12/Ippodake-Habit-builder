import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import colors from "../../Components/Styles/colors";
import _vw from "../../../utils/sizeConversors";

const stylesClock = StyleSheet.create({
    view:{
        padding: _vw(5),
    },
    container: {
        padding:0,
        width: _vw(20),
        height: _vw(20),
        borderRadius: _vw(0),
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
    },
    btn:{
        fontSize: _vw(15),
         fontFamily: 'Roboto-Regular',
        margin:0
    }
});
export default stylesClock;