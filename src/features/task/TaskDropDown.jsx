import { forwardRef, useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// Components
import CardTaskPriority from "./CardTaskPriority";
import TaskMoveToList from "./TaskMoveToList";
// Icons
import { CiEdit, CiShoppingTag, CiTrash } from "react-icons/ci";
import { CgMoveTask } from "react-icons/cg";
import { BsChevronExpand } from "react-icons/bs";

const TaskDropDown = forwardRef(
  ({ dropDown, setAddTag, setExpand, task }, ref) => {
    const { handleDeleteTask } = useContext(TaskContext);

    // toggle Move to List
    const [moveToList, setMoveToList] = useState(false);

    const handleDelete = () => {
      if (confirm("Delete this task?")) handleDeleteTask(task?.id);
    };

    useEffect(() => {
      setMoveToList(false);
    }, [dropDown]);

    return (
      <ul
        ref={ref}
        className={
          (dropDown
            ? " opacity-100 translate-y-0"
            : " opacity-0 invisible -translate-y-10") + " task-menu"
        }
      >
        {/* Priority */}
        <li title="Priority" className="task-menu-item">
          <CardTaskPriority task={task} />
        </li>
        <li
          title="Expand"
          className="task-menu-item"
          onClick={() => {
            setExpand((prev) => !prev);
          }}
        >
          <BsChevronExpand className="icon-md" />
          <span>Expand</span>
        </li>
        <li
          title="Edit"
          className="task-menu-item"
          onClick={() => setEdit(true)}
        >
          <CiEdit className="icon-md" />
          <span>Edit</span>
        </li>
        <li
          title="Move To List"
          onClick={() => setMoveToList(!moveToList)}
          className="relative task-menu-item"
        >
          <CgMoveTask className="icon-md" />
          <span>Move To List</span>
          {moveToList && <TaskMoveToList />}
        </li>
        <li
          title="Add Tag"
          className="task-menu-item"
          onClick={() => setAddTag(true)}
        >
          <CiShoppingTag className="icon-md" />
          <span>Add Tag</span>
        </li>
        <li title="Delete" className="task-menu-item" onClick={handleDelete}>
          <CiTrash className="icon-md" />
          <span>Delete</span>
        </li>
      </ul>
    );
  }
);

export default TaskDropDown;
