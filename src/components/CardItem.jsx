import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { FaBars, FaCirclePlus, FaPlus, FaTag } from "react-icons/fa6";
// Imported Data
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { getDate } from "../data/utils";
// Imported Media
import IMG_Delete from "../assets/trash.png";
import IMG_Edit from "../assets/edit.png";
import IMG_Cancel from "../assets/cancel.png";
import IMG_Save from "../assets/save.png";
import IMG_Done from "../assets/done.png";
import IMG_Details from "../assets/details.png";
import IMG_Date from "../assets/date.png";
import IMG_Time from "../assets/time.png";
import IMG_Priority from "../assets/priority.png";
import IMG_Tags from "../assets/tags.png";
import { GlobalContext } from "../context/GlobalState";

const CardItem = ({ task }) => {
  const { handleDeleteTask, handleUpdateTask, handleToggleTask } =
    useContext(GlobalContext);

  // View/hide edit title
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(task.title);
  // Expand/Collapse item block
  const [expand, setExpand] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [viewDueDate, setViewDueDate] = useState(false);
  const [viewPriority, setViewPriority] = useState(false);
  const [viewTags, setViewTags] = useState(false);

  // hold due date value
  const [dueDate, setDueDate] = useState(getDate());

  const [addDetail, setAddDetail] = useState(false);
  const [detailInput, setDetailInput] = useState(task.detail || "");

  const [addTag, setAddTag] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const toggleCompleted = (e) => {
    handleToggleTask(task.id, e.target.checked);
  };

  const handleDueDate = (value) => {
    handleUpdateTask(task.id, "due_date", value);
  };

  const handleDetail = () => {
    handleUpdateTask(task.id, "detail", detailInput);
  };

  const handlePriority = (value) => {
    handleUpdateTask(task.id, "priority", value);
  };

  const handleTag = () => {
    handleUpdateTask(task.id, "add_tag", tagInput);
  };

  useEffect(() => {
    if (task?.dueDate) {
      if (task.dueDate.includes("1900-01-01")) {
        setDueDate("");
      } else {
        setDueDate(task.dueDate.substr(0, 10));
      }
    }
  }, [task?.dueDate]);

  return (
    <li key={task.id}>
      <div
        className="flex flex-col justify-between w-full my-3 font-normal shadow-sm hover:shadow-slate-950 shadow-slate-400 duration-300 icon-cont"
        // implement draggable
        // draggable="true"
        // onDragStart={(e) => {
        //   dragItemStart(e, listID, index);
        // }}
        // onDragEnter={(e) => dragItemEnter(e, listID, index)}
        // onDragEnd={dragItemEnd}
      >
        {/* Item Title */}
        <div className="flex items-center h-full p-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleted}
            className="mr-3"
          />
          {edit ? (
            <form
              onSubmit={() => {
                handleUpdateTask(task.id, "task_title", editInput);
                setEdit(!edit);
              }}
              className="flex w-full items-center justify-between"
            >
              <input
                type="text"
                className="flex-1 text-slate-950 font-normal"
                value={editInput}
                onChange={(e) => {
                  setEditInput(e.target.value);
                }}
              />
              <span className="flex items-center">
                <button>
                  <img src={IMG_Save} alt="" className="icon-md" />
                </button>
                <img
                  src={IMG_Cancel}
                  alt=""
                  className="icon-md"
                  onClick={() => setEdit(!edit)}
                />
              </span>
            </form>
          ) : (
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <p
                  onClick={() => setExpand(!expand)}
                  className="cursor-pointer"
                >
                  {task.title}
                </p>
                {dueDate === "" ? null : (
                  <p className="font-light p-0 my-[-5px]">
                    Due:<span className="ml-1">{dueDate}</span>
                  </p>
                )}
              </div>
              <img
                src={IMG_Edit}
                alt=""
                className="icon-md mr-2 icon-item"
                onClick={() => setEdit(!edit)}
              />
            </div>
          )}
          <img
            src={IMG_Delete}
            alt=""
            onClick={() => handleDeleteTask(task.id)}
            className="icon-md icon-item"
          />
        </div>
        {/* Item Content */}
        <div className={expand ? "border-[1px] border-dashed p-2" : "hidden"}>
          {/* Toggle Task Content */}
          <div className="ml-5">
            <img
              src={IMG_Details}
              alt=""
              className="icon"
              title="Details"
              onClick={() => {
                setViewDetails(!viewDetails);
              }}
            />
            <img
              src={IMG_Date}
              alt=""
              className="icon"
              title="Due Date"
              onClick={() => {
                setViewDueDate(!viewDueDate);
              }}
            />
            <img
              src={IMG_Priority}
              alt=""
              className="icon"
              title="Priority"
              onClick={() => setViewPriority(!viewPriority)}
            />
            <img
              src={IMG_Tags}
              alt=""
              className="icon"
              title="Tags"
              onClick={() => setViewTags(!viewTags)}
            />
          </div>
          {/* Details */}
          {viewDetails && (
            <div className="py-3 flex items-center">
              <h3 className="font-semibold">Details:</h3>
              {task.details === "" ? (
                <FaCirclePlus
                  className="icon mx-3 text-yellow-400"
                  onClick={() => setAddDetail(true)}
                />
              ) : null}
              {addDetail ? (
                <>
                  <input
                    type="text"
                    value={detailInput}
                    onChange={(e) => {
                      setDetailInput(e.target.value);
                    }}
                  />
                  <img
                    src={IMG_Cancel}
                    alt=""
                    className="icon"
                    onClick={() => {
                      setAddDetail(false);
                    }}
                  />
                  <img
                    src={IMG_Done}
                    alt=""
                    className="icon"
                    onClick={() => {
                      handleDetail();
                      setAddDetail(false);
                    }}
                  />
                </>
              ) : (
                <p onClick={() => setAddDetail(true)} className="mx-3">
                  {task.details}
                </p>
              )}
            </div>
          )}
          {/* Due Date */}
          <div className={viewDueDate ? "py-3 flex items-center" : "hidden"}>
            <h3 className="font-semibold">Due Date:</h3>
            {/* date input in format yyyy-mm-dd */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => handleDueDate(e.target.value)}
              className="mx-3 px-3 py-1 outline-none border-[1px] text-slate-950"
            />
            <input
              type="time"
              className="mr-3 px-3 py-1 outline-none border-[1px] text-slate-950"
            />
          </div>
          {/* Priority */}
          {viewPriority && (
            <div className="py-3 flex items-center">
              <h3 className="font-semibold">Priority:</h3>
              <div className="flex">
                <span
                  className={
                    (task.priority === "high" ? "bg-red-400" : "bg-slate-200") +
                    " flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full "
                  }
                  onClick={() => handlePriority("high")}
                >
                  {/* <input type="radio" name={task.id} className="mr-2" /> */}
                  <FcHighPriority className="icon mr-1" />
                  High
                </span>
                <span
                  className={
                    (task.priority === "normal"
                      ? "bg-yellow-200"
                      : "bg-slate-200") +
                    " flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full "
                  }
                  onClick={() => handlePriority("normal")}
                >
                  {/* <input type="radio" name={task.id} className="mr-2" /> */}
                  <FcMediumPriority className="icon mr-2" />
                  Normal
                </span>
                <span
                  className={
                    (task.priority === "low"
                      ? "bg-green-400"
                      : "bg-slate-200") +
                    " flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full "
                  }
                  onClick={() => handlePriority("low")}
                >
                  {/* <input type="radio" name={task.id} className="mr-2" /> */}
                  <FcLowPriority className="icon mr-1" />
                  Low
                </span>
              </div>
            </div>
          )}
          {/* Tags */}
          {viewTags && (
            <div className="py-3 flex items-center">
              <h3 className="font-semibold">Tags:</h3>
              {task.tags.length === 0
                ? null
                : task.tags.map((tag, index) => {
                    return (
                      <span
                        key={index}
                        className=" flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full bg-slate-200"
                      >
                        <FaTag className="icon mr-1" />
                        {tag}
                      </span>
                    );
                  })}
              <span className="">
                <FaCirclePlus
                  className="icon mx-3 text-yellow-400"
                  onClick={() => {
                    setAddTag(true);
                  }}
                />
              </span>
              {addTag ? (
                <>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                    }}
                  />
                  <img
                    src={IMG_Done}
                    alt=""
                    onClick={() => {
                      handleTag();
                      setAddTag(false);
                    }}
                    className="icon"
                  />
                  <img
                    src={IMG_Cancel}
                    alt=""
                    onClick={() => {
                      setAddTag(false);
                    }}
                    className="icon"
                  />
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CardItem;
