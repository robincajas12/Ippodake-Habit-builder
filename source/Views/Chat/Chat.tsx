
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput } from "react-native";
import colors, { lightColors } from "../Components/Styles/colors";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
import { ChatData, Option } from "./ChatData/chatypes";
import { chatDataArray } from "./ChatData/chatDataArray";
import _vw, { _vh } from "../../utils/sizeConversors";
import { UserKeys } from "../../Enums/UserKeys";

const chatData = chatDataArray;
const premadeGoals: { en: string[]; es: string[] } = {
  en: [
    "📵 Stay away from my phone",
    "🎨 Draw",
    "🌿 Take a walk",
  ],
  es: [
    "📵 Alejarme de mi teléfono",
    "🎨 Dibujar",
    "🌿 Caminar",
  ]
};



const ChatApp = ({ setIsVisible }: { setIsVisible: (t: boolean) => void }) => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "" }]);
  const [currentStep, setCurrentStep] = useState("start");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof premadeGoals>("en");
  const [showModal, setShowModal] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [userGoal, setUserGoal] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);

  const handleOptionPress = (option: Option) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: option.text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: chatData[selectedLanguage][option.next].bot }]);
      setCurrentStep(option.next);
    }, 1000);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    if (!chatData[selectedLanguage][currentStep]?.options?.length) {
      setShowTextInput(true);
    } else {
      setShowTextInput(false);
    }
  }, [messages]);

  const handleLanguageSelect = (language: string) => {
    NativeLevelHandler.setItem(ELocalStorageKeys.LANGUAGE, language);
    setSelectedLanguage(language as keyof typeof premadeGoals);
    setShowModal(false);
    setMessages([{ sender: "bot", text: chatData[language].start.bot }]);
  };
  function onChandleSubmitGoalPress(goal : string)
  {
    NativeLevelHandler.setItem(UserKeys.GOAL_NAME, goal)
    setIsVisible(true)
    NativeLevelHandler.setItem(ELocalStorageKeys.CHAT_WAS_OPEN, true.toString())
  }
  return (
    <View style={styles.container}>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Select your language</Text>
            <TouchableOpacity onPress={() => handleLanguageSelect("en")}>
              <Text style={styles.modalOption}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelect("es")}>
              <Text style={styles.modalOption}>Español</Text>
            </TouchableOpacity>
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

      {chatData[selectedLanguage][currentStep]?.options?.length > 0 && (
        <View style={styles.optionsContainer}>
          {chatData[selectedLanguage][currentStep].options.map((option : Option, index : number) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showTextInput && (
        <View style={styles.inputContainer}>
          <Text style={{color: lightColors.font, fontSize: _vw(10), paddingBottom: _vw(5), fontFamily: 'Roboto-Italic'}}>Suggestions/sugerencias</Text>
          {premadeGoals[selectedLanguage].map((goal, index) => (
            <TouchableOpacity key={index} style={styles.premadeGoalContainer} onPress={() => setUserGoal(goal)}>
              <Text style={styles.optionText}>{goal}</Text>
            </TouchableOpacity>
          ))}

          <TextInput
            style={styles.textInput}
            placeholder="Write your goal/Escribe tu Meta"
            value={userGoal}
            onChangeText={setUserGoal}
            placeholderTextColor={lightColors.font}
            onSubmitEditing={() => onChandleSubmitGoalPress(userGoal)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={() => onChandleSubmitGoalPress(userGoal)}>
            <Text style={styles.submitButtonText}>Submit / enviar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 8, padding: 20, backgroundColor: colors.primaryColor_darker, height:_vw(100) },
  messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
  botBubble: { backgroundColor: colors.primaryColor, alignSelf: "flex-start" },
  userBubble: { backgroundColor: colors.nonDanger, alignSelf: "flex-end", borderTopRightRadius: 0 },
  messageText: { color: colors.font, fontSize: 16 },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  optionButton: { backgroundColor: colors.nonDanger, padding: 10, borderRadius: 5, margin: 5 },
  optionText: { color: lightColors.font, fontSize: 16 },
  contentContainer: { flexGrow: 1, paddingBottom: 50 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 18, marginBottom: 20 },
  modalOption: { fontSize: 16, marginBottom: 10, color: lightColors.font },
  messageTextUser: { color: lightColors.font },
  inputContainer: { marginTop: 10, padding: 10},
  textInput: { borderWidth: 1, borderColor: lightColors.font, borderRadius: 5, padding: 10, marginTop: 10, color: lightColors.font, height: _vw(15)},
  submitButton: { backgroundColor: colors.nonDanger, padding: 10, borderRadius: 5, marginTop: 10 },
  submitButtonText: { color: lightColors.font },
  premadeGoalContainer: {
    paddingVertical: _vw(2)
  }
});

export default ChatApp;