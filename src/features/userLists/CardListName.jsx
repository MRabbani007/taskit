import React, { useContext, useEffect, useState } from "react";
// Imported Data
import { IMAGES_Icons } from "../../data/templates";
import { ACTIONS } from "../../data/actions";
// Imported Media
import IMG_Delete from "../../assets/trash.png";
import IMG_Edit from "../../assets/edit.png";
import IMG_Cancel from "../../assets/cancel.png";
import IMG_Save from "../../assets/save.png";
import { GlobalContext } from "../../context/GlobalState";

const CardListName = ({ taskList }) => {
  const { handleUpdateList, handleOpen, listSummary } =
    useContext(GlobalContext);

  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(taskList?.title || "");
  const [summary, setSummary] = useState({});

  useEffect(() => {
    let temp = {};
    if (listSummary.length !== 0) {
      temp = listSummary.find((item) => item._id === taskList.id);
      if (!!temp) {
        setSummary(temp);
      }
    }
  }, [listSummary]);

  return (
    <li
      key={taskList.id}
      className="flex items-center flex-1 min-w-fit py-1 px-3 shadow-sm shadow-slate-600 rounded-md"
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
              className="icon-md mr-1"
              onClick={() => {
                handleUpdateList(taskList.id, "list_title", editInput);
                setEdit(false);
              }}
            />
            <img
              src={IMG_Cancel}
              alt=""
              className="icon-md mr-1"
              onClick={() => {
                setEdit(false);
              }}
            />
            <img
              src={IMG_Delete}
              alt=""
              className="icon-md cursor-pointer"
              onClick={() => handleUpdateList(taskList.id, "trash", true)}
            />
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between icon-cont w-full">
          <span className="flex items-center">
            <img src={IMAGES_Icons + taskList.icon} className="icon-lg mr-2" />
            <span>
              <span
                className="text-lg font-bold text-slate-800 px-0 cursor-pointer"
                onClick={() => {
                  handleOpen(taskList.id);
                }}
              >
                {taskList.title}
              </span>
              <p>
                {(summary?.total ? summary?.total : 0) +
                  (summary?.total === 1 ? " task" : " tasks, ") +
                  ((summary?.pending ? summary?.pending : 0) + " open")}
              </p>
            </span>
          </span>
          <span className="flex items-center ml-2 icon-item">
            <img
              src={IMG_Edit}
              alt=""
              className="icon-md mr-1 cursor-pointer"
              onClick={() => setEdit(true)}
            />
            <img
              src={IMG_Delete}
              alt=""
              className="icon-md cursor-pointer"
              onClick={() => handleUpdateList(taskList.id, "trash", true)}
            />
          </span>
        </div>
      )}
    </li>
  );
};

export default CardListName;
