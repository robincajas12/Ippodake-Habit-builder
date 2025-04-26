import notifee, { EventType } from "@notifee/react-native";
import { createContext, useState, useEffect } from "react";
import { AppState, View } from "react-native";
import NativeLevelHandler from "../specs/NativeLevelHandler";
import NativeTodayTasksHandler from "../specs/NativeTodayTasksHandler";
import NotificationController from "./Controllers/NotificationController";
import { ELocalStorageKeys } from "./Enums/LocalStorageKeys";
import Footer from "./Views/Components/Footer";
import Form from "./Views/Components/General/Components/Form";
import listView, { ListViewKey } from "./Views/Components/listViews";
import stylesMainContainer from "./Views/Components/Styles/stylesMainContainer";
import Home from "./Views/Home/Home";
import Task from "./Models/Task";
import Header from "./Views/Components/Header";
import { getTaskForToday } from "./utils/getTaskForToday";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import SelectTaskType from "./Views/Menu/Components/SeletecTaskType";
export interface ContextProps {
    selectedTask: Task | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
    clockStarted: boolean;
    setClockStarted: React.Dispatch<React.SetStateAction<boolean>>;
    time: Date;
    setTime: React.Dispatch<React.SetStateAction<Date>>;
    timer: NodeJS.Timeout | null;
    setIsVsible: React.Dispatch<React.SetStateAction<boolean>>;
    canShowAds: boolean;
  }
  
  export const Context = createContext<ContextProps | null>(null);
  function ContextComponent({canShowAds, setCanShowAds, idSelectedTaskType}:{idSelectedTaskType: number | null, canShowAds:boolean, setCanShowAds: (t:boolean)=>void})
  {
    let timer : NodeJS.Timeout | null = null
    const [main, setMain] = useState<ListViewKey>('Home');
    const [clockStarted, setClockStarted] = useState(()=>{
      return NativeLevelHandler.getItem(ELocalStorageKeys.CLOCK_STATUS) === "true"
    });
    const [isVisible, setIsVsible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task| null>(null)
    const [idTaskType, setIdTaskType] = useState<number|null>(null)

      const [time, setTime] = useState<Date>(()=>  {
          const time = new Date();
          time.setHours(0);
          time.setMinutes(0);
          time.setSeconds(0);
          return time;
      });

      
      useEffect(()=>{
          if(NativeLevelHandler.getItem(ELocalStorageKeys.USER_NOTIFICATION_STATUS) == "") NotificationController.requestUserPermission()
          if (selectedTask == null) NotificationController.get().createOnBackgroundEvent()
      })
    
    function setSelectedTaskType(id : number)
    {
          const taskTypes = NativeTodayTasksHandler.getAllTaskTypes()
          console.log(taskTypes)
          if(taskTypes != "[]")
          {
            NativeLevelHandler.setItem(
              ELocalStorageKeys.ID_SELECTED_TASKTYPE,
              id.toString()
            );
          }
          else NativeLevelHandler.removeItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE)
        
    }
    useEffect(() => {
      if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))
      {
        const id = Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_SELECTED_TASKTYPE))
        setIdTaskType(id)
      }
      
    }, [idTaskType]); // 👈 Se ejecuta solo una vez después del primer render
    
    const MainComponent = listView[main];
    useEffect(() => {
      if(selectedTask == null)
      {
  
          setSelectedTask(()=>{
            if(idTaskType == null) return null
            const taskForToday = getTaskForToday(idTaskType)
            console.log(taskForToday, "tarea para hoy")
            if(taskForToday)
              {
                NativeLevelHandler.setItem(ELocalStorageKeys.ID_SELECTED_TASK, taskForToday.id.toString())
                return taskForToday
            }
          setIdTaskType(null)
          return null
          })
          
      }
      return () => {
          // Limpiar cuando el componente se desmonte si es necesario
      };
  }, []);
  useEffect(() => {
    const handleAppStateChange = (stage: string) => {
        if (stage === 'active') {
            const today = NativeTodayTasksHandler.getToday();
            const storedDate = NativeLevelHandler.getItem(ELocalStorageKeys.CURRENT_DATE);
            if (today !== storedDate) {
                setSelectedTask(null);
                setClockStarted(false)
                NativeLevelHandler.setItem(ELocalStorageKeys.CURRENT_DATE, NativeTodayTasksHandler.getToday())
                if(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER))
                {
                  clearInterval(Number(NativeLevelHandler.getItem(ELocalStorageKeys.ID_TIMER)))
                }
                setClockStarted(false)
                NativeLevelHandler.removeItem(ELocalStorageKeys.ID_TIMER)
                NativeLevelHandler.removeItem(ELocalStorageKeys.CLOCK_STATUS)
                NotificationController.get().cancelTriggerNotification()
                const idActiveNot = NativeLevelHandler.getItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)
                if(idActiveNot)
                {
                    notifee.cancelNotification(idActiveNot)
                    NativeLevelHandler.removeItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)
                }
            }
        }
    };

    const suscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
        suscription.remove(); // Limpieza del evento al desmontar el componente
    };
}, []);
    return idTaskType != null? <Context.Provider value={{ 
      timer,
      setIsVsible,
      selectedTask, 
      setSelectedTask,
      clockStarted,
      setClockStarted,
      time,
      setTime,
      canShowAds
      }}>
        {!isVisible &&
        <View style={stylesMainContainer().view}>
        <Header></Header>
            {MainComponent? <MainComponent idTaskType={idTaskType}  setIdTaskType={setIdTaskType} canShowAds={canShowAds}></MainComponent> : <Home setIdTaskType={setIdTaskType} idTaskType={idTaskType} canShowAds={canShowAds}></Home>}
        <Footer setMain={setMain}></Footer>
        </View>}
    </Context.Provider> : <SelectTaskType canShowAds={canShowAds} idTaskType={idTaskType} setIdTaskType={setIdTaskType}></SelectTaskType>
  }
  export default ContextComponent;