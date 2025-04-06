import { useContext, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, useWindowDimensions, Button, Pressable, Text} from "react-native"; 
import { Context } from "../../../../../ContextComponent";
import NativeLevelHandler from "../../../../../../specs/NativeLevelHandler";
import { UserKeys } from "../../../../../Enums/UserKeys";
import _vw from "../../../../../utils/sizeConversors";
import { languages } from "../../../../../Models/Language";
import { ELocalStorageKeys } from "../../../../../Enums/LocalStorageKeys";
import colors, { lightColors } from "../../../Styles/colors";
export default function ChangeValue({action, txtTitle, initialText})
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
        }
    })
    const [value, setValue] =  useState(initialText)
    useEffect(()=>{
        setValue(initialText)
    }, [initialText])
    function onChange(txt)
    {
        console.log(txt)
        setValue(txt)
    }
    
    function onCallOptionFunction()
    {
        console.log(value)
        try{
            action(value)
            setColor(colors.nonDanger)
            setTimeout(()=>{setColor(colors.white_blue)},1000)
        }catch(e){
            setColor(colors.danger)
            setTimeout(()=>{setColor(colors.white_blue)},1000)
        }
       
         
         
    }
     return  <View style={styles.container}>
        <Text style={styles.title}>{txtTitle}</Text>
        <TextInput onSubmitEditing={onCallOptionFunction} onChangeText={onChange} style={styles.textInput} value={value}></TextInput>
        <Pressable onPress={onCallOptionFunction} style={styles.btn}>
            <Text style={styles.btnText}>✏️</Text>
        </Pressable>
    </View>
}
