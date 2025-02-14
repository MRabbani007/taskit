import { TaskContext } from "@/context/TaskState";
import useDebounce from "@/hooks/useDebounce";
import { getDueDateStatement } from "@/lib/dateFunctions";
import { Button, Popconfirm, message } from "antd";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";

const priorityObj = {
  1: "low",
  2: "normal",
  3: "medium",
  4: "important",
  5: "high",
};

const bgColorObj = {
  1: "#0284c7",
  2: "#16a34a",
  3: "#eab308",
  4: "#f97316",
  5: "#dc2626",
};

const color = {
  "bg-red-600": "bg-red-200",
  "bg-sky-600": "bg-sky-100",
  "bg-green-600": "bg-green-100",
  "bg-yellow-500": "bg-yellow-100",
  "bg-orange-600": "bg-orange-200",
  "bg-zinc-600": "bg-zinc-200",
};

export default function CardTask({
  task,
  setEdit,
  setEditItem,
}: {
  task: Task;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Task | null>>;
}) {
  const { handleUpdateTask, handleDeleteTask } = useContext(TaskContext);
  const [completed, setCompleted] = useState(task?.completed === true);

  const debounceCompleted = useDebounce(completed, 1000);
  const isMounted = useRef<boolean>();

  useEffect(() => {
    if (isMounted?.current === true && debounceCompleted !== task?.completed) {
      handleUpdateTask({ ...task, completed: !task.completed });
    }
  }, [debounceCompleted]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const bgColor = bgColorObj[task?.priorityLevel as keyof typeof bgColorObj];

  const confirm = () => {
    handleDeleteTask(task?.id);
    toast.success("Task Deleted");
  };

  const {
    status,
    message: displayMessage,
    displayDate,
  } = getDueDateStatement(
    new Date((task?.dueDate).toLocaleString().substring(0, 10))
  );

  return (
    <div
      className={
        (task?.color === ""
          ? "bg-stone-100 "
          : `${color[task.color as keyof typeof color]}`) +
        " rounded-lg relative flex-1 flex items-stretch gap-2 group/main"
      }
    >
      <div className="py-3 pl-2">
        <input
          type="checkbox"
          className="bg-transparent"
          checked={completed}
          onChange={() => setCompleted((curr) => !curr)}
        />
      </div>
      <div className="flex-1 flex flex-col py-3 pr-2">
        {task?.title !== "" && (
          <p
            className="font-bold text-zinc-900 cursor-pointer"
            onClick={() => {
              setEdit(true);
              setEditItem(task);
            }}
          >
            {task.title}
          </p>
        )}
        {task?.task !== "" && (
          <p
            className="font-medium text-zinc-900 cursor-pointer"
            onClick={() => {
              setEdit(true);
              setEditItem(task);
            }}
          >
            {task.task}
          </p>
        )}
        {task?.details !== "" && (
          <p className="whitespace-break-spaces text-sm text-zinc-800">
            {task?.details}
          </p>
        )}
        {task?.notes !== "" && (
          <p className="text-xs whitespace-break-spaces text-cyan-800">
            {task?.notes}
          </p>
        )}
        {task?.link && task?.link !== "" && (
          <Link
            to={task?.link}
            target="_blank"
            className="whitespace-break-spaces text-sm text-zinc-800"
          >
            {task?.linkText ?? task?.link}
          </Link>
        )}
        <div className="flex items-center gap-2 mt-auto">
          <div className="relative group flex text-xs font-medium">
            <span
              style={{ backgroundColor: bgColor }}
              className={
                (task?.priorityLevel > 3 ? "animate-pulse" : "") +
                " w-3 h-3 shadow-sm shadow-zinc-700 rounded-full cursor-pointer"
              }
            ></span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 py-1 px-2 bg-zinc-100 rounded-md z-10 invisible opacity-0 -translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 duration-200">
              {task?.priority}
            </span>
          </div>
          <div className="flex-1 flex items-center text-sm">
            <p className=" text-zinc-700 relative group cursor-pointer">
              <span>{displayMessage}</span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap py-1 px-2 text-xs bg-zinc-200 rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100">
                {displayDate}
              </span>
            </p>
            {task?.status && task?.status.trim() && (
              <p className="ml-auto">{task?.status}</p>
            )}
          </div>
        </div>
      </div>
      <Popconfirm
        title="Delete task"
        description="Are you sure you want to delete this task?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
        placement="topRight"
        className=" absolute top-1 right-1 invisible opacity-0 group-hover/main:opacity-100 group-hover/main:visible duration-200"
      >
        <Button
          type="text"
          className="flex items-center justify-center m-0 p-0"
        >
          <CiTrash size={20} className="inline" />
        </Button>
      </Popconfirm>
    </div>
  );
}
