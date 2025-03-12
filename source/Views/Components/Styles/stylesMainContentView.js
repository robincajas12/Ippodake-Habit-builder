import { Dimensions, StyleSheet } from "react-native";
import { _vh } from "../../../utils/sizeConversors";
function  stylesMainContentView() {
    const {height, width} = Dimensions.get('screen');
    const stylesMainContainer = StyleSheet.create({
        view:{
            flex: 8,
            display:'flex',
            justifyContent:"center", 
            alignItems:"center"},
    })
    return stylesMainContainer;
}
export default stylesMainContentView;