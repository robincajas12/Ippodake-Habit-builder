import { StyleSheet } from "react-native"
import colors from "./colors";
import _vw from "../../../utils/sizeConversors";

const stylesHeader = StyleSheet.create({
  viewHeader: 
  {
    backgroundColor: colors.primaryColor,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center", // Centra los elementos horizontalmente
    paddingHorizontal: 20, // Evita que el texto se pegue a los bordes
    height: 'auto',
    paddingVertical: _vw(5),
  },
  textHeader : 
  {
    color: colors.font,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    flexShrink: 1, // Evita que el texto se expanda demasiado
  },
  helpPressable:{
    borderWidth: _vw(0.5),
    borderColor: colors.font,
    borderRadius: _vw(50),
    width: _vw(10),
    height: _vw(10),
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    transform: [{translateX: _vw(40)}, {scale: _vw(0.15)}]
  },
  helpText:{
    fontSize: _vw(7),
    color: colors.font,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  }
});


export default stylesHeader;