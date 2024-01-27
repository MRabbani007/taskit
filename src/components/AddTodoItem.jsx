import React, { useState } from "react";
import AddItemImage from "../assets/add-task.png";
import { FaPlus } from "react-icons/fa6";

const AddTodoItem = ({ listID, handleAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleAddItem(e) {
    e.preventDefault();
    if (newTaskTitle === "") {
      return;
    } else {
      handleAddTask(newTaskTitle);
      setNewTaskTitle("");
    }
  }

  return (
    <form
      action=""
      onSubmit={handleAddItem}
      className=""
      name={"addtodo-" + listID}
    >
      <div className="flex justify-center">
        <input
          type="text"
          className="w-[70%] px-4 py-0 border-[1px] outline-none text-lg font-normal"
          value={newTaskTitle}
          placeholder="New Task"
          onChange={(event) => {
            setNewTaskTitle(event.target.value);
          }}
        />
        <button className="bg-amber-400 font-normal text-sm py-2 px-4">
          <FaPlus className="icon" />
          {/* <img src={AddItemImage} alt="Add-Todo" className="icon" /> */}
        </button>
      </div>
    </form>
  );
};

export default AddTodoItem;
