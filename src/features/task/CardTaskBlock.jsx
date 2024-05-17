import { useContext, useEffect, useRef, useState } from "react";
import CardTaskDetails from "./CardTaskDetails";
import CardTaskDueDate from "./CardTaskDueDate";
import CardTaskTags from "./CardTaskTags";
import { GlobalContext } from "../../context/GlobalState";
import CardEditTask from "./CardEditTask";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import TaskDropDown from "./TaskDropDown";
import CardTaskPriority from "./CardTaskPriority";
import { IoIosArrowForward } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { CgMoveTask } from "react-icons/cg";
import { ACTIONS } from "../../data/actions";

const CardTaskBlock = ({ task }) => {
  const { handleUpdateTask, handleDeleteTask } = useContext(GlobalContext);

  // View/hide edit title
  const [edit, setEdit] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  // dropdown menu
  const [dropDown, setDropDown] = useState(false);
  // Expand/Collapse item block
  const [expand, setExpand] = useState(false);
  // Add tags
  const [addTag, setAddTag] = useState(false);

  const menuRef = useRef(null);

  const toggleCompleted = async () => {
    await handleUpdateTask(ACTIONS.UPDATE_TASK_COMPLETE, {
      id: task?.id,
      completed: !task.completed,
    });
  };

  const closeMenu = (e) => {
    // if (!menuRef?.current.contains(e.target)) {
    //   setDropDown(false);
    // }
  };

  const handleDelete = () => {
    if (confirm("Delete this task?")) handleDeleteTask(task?.id);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div className="min-w-[250px] w-full flex flex-col">
      {/* Header */}
      <div className="flex items-stretch">
        {/* Priority */}
        <CardTaskPriority task={task} />
        {/* Title */}
        <div
          className={
            "flex flex-1 items-center justify-between gap-2 py-2 px-4 bg-zinc-300 "
          }
        >
          <div className="flex items-center gap-2">
            {/* Completed Button */}
            <label htmlFor="">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="invisible absolute"
              />
              <button className="bubble" onClick={toggleCompleted}></button>
            </label>
            <div>
              {edit ? (
                <CardEditTask task={task} setEdit={setEdit} />
              ) : (
                <p className="overflow-hidden">
                  <span
                    onClick={() => setEdit(true)}
                    className=" font-light whitespace-nowrap text-ellipsis cursor-pointer"
                    title={task?.title}
                  >
                    {task?.title}
                  </span>
                </p>
              )}
              {/* Due Date */}
              {editDueDate ? (
                <CardTaskDueDate task={task} setEdit={setEditDueDate} />
              ) : (
                <button
                  onClick={() => setEditDueDate(true)}
                  className="p-0 m-0 font-light italic"
                >
                  {task?.dueDate.substr(0, 10)}
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className={
            "rounded-r-full w-[40px] hover:w-[100px] duration-200 cursor-pointer flex items-center justify-end pr-2 group bg-zinc-300 group"
          }
        >
          <button
            onClick={handleDelete}
            className="hidden group-hover:inline-block"
          >
            <CiTrash size={28} />
          </button>
          <button className="hidden group-hover:inline-block">
            <CgMoveTask size={32} />
          </button>
          <button onClick={() => setExpand((curr) => !curr)}>
            <IoIosArrowForward
              size={32}
              className={(expand ? "rotate-90" : "") + " duration-200"}
            />
          </button>
          {/* <BiDotsHorizontalRounded
            className="icon cursor-pointer "
            onClick={() => {
              setDropDown(!dropDown);
            }}
          /> */}
          {/* <TaskDropDown
            dropDown={dropDown}
            ref={menuRef}
            task={task}
            setAddTag={setAddTag}
            setExpand={setExpand}
          /> */}
        </div>
      </div>
      {/* Body */}
      <div
        className={
          (expand ? "" : " invisible opacity-0 h-0 -translate-y-4") +
          " bg-gray-100 p-2 mx-10 flex flex-col duration-200"
        }
      >
        {/* Details */}
        <CardTaskDetails task={task} />
        {/* Tags */}
        <CardTaskTags task={task} addTag={addTag} setAddTag={setAddTag} />
      </div>
    </div>
  );
};

export default CardTaskBlock;
