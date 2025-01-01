import { Dimensions } from "react-native";

export default function _vw(vw : number)
{
    return Dimensions.get('screen').width * (vw/100)
}
export function _vh(vh : number)
{
    return Dimensions.get('screen').height * (vh/100)
}