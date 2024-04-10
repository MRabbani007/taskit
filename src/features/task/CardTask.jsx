import { useContext, useState } from "react";
// Imported Data
// Imported Media
import IMG_Delete from "../../assets/trash.png";
import IMG_Edit from "../../assets/edit.png";
import IMG_Done from "../../assets/done.png";
import { GlobalContext } from "../../context/GlobalState";
import CardEditTask from "./CardEditTask";
import CardTaskDetails from "./CardTaskDetails";
import CardTaskPriority from "./CardTaskPriority";
import CardTaskTags from "./CardTaskTags";
import CardTaskDueDate from "./CardTaskDueDate";
import CardTaskTabs from "./CardTaskTabs";
import { getDate } from "../../data/utils";

const CardTask = ({ task }) => {
  const { handleDeleteTask, handleToggleTask } = useContext(GlobalContext);
  // View/hide edit title
  const [edit, setEdit] = useState(false);
  // Expand/Collapse item block
  const [expand, setExpand] = useState(false);

  const [taskTab, setTaskTab] = useState("");

  // hold due date value
  const [dueDate, setDueDate] = useState(() => {
    if (task?.dueDate) {
      if (task.dueDate.includes("1900-01-01")) {
        return getDate();
      } else {
        return task.dueDate.substr(0, 10);
      }
    }
  });

  const toggleCompleted = (e) => {
    handleToggleTask(task.id, !task.completed); // e.target.checked
  };

  const toggleExpand = () => {
    if (expand) {
      setTaskTab("");
    }
    setExpand(!expand);
  };

  const toggleTaskTab = (tab) => {
    if (taskTab === tab) {
      setTaskTab("");
    } else {
      setTaskTab(tab);
    }
  };

  return (
    <li
      key={task.id}
      className="flex flex-col flex-wrap justify-between w-full my-3 font-normal shadow-sm hover:shadow-slate-950 shadow-slate-400 duration-300 icon-cont rounded-md overflow-hidden"
      // implement draggable
      // draggable="true"
      // onDragStart={(e) => {
      //   dragItemStart(e, listID, index);
      // }}
      // onDragEnter={(e) => dragItemEnter(e, listID, index)}
      // onDragEnd={dragItemEnd}>
    >
      {/* Item Title */}
      <div className="flex items-center h-full p-2">
        <label htmlFor="">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleted}
            className="mr-3"
          />
          {/* <span className="bubble"></span> */}
        </label>
        {edit ? (
          <CardEditTask task={task} setEdit={setEdit} />
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col">
              <p onClick={toggleExpand} className="cursor-pointer">
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
      <div
        className={
          (expand
            ? "border-[1px] border-dashed p-2 visible"
            : "invisible -translate-y-2 h-0") + " duration-200"
        }
      >
        {/* Toggle Task Content */}
        <CardTaskTabs toggleTaskTab={toggleTaskTab} />
        <div className="pl-5">
          {/* Details */}
          <CardTaskDetails task={task} taskTab={taskTab} />
          {/* Due Date */}
          <CardTaskDueDate task={task} taskTab={taskTab} />
          {/* Priority */}
          <CardTaskPriority task={task} taskTab={taskTab} />
          {/* Tags */}
          <CardTaskTags task={task} taskTab={taskTab} />
        </div>
      </div>
    </li>
  );
};

export default CardTask;
