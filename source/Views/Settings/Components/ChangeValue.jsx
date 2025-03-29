import { useContext, useState } from "react";
import { View, TextInput, StyleSheet, useWindowDimensions, Button, Pressable, Text} from "react-native"; 
import { Context } from "../../../ContextComponent";
import NativeLevelHandler from "../../../../specs/NativeLevelHandler";
import { UserKeys } from "../../../Enums/UserKeys";
import _vw from "../../../utils/sizeConversors";
import { languages } from "../../../Models/Language";
import { ELocalStorageKeys } from "../../../Enums/LocalStorageKeys";
import colors, { lightColors } from "../../Components/Styles/colors";
export default function ChangeGoalName({action, txtTitle, initialText})
{
    const lang = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE)   
    const {width, height} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            display:'flex',
            flexDirection: 'row',
            width: 'auto',
        },
        textInput:{
            flex: 10,
            color: colors.font,
            height: _vw(15),
            borderColor:colors.white_blue,
            backgroundColor: colors.primaryColor,
            borderWidth:_vw(0.3),
            borderRadius: _vw(3),
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            
        },
        btn: {
            flex: 2,
            height: _vw(15),
            width: _vw(10),
            backgroundColor: colors.white_blue,
            borderRadius: _vw(3),
            display: 'flex',
            justifyContent:'center',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        },
        btnText:{
            fontSize: _vw(5),
            textAlign: 'center'
        },
        title: {
            position: 'absolute',
            backgroundColor: colors.white_blue,
            top: _vw(-3),
            left: _vw(1),
            fontSize: _vw(3),
            color: lightColors.font,
            fontFamily: 'Roboto-Regular',
            padding: _vw(1),
            borderRadius: _vw(3),
            zIndex: 1
        }
    })

    const [value, setValue] =  useState(initialText)
    function onChange(txt)
    {
        setValue(txt)
    }
     return  <View style={styles.container}>
        <Text style={styles.title}>{txtTitle}</Text>
        <TextInput onSubmitEditing={()=> action(value)} onChangeText={onChange} style={styles.textInput} value={value}></TextInput>
        <Pressable onPress={()=> action(value)} style={styles.btn}>
            <Text style={styles.btnText}>✏️</Text>
        </Pressable>
    </View>
}
