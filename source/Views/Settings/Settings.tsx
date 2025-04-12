/*import { ScrollView, Text, View, FlatList, Pressable, ListRenderItem } from "react-native";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import { useState } from "react";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import Li from "./Components/Li";
import TaskType from "../../Models/TaskType";
export default function Todo()
{
    const [today, SetToday ] = useState(new Date(Number(NativeTodayTasksHandler.getToday())))
    
    return <View style={stylesMainContentView.view}>
        <Text style = {{color: 'white'}}>{today.toString()} tasks</Text>
    </View>
}*/
import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Linking, ScrollView, useWindowDimensions } from 'react-native';
import Chat from '../Chat/Chat';
import stylesMainContentView from '../Components/Styles/stylesMainContentView';
import NativeLevelHandler from '../../../specs/NativeLevelHandler';
import { ELocalStorageKeys } from '../../Enums/LocalStorageKeys';
import colors, { lightColors } from '../Components/Styles/colors';
import _vw from '../../utils/sizeConversors';
import ChangeValue from '../Components/General/Components/InputComponents/ChangeValue';
import { UserKeys } from '../../Enums/UserKeys';
import SelectTaskType from '../Menu/Components/SeletecTaskType';

export default function Todo() {
  type languageType = { key: string; txt: string };
  const languages: languageType[] = [
    { key: "en", txt: "English" },
    { key: "es", txt: "Español" }
  ];

  // Traducciones
  const translations: { [key in languageType['key']]: { selectedLanguage: string, alertCloseApp: string, termsAndConditions: string,txtChangeGoalName: string} } = {
    en: {
      selectedLanguage: "Selected language:",
      alertCloseApp: "To apply changes for some settings please restart the app",
      termsAndConditions: "Privacy Policy",
      txtChangeGoalName: "Task name"
    },
    es: {
      selectedLanguage: "Idioma seleccionado:",
      alertCloseApp: "Para aplicar los cambios para algunas configuraciones reinicie la app",
      termsAndConditions: "Política de Privacidad",
      txtChangeGoalName: "Nombre de la tarea"
    }
  };
  const {width, height} = useWindowDimensions()
  const [language, setLanguage] = useState<languageType>(() => {
    const savedLang = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE);
    return savedLang === "en" 
      ? { txt: "English", key: "en" }
      : { txt: "Español", key: "es" };
  });

  const [showRestartMessage, setShowRestartMessage] = useState(false);

  function renderLanguageBtn(item: languageType) {
    function onPress() {
      if (item.key !== language.key) {
        setShowRestartMessage(true);
      }
      setLanguage(item);
      NativeLevelHandler.setItem(ELocalStorageKeys.LANGUAGE, item.key);
    }

    return (
      <View key={item.key} style={[styles.languageButtonContainer]}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.languageButton ,
            (item.key !== NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE)) && styles.seletedLanguageButtonContainer,
            pressed && styles.pressedLanguageButton,
          ]}
        >
          <Text style={styles.buttonText}>{item.txt}</Text>
        </Pressable>
      </View>
    );
  }

  // Función para abrir los términos y condiciones según el idioma seleccionado
  function openTermsAndConditions() {
    const url = language.key === 'es' 
      ? 'https://docs.google.com/document/d/114eM_28kwrktbekl1SMcQzCobED94naItnq3e4KYSas/edit?usp=sharing'  // URL en español
      : 'https://docs.google.com/document/d/1hJTeyrA5ueHHC9GMn1au2ecGsoIlbba6shuV1wcoffc/edit?usp=sharing';  // URL en inglés

    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  }

  return (
    <ScrollView>
      <View style={stylesMainContentView().view}>
        <View style={styles.containerSettings}>
        <ChangeValue action={(value : string) => NativeLevelHandler.setItem(UserKeys.GOAL_NAME, value)} initialText={NativeLevelHandler.getItem(UserKeys.GOAL_NAME)} txtTitle={translations[language.key].txtChangeGoalName}></ChangeValue>
          <Text style={styles.selectedLanguageText}>
            {translations[language.key].selectedLanguage} {language.txt}
          </Text>
          
          <View style={styles.containerBtnLangs}>
          {languages.map(renderLanguageBtn)}
          </View>

          {/* Botón de Términos y Condiciones */}
          <Pressable onPress={openTermsAndConditions} style={styles.termsButton}>
            <Text style={styles.buttonTextS}>{translations[language.key].termsAndConditions}</Text>
          </Pressable>

          <SelectTaskType idTaskType={0} setIdTaskType={function (idTaskType: number): void {
            throw new Error('Function not implemented.');
          } } ></SelectTaskType>
        </View>
    </View>
    </ScrollView>
  );
}



// Estilos
const styles = StyleSheet.create({
  alert:{
    fontSize: _vw(5),
    color: colors.font,
    maxWidth: _vw(95)
  },
  restartMessage: {
    color: colors.danger,
    marginTop: 20,
    fontSize: _vw(5),
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  containerSettings: {
    padding: _vw(5),
    maxWidth: _vw(95),
    minWidth: _vw(95)
  },
  selectedLanguageText: {
      fontSize: _vw(4),
      paddingTop: _vw(5),
      marginBottom: 20,
      fontFamily: 'Roboto-Regular',
      color: colors.font,
  },
  containerBtnLangs:{
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  languageButtonContainer: {
      marginVertical: 0,
  },
  seletedLanguageButtonContainer:{
    backgroundColor: colors.primaryColor
  },
  languageButton: {
      backgroundColor: colors.white_blue,
      padding: _vw(3),
      flex:1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      
  },
  pressedLanguageButton: {
      backgroundColor: colors.primaryColor_darker,
  },
  buttonText: {
      color: lightColors.font,
      fontSize: _vw(5),
      fontFamily: 'Roboto-Regular',
  },
  buttonTextS: {
    color: colors.white_blue,
    fontSize: _vw(5),
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
},
  termsButton: {
    marginTop: _vw(20),
    padding: _vw(10),
    backgroundColor: colors.primaryColor_darker,
    borderRadius: _vw(5),
    
  },
});