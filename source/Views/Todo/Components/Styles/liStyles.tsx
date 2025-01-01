import { Dimensions, StyleSheet } from "react-native"
import _vw from "../../../../utils/sizeConversors"
import colors from "../../../Components/Styles/colors"
const liStyles = StyleSheet.create({
    liView : {
        paddingBlock: 40,
        width: _vw(90),
        height: _vw(10),
        padding: _vw(5),
        display : 'flex',
        flexDirection: 'row'
    },
    liPressable : {
        width: _vw(5),
        height: _vw(5)
    },
    liText:{
        backgroundColor: "red",
        color: '#fff',
        width: _vw(85),
        height: _vw(5)
    }
})
export default liStyles