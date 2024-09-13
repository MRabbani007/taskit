import { useContext, useEffect } from "react";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { Timeline } from "flowbite-react";
import { TaskContext } from "../../../context/TaskState";
import CardTaskTimeLine from "../../../features/tasksPage/CardTaskTimeLine";
import Loading from "../../../features/components/Loading";

const TasksImportantPage = () => {
  const { tasks, status, handleGetTasks } = useContext(TaskContext);

  useEffect(() => {
    handleGetTasks("IMPORTANT", null);
  }, []);

  let content;

  if (status.isLoading) {
    content = <Loading />;
  } else if (status.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status.isSuccess && tasks.length === 0) {
    content = <p>No tasks marked important</p>;
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
        <MdOutlineNotificationImportant size={40} />
        <h1>Important</h1>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>{content}</div>
    </main>
  );
};

export default TasksImportantPage;
