import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
import mobileAds, { AdsConsent, AdsConsentStatus,AdsConsentDebugGeography } from 'react-native-google-mobile-ads';
import DeviceInfo from 'react-native-device-info';

function App(){
  const [canShowAds, setCanShowAds] = useState(false);
  const isMobileAdsStartCalledRef = useRef(false);
  const [idSelectedTask, selectedTask] = useState<number | null>();
  useEffect(() => {
    if(canShowAds == false)
    {
      //AdsConsent.reset()
      // Request consent information and load/present a consent form if necessary.
      AdsConsent.gatherConsent()
        .then(startGoogleMobileAdsSDK)
        .catch((error) => {
          console.log(error)
        });
      // This sample attempts to load ads using consent obtained in the previous session.
      // We intentionally use .then() chaining (instead of await) to ensure parallel execution.
      startGoogleMobileAdsSDK();
    }
  }, );
  
  async function startGoogleMobileAdsSDK() {
    const {canRequestAds, isConsentFormAvailable} = await AdsConsent.getConsentInfo();
    console.log(canRequestAds)
    if (!canRequestAds || isMobileAdsStartCalledRef.current) {
      return;
    }

    isMobileAdsStartCalledRef.current = true
    setCanShowAds(true)
    await mobileAds().initialize()
  
    
  }
  
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
  }, [])
  return wasChadOpen ? <ContextComponent canShowAds={canShowAds} setCanShowAds={setCanShowAds}></ContextComponent> : <View style={{display: 'flex', flex: 1}}>
    {wasChadOpen && <Header></Header>}
    <FakeChat setIsVisible={setWasChatOpen}></FakeChat>
  </View>
}
export default App;

