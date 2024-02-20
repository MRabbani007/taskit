import React from "react";
import EditItemImage from "../assets/edit.png";
import DeleteItemImage from "../assets/delete.png";
import { FaBars, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import CardItem from "./CardItem";

// Display todo items in todo list
const TodoItems = ({
  tasks,
  handleToggleTask,
  handleDeleteTask,
  handleUpdateTask,
  listID,
  dragItemStart,
  dragItemEnter,
  dragItemEnd,
}) => {
  if (!tasks || !Array.isArray(tasks)) {
    return null;
  } else {
    return (
      <ul className="text-lg" key={listID}>
        {tasks.length != 0 &&
          tasks.map((task, index) => {
            if (task == null || task === "undefined") return;
            return (
              <CardItem
                key={index}
                task={task}
                listID={listID}
                dragItemStart={dragItemStart}
                dragItemEnter={dragItemEnter}
                dragItemEnd={dragItemEnd}
                handleToggleTask={handleToggleTask}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
              />
            );
          })}
      </ul>
    );
  }
};

export default TodoItems;
