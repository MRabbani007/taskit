import { useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../../context/TaskState";
// Components
import CardTaskBlock from "../../../features/task/CardTaskBlock";
import TaskFilter from "../../../features/task/TaskFilter";
import TaskSort from "../../../features/task/TaskSort";
// AntD
import { Pagination } from "antd";
// Icons
import { BsCardList } from "react-icons/bs";
import Loading from "../../../features/components/Loading";
import { BiFilter, BiPlus, BiSort } from "react-icons/bi";
import FormTaskAdd from "../../../features/task/FormTaskAdd";
import { MdOutlineChecklist } from "react-icons/md";

export default function TasksPage() {
  const { tasks, handleGetTasks, status, filters, setFilters } =
    useContext(TaskContext);

  useEffect(() => {
    handleGetTasks("ALL");
  }, []);

  const [addTask, setAddTask] = useState(false);
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
  };

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
      <ul className="flex flex-col w-full flex-1">
        {pageItems.map((task) => {
          return <CardTaskBlock task={task} key={task?.id} openList={true} />;
        })}
      </ul>
    );
  }

  return (
    <main>
      <header className="py-2 px-4 bg-gradient-to-br from-sky-600 to-sky-950 text-white gap-4">
        <MdOutlineChecklist size={40} />
        <h1 className="flex-1">My Tasks</h1>
        <button
          onClick={() => setFilters((curr) => ({ ...curr, viewFilter: true }))}
        >
          <BiFilter size={30} />
        </button>
        <button
          onClick={() => setFilters((curr) => ({ ...curr, viewSort: true }))}
        >
          <BiSort size={30} />
        </button>
        <button onClick={() => setAddTask(true)}>
          <BiPlus size={30} />
        </button>
      </header>
      {filters?.viewFilter === true ? <TaskFilter /> : null}
      {filters?.viewSort ? <TaskSort /> : null}
      {content}
      <Pagination
        defaultCurrent={1}
        pageSize={10}
        total={tasks.length}
        current={current}
        onChange={onChange}
        className="mx-auto"
      />
      {addTask ? <FormTaskAdd setAdd={setAddTask} /> : null}
    </main>
  );
}
