import { useContext } from "react";
import CardItem from "./CardItem";
import { GlobalContext } from "../context/GlobalState";

// Display todo items in todo list
const TodoItems = ({ listID }) => {
  const { listTasks: tasks } = useContext(GlobalContext);

  return (
    <ul className="text-lg" key={listID}>
      {Array.isArray(tasks) &&
        tasks.map((task) => {
          return <CardItem key={task.id} task={task} />;
        })}
    </ul>
  );
};

export default TodoItems;
