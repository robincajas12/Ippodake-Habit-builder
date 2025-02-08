import { StyleSheet } from "react-native";
import colors from "./colors";

const stylesFooter = StyleSheet.create({
    Container:{
        padding: 0,
        backgroundColor: colors.primaryColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        flex: 1
    },
    btn:{
    },
    text:{
        color: colors.font,
        display:'flex',
        alignSelf:'center',
        padding: 10
    }

});
export default stylesFooter;