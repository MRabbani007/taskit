import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardTaskTimeLine from "../../features/tasksPage/CardTaskTimeLine";
import { BsCalendar4Week } from "react-icons/bs";
import { Timeline } from "flowbite-react";
import SidebarUserTasks from "../../features/navigation/SidebarUserTasks";

const TasksWeekPage = () => {
  const { weekTasks } = useContext(GlobalContext);

  return (
    <main>
      <header className="bg-blue-800 text-white">
        <div>
          <BsCalendar4Week size={40} />
          <h1>This Week</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>
        <Timeline className="max-h-[80vh] overflow-y-scroll w-full">
          {weekTasks.map((task, index) => {
            return <CardTaskTimeLine task={task} key={index} />;
          })}
        </Timeline>
        {weekTasks?.length === 0 ? <p>No tasks for this week</p> : null}
      </div>
      <SidebarUserTasks />
    </main>
  );
};

export default TasksWeekPage;
