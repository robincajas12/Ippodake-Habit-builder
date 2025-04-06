import { useState, useEffect } from "react";
import { useWindowDimensions, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import NativeLevelHandler from "../../../../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../../../../Enums/LocalStorageKeys";
import _vw from "../../../../../utils/sizeConversors";
import colors, { lightColors } from "../../../Styles/colors";

export default function MyInput({action, txtTitle, initialText, propertyToChange} : {action:(txt:string, propertyToChange: string)=> void, txtTitle: string, initialText: string,propertyToChange: string})
{
    const lang = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE)  
    const [color, setColor] = useState(colors.white_blue);
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
            borderColor:color,
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
            backgroundColor:color,
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
            backgroundColor: color,
            top: _vw(-3),
            left: _vw(1),
            fontSize: _vw(3),
            color: lightColors.font,
            fontFamily: 'Roboto-Regular',
            padding: _vw(1),
            borderRadius: _vw(3),
            zIndex: 1
        },
        containerInput:{
            padding: _vw(4),
        }
    })
    const [value, setValue] =  useState(initialText)
    useEffect(()=>{
        setValue(initialText)
    }, [initialText])
    function onChange(txt : string)
    {
        console.log(txt)
        setValue(txt)
        action(txt, propertyToChange)
    }
    

     return  <View style={styles.containerInput}>
        <View style={styles.container}>
        <Text style={styles.title}>{txtTitle}</Text>
        <TextInput onChangeText={onChange} style={styles.textInput} value={value}></TextInput>
    </View>
     </View>
}
