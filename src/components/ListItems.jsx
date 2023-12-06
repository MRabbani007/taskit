import React, { useEffect, useState } from "react";
import TodoItems from "./TodoItems";
import AddTodoItem from "./AddTodoItem";
import CloseList from "../assets/cancel.png";
import { FaRegTimesCircle } from "react-icons/fa";

// Display todo list
const ListItems = ({
  displayList,
  addTodoItem,
  deleteTodoItem,
  handleClose,
  dragItemStart,
  dragItemEnter,
  dragItemEnd,
}) => {
  let thisitem;

  function toggleTodo(id, completed) {
    settodoitem((currenttodoitem) => {
      return currenttodoitem.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  return (
    // Container
    <div
      className="w-[400px] min-h-[200px] border-[1px] bg-sky-950 m-2"
      key={displayList.id}
    >
      {/* List Name */}
      <div className="flex justify-between items-center text-xl px-4 py-3 text-gray-300 border-b-2 border-gray-300">
        <p>{displayList.title}</p>
        <FaRegTimesCircle onClick={() => handleClose(displayList.id)} />
        {/* <img
          src={CloseList}
          alt="Close-List"
          className="icon"
          
        /> */}
      </div>

      {/* List Todo Items */}
      <div className="text-sm p-2">
        {/* Add new todo Item */}
        <AddTodoItem onSubmit={addTodoItem} listID={displayList.id} />

        {/* Display Todo Items */}
        <TodoItems
          todoitem={displayList.todoitems}
          listID={displayList.id}
          toggleTodo={toggleTodo}
          deleteTodoItem={deleteTodoItem}
          dragItemStart={dragItemStart}
          dragItemEnter={dragItemEnter}
          dragItemEnd={dragItemEnd}
        />
      </div>
    </div>
  );
};

export default ListItems;
