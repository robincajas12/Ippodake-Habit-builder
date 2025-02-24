import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import stylesMainContainer from "../Components/Styles/stylesMainContainer";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import colors from "../Components/Styles/colors"; // Adjust the import path to where your colors file is located
import _vh from "../../utils/sizeConversors";
import _vw from "../../utils/sizeConversors";
type HistoryProps = {
  items: { t: number; date: string }[];
  promedio: number;
};

const History = ({ items, promedio }: HistoryProps) => {
  const jsonData = NativeTodayTasksHandler.getAllMainTasks();
  if (jsonData !== "[]") {
    const data = JSON.parse(jsonData);
    data.forEach((element: { t: number; date: string }) => {
      items.push(element);
    });
  }

  return (
    <View style={stylesMainContentView.view}>
        <View style={styles.container}>
        <Text style={styles.title}>Historial</Text>
      <Text style={styles.promedio}>Promedio: {promedio} min</Text>
      <FlatList
        style={{ paddingHorizontal: _vw(4)}}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const porcentaje = Number(((item.t / promedio) * 100).toFixed(0));
          const porcentajeItem = <Text style={porcentaje >= 95 ? styles.textNoDanger : porcentaje <= 50 && porcentaje < 95 ? styles.textDanger : styles.textMidDanger}>{porcentaje}%</Text>
          return (
            <View style={styles.itemContainer}>
                <Text style={styles.textMidDanger}>{new Date(item.date).toLocaleDateString()}</Text>
              <View style={styles.row}>
                <Text style={styles.text}>Tiempo dedicado :     <Text style={porcentaje >= 80 ? styles.textNoDanger : porcentaje <= 50 && porcentaje < 80 ? styles.textDanger : styles.textMidDanger}>{item.t} min</Text></Text> 
                {porcentajeItem}
              </View>
              
            </View>
          );
        }}
      />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlockStart: _vw(4),
    backgroundColor: colors.primaryColor_darker, // Use primaryColor_darker for background
  },
  title: {
    fontSize: _vw(10),
    paddingLeft: _vw(6),
    fontWeight: "bold",
    marginBottom: _vw(2),
    color: colors.white_blue, // Use font color for text
  },
  promedio: {
    paddingLeft: _vw(6),
    fontSize: _vw(5),
    fontWeight: "bold",
    marginBottom: _vw(1),
    color: colors.font, // Use font color for text
  },
itemContainer: {
    backgroundColor: colors.primaryColor + "22",
    padding: _vw(3),
    marginVertical: _vw(2),
    borderRadius: _vw(2),
    marginBottom: _vw(5)
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text:{
    fontSize: _vw(5),
    color: colors.font
  },
  textNoDanger: {
    fontSize: _vw(5),
    color: colors.nonDanger, // Ensure text uses font color
  },
  textDanger:{
    fontSize: _vw(5),
    color: colors.danger, // Ensure text uses danger color
  },
  textMidDanger:{
    fontSize:  _vw(5),
    color: colors.white_blue
  },
  emoji: {
    fontSize: _vw(5),
  },
});

const sampleData = [
  { t: 30, date: "2025-02-20T10:00:00Z" },
  { t: 45, date: "2025-02-21T14:30:00Z" },
  { t: 60, date: "2025-02-22T18:15:00Z" },
  { t: 25, date: "2025-02-23T09:45:00Z" },
  { t: 50, date: "2025-02-24T20:00:00Z" },
];

export default () => <History items={sampleData} promedio={50} />;
