import { Appearance } from 'react-native';

// Colores para modo claro
const lightColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#fff'
};

// Colores para modo oscuro
const darkColors = {
  primaryColor: '#1E1E1E', // Ejemplo de color oscuro
  primaryColor_darker: '#121212',
  clock: '#333333',
  clock_border: '#ccc',
  white_blue: '#BEC0FF',
  font: '#fff', // Color de texto para modo claro
};

const getColors = () => {
  const colorScheme = Appearance.getColorScheme(); // Detectar el esquema de color
  return colorScheme === 'dark' ? darkColors : lightColors;
};
const colors = getColors()
export default colors


// Colores para modo claro
const lightNotificationColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#000000', // Color de texto para modo claro
};

// Colores para modo oscuro
const darkNotificationColors = {
    primaryColor: '#6753F9',
    primaryColor_darker: '#252840',
    clock: '#0A0A0F',
    clock_border: '#fff',
    white_blue: '#BEC0FF',
    font: '#000000', // Color de texto para modo claro
  };

// Función para obtener los colores adecuados según el modo
export const getNotificationColors = () => {
  const colorScheme = Appearance.getColorScheme(); // Detectar el esquema de color
  return colorScheme === 'dark' ? darkNotificationColors : lightNotificationColors;
};
