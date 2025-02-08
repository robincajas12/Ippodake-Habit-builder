import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import colors from "../../Components/Styles/colors";

const stylesClock = StyleSheet.create({
    view:{
        padding:Dimensions.get('screen').width*0.1
    },
    container: {
        padding:0,
        backgroundColor: colors.clock,
        width: Dimensions.get('screen').width - Dimensions.get('screen').width*0.2,
        height: Dimensions.get('screen').width - Dimensions.get('screen').width*0.2,
        borderRadius: Dimensions.get('screen').width - Dimensions.get('screen').width/PixelRatio.get(),
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 15,
        borderColor: colors.clock_border,
        overflow:'hidden'
    },
    btn:{
        color: colors.font,
        textAlign:'center',
        display:'flex',
        fontSize: 1 * (Dimensions.get('screen').width - Dimensions.get('screen').width * 0.2),
        position:'absolute',
        top:(Dimensions.get('screen').width - Dimensions.get('screen').width * 1.2),
        alignSelf:'center'
    }
});
export default stylesClock;