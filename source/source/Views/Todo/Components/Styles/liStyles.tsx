import { Dimensions, StyleSheet } from "react-native"
import _vw from "../../../../utils/sizeConversors"
import colors from "../../../Components/Styles/colors"
const liStyles = StyleSheet.create({
    liView : {
        marginTop: _vw(3),
        paddingBlock: _vw(10),
        width: _vw(90),
        height: _vw(10),
        padding: _vw(5),
        display : 'flex',
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: _vw(3),
        borderRadius: _vw(5),
        backgroundColor: colors.clock + "33", //opacity

    },
    liPressable : {
        width: _vw(6),
        height: _vw(6),
        display : 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        gap: _vw(5)
    },
    liImage: {
        width: _vw(5),
        height: _vw(5)
    },
    liText:{
        color: '#fff',
        width: _vw(80),
        height: _vw(5)
    }
})
export default liStyles