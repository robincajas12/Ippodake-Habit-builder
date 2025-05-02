import { Pressable, StyleSheet, Text, useWindowDimensions, View, useColorScheme } from "react-native";
import TaskType from "../../../Models/TaskType";
import colors, { lightColors, darkColors } from "../../Components/Styles/colors";
import _vw, { _vh } from "../../../utils/sizeConversors";
import NativeTodayTasksHandler from "../../../../specs/NativeTodayTasksHandler";
import { trunc } from "../../../utils/mathForDummies";
import { getTaskForToday } from "../../../utils/getTaskForToday";
import Bar from "./Bar";
import Task from "../../../Models/Task";
import { useState } from "react";

export type myItemProps = {
    taskType: TaskType,
    action: (taskype: TaskType) => void,
    selected: boolean,
}

export default function MyItem({ taskType, action, selected }: myItemProps) {
    const { width, height } = useWindowDimensions();
    const colorScheme = useColorScheme();

    const todayTask = getTaskForToday(taskType.id);
    const habitTime = trunc(NativeTodayTasksHandler.getHabitFormationModelCurrentTime(taskType.id) / (60 * 1000), 1);

    let percentage = 0;
    if (todayTask && todayTask.t > 0) {
        percentage = (todayTask.tCompleted / todayTask.t) * 100;
    }

    let progressColor = colors.danger;
    if (percentage >= 90) {
        progressColor = colors.nonDanger;
    } else if (percentage >= 50) {
        progressColor = colors.white_blue;
    }

    const isComplete = percentage >= 90;
    const statusText = isComplete ? '✅' : '❌';

    const [showBar, setShowBar] = useState(false);
    const [chartData, setChartData] = useState<{ label: string, value: number }[]>([]);

    const loadChartData = () => {
        const res = NativeTodayTasksHandler.getTaksByIdSinceCertainDate(taskType.id, 7);
        const parsed = JSON.parse(res);
        const data = parsed.map((tasks: Object) => {
            const task = Task.fromJSON(JSON.stringify(tasks));
            if (!task) return;
            return { label: new Date(task.date).getUTCDate(), value: task.tCompleted };
        }).filter(Boolean) as { label: string, value: number }[];
        setChartData(data.reverse());
    };

    const toggleBar = () => {
        setShowBar(prev => !prev); // Toggle between show and hide
        if (!showBar) {
            loadChartData(); // Load chart data only when showing
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.primaryColor,
            width: width < height ? _vw(90) : _vh(90),
            borderRadius: _vw(2),
            paddingVertical: _vh(0),
            paddingHorizontal: _vw(0),
            overflow: 'hidden'
        },
        btn: {
            width: "100%",
            backgroundColor: colors.primaryColor,
            borderRadius: _vw(2),
            padding: _vw(3),
        },
        title: {
            color: colors.font,
            fontSize: _vw(6),
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
            marginBottom: _vh(1),
        },
        infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: _vw(2),
            marginBottom: _vh(1),
        },
        text: {
            fontSize: _vw(4.5),
            color: colors.font,
            fontFamily: 'Roboto-Italic',
        },
        textTime: {
            fontSize: _vw(4.5),
            fontFamily: 'Roboto-Bold',
            color: progressColor,
        },
        textTimeGoal: {
            fontSize: _vw(4.5),
            fontFamily: 'Roboto-Bold',
            color: colors.font,
        },
        status: {
            textAlign: "center",
            fontSize: _vw(4.5),
            fontFamily: 'Roboto-Bold',
            color: progressColor,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        showBarButton: {
            backgroundColor: colors.white_blue,
            borderBottomLeftRadius: _vw(2),
            paddingVertical: _vw(2),
            flex: 1,
            alignItems: 'center',
        },
        enterButton: {
            backgroundColor: colors.nonDanger,
            borderBottomLeftRadius: _vw(0),
      
            borderTopLeftRadius: 0,
            borderBottomRightRadius: _vw(2),
            paddingVertical: _vw(2),
            flex: 1,
            alignItems: 'center',
        },
        showBarButtonText: {
            fontSize: _vw(4),
            color: lightColors.font,
            fontFamily: 'Roboto-Bold',
        },
        enterButtonText: {
            fontSize: _vw(4),
            color: lightColors.font,
            fontFamily: 'Roboto-Bold',
            borderEndEndRadius:0
        },
    });

    const handlePress = () => action(taskType);

    return (
        <View style={styles.container}>
            <Pressable style={styles.btn} onPress={handlePress}>
                <Text style={styles.title}>{taskType.title}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.textTimeGoal}>
                        {todayTask ? `Today ${trunc((todayTask.tCompleted) / (60 * 1000), 1)} min` : `Goal ${habitTime} min`}
                    </Text>
                    <Text style={styles.textTime}>{trunc(percentage, 1)}%</Text>
                    <Text style={styles.textTime}>{statusText}</Text>
                </View>
            </Pressable>

            {/* Toggle Button */}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.showBarButton} onPress={toggleBar}>
                    <Text style={styles.showBarButtonText}>
                        {showBar ? 'Hide Bar' : 'Show Bar'}
                    </Text>
                </Pressable>

                <Pressable style={styles.enterButton} onPress={handlePress}>
                    <Text style={styles.enterButtonText}>
                        {'Enter'}
                    </Text>
                </Pressable>
            </View>

            {showBar && <Bar data={chartData} />}
        </View>
    );
}
