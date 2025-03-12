import { StyleSheet, useWindowDimensions } from "react-native";
import colors from "./colors";
import _vw from "../../../utils/sizeConversors";
function stylesFooter()
{
    const {width,  height} = useWindowDimensions();
    const stylesFooter1 = StyleSheet.create({
    Container:{
        paddingTop: _vw(1),
        backgroundColor: colors.primaryColor,
        display: 'flex',
        flexDirection:  width < height ? 'row' : 'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderTopLeftRadius: width < height ? _vw(5) : 0,
        borderTopRightRadius: width < height ? _vw(5) : 0,
        marginTop: width < height ? _vw(1) : 0,
        possition: 'absolute',
        minHeight: _vw(30),  
    },
    btn:{
        width: width < height ? _vw(25) : _vw(36)
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
return stylesFooter1;
}

export default stylesFooter;