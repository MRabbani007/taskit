import { useContext, useEffect, useRef, useState } from "react";
// Imported Context
import { TaskContext } from "../../context/TaskState";
import { ListContext } from "../../context/ListState";
// Hooks
import useDebounce from "../../hooks/useDebounce";
// Imported Components
import FormTaskEdit from "./FormTaskEdit";
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

export const AcceptTypes = {
  Note: "Note",
};

const CardTaskBlock = ({
  task,
  idx,
  openList = false,
  isDraggable = false,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: {
  task: Task;
  idx: number;
  openList: boolean;
  isDraggable: boolean;
  onDragStart?: (params: any) => void;
  onDragEnter?: (params: any) => void;
  onDragEnd?: (params?: any) => void;
}) => {
  const { handleOpen } = useContext(ListContext);
  const { handleUpdateTask, handleDeleteTask, handleDeleteTag } =
    useContext(TaskContext);

  // View/hide edit title
  const [edit, setEdit] = useState(false);
  const [addTag, setAddTag] = useState(false);
  const [editTag, setEditTag] = useState<Tag | null>(null);

  const [completed, setCompleted] = useState(task?.completed || false);
  const debounceCompleted = useDebounce(completed, 1000);

  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  // const [{ isDragging }, drag] = useDrag({
  //   type: AcceptTypes.Note,
  //   item: { id: note.id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current === true && debounceCompleted !== task?.completed) {
      handleUpdateTask({ ...task, completed: !task.completed });
    }
  }, [debounceCompleted]);

  const confirm = () => {
    handleDeleteTask(task?.id);
    message.success("Task Deleted");
  };

  const handleTagDelete = (tag: Tag) => {
    handleDeleteTag({ ...tag, taskID: task?.id });
  };

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

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart && onDragStart({ id: task.id, type: "task", index: idx });
  };
  const handleDragEnter = () => {
    onDragEnter && onDragEnter({ id: task.id, type: "task", index: idx });
    setIsOver(true);
  };
  const handleDragLeave = () => {
    setIsOver(false);
  };
  const handleDragEnd = () => {
    onDragEnd && onDragEnd();
    setIsDragging(false);
    setIsOver(false);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      className="flex items-stretch flex-1 mb-4 w-full"
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderWidth: isOver ? "2px" : "0px",
        borderColor: isOver ? "grey" : "",
        cursor: isDraggable ? "move" : "default",
      }}
    >
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
          <p className="whitespace-break-spaces ml-10">{task?.details}</p>
          {/* Due Date */}
          <CardTaskDueDate task={task} />
          <p className="flex flex-wrap items-center gap-3">{taskTags}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popconfirm
            title="Delete task"
            description="Are you sure you want to delete this task?"
            onConfirm={confirm}
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
          </button>
        </div>
      </div>
      {edit ? <FormTaskEdit task={task} edit={edit} setEdit={setEdit} /> : null}
      {addTag ? (
        <FormTagAdd task={task} addTag={addTag} setAddTag={setAddTag} />
      ) : null}
      {editTag?.name ? (
        <FormTagEdit task={task} setEditTag={setEditTag} tag={editTag} />
      ) : null}
    </div>
  );
};

export default CardTaskBlock;
