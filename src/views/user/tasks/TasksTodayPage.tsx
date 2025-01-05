import { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskState";
import { BsCalendar4Event } from "react-icons/bs";
import Loading from "../../../features/components/Loading";
import CardTaskBlock from "../../../features/task/CardTaskBlock";

export default function TasksTodayPage() {
  const { tasks, status, handleGetTasks } = useContext(TaskContext);

  useEffect(() => {
    handleGetTasks({ type: "TODAY" });
  }, []);

  let content;

  if (status.isLoading) {
    content = <Loading />;
  } else if (status.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status.isSuccess && tasks.length === 0) {
    content = <p>No tasks for today</p>;
  } else if (status.isSuccess) {
    content = (
      <ul className="space-y-2">
        {tasks.map((task, index) => {
          return (
            <CardTaskBlock
              idx={index}
              task={task}
              key={task.id}
              isDraggable={false}
            />
          );
        })}
      </ul>
    );
  }

  return (
    <main>
      <header className="py-2 px-4 bg-gradient-to-br from-sky-600 to-sky-950 text-white gap-4">
        <BsCalendar4Event size={40} />
        <h1>Today</h1>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>{content}</div>
    </main>
  );
}
