/*import { StatusBar, View,Text, Button, Pressable } from "react-native";
import stylesHeader from "./Styles/stylesHeader";
import colors, { lightColors } from "./Styles/colors";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import { useEffect, useState } from "react";
import { UserKeys } from "../../Enums/UserKeys";
import { trunc } from "../../utils/mathForDummies";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
export default function Header()
{
    return (
        <View style={stylesHeader().viewHeader}>
            <StatusBar hidden={false} backgroundColor={colors.primaryColor} barStyle={colors.primaryColor === lightColors.primaryColor ? "dark-content" : "light-content"}  />
            <Text style={stylesHeader().textHeader}>🌟 {NativeLevelHandler.getStreak()}</Text>
            <Pressable style={stylesHeader().helpPressable}>
                <Text style={stylesHeader().helpText}>?</Text>
            </Pressable>
        </View>
    );
}    */
    import React, { useState } from "react";
    import { StatusBar, View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
    import stylesHeader from "./Styles/stylesHeader";
    import colors, { lightColors } from "./Styles/colors";
    import NativeLevelHandler from "../../../specs/NativeLevelHandler";
    import { useEffect } from "react";
    import { UserKeys } from "../../Enums/UserKeys";
    import { trunc } from "../../utils/mathForDummies";
    import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
    import _vw, { _vh } from "../../utils/sizeConversors";
    
    
// Tutorial Translations
const translations = {
  en: {
    ippodake: "Ippodake 🐢",
    avgPlus10: "Avg + 10% 🐧",
    frozenTime: "Frozen Time ❄️",
    minPlus10: "Min + 10% 🐜",
    stars: "How the stars work?",
    howToUse: "How to use"
  },
  es: {
    stars: "¿Cómo funcionan las estrellas?",
    ippodake: "Ippodake 🐢",
    avgPlus10: "Promedio + 10% 🐧",
    frozenTime: "Tiempo Congelado ❄️",
    minPlus10: "Min + 10% 🐜",
    howToUse: "Cómo usar"
  }
};

// Tutorial content for both languages
const tutorial = [
  {
    titleKey: "stars",
    description: {
      en: "🌟 Stars are a measure of your consistency over the last 21 days. The more tasks you create, the more stars you earn! Each boost requires a certain number of stars to unlock, so keep pushing to collect them and unlock new features to help you improve your habits. You are  only allowed to have 21 stars",
      es: "🌟 Las estrellas son una medida de tu consistencia durante los últimos 21 días. ¡Cuantas más tareas crees, más estrellas ganarás! Cada impulso requiere un número específico de estrellas para desbloquearse, así que sigue adelante para coleccionarlas y desbloquear nuevas características que te ayudarán a mejorar tus hábitos. Solo tienes permitido tener 21 estrellas"
    }
  },
  {
    titleKey: "ippodake",
    description: {
      en: "Ippodake 🐢 is an algorithm designed to help you stay consistent with your tasks. It adjusts the time spent based on your performance! If you're doing well, it rewards you by increasing your time ⏳. If you're struggling, it gently decreases it to help you focus and improve. This is how you build and sustain a habit!",
      es: "Ippodake es un algoritmo diseñado para ayudarte a mantener la consistencia en tus tareas. Ajusta el tiempo según tu rendimiento. ¡Si te va bien, te recompensa aumentando tu tiempo ⏳! Si estás teniendo dificultades, lo disminuye suavemente para ayudarte a concentrarte y mejorar. ¡Así es como construyes y mantienes un hábito!"
    }
  },
  {
    titleKey: "avgPlus10",
    description: {
      en: "The Avg +10% Boost 🐧 increases your Ippodake-adjusted average task time by 10%. This adds a little extra challenge to help you improve and push your limits over time. It gives you more time to focus.",
      es: "El Impulso Promedio +10% aumenta tu tiempo promedio ajustado por Ippodake en un 10%. Esto agrega un pequeño desafío para ayudarte a mejorar y superar tus límites con el tiempo. Te da más tiempo para concentrarte."
    }
  },
  {
    titleKey: "frozenTime",
    description: {
      en: "The Frozen Time Boost ❄️ lets you pause your time whenever you need to take a break or just adjust to the new time changes made by Ippodake. This boost is perfect when you want to get used to your new task time without added pressure. Take a moment to relax, you got this! 😌",
      es: "El Impulso Congelado te permite pausar tu tiempo cuando necesites hacer una pausa o simplemente adaptarte a los nuevos cambios de tiempo realizados por Ippodake. Este impulso es perfecto cuando quieres acostumbrarte a tu nuevo tiempo de tarea sin presiones adicionales. ¡Tómate un momento para relajarte, lo lograrás! 😌"
    }
  },
  {
    titleKey: "minPlus10",
    description: {
      en: "The Min +10% Boost 🐜 gives you a 10% increase on the minimum time (3 minutes) when you're feeling tired. It’s a helpful boost to keep you going, but be careful—it can decrease both your average task time and Ippodake’s time. Use it wisely to avoid slowing down your progress! ⚠️",
      es: "El Impulso Min +10% te da un aumento del 10% sobre el tiempo mínimo (3 minutos) cuando te sientes cansado. Es un impulso útil para seguir adelante, pero ten cuidado: puede disminuir tanto tu tiempo promedio como los ajustes de tiempo de Ippodake. ¡Úsalo con sabiduría para evitar frenar tu progreso! ⚠️"
    }
  }
];


    export default function Header() {
      const [tutorialVisible, setTutorialVisible] = useState(false);
      const { width, height } = useWindowDimensions();
      const closeTutorial = () => {
        setTutorialVisible(false);
      };
    
      // Get the current language setting
      const language = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE);
    
      const styles = StyleSheet.create({
        tutorialOverlay: {
          height: width < height ? _vh(100) : _vw(100),
          position: "absolute",
          top: 0,
          left: width < height ? 0 : _vh(-86),
          right: 0,
          bottom: 0,
          backgroundColor: colors.primaryColor_darker,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99999,
        },
        tutorialContent: {
          width: width < height ? _vw(100) : _vh(100),
          height: width < height ? _vh(100) : _vw(100),
          padding: 20,
          backgroundColor: colors.primaryColor_darker,
          borderRadius: 10,
          alignItems: "center"
        },
        closeButton: {
          position: "absolute",
          top: 10,
          right: 10,
          borderWidth: _vw(0.5),
          borderColor: colors.font,
          borderRadius: _vw(50),
          width: _vw(10),
          height: _vw(10),
          justifyContent: "center",
          alignItems: "center",
        },
        closeButtonText: {
          fontSize: _vw(4),
          fontFamily: 'Roboto-Regular',
          color: colors.font
        },
        modalTitle: {
          fontSize: _vw(7),
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: 'Roboto-Regular',
          color: colors.font
        },
        scrollView: {
          width: "100%"
        },
        tutorialItem: {
          marginBottom: 20
        },
        tutorialTitle: {
          fontSize: _vw(6),
          fontWeight: "bold",
          fontFamily: 'Roboto-Regular',
          color: colors.white_blue
        },
        tutorialDescription: {
          fontSize: _vw(4.5),
          fontFamily: 'Roboto-Regular',
          color: colors.font
        }
      });
    
      return (
        <View style={stylesHeader().viewHeader}>
          <StatusBar
            hidden={false}
            backgroundColor={colors.primaryColor_darker}
            barStyle={colors.primaryColor === lightColors.primaryColor ? "dark-content" : "light-content"}
          />
          <Text style={stylesHeader().textHeader}>🌟 {NativeLevelHandler.getStreak()}</Text>
    
          {/* Help button */}
          <Pressable style={stylesHeader().helpPressable} onPress={() => setTutorialVisible(true)}>
            <Text style={stylesHeader().helpText}>?</Text>
          </Pressable>
    
          {/* Full-screen tutorial */}
          {tutorialVisible && (
            <View style={styles.tutorialOverlay}>
              <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.tutorialContent}>
                  <Pressable style={styles.closeButton} onPress={closeTutorial}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </Pressable>
                  <Text style={styles.modalTitle}>{translations[language].howToUse}</Text>
                  <ScrollView style={styles.scrollView}>
                    {tutorial.map((item, index) => (
                      <View key={index} style={styles.tutorialItem}>
                        <Text style={styles.tutorialTitle}>{translations[language][item.titleKey]}</Text>
                        <Text style={styles.tutorialDescription}>{item.description[language]}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      );
    }
    