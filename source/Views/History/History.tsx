import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import stylesMainContainer from "../Components/Styles/stylesMainContainer";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import colors from "../Components/Styles/colors"; // Adjust the import path to where your colors file is located
import _vh from "../../utils/sizeConversors";
import _vw from "../../utils/sizeConversors";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

type HistoryProps = {
  items: { t: number; date: string,tCompleted:number }[];
  promedio: number;
};
function trunc(x: number, posiciones = 0): number {
  if (!Number.isFinite(x) || !Number.isInteger(posiciones) || posiciones < 0) {
    throw new Error("Entrada no válida");
  }
  
  const factor = 10 ** posiciones;
  return Math.trunc(x * factor) / factor;
}

const History = () => {
  //const [items, setItems] = useState<{ t: number; date: string; tCompleted: number }[]>([])
  const items = JSON.parse(NativeTodayTasksHandler.getAllMainTasks()).map((element: { t: number; date: string, tCompleted:number }) =>{
    const element2 = element
    element2.tCompleted = (element.tCompleted / (1000 * 60))
    element2.t =element.t/(1000*60)
    return element2
  }).reverse()



  return (
    <View style={stylesMainContentView.view}>
            
       <View style={styles.container}>
            
      <Text style={styles.title}>Historial</Text>
      <Text style={styles.promedio}>Promedio: {trunc(NativeTodayTasksHandler.getAVGTaskTCompleted(30)/(60*1000),3)} min</Text>
      <FlatList
        style={{ paddingHorizontal: _vw(4)}}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          let porcentaje =trunc(Number(((item.tCompleted / item.t) * 100)));
          if(Number.isNaN(porcentaje)) porcentaje = 0
          const porcentajeItem = <Text style={porcentaje >= 95 ? styles.textNoDanger : porcentaje <= 50 && porcentaje < 95 ? styles.textDanger : styles.textMidDanger}>{trunc(porcentaje, 1)}%</Text>
          return (
            <View style={styles.itemContainer}>
                <Text style={styles.textMidDanger}>{new Date(item.date).toLocaleDateString()}</Text>
              <View style={styles.row}>
                <Text style={styles.text}>Tiempo dedicado : <Text style={porcentaje >= 80 ? styles.textNoDanger : porcentaje <= 50 && porcentaje < 80 ? styles.textDanger : styles.textMidDanger}>{trunc(item.tCompleted,1)} min  </Text></Text> 
                {porcentajeItem}
              </View>
              
            </View>
          );
        }}
      />
          <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER}/>
        </View>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlockStart: _vw(4),
    backgroundColor: colors.primaryColor_darker, // Use primaryColor_darker for background,
    alignItems:"center"
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
const sampleData = Array.from({ length: 100 }, (_, index) => {
  const randomT = Math.floor(Math.random() * 101); // Genera un valor aleatorio de 0 a 100 para 't'
  
  // Genera una fecha aleatoria en un rango entre el 2025-03-02 y el 2025-03-21
  const randomDate = new Date(2025, 2, 2 + index, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  const dateString = randomDate.toISOString();
  
  return { t: randomT, date: dateString };
});



export default () => <History/>;
