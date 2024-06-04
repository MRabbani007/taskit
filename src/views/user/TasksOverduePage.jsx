import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { AiOutlineAlert } from "react-icons/ai";
import SidebarUserTasks from "../../features/navigation/SidebarUserTasks";
import { Timeline } from "flowbite-react";
import CardTaskTimeLine from "../../features/tasksPage/CardTaskTimeLine";

const TasksOverduePage = () => {
  const { overdueTasks } = useContext(GlobalContext);

  return (
    <main>
      <header
        className="bg-orange-600 text-white"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <AiOutlineAlert size={40} />
          <h1>Overdue</h1>
        </div>
      </header>
      {/* Upcoming Tasks - 1 week */}
      <div>
        <Timeline className="max-h-[70vh] overflow-y-scroll w-full">
          {overdueTasks.map((task, index) => {
            return <CardTaskTimeLine task={task} key={index} />;
          })}
        </Timeline>
        {overdueTasks?.length === 0 ? <p>No overdue tasks</p> : null}
      </div>
      {/* <SidebarUserTasks /> */}
    </main>
  );
};

export default TasksOverduePage;
