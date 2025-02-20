import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
// Context
import { TaskContext } from "../../../context/TaskState";
import TaskFilter from "../../../features/task/TaskFilter";
import TaskSort from "../../../features/task/TaskSort";
import { BiFilter, BiPlus, BiSort, BiX } from "react-icons/bi";
import FormTaskAdd from "../../../features/task/FormTaskAdd";
import { MdOutlineChecklist } from "react-icons/md";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Pagination from "../../../features/navigation/Pagination";
import CardTask from "@/features/task/CardTask";
import FormTaskEdit from "@/features/task/FormTaskEdit";
import {
  IoRepeatOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";
import { Switch } from "antd";
import { UserContext } from "@/context/UserState";
import PageHeader from "@/features/components/PageHeader";
import { IoIosSearch } from "react-icons/io";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const filter = searchParams.get("filter") ?? "ALL";
  const search = searchParams.get("q") ?? "";

  const { userSettings } = useContext(UserContext);
  const { tasks, count, handleGetTasks, status, filters, setFilters } =
    useContext(TaskContext);

  const [showCompleted, setShowCompleted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const taskDisplay = userSettings?.taskDisplay ?? "board";

  const handleRemove = () => {
    searchParams.delete("q");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleGetTasks({
      type: filter.toUpperCase() ?? "PAGE",
      page,
      ipp: itemsPerPage,
      comp: showCompleted,
      search,
    });
  }, [page, search, filter, showCompleted]);

  const [addTask, setAddTask] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [viewEditTask, setViewEditTask] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const pageItems = tasks;

  let content;

  if (status?.isLoading) {
    content = (
      <div className="grid grid-cols-3 gap-4 ">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            className="w-full h-20 bg-rose-300/30 animate-pulse rounded-lg"
            key={i}
          />
        ))}
      </div>
    ); //<Loading />;
  } else if (status?.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status?.isSuccess && tasks.length === 0) {
    content = <p>You don't have any tasks, add new tasks</p>;
  } else if (status?.isSuccess) {
    content = (
      <div
        className={
          (taskDisplay === "list"
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3") + " grid gap-4 "
        }
      >
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
      </div>
    );
  }

  const headerLinks = (
    <div className="flex items-center justify-center gap-4">
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
  );

  return (
    <main className="">
      <PageHeader
        className=""
        pageTitle="My Tasks"
        icon={<MdOutlineChecklist size={25} />}
        secondChildren={headerLinks}
      >
        <button
          className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          onClick={() => setShowSearch(true)}
        >
          <IoIosSearch size={25} />
        </button>
        {/* <button
          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
          onClick={() => setFilters((curr) => ({ ...curr, viewFilter: true }))}
        >
          <BiFilter size={30} />
        </button> */}
        {/* <button
          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
          onClick={() => setFilters((curr) => ({ ...curr, viewSort: true }))}
        >
          <BiSort size={30} />
        </button> */}
        <button
          className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          onClick={() => setAddTask(true)}
        >
          <BiPlus size={25} />
        </button>
      </PageHeader>
      <div className="field">
        <Switch
          checked={showCompleted}
          onChange={() => setShowCompleted((curr) => !curr)}
          id="showCompleted"
        />
        <label htmlFor="showCompleted" className="field__label">
          Show Completed
        </label>
        {filter && <p>{filter}</p>}
        {search && (
          <p className="flex">
            {search}
            <button onClick={handleRemove}>
              <BiX size={20} />
            </button>
          </p>
        )}
      </div>
      {content}
      <Pagination
        page={page}
        count={count}
        className={"mx-auto"}
        itemsPerPage={itemsPerPage}
      />

      {filters?.viewFilter === true ? <TaskFilter /> : null}
      {filters?.viewSort ? <TaskSort /> : null}
      {showSearch && <TaskSearch setShowSearch={setShowSearch} />}
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

function TaskSearch({
  setShowSearch,
}: {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (search.trim()) {
      searchParams.set("q", search);
      setSearchParams(searchParams);
      setShowSearch(false);
    }
  };

  const onReset = () => {
    setShowSearch(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-zinc-400/40 z-[200]"
        onClick={() => setShowSearch(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-[210]">
        <form
          onSubmit={onSubmit}
          onReset={onReset}
          className="flex-1 flex flex-col gap-2 p-4 rounded-xl bg-zinc-100 max-w-[1024px] mx-6"
        >
          <div className="flex items-center justify-between">
            <p className="font-bold">Search</p>
            <button
              type="reset"
              className="ml-auto p-2 rounded-md bg-zinc-200 hover:bg-zinc-300 duration-200"
            >
              <BiX size={20} />
            </button>
          </div>
          <div className="w-full flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md">
            <input
              type="text"
              className="bg-transparent flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="">
              <IoIosSearch size={25} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
