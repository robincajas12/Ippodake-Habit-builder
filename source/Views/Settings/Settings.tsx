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
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Chat from '../Chat/Chat';
import stylesMainContentView from '../Components/Styles/stylesMainContentView';
import NativeLevelHandler from '../../../specs/NativeLevelHandler';
import { ELocalStorageKeys } from '../../Enums/LocalStorageKeys';
import colors from '../Components/Styles/colors';
import _vw from '../../utils/sizeConversors';

export default function Todo() {
  type languageType = { key: string; txt: string };
  const languages: languageType[] = [
    { key: "en", txt: "English" },
    { key: "es", txt: "Español" }
  ];

  // Traducciones
  const translations: { [key in languageType['key']]: { selectedLanguage: string, alertCloseApp: string } } = {
    en: {
      selectedLanguage: "Selected language:",
      alertCloseApp: "To apply changes for some settings please restart the app"
    },
    es: {
      selectedLanguage: "Idioma seleccionado:",
      alertCloseApp: "Para aplicar los cambios para algunas configuraciones reinicie la app"
    }
  };

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
      <View key={item.key} style={styles.languageButtonContainer}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.languageButton,
            pressed && styles.pressedLanguageButton,
          ]}
        >
          <Text style={styles.buttonText}>{item.txt}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={stylesMainContentView().view}>
      <View style={styles.containerSettings}>
        <Text style={styles.selectedLanguageText}>
          {translations[language.key].selectedLanguage} {language.txt}
        </Text>
        
        {languages.map(renderLanguageBtn)}
      </View>
      <View>
        {/*<Text style={styles.alert}>{translations[language.key].alertCloseApp}</Text>*/}
      </View>
    </View>
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
      fontSize: _vw(6),
      marginBottom: 20,
      fontFamily: 'Roboto-Regular',
      color: colors.font,
  },
  languageButtonContainer: {
      marginVertical: 8,
  },
  languageButton: {
      backgroundColor: colors.primaryColor,
      paddingVertical: _vw(5),
      paddingHorizontal: _vw(0),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
  },
  pressedLanguageButton: {
      backgroundColor: colors.primaryColor_darker,
  },
  buttonText: {
      color: colors.font,
      fontSize: _vw(5),
      fontFamily: 'Roboto-Regular',
  },
});