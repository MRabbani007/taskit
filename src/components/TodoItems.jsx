import React, { useContext } from "react";
import EditItemImage from "../assets/edit.png";
import DeleteItemImage from "../assets/delete.png";
import { FaBars, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import CardItem from "./CardItem";
import { GlobalContext } from "../context/GlobalState";

// Display todo items in todo list
const TodoItems = ({ listID }) => {
  const { listTasks: tasks } = useContext(GlobalContext);

  if (!tasks || !Array.isArray(tasks)) {
    return null;
  } else {
    return (
      <ul className="text-lg" key={listID}>
        {tasks.length !== 0 &&
          tasks.map((task) => {
            if (task === null || task === undefined) return;
            return <CardItem key={task.id} task={task} />;
          })}
      </ul>
    );
  }
};

export default TodoItems;
