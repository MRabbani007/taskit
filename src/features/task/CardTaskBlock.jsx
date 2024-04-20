import { useContext, useEffect, useRef, useState } from "react";
import CardTaskDetails from "./CardTaskDetails";
import CardTaskDueDate from "./CardTaskDueDate";
import CardTaskTags from "./CardTaskTags";
import { GlobalContext } from "../../context/GlobalState";
import CardEditTask from "./CardEditTask";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import TaskDropDown from "./TaskDropDown";

const CardTaskBlock = ({ task }) => {
  const { handleToggleTask } = useContext(GlobalContext);

  // View/hide edit title
  const [edit, setEdit] = useState(false);
  // dropdown menu
  const [dropDown, setDropDown] = useState(false);
  // Expand/Collapse item block
  const [expand, setExpand] = useState(false);
  // Add tags
  const [addTag, setAddTag] = useState(false);

  const menuRef = useRef(null);

  const toggleCompleted = () => {
    handleToggleTask(task?.id, !task.completed); // e.target.checked
  };

  const closeMenu = (e) => {
    if (!menuRef.current.contains(e.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const border =
    task?.priority === "high"
      ? "border-red-600"
      : task?.priority === "normal"
      ? "border-yellow-400"
      : "border-green-600";

  return (
    <div className="min-w-[250px] sm:max-w-[300px] w-full max-h-[250px] flex flex-col">
      {/* Header */}
      <div className={"bg-zinc-300 border-b-4 " + border}>
        <div
          className={
            "flex flex-1 items-center justify-between gap-2 py-2 px-2 border-l-8 " +
            border
          }
        >
          <label htmlFor="">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {}}
              className="invisible absolute"
            />
            <span className="bubble" onClick={toggleCompleted}></span>
          </label>
          {edit ? (
            <CardEditTask task={task} setEdit={setEdit} />
          ) : (
            <div className="max-w-[60%] flex-1 relative group">
              <p className="overflow-hidden">
                <span
                  onClick={() => setEdit(true)}
                  className=" font-light whitespace-nowrap text-ellipsis cursor-pointer"
                >
                  {task?.title}
                </span>
              </p>
              <span className="bg-slate-200 px-2 py-1 invisible group-hover:visible absolute top-8 left-0 max-w-[200px] whitespace-break-spaces z-10">
                {task?.title}
              </span>
            </div>
          )}
          {!edit && (
            <div className="flex">
              <div className="relative">
                <BiDotsHorizontalRounded
                  className="icon cursor-pointer "
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                />
                <TaskDropDown
                  dropDown={dropDown}
                  ref={menuRef}
                  task={task}
                  setAddTag={setAddTag}
                  setExpand={setExpand}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Body */}
      <div
        className={
          (expand ? "" : "hidden") + " bg-gray-100 p-2 flex flex-col h-full"
        }
      >
        {/* Details */}
        <CardTaskDetails task={task} />
        {/* Tags */}
        <CardTaskTags task={task} addTag={addTag} setAddTag={setAddTag} />
      </div>
      {/* Due Date */}
      <CardTaskDueDate task={task} />
    </div>
  );
};

export default CardTaskBlock;
