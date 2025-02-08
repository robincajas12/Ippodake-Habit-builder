import { AndroidStyle, Notification } from "@notifee/react-native";
import colors, { getNotificationColors } from "../Views/Components/Styles/colors";
import TaskType from "../Models/Task";
import { ms } from "../utils/timeDiference";

export default function timeNotification(taskType : TaskType) : Notification
{
        let timeInMinutes = 0
        if(taskType.time != undefined)
        {
                timeInMinutes = Date.now() + ms.minutes* taskType.time
        }
    const body = `<p>Complete: <span style="color: ${getNotificationColors().primaryColor}; font-style: italic;">${taskType.title}</span> in <span style="color: ${getNotificationColors().primaryColor}; font-weight: bold;">${taskType.time} minutes</span></p>`
    return {
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
    }
}