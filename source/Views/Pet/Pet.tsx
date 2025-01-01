import { Image, Text, View } from "react-native";
import stylesMainContentView from "../Components/Styles/stylesMainContentView";

export default function Pet()
{
    return(
        <View style={stylesMainContentView.view}>
            <Image source={require('./Sprites/dog.gif')}></Image>
        </View>
    );
}