import { langsType } from "../../../LangManager";

export type txt_create_task_type ={
    pressableText: string,
    txtSubTitle: string
}
const  txt_create_task_en = {
        pressableText: "🛠️ Create task for today",
        txtSubTitle: "Choose your boost for today",
}
const txt_create_task : langsType<txt_create_task_type> = {
    en : txt_create_task_en,
}
export default txt_create_task;