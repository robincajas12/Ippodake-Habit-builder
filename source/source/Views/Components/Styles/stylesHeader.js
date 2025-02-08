import { StyleSheet } from "react-native"
import colors from "./colors";

const stylesHeader = StyleSheet.create({
    viewHeader: 
    {
      backgroundColor:colors.primaryColor,
      borderBottomStartRadius: 15,
      borderBottomEndRadius: 15,
      display: "flex",
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between",
      flex: 1,
      alignSelf:"stretch",
    },
    textHeader : 
    {
      color: colors.font,
      fontSize: 20,
      padding: 25
    }
});
export default stylesHeader;