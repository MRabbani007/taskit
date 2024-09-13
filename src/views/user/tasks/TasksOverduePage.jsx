import { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskState";
import { AiOutlineAlert } from "react-icons/ai";
import { Timeline } from "flowbite-react";
import CardTaskTimeLine from "../../../features/tasksPage/CardTaskTimeLine";
import Loading from "../../../features/components/Loading";

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
      <Timeline className="max-h-[80vh] overflow-y-scroll w-full">
        {tasks.map((task, index) => {
          return <CardTaskTimeLine task={task} key={index} />;
        })}
      </Timeline>
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
