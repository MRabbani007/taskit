import React from "react";
import EditItemImage from "../assets/edit.png";
import DeleteListImage from "../assets/delete.png";
import { FaBars, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";

const TodoListNames = ({
  listNames,
  deleteList,
  handleOpen,
  dragStart,
  dragEnter,
  dragEnd,
}) => {
  return (
    // container
    <ul className="flex flex-col justify-center items-center w-full m-0 p-0">
      {listNames.length === 0 && "No Todos"}
      {listNames.map((listName, index) => (
        <li
          key={listName.id}
          className="flex justify-between items-center w-[80%] my-2 p-2 shadow-md shadow-slate-900 hover:shadow-slate-400 duration-300 draggable"
          draggable="true"
          onDragStart={(e) => {
            dragStart(e, index);
          }}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={dragEnd}
        >
          <div
            className="flex items-center listname"
            onClick={() => handleOpen(listName.id)}
          >
            <FaBars />
            <p className="text-[14px] px-2">{listName.title}</p>
          </div>
          <div>
            <button>
              <FaEdit />
              {/* <img
                src={EditItemImage}
                alt="Edit-List-Name"
                className="icon mx-2"
              /> */}
            </button>
            <button onClick={() => deleteList(listName.id)}>
              <FaTrashAlt className="mx-2" />
              {/* <img src={DeleteListImage} alt="Delete" className="icon" /> */}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoListNames;
