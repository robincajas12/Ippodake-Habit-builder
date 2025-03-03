import { StyleSheet } from "react-native";
import colors from "./colors";
import _vw from "../../../utils/sizeConversors";

const stylesFooter = StyleSheet.create({
    Container:{
        padding: 0,
        backgroundColor: colors.primaryColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        flex: 1,
        borderTopLeftRadius: _vw(5),
        borderTopRightRadius: _vw(5),
        borderRadius: _vw(4),
        margin: _vw(5),
        marginTop:_vw(1),
        possition: 'absolute',
        
    },
    btn:{
    },
    text:{
        color: colors.font,
        display:'flex',
        alignSelf:'center',
        padding: 10,
        fontFamily: 'Roboto-Regular'
        
    }

});
export default stylesFooter;