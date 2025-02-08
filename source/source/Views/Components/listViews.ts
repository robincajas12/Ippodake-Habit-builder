import Home from "../Home/Home";
import Pet from "../Pet/Pet";
import Todo from "../Todo/Todo";

const listView = {
    Home,
    Pet,
    Todo
}
export type ListViewKey = keyof typeof listView;
export default listView