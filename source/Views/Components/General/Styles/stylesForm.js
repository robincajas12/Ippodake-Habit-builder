import { StyleSheet } from 'react-native';
import colors, { getNotificationColors } from '../../Styles/colors'

// Estilos generales para el formulario
const stylesForm = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor_darker, // Color de fondo según el modo
    padding: 20,
    gap: 20
  },
  
  titleText: {
    fontSize: 24,
    color: colors.font, // Color del texto según el modo
    marginBottom: 20,
    fontWeight: 'bold',
  },

  inputContainer: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryColor, // Color de borde según el modo
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: colors.primaryColor_darker, // Fondo del input según el modo
  },

  inputText: {
    flex: 1,
    color: colors.font, // Color del texto dentro del TextInput
    fontSize: 16,
  },

  inputPlaceholder: {
    color: colors.font, // Color del placeholder
  },

  button: {
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  buttonText: {
    color: colors.white_blue, // Color del texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle:{
    color: colors.font,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },

  // Estilos para el TextInput en particular
  textInput: {
    height: 50,
    width: '100%',
    borderColor: colors.primaryColor_darker,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: colors.primaryColor_darker, // Fondo del input
    color: colors.font, // Color del texto
    fontSize: 16,
  },

  // Estilo para el placeholder del TextInput
  textInputPlaceholder: {
    color: colors.font, // Asegúrate de que el placeholder tenga un color adecuado
  },

  notificationContainer: {
    backgroundColor: getNotificationColors().primaryColor,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },

  notificationText: {
    color: getNotificationColors().font,
    fontSize: 18,
  },
});

export default stylesForm;
