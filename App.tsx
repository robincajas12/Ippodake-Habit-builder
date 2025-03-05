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
import { ELocalStorageKeys } from './source/Enums/LocalStorageKeys';
export interface ContextProps {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  clockStarted: boolean;
  setClockStarted: React.Dispatch<React.SetStateAction<boolean>> |null;
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
  timer: NodeJS.Timeout | null;
  setIsVsible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextProps | null>(null);
function App()
{
  let timer : NodeJS.Timeout | null = null
  const [main, setMain] = useState<ListViewKey>('Home');
  const [clockStarted, setClockStarted] = useState(()=>{
    return NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS) === "true"
  });
  const [isVisible, setIsVsible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task| null>(null)
    const [time, setTime] = useState(()=>  {
        const time = new Date();
        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);
        return time;
    });

  
  function setSelectedTaskType(id : number)
  {
        const taskTypes = NativeTodayTasksHandler.getAllTaskTypes()
        console.log(taskTypes)
        if(taskTypes != "[]")
        {
          NativeLevelHandler.setItem(
            ELocalStorageKeys.ID_SELECTED_TASKTYPE,
            JSON.parse(NativeTodayTasksHandler.getAllTaskTypes())[0]["id"].toString())
        }
        else NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)
      
  }
  useEffect(() => {
    setSelectedTaskType(1)
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
              setSelectedTaskType(1)
              const today = JSON.parse(NativeTodayTasksHandler
              .getTaskForToday(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))))[0]
              const task = Task.fromJSON(JSON.stringify(today))
              NativeLevelHandler.setItem(ELocalStorageKeys.ID_SELECTED_TASK, task.id.toString())
              return task
            }
            return null
        })
        
    }
    return () => {
        // Limpiar cuando el componente se desmonte si es necesario
    };
}, []);
  
  return <Context.Provider value={{ 
    timer,
    setIsVsible,
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