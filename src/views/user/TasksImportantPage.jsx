import { useContext } from "react";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { Timeline } from "flowbite-react";
import { GlobalContext } from "../../context/GlobalState";
import CardTaskTimeLine from "../../features/tasksPage/CardTaskTimeLine";
import SidebarUserTasks from "../../features/navigation/SidebarUserTasks";

const TasksImportantPage = () => {
  const { importantTasks } = useContext(GlobalContext);
  return (
    <main>
      <header className="bg-red-600 text-white">
        <div>
          <MdOutlineNotificationImportant size={40} />
          <h1>Important</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>
        <Timeline className="max-h-[80vh] overflow-y-scroll w-full">
          {importantTasks.map((task, index) => {
            return <CardTaskTimeLine task={task} key={index} />;
          })}
        </Timeline>
        {importantTasks?.length === 0 ? <p>No tasks marked important</p> : null}
      </div>
      <SidebarUserTasks />
    </main>
  );
};

export default TasksImportantPage;
