import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import colors from "../../Components/Styles/colors";
import _vw from "../../../utils/sizeConversors";

const stylesHome = StyleSheet.create({
    mainContainer:{
        padding:_vw(5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: _vw(5),
    },
    cardValue:{
        fontSize: _vw(10),
        color: colors.font,
        textAlign: 'center',
        padding: _vw(2),
    },
    cardsContainer:{
        backgroundColor: colors.primaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _vw(6),
        padding: _vw(5),
    },
    container : {
        marginBottom: _vw(5),
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        paddingHorizontal: _vw(13),
    },
    cardTitle:{
        fontSize: _vw(4),
        color: colors.font,
        textAlign: 'center',
        padding: _vw(2),
    },
    txtHabit:{
        fontSize: _vw(5),
        color: colors.font,
        textAlign: 'center',
        fontFamily: 'Roboto-Italic',
        padding: _vw(2),
    },
    containerHabit:{
        paddingVertical: _vw(5),
    }
})
export default stylesHome