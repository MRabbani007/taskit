import { useContext, useEffect } from "react";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { Timeline } from "flowbite-react";
import { GlobalContext } from "../../../context/GlobalState";
import CardTaskTimeLine from "../../../features/tasksPage/CardTaskTimeLine";

const TasksImportantPage = () => {
  const { tasks, status, handleGetTasks } = useContext(GlobalContext);

  useEffect(() => {
    handleGetTasks("IMPORTANT", null);
  }, []);

  let content;

  if (status.isLoading) {
    content = <p>Loading...</p>;
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
      <header className="bg-red-600 text-white">
        <div>
          <MdOutlineNotificationImportant size={40} />
          <h1>Important</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>{content}</div>
    </main>
  );
};

export default TasksImportantPage;
