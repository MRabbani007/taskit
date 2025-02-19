import { TaskContext } from "@/context/TaskState";
import useDebounce from "@/hooks/useDebounce";
import { getDueDateStatement } from "@/lib/dateFunctions";
import { Button, Popconfirm } from "antd";
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
import { LuBellRing } from "react-icons/lu";
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
      const completedAt = task.completed ? new Date("1999-01-01") : new Date(); //.toLocaleString().substring(0, 10);
      handleUpdateTask({ ...task, completed: !task.completed, completedAt });
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
    isOverdue,
    message: displayMessage,
    displayDate,
  } = getDueDateStatement(
    new Date((task?.dueDate).toLocaleString().substring(0, 10))
  );

  return (
    <div
      className={
        " relative flex flex-col items-stretch group/main overflow-clip"
      }
    >
      {/* Floating div */}
      <div
        className={
          (task?.color === ""
            ? "bg-zinc-100 "
            : `${color[task.color as keyof typeof color]} `) +
          " absolute h-10 top-5 right-5 -z-10 w-8"
        }
      ></div>
      {/* Title Row */}
      <div className="flex items-stretch rounded-t-3xl overflow-clip z-10">
        {/* Left - Completed, Title, Due date */}
        <div
          className={
            (task?.color === ""
              ? "bg-zinc-100 "
              : `${color[task.color as keyof typeof color]} `) +
            " flex-1 flex items-center gap-2 rounded-t-3xl overflow-clip p-4"
          }
        >
          <div
            onChange={() => setCompleted((curr) => !curr)}
            className="scale-70 relative w-5 h-5 ring-2 ring-blue-500 flex items-center justify-center rounded-3xl bg-transparent"
          >
            <input
              type="checkbox"
              className="opacity-0 z-10"
              checked={completed}
              readOnly
            />
            {completed && (
              <span className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-blue-500 z-"></span>
            )}
          </div>
          {task?.title !== "" && (
            <p
              className="flex-1 font-bold text-zinc-900 cursor-pointer"
              onClick={() => {
                setEdit(true);
                setEditItem(task);
              }}
            >
              {task.title}
            </p>
          )}
          <p className=" text-zinc-700 relative group cursor-pointer z-100">
            <span className="text-xs">{displayMessage}</span>
            <span className="absolute top-1/2 left-1/ -translate-x-1/ right-0 whitespace-nowrap py-1 px-2 text-xs bg-indigo-200 rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200">
              {displayDate}
            </span>
          </p>
        </div>
        {/* Right - Notification */}
        <div className="border-l-[4px] border-b-[2px] border-white flex items-stretch rounded-bl-3xl">
          <button
            className={
              (task?.color === ""
                ? "bg-stone-100 "
                : `${color[task.color as keyof typeof color]} `) +
              " hover:opacity-80 duration-200 h-full px-2 rounded-3xl rounded-bl-3xl flex items-center"
            }
          >
            <LuBellRing size={25} className="text-zinc-700" />
          </button>
        </div>
      </div>
      {/* Bottom Row  - Task, details, notes, links, priority */}
      <div
        className={
          (task?.color === ""
            ? "bg-zinc-100 "
            : `${color[task.color as keyof typeof color]} `) +
          " flex-1 flex flex-col rounded-b-xl rounded-tr-3xl"
        }
      >
        <div className={"flex-1 flex flex-col py-2 px-4 pb-4"}>
          {task?.task !== "" && (
            <p
              className="font-medium text-zinc-800 cursor-pointer"
              onClick={() => {
                setEdit(true);
                setEditItem(task);
              }}
            >
              {task.task}
            </p>
          )}
          {task?.details !== "" && (
            <p className="whitespace-break-spaces text-sm text-zinc-600">
              {task?.details}
            </p>
          )}
          {task?.notes !== "" && (
            <p className="text-xs whitespace-break-spaces text-cyan-800">
              {task?.notes}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-auto px-4 pb-4">
          <div className="relative group flex text-xs font-medium items-center gap-1">
            <span
              style={{ backgroundColor: bgColor }}
              className={
                (task?.priorityLevel > 3 ? "animate-pulse" : "") +
                " w-3 h-3 shadow-sm shadow-zinc-700 rounded-full cursor-pointer"
              }
            ></span>
            <span>{task?.priority}</span>
            {/* <span className="absolute top-full left-1/2 -translate-x-1/2 py-1 px-2 bg-zinc-100 rounded-md z-10 invisible opacity-0 -translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 duration-200">
              {task?.priority}
            </span> */}
          </div>
          <div className="flex-1 flex items-center text-sm">
            {/* {task?.status && task?.status.trim() && (
              <p className="ml-auto">{task?.status}</p>
            )} */}
          </div>
          {task?.link && task?.link !== "" && (
            <Link
              to={task?.link}
              target="_blank"
              className="whitespace-break-spaces text-sm text-zinc-800"
            >
              {task?.linkText ?? task?.link}
            </Link>
          )}
          <Popconfirm
            title="Delete task"
            description="Are you sure you want to delete this task?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            placement="topRight"
            className=" invisible opacity-0 group-hover/main:opacity-100 group-hover/main:visible duration-200"
          >
            <Button
              type="text"
              className="flex items-center justify-center p-0"
            >
              <CiTrash size={20} className="inline" />
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}
