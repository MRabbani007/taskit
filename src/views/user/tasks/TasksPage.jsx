import { useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../../context/TaskState";
// Components
import CardAddTask from "../../../features/taskList/CardAddTask";
import CardTaskBlock from "../../../features/task/CardTaskBlock";
import TaskFilter from "../../../features/task/TaskFilter";
import TaskSort from "../../../features/task/TaskSort";
// AntD
import { Pagination, Switch } from "antd";
// Icons
import { BsCardList } from "react-icons/bs";
import Loading from "../../../features/components/Loading";

const filterTasks = (type, payload, lists = []) => {
  if (!Array.isArray(payload)) return [];
  // remove items included in filter and keep others
  let result = payload;
  if (type.includes("completed")) {
    result = result.filter((item) => item.completed === false);
  }
  if (type.includes("priority_low")) {
    result = result.filter((item) => item.priority !== "low");
  }
  if (type.includes("priority_normal")) {
    result = result.filter((item) => item.priority !== "normal");
  }
  if (type.includes("priority_high")) {
    result = result.filter((item) => item.priority !== "high");
  }
  if (type.includes("inLists")) {
    result = result.filter((item) => lists.includes(item.listID));
  }
  return result;
};

const sortTasks = (type, payload) => {
  switch (type) {
    case "priority_a":
      return [
        ...payload.filter((item) => item?.priority === "high"),
        ...payload.filter((item) => item?.priority === "normal"),
        ...payload.filter((item) => item?.priority === "low"),
      ];
    case "priority_d":
      return [
        ...payload.filter((item) => item?.priority === "low"),
        ...payload.filter((item) => item?.priority === "normal"),
        ...payload.filter((item) => item?.priority === "high"),
      ];
    case "title_a":
      return payload.sort((a, b) => a.title.localeCompare(b.title));
    case "title_d":
      return payload.sort((a, b) => b.title.localeCompare(a.title));
    case "createDate_a":
      return payload.sort(
        (a, b) =>
          new Date(a?.createDate).getTime() - new Date(b?.createDate).getTime()
      );
    case "createDate_d":
      return payload.sort(
        (a, b) =>
          new Date(b?.createDate || 0).getTime() -
          new Date(a?.createDate || 0).getTime()
      );
    case "dueDate_a":
      return payload.sort(
        (a, b) =>
          new Date(a?.dueDate || 0).getTime() -
          new Date(b?.createDate || 0).getTime()
      );
    case "dueDate_d":
      return payload.sort(
        (a, b) =>
          new Date(b?.dueDate || 0).getTime() -
          new Date(a?.createDate || 0).getTime()
      );
    default:
      return payload;
  }
};

export default function TasksPage() {
  const { tasks, status, handleGetTasks } = useContext(TaskContext);

  useEffect(() => {
    handleGetTasks("ALL");
  }, []);

  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
  };

  const [viewFilter, setViewFilter] = useState(false);
  const [viewSort, setViewSort] = useState(false);

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("");

  const [inLists, setInLists] = useState([]);

  const filtered = filterTasks(filters, tasks, inLists);

  const sorted = sortTasks(sort, filtered);

  const pageItems = sorted.slice((current - 1) * 10, current * 10);

  let content;

  if (status?.isLoading) {
    content = <Loading />;
  } else if (status?.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status?.isSuccess && tasks.length === 0) {
    content = <p>No tasks create new</p>;
  } else if (status?.isSuccess) {
    content = (
      <ul className="flex flex-col w-full flex-1 gap-2">
        {pageItems.map((task) => {
          return <CardTaskBlock task={task} key={task?.id} openList={true} />;
        })}
      </ul>
    );
  }

  return (
    <main>
      <header className="bg-gradient-to-r from-sky-800 to-sky-600 text-white shadow-md shadow-zinc-500">
        <div>
          <BsCardList size={40} />
          <h1>My Tasks</h1>
        </div>
      </header>
      <div>
        <CardAddTask listID={"task_list"} />
        <div className="flex items-center justify-center gap-4">
          <Switch
            checked={viewFilter}
            onChange={() => setViewFilter((curr) => !curr)}
            id="filter"
            size="small"
          />
          <label htmlFor="filter">Filter</label>
          <Switch
            checked={viewSort}
            onChange={() => setViewSort((curr) => !curr)}
            id="sort"
            size="small"
          />
          <label htmlFor="sort">Sort</label>
        </div>
        <TaskFilter
          setFilters={setFilters}
          inLists={inLists}
          setInLists={setInLists}
          viewFilter={viewFilter}
        />
        {viewSort && <TaskSort setSort={setSort} />}
        {content}
        <Pagination
          defaultCurrent={1}
          pageSize={10}
          total={sorted.length}
          current={current}
          onChange={onChange}
        />
      </div>
    </main>
  );
}
