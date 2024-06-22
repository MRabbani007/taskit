import { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskState";
import { BsCalendar4Event } from "react-icons/bs";
import { Timeline } from "flowbite-react";
import CardTaskTimeLine from "../../../features/tasksPage/CardTaskTimeLine";
import Loading from "../../../features/components/Loading";

const TasksTodayPage = () => {
  const { tasks, status, handleGetTasks } = useContext(TaskContext);

  useEffect(() => {
    handleGetTasks("TODAY", null);
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
      <Timeline className="max-h-[80vh] overflow-y-scroll w-full">
        {tasks.map((task, index) => {
          return <CardTaskTimeLine task={task} key={index} />;
        })}
      </Timeline>
    );
  }

  return (
    <main>
      <header className="bg-green-600 text-white">
        <div>
          <BsCalendar4Event size={40} />
          <h1>Today</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>{content}</div>
    </main>
  );
};

export default TasksTodayPage;
