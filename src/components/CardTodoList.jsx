import React, { useEffect, useState } from "react";
// Imported Components
import TodoItems from "./TodoItems";
import AddTodoItem from "./AddTodoItem";
import CardIcons from "./CardIcons";
// Imported Data
import { ACTIONS, fetchServer } from "../data/serverFunctions";
import { IMAGES_Icons } from "../data/templates";
// Imported Media
import IMG_Close from "../assets/close.png";
import IMG_Cancel from "../assets/cancel.png";
import IMG_Save from "../assets/save.png";
import IMG_Edit from "../assets/edit.png";

const CardTodoList = ({
  userName,
  displayList,
  handleLists,
  handleClose,
  dragItemStart,
  dragItemEnter,
  dragItemEnd,
}) => {
  const [tasks, setTasks] = useState([]);
  const [taskAdded, setTaskAdded] = useState(false);
  const [editListTitle, setEditListTitle] = useState(false);
  const [editListIcon, setEditListIcon] = useState(false);
  const [editInput, setEditInput] = useState(displayList.title);

  const handleGetTasks = async () => {
    let data = await fetchServer({
      type: ACTIONS.GET_TASKS,
      userName: userName,
      listID: displayList.id,
    });
    setTasks(data);
  };

  const handleAddTask = async (taskTitle) => {
    await fetchServer({
      type: ACTIONS.CREATE_TASK,
      userName: userName,
      listID: displayList.id,
      taskTitle: taskTitle,
    });
    handleGetTasks();
  };

  const handleDeleteTask = async (taskID) => {
    await fetchServer({
      type: ACTIONS.REMOVE_TASK,
      userName: userName,
      listID: displayList.id,
      taskID: taskID,
    });
    handleGetTasks();
  };

  const handleUpdateTask = async (taskID, updateItem, newValue) => {
    await fetchServer({
      type: ACTIONS.UPDATE_TASK,
      userName: userName,
      listID: displayList.id,
      taskID: taskID,
      updateItem: updateItem,
      newValue: newValue,
    });
    handleGetTasks();
  };

  // Toggle edit list title
  const toggleEdit = () => {
    setEditListTitle(!editListTitle);
  };

  // Handle update list title
  const handleEditList = async () => {
    handleLists({
      type: ACTIONS.UPDATE_LIST,
      listID: displayList.id,
      updateItem: "list_title",
      newValue: editInput,
    });
    toggleEdit();
  };

  // Handle update list icon
  const handleIcon = (icon) => {
    handleLists({
      type: ACTIONS.UPDATE_LIST,
      listID: displayList.id,
      updateItem: "list_icon",
      newValue: icon,
    });
    setEditListIcon(false);
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className="w-full border-[1px] m-2" key={displayList.id}>
      {/* List Name */}
      <div className="flex justify-between items-center px-4 py-3 text-xl font-normal text-amber-700 border-4 border-amber-700">
        <span className="flex items-center">
          {editListIcon ? (
            <>
              <CardIcons handleIcon={handleIcon} />
              <img
                src={IMG_Cancel}
                alt=""
                onClick={() => setEditListIcon(false)}
                className="icon-lg"
              />
            </>
          ) : displayList.icon === "" ? (
            <img
              src={IMAGES_Icons + "list-2.png"}
              alt=""
              className="icon-lg"
              onClick={() => setEditListIcon(true)}
            />
          ) : (
            <img
              src={IMAGES_Icons + displayList.icon}
              alt=""
              className="icon-lg mr-2"
              onClick={() => setEditListIcon(true)}
            />
          )}
          {editListTitle ? (
            <input
              type="text"
              className="p-0"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
          ) : (
            <p>{displayList.title}</p>
          )}
        </span>
        <span>
          {editListTitle ? (
            <>
              <img
                src={IMG_Save}
                alt=""
                onClick={() => handleEditList()}
                className="icon-lg"
              />
              <img
                src={IMG_Cancel}
                alt=""
                onClick={() => toggleEdit()}
                className="icon-lg"
              />
            </>
          ) : (
            <img
              src={IMG_Edit}
              alt=""
              onClick={() => toggleEdit()}
              className="icon-lg"
            />
          )}
          <img
            src={IMG_Close}
            alt=""
            onClick={() => handleClose(displayList.id)}
            className="icon-lg"
          />
        </span>
        {/* <FaTimes  /> */}
      </div>
      {/* List Todo Items */}
      <div className="text-sm p-2">
        {/* Add new todo Item */}
        <AddTodoItem
          handleAddTask={handleAddTask}
          listID={displayList.id}
          taskAdded={taskAdded}
          setTaskAdded={setTaskAdded}
        />
        {/* Display Todo Items */}
        <TodoItems
          tasks={tasks}
          listID={displayList.id}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
          dragItemStart={dragItemStart}
          dragItemEnter={dragItemEnter}
          dragItemEnd={dragItemEnd}
        />
      </div>
    </div>
  );
};

export default CardTodoList;
