import History from "../History/History";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";

const listView = {
    Home,
    History,
    Settings
}
export type ListViewKey = keyof typeof listView;
export default listView