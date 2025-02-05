import { useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../../context/TaskState";
// Components
import CardTaskBlock from "../../../features/task/CardTaskBlock";
import TaskFilter from "../../../features/task/TaskFilter";
import TaskSort from "../../../features/task/TaskSort";
// Icons
import Loading from "../../../features/components/Loading";
import { BiFilter, BiPlus, BiSort } from "react-icons/bi";
import FormTaskAdd from "../../../features/task/FormTaskAdd";
import { MdOutlineChecklist } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../features/navigation/Pagination";
import CardTask from "@/features/task/CardTask";
import FormTaskEdit from "@/features/task/FormTaskEdit";
import {
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";
import PageLinks from "@/features/navigation/PageLinks";

const TaskFilters = [
  {
    label: "My Tasks",
    icon: <MdOutlineChecklist size={25} />,
    url: "/tasks",
    filter: "all",
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
  {
    label: "Today",
    icon: <IoTodayOutline size={25} />,
    url: "/tasks/today",
    filter: "today",
    bg: "bg-blue-200 text-blue-600 hover:text-blue-600 hover:bg-blue-300",
  },
  {
    label: "This Week",
    icon: <BsCalendar4Week size={25} />,
    url: "/tasks/week",
    filter: "week",
    bg: "bg-green-200 text-green-600 hover:text-green-600 hover:bg-green-300",
  },
  {
    label: "Important",
    icon: <IoStarOutline size={25} />,
    url: "/tasks/important",
    filter: "important",
    bg: "bg-yellow-200 text-yellow-500 hover:text-yellow-500 hover:bg-yellow-300",
  },
  {
    label: "Overdue",
    icon: <IoRepeatOutline size={25} />,
    url: "/tasks/overdue",
    filter: "overdue",
    bg: "bg-red-200 text-red-500 hover:text-red-500 hover:bg-red-300",
  },
];

export default function TasksPage() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  const { tasks, count, handleGetTasks, status, filters, setFilters } =
    useContext(TaskContext);

  useEffect(() => {
    handleGetTasks({ type: "PAGE", page });
  }, [page]);

  const [addTask, setAddTask] = useState(false);
  const [current, setCurrent] = useState(1);

  const [viewEditTask, setViewEditTask] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const pageItems = tasks.slice((current - 1) * 10, current * 10);

  let content;

  if (status?.isLoading) {
    content = <Loading />;
  } else if (status?.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status?.isSuccess && tasks.length === 0) {
    content = <p>You don't have any tasks, add new tasks</p>;
  } else if (status?.isSuccess) {
    content = (
      <ul className="flex items-stretch gap-4 flex-wrap">
        {pageItems.map((task) => {
          return (
            <CardTask
              task={task}
              key={task.id}
              setEdit={setViewEditTask}
              setEditItem={setEditTask}
            />
            // <CardTaskBlock
            //   idx={idx}
            //   task={task}
            //   key={task?.id}
            //   openList={true}
            //   isDraggable={false}
            // />
          );
        })}
      </ul>
    );
  }

  return (
    <main>
      <div className="bg-gradient-to-r via-sky-800 from-zinc-800 to-sky-600 shadow-md shadow-zinc-500 pt-4 pb-8 px-2 flex flex-col items-start rounded-xl">
        <header className="py-2 px-4 bg-gradient-to-br from-sky-600 to-sky-950 bg-clip-text gap-4 self-stretch text-white">
          {/* <MdOutlineChecklist size={40} /> */}
          <div className="flex-1">
            <h1 className="py-1 px-4 bg-white/20 rounded-lg w-fit">Tasks</h1>
          </div>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={() =>
              setFilters((curr) => ({ ...curr, viewFilter: true }))
            }
          >
            <BiFilter size={30} />
          </button>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={() => setFilters((curr) => ({ ...curr, viewSort: true }))}
          >
            <BiSort size={30} />
          </button>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={() => setAddTask(true)}
          >
            <BiPlus size={30} />
          </button>
        </header>
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center justify-center gap-4 px-4 mt-4">
            {TaskFilters.map((item) => (
              <Link
                to={`/tasks?filter=${item?.filter}`}
                key={item.label}
                className={
                  item.bg +
                  " p-2 rounded-md duration-200 shadow-md shadow-zinc-600 border-[1px] border-white/80"
                }
              >
                {item.icon}
              </Link>
            ))}
          </div>
          <PageLinks />
        </div>
      </div>
      {filters?.viewFilter === true ? <TaskFilter /> : null}
      {filters?.viewSort ? <TaskSort /> : null}
      {content}
      <Pagination page={page} count={count} className={"mx-auto"} />
      {addTask ? (
        <FormTaskAdd listID={""} add={addTask} setAdd={setAddTask} />
      ) : null}
      {viewEditTask && editTask && (
        <FormTaskEdit
          task={editTask}
          edit={viewEditTask}
          setEdit={setViewEditTask}
        />
      )}
    </main>
  );
}
