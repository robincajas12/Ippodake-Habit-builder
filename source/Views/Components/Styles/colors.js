/*import { Appearance } from 'react-native';

// Colores para modo claro
const lightColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#fff',
  // Colores mejorados para "danger" y "nonDanger"
  danger: '#FF6B6B',      // Rojo coral
  nonDanger: '#4CAF50',   // Verde suave
};

// Colores para modo oscuro
const darkColors = {
  primaryColor: '#1E1E1E', // Ejemplo de color oscuro
  primaryColor_darker: '#121212',
  clock: '#333333',
  clock_border: '#ccc',
  white_blue: '#BEC0FF',
  font: '#fff',
  // Mismos tonos que en modo claro para mantener consistencia
  danger: '#FF6B6B',
  nonDanger: '#4CAF50',
};

const getColors = () => {
  const colorScheme = Appearance.getColorScheme(); // Detectar el esquema de color
  return colorScheme === 'dark' ? darkColors : lightColors;
};
const colors = getColors();
export default colors;

// Colores para modo claro
const lightNotificationColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#000000',
  // Colores mejorados para "danger" y "nonDanger"
  danger: '#red',
  nonDanger: '#green',
};

// Colores para modo oscuro
const darkNotificationColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#000000',
  // Mismos tonos que en modo claro para mantener consistencia
  danger: '#FF6B6B',
  nonDanger: '#4CAF50',
};

// Función para obtener los colores adecuados según el modo
export const getNotificationColors = () => {
  const colorScheme = Appearance.getColorScheme(); // Detectar el esquema de color
  return colorScheme === 'dark' ? darkNotificationColors : lightNotificationColors;
};
*/
import { Appearance } from 'react-native';

// Colores para modo claro
const lightColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#252840',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#fff',
  // Colores mejorados para "danger" y "nonDanger"
  danger: '#E57373',      // Rojo suave
  nonDanger: '#81C784',   // Verde suave
};

// Colores para modo oscuro
const darkColors = {
  primaryColor: '#1E1E1E',
  primaryColor_darker: '#121212',
  clock: '#333333',
  clock_border: '#ccc',
  white_blue: '#BEC0FF',
  font: '#fff',
  // Mismos tonos que en modo claro para mantener consistencia
  danger: '#E57373',
  nonDanger: '#81C784',
};

const getColors = () => {
  const colorScheme = Appearance.getColorScheme(); // Detectar el esquema de color
  return colorScheme === 'dark' ? darkColors : lightColors;
};
const colors = getColors();
export default colors;

// Colores para notificaciones en modo claro
const lightNotificationColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#000000',
  // Colores mejorados para "danger" y "nonDanger"
  danger: '#E57373',
  nonDanger: '#81C784',
};

// Colores para notificaciones en modo oscuro
const darkNotificationColors = {
  primaryColor: '#6753F9',
  primaryColor_darker: '#252840',
  clock: '#0A0A0F',
  clock_border: '#fff',
  white_blue: '#BEC0FF',
  font: '#000000',
  // Mismos tonos que en modo claro para mantener consistencia
  danger: '#E57373',
  nonDanger: '#81C784',
};

// Función para obtener los colores adecuados según el modo
export const getNotificationColors = () => {
  const colorScheme = Appearance.getColorScheme(); // Detectar el esquema de color
  return colorScheme === 'dark' ? darkNotificationColors : lightNotificationColors;
};
