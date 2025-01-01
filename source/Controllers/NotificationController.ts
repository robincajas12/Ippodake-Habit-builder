import { ModuleWithStatics } from "@notifee/react-native/dist/types/Module";
import notifee, { AndroidImportance, AndroidStyle, AuthorizationStatus } from '@notifee/react-native'
import TaskType, { ETaskType } from "../Models/Task";
import { ms } from "../utils/timeDiference";
import colors, { getNotificationColors } from "../Views/Components/Styles/colors";
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
                importance: AndroidImportance.HIGH
            })
        }
    }    
    public async lauchChronometer(taskType  : TaskType) : Promise<String>{
        if(taskType.type !== ETaskType.TIME) throw new Error('It can not launch a chronometer notification because task type is not ' + ETaskType.TIME)
        if(!(notifee.isChannelCreated(taskType.type))) NotificationController.get().createChannelForTask(taskType.type)
        let timeInMinutes = 0
        if(taskType.time != undefined)
        {
            timeInMinutes = Date.now() + ms.minutes* taskType.time
        }
        const body = `<p>Complete: <span style="color: ${getNotificationColors().primaryColor}; font-style: italic;">${taskType.title}</span> in <span style="color: ${getNotificationColors().primaryColor}; font-weight: bold;">${taskType.time} minutes</span></p>`
        const id = await notifee.displayNotification({
            title: `<p style="color: ${getNotificationColors().primaryColor}; font-weight: bold;">${taskType.exp} EXP if you complete this task</p>`,
            body: body,
            subtitle: '⏱️',
            android: {
                channelId: taskType.type,
                showChronometer: true,
                timestamp: timeInMinutes,
                color : colors.primaryColor,
                chronometerDirection: "down",
                style: {type: AndroidStyle.BIGTEXT, text: body + ' current level: ' + taskType.level},
                largeIcon: require('../Views/Pet/Sprites/dog.gif'),  // Static image for better compatibility
            }
        });
        
        return id
    }
    async cancelNotification(notificationId : string)
    {
        notifee.cancelNotification(notificationId)
    }

}