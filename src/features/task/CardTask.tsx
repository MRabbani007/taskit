import { TaskContext } from "@/context/TaskState";
import useDebounce from "@/hooks/useDebounce";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

export default function CardTask({
  task,
  setEdit,
  setEditItem,
}: {
  task: Task;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Task | null>>;
}) {
  const { handleUpdateTask } = useContext(TaskContext);
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

  return (
    <div className="bg-rose-100/60 rounded-lg relative overflow-hidden flex-1 min-w-[300px] flex items-stretch gap-2">
      <div className="py-4 pl-2">
        <input
          type="checkbox"
          className="bg-transparent"
          checked={completed}
          onChange={() => setCompleted((curr) => !curr)}
        />
      </div>
      <div className="flex-1 flex flex-col py-3 pr-2">
        <p
          className="font-bold text-zinc-900 cursor-pointer"
          onClick={() => {
            setEdit(true);
            setEditItem(task);
          }}
        >
          {task.title}
        </p>
        <p className="whitespace-break-spaces text-sm text-zinc-800">
          {task?.details}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <div
            style={{ backgroundColor: bgColor }}
            className="w-3 h-3 shadow-sm shadow-zinc-700 rounded-full "
          ></div>
          <p className="text-sm text-zinc-700">
            <span>Due: </span>
            {task?.dueDate.toLocaleString().substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
}
