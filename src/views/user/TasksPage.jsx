import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import CardAddTask from "../../features/taskList/CardAddTask";
import CardTaskBlock from "../../features/task/CardTaskBlock";
import TaskFilter from "../../features/task/TaskFilter";
import TaskSort from "../../features/task/TaskSort";

const filterTasks = (type, payload, lists = []) => {
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
  const { userTasks: tasks } = useContext(GlobalContext);

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("");

  const [inLists, setInLists] = useState([]);

  const filtered = filterTasks(filters, tasks, inLists);

  const sorted = sortTasks(sort, filtered);

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
        <TaskFilter
          setFilters={setFilters}
          inLists={inLists}
          setInLists={setInLists}
        />
        <TaskSort setSort={setSort} />
        <ul className="flex flex-col w-full flex-1 gap-1">
          {Array.isArray(tasks) &&
            sorted.map((task) => {
              return <CardTaskBlock task={task} key={task?.id} />;
            })}
        </ul>
      </div>
    </main>
  );
}
