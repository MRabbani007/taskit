import { useContext, useEffect, useRef, useState } from "react";
import CardTaskDueDate from "./CardTaskDueDate";
import { GlobalContext } from "../../context/GlobalState";
import CardEditTask from "./CardEditTask";
import CardTaskPriority from "./CardTaskPriority";
import { CiTrash } from "react-icons/ci";
import { FaTag } from "react-icons/fa6";
import FormTagAdd from "./FormTagAdd";
import { IoPricetagOutline } from "react-icons/io5";
import { AiOutlineUnorderedList } from "react-icons/ai";

const CardTaskBlock = ({ task, openList = false }) => {
  const { handleOpen, handleUpdateTask, handleDeleteTask } =
    useContext(GlobalContext);

  // View/hide edit title
  const [edit, setEdit] = useState(false);
  const [addTag, setAddTag] = useState(false);

  const toggleCompleted = async () => {
    await handleUpdateTask({ ...task, completed: !task.completed });
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
                  checked={task.completed}
                  onChange={() => {}}
                  className="invisible absolute"
                />
                <button
                  className="bubble"
                  onClick={() => toggleCompleted()}
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
            <p className="flex flex-wrap items-center gap-3">
              {Array.isArray(task.tags)
                ? task.tags.map((tag, index) => {
                    return (
                      <span
                        key={index}
                        className=" flex items-center py-1 pl-3 pr-4 m-1 w-fit rounded-full bg-slate-200"
                      >
                        <FaTag className="icon-sm mr-1" />
                        {tag?.name}
                        <CiSquareRemove
                          onClick={() => {
                            handleDeleteTag(tag);
                          }}
                        />
                      </span>
                    );
                  })
                : null}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDelete}
              className="invisible group-hover:visible duration-200"
            >
              <CiTrash size={32} />
            </button>
            {openList === true ? (
              <button
                title="Open List"
                onClick={() => {
                  console.log(task);
                  handleOpen(task?.listID);
                }}
                className="invisible group-hover:visible duration-200"
              >
                <AiOutlineUnorderedList size={32} />
              </button>
            ) : null}
            <button onClick={() => {}}>
              <IoPricetagOutline size={32} />
              {/* <IoPricetag /> */}
            </button>
          </div>
        </div>
      </div>
      {edit ? <CardEditTask task={task} setEdit={setEdit} /> : null}
      {addTag ? <FormTagAdd /> : null}
    </div>
  );
};

export default CardTaskBlock;
