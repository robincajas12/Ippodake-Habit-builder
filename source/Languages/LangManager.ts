import { chatDataEn } from "./Data/Chat/ChatData/chatDataEn"
import { chatDataEs } from "./Data/Chat/ChatData/chatDataEs"
import { ChatData } from "./Data/Chat/ChatData/chatypes"
import txt_chat_component_en from "./Data/Chat/txt_chat_component_en"
import txt_chat_component_type from "./Data/Chat/txt_chat_component_type"
import goalsEn from "./Data/Goals/goalsEn"
import txt_home_en, {  } from "./Data/Home/txt_home"
import txt_home_type from "./Data/Home/txt_home_type"
export type langsType<T> = {
    [key: string]: T
}
type traslations = {
    chatData : langsType<ChatData>,
    goals : langsType<string[]>,
    Chat : langsType<txt_chat_component_type>
    Home : langsType<txt_home_type>
}
const traslations : traslations = {
    chatData: {
        en: chatDataEn,
        es: chatDataEs
    },
    goals: {
        en: goalsEn
    },
    Chat: {
        en: txt_chat_component_en
    },
    Home : {
        en: txt_home_en
    }
}
export default traslations
export function getTranslation<T>(traslation : langsType<T>, lang: string) : T
{
    if(traslation[lang] == undefined)
    {
        return traslation.en
    }
    return traslation[lang]
}
