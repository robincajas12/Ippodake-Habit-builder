import { StyleSheet } from "react-native";
import colors from "./colors";
import _vw from "../../../utils/sizeConversors";

const stylesFooter = StyleSheet.create({
    Container:{
        paddingTop: _vw(1),
        backgroundColor: colors.primaryColor,
        display: 'flex',
        height: _vw(30),
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderTopLeftRadius: _vw(5),
        borderTopRightRadius: _vw(5),
        marginTop:_vw(1),
        possition: 'absolute',
        
    },
    btn:{
        width: _vw(25)
    },
    btnSelected:{
        backgroundColor: colors.white_blue+"33", 
        borderRadius: _vw(5),
        
    },
    selectedText:{
        fontFamily: 'Roboto-Bold'
    },
    text:{
        color: colors.font,
        fontSize: _vw(4),
        lineHeight: _vw(5),
        width: _vw(25),
        textAlign: 'center',
        display:'flex',
        alignSelf:'center',
        padding: 10,
        fontFamily: 'Roboto-Regular'
        
    }

});
export default stylesFooter;