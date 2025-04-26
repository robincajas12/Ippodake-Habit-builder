import { langsType } from "../../Languages/LangManager";

export type txt_history_type = {
    history: string,
    avg: string,
    timeSpend: string
}

const txt_history: langsType<txt_history_type> = {
    en: {
        history: "History",
        avg: "Average (21 days)",
        timeSpend: "Time Spent"
    },
    es: {
        history: "Historial",
        avg: "Promedio (21 días)",
        timeSpend: "Tiempo dedicado"
    }
}

export default txt_history;