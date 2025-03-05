
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from "react-native";
import colors, { lightColors } from "../Components/Styles/colors";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";

type Option = {
  text: string;
  next: string;
};

type ChatStep = {
  bot: string;
  options: Option[];
};

type ChatData = {
  [key: string]: ChatStep;
};

const chatDataEn: ChatData = {
  start: {
    bot: "Hello! My name is Ippo, and I'm a turtle 🐢",
    options: [
      { text: "Hello, Ippo!", next: "good_response" }
    ]
  },
  good_response: {
    bot: "I'll get straight to the point! Do you know the story of the tortoise and the hare? 🐢🐇",
    options: [
      { text: "Yes! It's very popular", next: "have_you_tried_habit" },
      { text: "No, I've never heard of it. 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "The hare mocked the tortoise for being slow. 🐢 The tortoise challenged it to a race. Confident, the hare ran and took a nap. 😴 Meanwhile, the tortoise kept moving forward. ⏳ When the hare woke up, the tortoise was already near the finish line. 🏁 The hare ran, but too late: the tortoise won! 🎉 Moral: Slow and steady wins the race. 🏆",
    options: [
      { text: "That story is great! 🐢💪", next: "have_you_tried_habit" },
      { text: "I remember now, thanks! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "Exactly, Like that the moral of the story is persistence more than efficiency! Have you tried building a habit?",
    options: [
      { text: "Yes, that's why I'm here. I always fail. 😞", next: "maybe_i_can_help_with_that" },
      { text: "No, I haven't tried yet. 🤔", next: "maybe_i_can_help_with_that" }
    ]
  },
  maybe_i_can_help_with_that: {
    bot: "Maybe I can help with that! You know, this story and building habits have a lot in common. Basically, to build a habit and maintain consistency, you need to start with small steps every day and gradually increase. 📈",
    options: [
      { text: "That sounds doable! How do I start? 🚀", next: "ippodake_intro" }
    ]
  },
  ippodake_intro: {
    bot: "Ippodake is here to help with that! It's designed to help you maintain consistency by setting a minimum goal every day. 🌱 Whether it's a small task or a big goal, we'll take it step by step, just like the tortoise! 🐢 But here's the key: let's focus on just one habit at a time. Trying to build too many habits at once can be overwhelming, so we'll start with something small and manageable...",
    options: [
      { text: "Continue  please...😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "Well, Remember is all about taking small consistent steps every day to build lasting habits. You don't need to rush; just like the tortoise, steady progress is key. Every day, we'll set a small goal, and you'll gradually see your progress grow. 🐢 The more consistent you are, the closer you'll get to your big goal!",
    options: [
      { text: "Got it! Let's get started! 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "For Ippodake to work properly and for you to track your progress consistently, notifications need to be enabled. Don't forget to turn them on! 🔔",
    options: [
      { text: "Okay!", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "Great! Let's start setting up your first goal. 🌟",
    options: []
  }
};

const chatDataEs: ChatData = {
  start: {
    bot: "¡Hola! Mi nombre es Ippo, y soy una tortuga 🐢",
    options: [
      { text: "¡Hola, Ippo!", next: "good_response" }
    ]
  },
  good_response: {
    bot: "¡Voy directo al grano! ¿Conoces la historia de la tortuga y la liebre? 🐢🐇",
    options: [
      { text: "¡Sí! Es muy popular", next: "have_you_tried_habit" },
      { text: "Cuéntame la historia. 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "La liebre se burló de la tortuga por ser lenta. 🐢 La tortuga la desafió a una carrera. Confiada, la liebre corrió y se echó una siesta. 😴 Mientras tanto, la tortuga siguió avanzando. ⏳ Cuando la liebre despertó, la tortuga ya estaba cerca de la meta. 🏁 La liebre corrió, pero demasiado tarde: ¡la tortuga ganó! 🎉 Moraleja: Quien persevera, alcanza. 🏆",
    options: [
      { text: "¡Esa historia es genial! 🐢💪", next: "have_you_tried_habit" },
      { text: "¡Ya lo recuerdo, gracias! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "Lo que me gusta de la historia es su enseñanza, la moraleja de la historia es que la constancia es mejor que la eficiencia! ¿Has intentado crear un hábito?",
    options: [
      { text: "Sí, por eso estoy aquí. Siempre fracaso. 😞", next: "maybe_i_can_help_with_that" },
      { text: "No, no lo he intentado aún. 🤔", next: "maybe_i_can_help_with_that" }
    ]
  },
  maybe_i_can_help_with_that: {
    bot: "¡Tal vez pueda ayudarte con eso! Sabes, esta historia y crear hábitos tienen mucho en común. Básicamente, para construir un hábito y mantener la constancia, necesitas empezar con pequeños pasos todos los días y aumentar poco a poco. 📈",
    options: [
      { text: "¡Eso suena como el enfoque correcto! ¿Cómo empiezo? 🚀", next: "ippodake_intro" }
    ]
  },
  ippodake_intro: {
    bot: "¡Ippodake está aquí para ayudarte con eso! Está diseñado para ayudarte a mantener la constancia estableciendo una meta mínima cada día. 🌱 Ya sea una tarea pequeña o un gran objetivo, lo tomaremos paso a paso, ¡como la tortuga! 🐢 Pero aquí está la clave: enfoquémonos en solo un hábito a la vez. Intentar construir demasiados hábitos a la vez puede ser abrumador, así que vamos a mantenerlo simple y hacerlo bien. Comencemos con algo pequeño y manejable...",
    options: [
      { text: "Continua 😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "Bueno, Todo se trata de dar pequeños pasos consistentes todos los días para construir hábitos duraderos. No necesitas apresurarte; al igual que la tortuga, el progreso constante es la clave. Comenzaremos con solo 3 minutos, y con el tiempo, a medida que mantengas la constancia, tu meta aumentará gradualmente. 📈 ¡Eventualmente, alcanzarás tu gran objetivo!",
    options: [
      { text: "¡Entendido! Vamos a comenzar. 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "Para que Ippodake funcione correctamente y puedas seguir tu progreso de manera constante, es necesario habilitar las notificaciones. ¡No olvides activarlas! 🔔",
    options: [
      { text: "¡Está bien!", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "¡Genial! Comencemos a configurar tu primera meta. 🌟",
    options: []
  }
};

const  chatData : any= {en: chatDataEn,  es: chatDataEs}
const ChatApp = ({ setIsVisible }: { setIsVisible: (t: boolean) => void }) => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "" }]);
  const [currentStep, setCurrentStep] = useState("start");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English
  const [showModal, setShowModal] = useState(true); // To show the language selection modal

  const scrollViewRef = useRef<ScrollView>(null);

  const handleOptionPress = (option: Option) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: option.text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: chatData[selectedLanguage][option.next].bot },
      ]);
      setCurrentStep(option.next);
    }, 1000);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    // Check if the current step has no options to end the conversation
    if (!chatData[selectedLanguage][currentStep]?.options?.length) {
      setIsVisible(true); // Hide the chat if no options are available
     NativeLevelHandler.setItem(ELocalStorageKeys.CHAT_WAS_OPEN, true.toString())
    }
  }, [messages]);

  const handleLanguageSelect = (language: string) => {
    NativeLevelHandler.setItem(ELocalStorageKeys.LANGUAGE, language);
    setSelectedLanguage(language);
    setShowModal(false);
    setMessages([{ sender: "bot", text: chatData[language].start.bot }]);
  };

  return (
    <View style={styles.container}>
      {/* Language Selection Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
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

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={[styles.messageText, item.sender === "user" && styles.messageTextUser]}>{item.text}</Text>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageBubble, styles.botBubble]}>
            <Text style={styles.messageText}>...</Text>
          </View>
        )}
      </ScrollView>

      {chatData[selectedLanguage][currentStep]?.options?.length > 0 && !isTyping && (
        <View style={styles.optionsContainer}>
          {chatData[selectedLanguage][currentStep].options.map((option: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.primaryColor_darker },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  botBubble: { backgroundColor: colors.primaryColor, alignSelf: "flex-start" },
  userBubble: { backgroundColor: colors.nonDanger, alignSelf: "flex-end", borderTopRightRadius: 0},
  messageText: { color: colors.font, fontSize: 16 },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  optionButton: {
    backgroundColor:colors.nonDanger,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  optionText: { color: lightColors.font, fontSize: 16 },
  contentContainer: { flexGrow: 1, paddingBottom: 50 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    marginBottom: 10,
    color: lightColors.font,
  },
  messageTextUser:{
    color: lightColors.font
  }
});

export default ChatApp;

