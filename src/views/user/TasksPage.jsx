import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import CardAddTask from "../../features/taskList/CardAddTask";
import CardTaskBlock from "../../features/task/CardTaskBlock";
import SidebarUserTasks from "../../features/navigation/SidebarUserTasks";

const TasksPage = () => {
  const { userTasks: tasks } = useContext(GlobalContext);

  return (
    <div className="flex-1">
      <h2 className="bg-gradient-to-r from-sky-800 to-sky-600 p-3 text-white rounded-xl text-center flex items-center gap-3 shadow-md shadow-zinc-500">
        <BsCardList className="icon" />
        <span className="whitespace-nowrap">My Tasks</span>
      </h2>
      <div
        className={"flex flex-col flex-1 gap-3 items-center justify-center p-3"}
      >
        <CardAddTask listID={"task_list"} />
        <div className="flex flex-col gap-1">
          {Array.isArray(tasks) &&
            tasks.map((task) => {
              return <CardTaskBlock task={task} key={task?.id} />;
            })}
        </div>
      </div>
      <SidebarUserTasks />
    </div>
  );
};

export default TasksPage;
