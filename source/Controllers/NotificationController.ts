import { ModuleWithStatics } from "@notifee/react-native/dist/types/Module";
import notifee, { AndroidImportance, AndroidNotificationSetting, AndroidStyle, AndroidVisibility, AuthorizationStatus, RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native'
import TaskType, { ETaskType } from "../Models/TaskType";
import { ms } from "../utils/timeDiference";
import colors, { getNotificationColors } from "../Views/Components/Styles/colors";
import Task from "../Models/Task";
import NativeLevelHandler from "../../specs/NativeLevelHandler";
import { ELocalStorageKeys } from "../Enums/LocalStorageKeys";
import NativeTodayTasksHandler from "../../specs/NativeTodayTasksHandler";
import { getTaskForToday } from "../utils/getTaskForToday";
import { Alert } from "react-native";
export default class NotificationController
{
    cancelTriggerNotification() {
        const idTrigerNotification =NativeLevelHandler.getItem(ELocalStorageKeys.ID_ACTIVE_TRIGER_NOTIFICATION)
        if(idTrigerNotification != "")
        {
            notifee.cancelNotification(idTrigerNotification)
        }
        throw new Error("Method not implemented.");
    }
    private static notification : NotificationController | null = null;
    
    public static get() : NotificationController{
        if(this.notification == null)
        {
            this.notification = new NotificationController()
        }
        return this.notification
    }
    static async requestUserPermission() {
        const settings = await notifee.requestPermission();
      
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
          console.log('Permission settings:', settings);
        } else {
          console.log('User declined permissions');
        }
      }
    private async channelExist(id: string): Promise<boolean> {
        const channels = await notifee.getChannels();
        const existingChannel = channels?.find(channel => channel.id === id);
        return existingChannel ? true : false;
    }
    
    private async createChannelForTask(etaskType : ETaskType)
    {
        const channel = await notifee.getChannel(etaskType)
        if(!channel)
        {
            await notifee.createChannel({
                id: etaskType,
                name: etaskType.toLocaleLowerCase(),
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC
            })
        }
    }    
    public async cancelActiveNotifications()
    {
        const activeNotification = NativeLevelHandler.getItem(ELocalStorageKeys.ID_ACTIVE_NOTIFICATION)

        if(activeNotification != null && activeNotification != "" && activeNotification != undefined)
        {
            await notifee.cancelNotification(activeNotification)
        }
    }
    public async lauchChronometer(taskType  : TaskType) : Promise<String>{
        if(taskType.type !== ETaskType.TIME) throw new Error('It can not launch a chronometer notification because task type is not ' + ETaskType.TIME)
        if(!(await NotificationController.get().channelExist(ETaskType.TIME))) await NotificationController.get().createChannelForTask(taskType.type)
        let timeInMiliseconds = 0
        if(taskType.maxT != undefined)
        {
            timeInMiliseconds= Date.now() + taskType.maxT
        }
        const body = `<p>Complete: <span style="color: ${getNotificationColors().primaryColor}; font-style: italic;">${taskType.title}</span> in <span style="color: ${getNotificationColors().primaryColor}; font-weight: bold;">${taskType.minT} minutes</span></p>`
        const id = await notifee.displayNotification({
            title: `<p style="color: ${getNotificationColors().primaryColor}; font-weight: bold;">${taskType.exp} EXP if you complete this task</p>`,
            body: body,
            subtitle: '⏱️',
            android: {
                channelId: taskType.type,
                showChronometer: true,
                timestamp: timeInMiliseconds,
                color : colors.primaryColor,
                chronometerDirection: "down",
                style: {type: AndroidStyle.BIGTEXT, text: body + ''},
                }
        });
        console.log(id)
        return id
    }
    public async lauchChronometerWithTask(task  : Task, eTaskType: ETaskType ) : Promise<String>{
        this.cancelActiveNotifications()
        if(eTaskType !== ETaskType.TIME) throw new Error('It can not launch a chronometer notification because task type is not ' + ETaskType.TIME)
        if(!(await NotificationController.get().channelExist(ETaskType.TIME))) await NotificationController.get().createChannelForTask(eTaskType)
        let timeInMiliseconds = 0
        if(task != undefined)
        {
            timeInMiliseconds = Date.now() +  task.t - task.tCompleted
        }
        const body = `<p>Just focus for <span style="color: ${colors.font}; font-style: italic;"></span> in <span style="color: ${colors.font}; font-weight: bold;"> ${(task.t - task.tCompleted)/(1000*60)} minutes</span></p>`
        const id = await notifee.displayNotification({
            title: `<p style="color: ${colors.white_blue}; font-weight: bold;">you can do it!</p>`,
            body: body,
            subtitle: '⏱️',
            android: {
                channelId: eTaskType,
                showChronometer: true,
                timestamp: timeInMiliseconds,
                color : colors.primaryColor,
                chronometerDirection: "down",
                style: {type: AndroidStyle.BIGTEXT, text: body + 'Please put your phone away'},
                autoCancel: false,
                visibility: AndroidVisibility.PUBLIC,
                ongoing: true
            }
        });
        return id
    }

    async createTriggerNotification(etaskType : ETaskType,timeInMiliseconds : number)
    {
        const settings = await notifee.getNotificationSettings();
        if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: new Date().getTime() + timeInMiliseconds,
                repeatFrequency: RepeatFrequency.NONE,
                alarmManager: {
                    allowWhileIdle: true,
                }
            }
            const id = await notifee.createTriggerNotification(
                {
                  title: 'Good job!',
                  body: 'You have completed : ' + getTaskForToday()?.tCompleted + "minutesin your goal",
                  android: {
                    channelId: etaskType,
                  },
                },
                trigger,
              );
            return id
        } else {

        Alert.alert("Please we need to enable alarm permission, please go to settings and enable it")
        await notifee.openAlarmPermissionSettings();
        }
        return ""
    }
    async cancelNotification(notificationId : string)
    {
        notifee.cancelNotification(notificationId)
    }

}