import { Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import stylesCreateTask from "../../../../Home/styles/stylesCreateTask";


export type CardsButton = {
    id: string;
    name: string;
    emoji: string; // << Aquí agregamos el emoji como un campo aparte
};

interface CardsButtonsProps {
    buttons: CardsButton[];
    onSelect: (id: string) => void;
}

export default function MyCards({ buttons, onSelect }: CardsButtonsProps) {
    const [selectedId, setSelectedId] = useState<string>(buttons[0]?.id || "");

    function onPressBtn(id: string) {
        setSelectedId(id);
        onSelect(id);
    }

    return (
        <ScrollView
            horizontal
            scrollEnabled
            style={[stylesCreateTask.boostBtnScrollView]}
            showsHorizontalScrollIndicator={false}
        >
            <View style={stylesCreateTask.containerBtn}>
                {buttons.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={() => onPressBtn(item.id)}
                        style={[
                            stylesCreateTask.boostBtnContainer,
                            selectedId === item.id && stylesCreateTask.boostBtnContainerSelected
                        ]}
                    >
                        <Text
                            style={[
                                stylesCreateTask.boostBtnEmoji, // puedes crear este estilo o usar uno ya existente
                                selectedId === item.id && stylesCreateTask.boostBtnEmojiSelected
                            ]}
                        >
                            {item.emoji}
                        </Text>
                        <Text
                            style={[
                                stylesCreateTask.boostBtnTxt,
                                selectedId === item.id && stylesCreateTask.boostBtnTxtSelected
                            ]}
                        >
                            {item.name}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}
