import { StyleSheet, useWindowDimensions } from "react-native"
import colors from "./colors";
import _vw, { _vh } from "../../../utils/sizeConversors";

function stylesHeader()
{
  const {width, height} = useWindowDimensions();
const stylesHeader1 = StyleSheet.create({
  viewHeader: 
  {
    backgroundColor: colors.primaryColor,
    borderBottomStartRadius: width < height ? 15 : 0,
    borderBottomEndRadius:  width < height ? 15 : 0,
    display: "flex",
    flexDirection: width < height ? 'row' : 'column',
    alignItems: width < height ? "center" : "flex-start",
    justifyContent: "space-between", // Centra los elementos horizontalmente
    paddingHorizontal: width < height ? _vw(6): 20, // Evita que el texto se pegue a los bordes
    height: 'auto',
    paddingVertical: width < height ? _vh(2.5) : _vw(5),

  },
  textHeader : 
  {
    paddingVertical: width < height ? 0 : _vw(5),
    color: colors.font,
    fontSize: width < height ? _vw(8) : _vw(6),
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
  },
  helpText:{
    fontSize: _vw(7),
    color: colors.font,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  }
});
return stylesHeader1;
}


export default stylesHeader;