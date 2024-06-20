import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import CardTaskTimeLine from "../../../features/tasksPage/CardTaskTimeLine";
import { BsCalendar4Week } from "react-icons/bs";
import { Timeline } from "flowbite-react";

const TasksWeekPage = () => {
  const { tasks, status, handleGetTasks } = useContext(GlobalContext);

  useEffect(() => {
    handleGetTasks("WEEK", null);
  }, []);

  let content;

  if (status.isLoading) {
    content = <p>Loading...</p>;
  } else if (status.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status.isSuccess && tasks.length === 0) {
    content = <p>No tasks assigned for this week</p>;
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
      <header className="bg-blue-800 text-white">
        <div>
          <BsCalendar4Week size={40} />
          <h1>This Week</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>{content}</div>
    </main>
  );
};

export default TasksWeekPage;
