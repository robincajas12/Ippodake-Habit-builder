import { View, Text, TextInput, Button, Alert } from "react-native"
import { useState } from "react"
import NativeTodayTasksHandler from "../../../../../specs/NativeTodayTasksHandler"
import { ETaskType } from "../../../../Models/Task"
import stylesForm from "../Styles/stylesForm"
type formProps = {
    setIsVsible: (isVisible: boolean) => void
}
export default function Form(props : formProps) {
    const [goal, setGoal] = useState('')

    // This function will update the goal when the user types in the input
    function onChangeInput(text : string) {
        setGoal(text)
    }

    function onButtonPress() {
        if(NativeTodayTasksHandler.getAllTaskTypes() == "[]" && goal != "" && parseFloat(goal) > 0){
            console.log(NativeTodayTasksHandler.createTaskType(ETaskType.TIME,-1, parseFloat(goal), 1))
            if(NativeTodayTasksHandler.getAllTaskTypes() != "[]"){
                props.setIsVsible(false)
            }
        } else{
            Alert.alert("Error", "Please enter a valid goal Number")
            setGoal('')
        }
    }
    return (
        <View style={stylesForm.mainContainer}>
            <Text style={stylesForm.titleText}>Welcome to IppoDake</Text>
            <Text style={stylesForm.subTitle}>Set your goal (in hours)</Text>
          <View style={stylesForm.inputContainer}>
            <TextInput 
              style={stylesForm.textInput}
              placeholder="Enter your goal in hours" 
              placeholderTextColor={stylesForm.textInputPlaceholder.color}
              value={goal} 
              onChangeText={onChangeInput} 
              keyboardType="numeric"
            />
          </View>
          <Button 
            title="Create Goal" 
            onPress={onButtonPress} 
            color={stylesForm.button.backgroundColor} 
          />
        </View>
      );
}
