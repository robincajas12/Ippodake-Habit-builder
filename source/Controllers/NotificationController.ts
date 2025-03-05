import { ModuleWithStatics } from "@notifee/react-native/dist/types/Module";
import notifee, { AndroidImportance, AndroidStyle, AndroidVisibility, AuthorizationStatus } from '@notifee/react-native'
import TaskType, { ETaskType } from "../Models/TaskType";
import { ms } from "../utils/timeDiference";
import colors, { getNotificationColors } from "../Views/Components/Styles/colors";
import Task from "../Models/Task";
export default class NotificationController
{
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
        if(eTaskType !== ETaskType.TIME) throw new Error('It can not launch a chronometer notification because task type is not ' + ETaskType.TIME)
        if(!(await NotificationController.get().channelExist(ETaskType.TIME))) await NotificationController.get().createChannelForTask(eTaskType)
        let timeInMiliseconds = 0
        if(task != undefined)
        {
            timeInMiliseconds = Date.now() +  task.t - task.tCompleted
        }
        const body = `<p>Just focus for <span style="color: ${getNotificationColors().primaryColor}; font-style: italic;"></span> in <span style="color: ${getNotificationColors().primaryColor}; font-weight: bold;"> ${(task.t - task.tCompleted)/(1000*60)} minutes</span></p>`
        const id = await notifee.displayNotification({
            title: `<p style="color: ${getNotificationColors().primaryColor}; font-weight: bold;">you can do it!</p>`,
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
        console.log(id)
        return id
    }
    async cancelNotification(notificationId : string)
    {
        notifee.cancelNotification(notificationId)
    }

}