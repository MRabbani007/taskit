import { useContext, useEffect, useRef, useState } from "react";
// Imported Context
import { TaskContext } from "../../context/TaskState";
import { ListContext } from "../../context/ListState";
// Hooks
import useDebounce from "../../hooks/useDebounce";
// Imported Components
import CardEditTask from "./CardEditTask";
import CardTaskPriority from "./CardTaskPriority";
import CardTaskDueDate from "./CardTaskDueDate";
import FormTagAdd from "./FormTagAdd";
import FormTagEdit from "./FormTagEdit";
// Icons
import { IoPricetagOutline } from "react-icons/io5";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { FaTag } from "react-icons/fa6";
import { BiX } from "react-icons/bi";
import { Button, Popconfirm, message } from "antd";

const CardTaskBlock = ({ task, openList = false }) => {
  const { handleOpen } = useContext(ListContext);
  const { handleUpdateTask, handleDeleteTask, handleDeleteTag } =
    useContext(TaskContext);

  // View/hide edit title
  const [edit, setEdit] = useState(false);
  const [addTag, setAddTag] = useState(false);
  const [editTag, setEditTag] = useState(null);

  const [completed, setCompleted] = useState(task?.completed || false);
  const debounceCompleted = useDebounce(completed, 1000);

  useEffect(() => {
    if (debounceCompleted !== task?.completed) {
      handleUpdateTask({ ...task, completed: !task.completed });
      message.success("Task updated");
    }
  }, [debounceCompleted]);

  const closeMenu = (e) => {
    // if (!menuRef?.current.contains(e.target)) {
    //   setDropDown(false);
    // }
  };

  const confirm = (e) => {
    // console.log(e);
    handleDeleteTask(task?.id);
    message.success("Task Deleted");
  };

  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  const handleTagDelete = (tag) => {
    if (confirm("Delete this tag?"))
      handleDeleteTag({ ...tag, taskID: task?.id });
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const taskTags = task?.tags.map((tag, index) => (
    <span
      key={index}
      className=" flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full bg-slate-200"
    >
      <FaTag className="icon-sm mr-1" />
      <span onClick={() => setEditTag(tag)}>{tag?.name}</span>
      <BiX
        size={28}
        onClick={() => {
          handleTagDelete(tag);
        }}
      />
    </span>
  ));

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-stretch">
        {/* Priority */}
        <CardTaskPriority task={task} />
        {/* Title */}
        <div
          className={
            "flex flex-1 items-center justify-between gap-2 py-2 px-4 bg-zinc-300 group"
          }
        >
          <div className="flex flex-col items-start flex-1">
            <p className="flex flex-1 items-center gap-4 overflow-hidden">
              {/* Completed Button */}
              <label htmlFor="" className="w-6">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => {}}
                  className="invisible absolute"
                />
                <button
                  className="bubble"
                  onClick={() => setCompleted((curr) => !curr)}
                ></button>
              </label>
              <span
                onClick={() => setEdit(true)}
                className="font-medium text-zinc-900 whitespace-wrap text-ellipsis cursor-pointer"
                title={task?.title}
              >
                {task?.title}
              </span>
            </p>
            <p
              onClick={() => setAddDetail(true)}
              className="whitespace-break-spaces ml-10"
            >
              {task?.details}
            </p>
            {/* Due Date */}
            <CardTaskDueDate task={task} />
            <p className="flex flex-wrap items-center gap-3">{taskTags}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Popconfirm
              title="Delete task"
              description="Are you sure you want to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="topRight"
              className=" invisible group-hover:visible duration-200"
            >
              <Button
                type="text"
                className="flex items-center justify-center m-0 p-0"
              >
                <CiTrash size={32} className="inline" />
              </Button>
            </Popconfirm>
            {openList === true ? (
              <button
                title="Open List"
                onClick={() => handleOpen(task?.listID)}
                className=" invisible group-hover:visible duration-200"
              >
                <AiOutlineUnorderedList size={32} />
              </button>
            ) : null}
            <button
              title="Add Tag"
              onClick={() => setAddTag(true)}
              className=" invisible group-hover:visible duration-200"
            >
              <IoPricetagOutline size={25} />
              {/* <IoPricetag /> */}
            </button>
          </div>
        </div>
      </div>
      {edit ? <CardEditTask task={task} setEdit={setEdit} /> : null}
      {addTag ? <FormTagAdd task={task} setAddTag={setAddTag} /> : null}
      {editTag?.name ? (
        <FormTagEdit task={task} setEditTag={setEditTag} tag={editTag} />
      ) : null}
    </div>
  );
};

export default CardTaskBlock;
