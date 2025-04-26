
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput, useWindowDimensions, Pressable, Alert } from "react-native";
import colors, { darkColors, lightColors } from "../Components/Styles/colors";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
import { ChatData, Option } from "../../Languages/Data/Chat/ChatData/chatypes";
import { chatDataArray } from "../../Languages/Data/Chat/ChatData/chatDataArray";
import _vw, { _vh } from "../../utils/sizeConversors";
import { UserKeys } from "../../Enums/UserKeys";
import ChangeValue from "../Components/General/Components/InputComponents/ChangeValue";
import langManager, { getTranslation } from "../../Languages/LangManager";
import languages from "../../Languages/languages";
import { languageType } from "../../Languages/laguageTypes";
import LangManager from "../../Languages/LangManager";
import traslations from "../../Languages/LangManager";

//const chatData = chatDataArray;
type goalsType = { en: string[]; es: string[] }
const premadeGoals: goalsType = {
  en: [
    "📖 Read a little every day",
    "🎸 Practice your musical instrument",
    "📚 Study and improve in a language",
    "🖌️ Draw or improve your art skills",
    "📝 Write something daily (journal, poem, short story)",
    "🧘 Practice meditation or mindfulness",
    "🏃 Exercise or stretch",
    "🎭 Practice acting or voice training",
    "📷 Take and edit a photo",
    "🍳 Try new cooking techniques",
    "🎮 Train your brain with strategy games",
    "🚶 Take a mindful walk",
    "🌱 Take care of a plant or garden",
    "🧩 Solve puzzles to train your mind",
    "✍️ Improve your handwriting or calligraphy",
    "🎶 Listen to and analyze music",
    "🗣️ Practice public speaking or storytelling",
    "🎤 Train your singing or vocal skills",
    "🖥️ Learn and practice coding",
    "📖 Memorize and recite poetry or speeches",
    "🎨 Experiment with a new art style",
    "💭 Reflect on your day and set goals",
    "📢 Learn and practice a new accent",
    "🧵 Try sewing or crafting",
    "🛠️ Work on a DIY project",
    "🤹 Learn and improve a manual skill (e.g., juggling, origami)",
    "📝 Summarize what you learn from books or videos",
    "📜 Learn a new historical fact every day",
    "🌌 Observe and learn about the stars",
    "🧬 Study an interesting scientific concept",
    "🇫🇷 Learn French",
    "🇯🇵 Learn Japanese",
    "🇪🇸 Learn Spanish",
  ],
  es: [
    "📖 Lee un poco cada día",
    "🎸 Practica tu instrumento musical",
    "📚 Estudia y mejora en un idioma",
    "🖌️ Dibuja o mejora tus habilidades artísticas",
    "📝 Escribe algo cada día (diario, poema, historia corta)",
    "🧘 Practica meditación o mindfulness",
    "🏃 Haz ejercicio o estiramientos",
    "🎭 Practica actuación o entrenamiento de voz",
    "📷 Toma y edita una foto",
    "🍳 Prueba nuevas técnicas de cocina",
    "🎮 Entrena tu cerebro con juegos de estrategia",
    "🚶 Da un paseo consciente",
    "🌱 Cuida una planta o jardín",
    "🧩 Resuelve acertijos para entrenar tu mente",
    "✍️ Mejora tu caligrafía o escritura a mano",
    "🎶 Escucha y analiza música",
    "🗣️ Practica hablar en público o contar historias",
    "🎤 Entrena tu canto o habilidades vocales",
    "🖥️ Aprende y practica programación",
    "📖 Memoriza y recita poesía o discursos",
    "🎨 Experimenta con un nuevo estilo artístico",
    "💭 Reflexiona sobre tu día y fija metas",
    "📢 Aprende y practica un nuevo acento",
    "🧵 Prueba coser o hacer manualidades",
    "🛠️ Trabaja en un proyecto DIY",
    "🤹 Aprende y mejora una habilidad manual (ej. malabares, origami)",
    "📝 Resume lo que aprendes de libros o videos",
    "📜 Aprende un nuevo dato histórico cada día",
    "🌌 Observa y aprende sobre las estrellas",
    "🧬 Estudia un concepto científico interesante",
    "🇫🇷 Aprender francés",
    "🇯🇵 Aprender japonés",
    "🇬🇧 Aprender inglés",
  ]
};





