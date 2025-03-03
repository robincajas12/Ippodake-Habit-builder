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
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Todo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Roboto Regular!</Text>
      <Text style={styles.defaultText}>This is the default font.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Roboto-Italic',  // Asegúrate de que este nombre es correcto
    fontSize: 24,
    color: 'blue',
  },
  defaultText: {
    fontFamily: 'Roboto-Regular',  // Fallback font
    fontSize: 24,
    color: 'red',
  },
});
