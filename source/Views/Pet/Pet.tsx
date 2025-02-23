import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import stylesMainContentView from '../Components/Styles/stylesMainContentView';
import colors from '../Components/Styles/colors';
const Pet = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hola, ¿cómo estás?', user: 'A' },
    { id: '2', text: 'Estoy bien, ¿y tú?', user: 'B' },
    { id: '3', text: 'Todo bien, gracias por preguntar!', user: 'A' },
    {id: '4', text: 'WTFFFFFFFFFFF!!', user: 'A'}
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('A');  // Cambia entre 'A' y 'B' para simular el cambio de usuario

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages ,{ id: (messages.length + 1).toString(), text: newMessage, user: currentUser }]);
      setNewMessage('');
      setCurrentUser(currentUser === 'A' ? 'B' : 'A');  // Cambiar de usuario después de cada mensaje
    }
  };

  return (
    <KeyboardAvoidingView
      style={stylesMainContentView.view}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.chatContainer}>
          <FlatList
            
            data={messages}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.user === 'A' ? styles.messageLeft : styles.messageRight,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={styles.messageList}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Escribe un mensaje"
            
            />
            <Button title="Enviar" onPress={handleSend} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    flex: 1,
    paddingTop: 20,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageLeft: {
    backgroundColor: colors.primaryColor, // Color de fondo para Usuario A
    alignSelf: 'flex-start', // Alinea el mensaje a la izquierda
  },
  messageRight: {
    backgroundColor: colors.clock, // Color de fondo para Usuario B
    alignSelf: 'flex-end', // Alinea el mensaje a la derecha
  },
  messageText: {
    fontSize: 16,
    color: colors.font, // Color del texto en el mensaje
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#ccc',
    marginRight: 10,
    color: colors.font, //
  },
});

export default Pet;

