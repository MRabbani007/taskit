import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { BsCalendar4Event } from "react-icons/bs";
import { Timeline } from "flowbite-react";
import CardTaskTimeLine from "../../features/tasksPage/CardTaskTimeLine";
import SidebarUserTasks from "../../features/navigation/SidebarUserTasks";

const TasksTodayPage = () => {
  const { todayTasks } = useContext(GlobalContext);

  return (
    <main>
      <header className="bg-green-600 text-white">
        <div>
          <BsCalendar4Event size={40} />
          <h1>Today</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>
        <Timeline className="max-h-[80vh] overflow-y-scroll w-full">
          {todayTasks.map((task, index) => {
            return <CardTaskTimeLine task={task} key={index} />;
          })}
        </Timeline>
        {todayTasks?.length === 0 ? <p>No tasks assigned for today</p> : null}
      </div>
      {/* <SidebarUserTasks /> */}
    </main>
  );
};

export default TasksTodayPage;
