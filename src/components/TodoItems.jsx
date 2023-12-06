import React from "react";
import EditItemImage from "../assets/edit.png";
import DeleteItemImage from "../assets/delete.png";
import { FaBars, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";

// Display todo items in todo list
const TodoItems = ({
  todoitem,
  toggleTodo,
  deleteTodoItem,
  listID,
  dragItemStart,
  dragItemEnter,
  dragItemEnd,
}) => {
  return (
    <ul className="text-gray-300 text-lg">
      {todoitem.length != 0 &&
        todoitem.map((item, index) => {
          if (item == null || item === "undefined") return;
          return (
            <li
              key={item.id}
              className="flex justify-between items-center w-full my-3 p-2 shadow-md shadow-slate-950 hover:shadow-slate-400 duration-300"
              // implement draggable
              draggable="true"
              onDragStart={(e) => {
                dragItemStart(e, listID, index);
              }}
              onDragEnter={(e) => dragItemEnter(e, listID, index)}
              onDragEnd={dragItemEnd}
            >
              <div>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => toggleTodo(item.id, e.target.checked)}
                  className="mr-3"
                />
                <p>{item.value}</p>
              </div>
              <div>
                <button className="mx-2 p-0">
                  <FaEdit />
                  {/* <img src={EditItemImage} alt="Edit-Button" className="icon" /> */}
                </button>
                <button
                  className="m-0 p-0"
                  onClick={() => deleteTodoItem(listID, item.id)}
                >
                  <FaTrashAlt className="mx-2" />
                  {/* <img
                    src={DeleteItemImage}
                    alt="Delete-Button"
                    className="icon"
                  /> */}
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default TodoItems;
