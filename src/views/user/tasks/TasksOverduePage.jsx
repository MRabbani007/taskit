import { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskState";
import { AiOutlineAlert } from "react-icons/ai";
import Loading from "../../../features/components/Loading";
import CardTaskBlock from "../../../features/task/CardTaskBlock";

const TasksOverduePage = () => {
  const { tasks, status, handleGetTasks } = useContext(TaskContext);

  useEffect(() => {
    handleGetTasks("OVERDUE", null);
  }, []);

  let content;

  if (status.isLoading) {
    content = <Loading />;
  } else if (status.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status.isSuccess && tasks.length === 0) {
    content = <p>No overdue tasks</p>;
  } else if (status.isSuccess) {
    content = (
      <ul className="space-y-2">
        {tasks.map((task, index) => {
          return <CardTaskBlock task={task} key={index} isDraggable={false} />;
        })}
      </ul>
    );
  }

  return (
    <main>
      <header className="py-2 px-4 bg-gradient-to-br from-sky-600 to-sky-950 text-white gap-4">
        <AiOutlineAlert size={40} />
        <h1>Overdue</h1>
      </header>
      {/* Overdue Tasks */}
      <div>{content}</div>
    </main>
  );
};

export default TasksOverduePage;
