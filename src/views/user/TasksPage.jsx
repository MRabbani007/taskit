import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import CardAddTask from "../../features/taskList/CardAddTask";
import CardTaskBlock from "../../features/task/CardTaskBlock";
import SidebarUserTasks from "../../features/navigation/SidebarUserTasks";
import TaskFilter from "../../features/task/TaskFilter";
import TaskSort from "../../features/task/TaskSort";

const TasksPage = () => {
  const { userTasks: tasks } = useContext(GlobalContext);

  return (
    <main>
      <header className="bg-gradient-to-r from-sky-800 to-sky-600 text-white shadow-md shadow-zinc-500">
        <div>
          <BsCardList size={40} />
          <h1>My Tasks</h1>
        </div>
      </header>
      <div>
        <CardAddTask listID={"task_list"} />
        <TaskFilter />
        <TaskSort />
        <ul className="flex flex-col w-full flex-1 gap-1">
          {Array.isArray(tasks) &&
            tasks.map((task) => {
              return <CardTaskBlock task={task} key={task?.id} />;
            })}
        </ul>
      </div>
      {/* <SidebarUserTasks /> */}
    </main>
  );
};

export default TasksPage;
