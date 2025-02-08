import { ModuleWithStatics } from "@notifee/react-native/dist/types/Module";
import notifee, { AndroidImportance, AndroidStyle, AuthorizationStatus } from '@notifee/react-native'
import TaskType, { ETaskType } from "../Models/Task";
import { ms } from "../utils/timeDiference";
import colors, { getNotificationColors } from "../Views/Components/Styles/colors";
import timeNotification from "../NotificationViews/timeNotification";
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
        if(!(await NotificationController.get().channelExist(taskType.type))) await NotificationController.get().createChannelForTask(taskType.type)
        const id = await notifee.displayNotification(timeNotification(taskType));
        return id
    }
    async cancelNotification(notificationId : string)
    {
        notifee.cancelNotification(notificationId)
    }

}