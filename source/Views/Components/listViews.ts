import History from "../History/History";
import Home from "../Home/Home";
import Todo from "../Todo/Todo";

const listView = {
    Home,
    History,
    Todo
}
export type ListViewKey = keyof typeof listView;
export default listView