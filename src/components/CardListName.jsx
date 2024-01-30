import React, { useState } from "react";
// Imported Data
import { IMAGES_Icons } from "../data/templates";
import { ACTIONS } from "../data/serverFunctions";
// Imported Media
import IMG_Delete from "../assets/trash.png";
import IMG_Edit from "../assets/edit.png";
import IMG_Cancel from "../assets/cancel.png";
import IMG_Save from "../assets/save.png";

const CardListName = ({
  taskList,
  handleOpen,
  handleLists,
  handleSidebar,
  toggleCreateList,
  dragStart,
  dragEnter,
  dragEnd,
}) => {
  const [edit, setEdit] = useState(false);
  const handleToggleEdit = () => {
    setEdit(!edit);
  };
  const [editInput, setEditInput] = useState(taskList.title);

  return (
    <li
      key={taskList.id}
      className="flex items-center w-full draggable"
      draggable="true"
      onDragStart={(e) => {
        dragStart(e, index);
      }}
      onDragEnter={(e) => dragEnter(e, index)}
      onDragEnd={dragEnd}
    >
      {/* Edit List Title */}
      {edit ? (
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <img src={IMAGES_Icons + taskList.icon} className="icon-lg mr-2" />
            <input
              type="text"
              className="w-[150px] h-auto p-0 text-slate-950 font-normal"
              value={editInput}
              onChange={(e) => {
                setEditInput(e.target.value);
              }}
            />
          </span>
          <span className="flex items-center ml-2">
            <img
              src={IMG_Save}
              alt=""
              className="icon mr-1"
              onClick={() => {
                handleLists({
                  type: ACTIONS.UPDATE_LIST,
                  listID: taskList.id,
                  updateItem: "list_title",
                  newValue: editInput,
                });
                handleToggleEdit();
              }}
            />
            <img
              src={IMG_Cancel}
              alt=""
              className="icon mr-1"
              onClick={() => {
                handleToggleEdit();
              }}
            />
            <img
              src={IMG_Delete}
              alt=""
              className="icon cursor-pointer"
              onClick={() =>
                handleLists({
                  type: ACTIONS.UPDATE_LIST,
                  listID: taskList.id,
                  updateItem: "trash",
                })
              }
            />
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between icon-cont">
          <span className="flex items-center">
            <img src={IMAGES_Icons + taskList.icon} className="icon-lg mr-2" />
            <span
              className="text-[14px] px-0 cursor-pointer"
              onClick={() => {
                handleOpen(taskList.id);
                handleSidebar();
              }}
            >
              {taskList.title}
            </span>
          </span>
          <span className="flex items-center ml-2 icon-item">
            <img
              src={IMG_Edit}
              alt=""
              className="icon mr-1 cursor-pointer"
              onClick={() => handleToggleEdit()}
            />
            <img
              src={IMG_Delete}
              alt=""
              className="icon cursor-pointer"
              onClick={() =>
                handleLists({
                  type: ACTIONS.UPDATE_LIST,
                  listID: taskList.id,
                  updateItem: "trash",
                })
              }
            />
          </span>
        </div>
      )}
    </li>
  );
};

export default CardListName;
