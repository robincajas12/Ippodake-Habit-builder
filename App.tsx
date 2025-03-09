import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AppState,
  View,
} from 'react-native';
import Header from './source/Views/Components/Header';
import Footer from './source/Views/Components/Footer';
import stylesMainContainer from './source/Views/Components/Styles/stylesMainContainer';
import Home from './source/Views/Home/Home';
import listView from './source/Views/Components/listViews';
import { ListViewKey } from './source/Views/Components/listViews';
import notifee from '@notifee/react-native'
import { EventType } from '@notifee/react-native';
import NotificationController from './source/Controllers/NotificationController';
import NativeTodayTasksHandler from './specs/NativeTodayTasksHandler';
import TaskType, { ETaskType } from './source/Models/TaskType';
import Form from './source/Views/Components/General/Components/Form';
import NativeLevelHandler from './specs/NativeLevelHandler';
import Task from './source/Models/Task';
import { ELocalStorageKeys } from './source/Enums/LocalStorageKeys';
import ContextComponent from './source/ContextComponent';
import FakeChat from './source/Views/Chat/Chat';
function App(){
  const [wasChadOpen,setWasChatOpen] = useState(true)
    useEffect(()=>{
      if(NativeLevelHandler.getItem(ELocalStorageKeys.CURRENT_DATE) == "")
      {
        NativeLevelHandler.setItem(ELocalStorageKeys.CURRENT_DATE, NativeTodayTasksHandler.getToday())
      }
    })
  useEffect(()=>{
    if(NativeLevelHandler.getItem(ELocalStorageKeys.CHAT_WAS_OPEN) != true.toString())
      {
        setWasChatOpen(false)
      }
  }, [wasChadOpen])
  return wasChadOpen ? <ContextComponent></ContextComponent> : <View style={{display: 'flex', flex: 1}}>
    <Header></Header>
    <FakeChat setIsVisible={setWasChatOpen}></FakeChat>
  </View>
}
export default App;