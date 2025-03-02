import React, { createContext, useContext, useEffect, useState } from 'react';
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
import TaskType, { ETaskType } from './source/Models/TaskType';
import Form from './source/Views/Components/General/Components/Form';
import NativeLevelHandler from './specs/NativeLevelHandler';
import Task from './source/Models/Task';
export interface ContextProps {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  clockStarted: boolean;
  setClockStarted: React.Dispatch<React.SetStateAction<boolean>> |null;
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
}

export const Context = createContext<ContextProps | null>(null);
function App()
{
  const [main, setMain] = useState<ListViewKey>('Home');
  const [clockStarted, setClockStarted] = useState(false);
  const [isVisible, setIsVsible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task| null>(null)
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType| null>(null)
    const [time, setTime] = useState(()=>  {
        const time = new Date();
        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);
        return time;
    });
  useEffect(() => {
  }, []); // 👈 Se ejecuta solo una vez después del primer render
  
  const MainComponent = listView[main];
  useEffect(() => {
    // Solo registrar una vez
    NotificationController.requestUserPermission()
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS) {
            console.log('Notificación presionada', detail);
        }
    });
    if(selectedTask == null)
    {
        setSelectedTask(()=>{
          if(NativeTodayTasksHandler.getAllTaskTypes() != "[]" && NativeTodayTasksHandler.getTaskForToday(1) != "[]")
            {
              const today = JSON.parse(NativeTodayTasksHandler
              .getTaskForToday(JSON.parse(NativeTodayTasksHandler.getTaskForToday(1))[0]["id"]))[0]
              return Task.fromJSON(JSON.stringify(today))
            }
            return null
        })
    }
    return () => {
        // Limpiar cuando el componente se desmonte si es necesario
    };
}, []);
  
  return <Context.Provider value={{ 
    selectedTask, 
    setSelectedTask,
    clockStarted,
    setClockStarted,
    time,
    setTime
    }}>
      {isVisible ? <Form setIsVsible={setIsVsible}></Form> : 
      <View style={stylesMainContainer.view}>
      <Header></Header>
          {MainComponent? <MainComponent></MainComponent> : <Home></Home>}
      <Footer setMain={setMain}></Footer>
      </View>}
  </Context.Provider>
}
export default App;