const ChatApp = ({ setIsVisible }: { setIsVisible: (t: boolean) => void }) => {
  const {width, height} = useWindowDimensions()
  const styles = StyleSheet.create({
    container: { flex: 8, padding: 20, backgroundColor: colors.primaryColor_darker, height:_vw(100) },
    messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
    botBubble: { backgroundColor: colors.primaryColor, alignSelf: "flex-start" },
    userBubble: { backgroundColor: colors.white_blue, alignSelf: "flex-end", borderTopRightRadius: 0 },
    messageText: { color: colors.font, fontSize: 16 },
    optionsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
    optionButton: { backgroundColor: colors.white_blue, padding: 10, borderRadius: 5, margin: 5 },
    optionText: { color: lightColors.font, fontSize: 16 },
    contentContainer: { flexGrow: 1, paddingBottom: 50 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.primaryColor_darker },
    modalContent: { backgroundColor: colors.primaryColor, padding: 20, borderRadius: 10, alignItems: "center" },
    modalText: { fontSize: 18, marginBottom: 20, color: colors.font },
    modalOption: { fontSize: _vw(4), marginBottom: _vw(3), color: colors.font },
    messageTextUser: { color: lightColors.font },
    inputContainer: {
      position: 'absolute',
      backgroundColor: colors.primaryColor_darker,
      width: width < height  ? _vw(100) : _vh(100),
      height: _vh(100),
      padding: _vw(5),
      paddingTop: _vw(10)
    },
    titleInputContainer :{color: lightColors.font, fontSize: _vw(7), paddingBottom: _vw(2), fontFamily: 'Roboto-Italic'},
    textInput: { borderWidth: 1, borderColor: lightColors.font, borderRadius: 5, padding: 10, marginTop: 10, color: lightColors.font, height: _vw(15)},
    submitButton: { backgroundColor: colors.nonDanger, padding: 10, borderRadius: 5, marginTop: 10 },
    submitButtonText: { color: lightColors.font },
    premadeGoalContainer: {
      paddingVertical: _vw(2)
    },
    suggestionHint:{
      fontSize: _vw(4),
      color: lightColors.font
    },
    containerSkip:{
      left: width < height ? _vw(75) : _vh(85),
      backgroundColor: colors.white_blue,
      borderRadius: _vw(5),
    },
    textSkip:{
      color: lightColors.font
    }
  });
  
  const [messages, setMessages] = useState([{ sender: "bot", text: "" }]);
  const [currentStep, setCurrentStep] = useState("start");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [showModal, setShowModal] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [userGoal, setUserGoal] = useState("");
  const chatData = getTranslation(traslations.chatData, selectedLanguage)
  const txt_chat_component =  getTranslation(traslations.Chat, selectedLanguage)
  const goals =  getTranslation(traslations.goals, selectedLanguage)
  const scrollViewRef = useRef<ScrollView>(null);
  function shuffleArray(array : string[]) {
    return array
      .map(value => ({ value, sort: Math.random() })) // Assign random sort values
      .sort((a, b) => a.sort - b.sort) // Sort using those values
      .map(({ value }) => value); // Extract values
  }
  
  const handleOptionPress = (option: Option) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: option.text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text:  chatData[option.next].bot }]);
      setCurrentStep(option.next);
    }, 1000);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    if (!chatData[currentStep]?.options?.length) {
      setTimeout(()=>setShowTextInput(true), 1000)
    } else {
      setShowTextInput(false);
    }
  }, [messages]);

  const handleLanguageSelect = (language: string) => {
    NativeLevelHandler.setItem(ELocalStorageKeys.LANGUAGE, language);
    setSelectedLanguage(language as keyof typeof premadeGoals);
    setShowModal(false);
    setMessages([{ sender: "bot", text: chatData.start.bot }]);
  };
  function onChandleSubmitGoalPress(goal : string)
  {
    NativeLevelHandler.setItem(UserKeys.GOAL_NAME, goal)
    
    setIsVisible(true)
    NativeLevelHandler.setItem(ELocalStorageKeys.CHAT_WAS_OPEN, true.toString())
  }
  function renderAvailableLanguage(lang : languageType)
  {
    return(<TouchableOpacity key={lang.key} onPress={() => handleLanguageSelect(lang.key)}>
    <Text style={styles.modalOption}>{lang.txt}</Text>
  </TouchableOpacity>)
  }
  return (
    <View style={styles.container}>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select your language</Text>
            {languages.map(renderAvailableLanguage)}
          </View>
        </View>
      </Modal>

      <ScrollView  showsVerticalScrollIndicator={false} ref={scrollViewRef} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        {messages.map((item, index) => (
          <View key={index} style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, item.sender === "user" && styles.messageTextUser]}>{item.text}</Text>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageBubble, styles.botBubble]}>
            <Text style={styles.messageText}>...</Text>
          </View>
        )}
      </ScrollView>

      {chatData[currentStep]?.options?.length > 0 && (
        <View style={styles.optionsContainer}>
          {chatData[currentStep].options.map((option : Option, index : number) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
            
          ))}
          <Pressable style={[styles.optionButton, {backgroundColor: colors.nonDanger}]} onPress={()=> {
            setShowTextInput(true)}

            }><Text style={styles.textSkip}>{txt_chat_component.skip_txt}</Text></Pressable>
        </View>
      )}

      {showTextInput && (
        <View style={styles.inputContainer}>
          <ChangeValue action={onChandleSubmitGoalPress} txtTitle={txt_chat_component.set_goal_component.input_title} initialText={userGoal}></ChangeValue>
          <ScrollView style={{paddingTop: _vw(5)}}>
          <Text style={styles.titleInputContainer}>
          {txt_chat_component.suggestions.title}
          </Text>
          <Text style={styles.suggestionHint}>{txt_chat_component.suggestions.suggestion_hint}</Text>
          { shuffleArray(goals).map((goal, index) => (
            <TouchableOpacity key={index} style={styles.premadeGoalContainer} onPress={() => setUserGoal(goal)}>
              <Text style={styles.optionText}>{goal}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
        
      )}
    </View>
  );
};


export default ChatApp;