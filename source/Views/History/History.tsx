import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NativeTodayTasksHandler from "../../../specs/NativeTodayTasksHandler";
import stylesMainContainer from "../Components/Styles/stylesMainContainer";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";
import colors from "../Components/Styles/colors"; // Adjust the import path to where your colors file is located
import _vh from "../../utils/sizeConversors";
import _vw from "../../utils/sizeConversors";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { trunc } from "../../utils/mathForDummies";
import { ELocalStorageKeys } from "../../Enums/LocalStorageKeys";
import NativeLevelHandler from "../../../specs/NativeLevelHandler";
import { getTranslation } from "../../Languages/LangManager";
import txt_history from "./txt_history";

type HistoryProps = {
  items: { t: number; date: string; tCompleted: number }[];
  promedio: number;
};



const History = () => {
  const language = NativeLevelHandler.getItem(ELocalStorageKeys.LANGUAGE);

  // Translations
  const my_txt_history = getTranslation(txt_history, language)

  const items = JSON.parse(NativeTodayTasksHandler.getTaskForToday(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)))).map((element: { t: number; date: string; tCompleted: number }) => {
    const element2 = element;
    element2.tCompleted = (element.tCompleted / (1000 * 60));
    element2.t = element.t / (1000 * 60);
    return element2;
  });

  return (
    <View style={stylesMainContentView().view}>
      <View style={styles.container}>
        <Text style={styles.title}>{my_txt_history .history}</Text>
        <Text style={styles.promedio}>{my_txt_history.avg}: {trunc(NativeTodayTasksHandler.getAVGTaskTCompleted(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)),30) / (60 * 1000), 3)} min</Text>

        <FlatList
          style={styles.flatList}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            let porcentaje = trunc(Number(((item.tCompleted / item.t) * 100)));
            if (Number.isNaN(porcentaje)) porcentaje = 0;
            const porcentajeItem = (
              <Text style={porcentaje >= 95 ? styles.textNoDanger : porcentaje <= 50 && porcentaje < 95 ? styles.textDanger : styles.textMidDanger}>
                {trunc(porcentaje, 1)}%
              </Text>
            );
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.textDate}>{new Date(item.date).toLocaleDateString()}</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>{my_txt_history.timeSpend}</Text>
                  <Text style={porcentaje >= 95 ? styles.textNoDanger : porcentaje <= 50 && porcentaje < 80 ? styles.textDanger : styles.textMidDanger}>
                    {trunc(item.tCompleted, 1)} min
                  </Text>
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
    paddingTop: _vw(4),
    backgroundColor: colors.primaryColor_darker,
    alignItems: 'center',
    width: _vw(100),
  },
  title: {
    fontSize: _vw(8),
    marginBottom: _vw(3),
    color: colors.font,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  textDate: {
    fontFamily: 'Roboto-Bold',
    backgroundColor: colors.white_blue,
    textAlign: 'center',
    width: _vw(30),
    padding: _vw(1),
    borderRadius: _vw(5),
    color: colors.primaryColor,
    marginBottom: _vw(2),
  },
  promedio: {
    fontSize: _vw(5),
    fontFamily: 'Roboto-Bold',
    marginBottom: _vw(3),
    color: colors.font,
    textAlign: 'center',
  },
  flatList: {
    width: _vw(95),
    paddingHorizontal: _vw(2),
  },
  itemContainer: {
    backgroundColor: colors.primaryColor,
    padding: _vw(4),
    marginVertical: _vw(2),
    borderRadius: _vw(3),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: _vw(4.5),
    color: colors.font,
    fontFamily: 'Roboto-Regular',
  },
  textNoDanger: {
    fontSize: _vw(4.5),
    fontFamily: 'Roboto-Regular',
    color: colors.nonDanger,
  },
  textDanger: {
    fontSize: _vw(4.5),
    fontFamily: 'Roboto-Regular',
    color: colors.danger,
  },
  textMidDanger: {
    fontSize: _vw(4.5),
    color: colors.white_blue,
    fontFamily: 'Roboto-Regular',
  },
});

export default () => <History />;