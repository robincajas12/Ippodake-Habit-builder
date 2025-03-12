import { Dimensions } from "react-native";

export default function _vw(vw : number)
{
    if(Dimensions.get('screen').width > Dimensions.get('screen').height) return Dimensions.get('screen').height * (vw/100)
    return Dimensions.get('screen').width * (vw/100)
}
export function _vh(vh : number)
{
    if(Dimensions.get('screen').width > Dimensions.get('screen').height) return Dimensions.get('screen').width * (vh/100)
    return Dimensions.get('screen').height * (vh/100)
}