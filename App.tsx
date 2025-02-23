import React, { useEffect, useState } from 'react';
import {
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
import { ETaskType } from './source/Models/Task';
function App()
{
  const [main, setMain] = useState<ListViewKey>('Home');
  const MainComponent = listView[main];

  useEffect(() => {
    // Solo registrar una vez
    NotificationController.requestUserPermission()
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS) {
            console.log('Notificación presionada', detail);
        }
    });

    return () => {
        // Limpiar cuando el componente se desmonte si es necesario
    };
}, []);
  return <View style={stylesMainContainer.view}>
    <Header></Header>
    {MainComponent? <MainComponent></MainComponent> : <Home></Home>}
    <Footer setMain={setMain}></Footer>
  </View>
}
export default App;