import React, { useState } from "react";
import AddItemImage from "../assets/add-task.png";

const AddTodoItem = ({ onSubmit, listID }) => {
  const [todoItem, setTodoItem] = useState("");

  function handleAddItem(e) {
    e.preventDefault();
    if (todoItem === "") return;
    onSubmit(listID, todoItem);
    setTodoItem("");
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
          className="w-[70%] rounded-l-3xl px-4 py-2 border-0 outline-none text-sm"
          value={todoItem}
          placeholder="New todo item"
          onChange={(event) => {
            setTodoItem(event.target.value);
          }}
        />
        <button className="bg-amber-400 font-normal rounded-r-3xl text-sm py-2 px-4">
          Add Todo
          {/* <img src={AddItemImage} alt="Add-Todo" className="icon" /> */}
        </button>
      </div>
    </form>
  );
};

export default AddTodoItem;
