import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { AiOutlineAlert } from "react-icons/ai";
import SidebarUserTasks from "../../../features/navigation/SidebarUserTasks";
import { Timeline } from "flowbite-react";
import CardTaskTimeLine from "../../../features/tasksPage/CardTaskTimeLine";

const TasksOverduePage = () => {
  const { tasks, status, handleGetTasks } = useContext(GlobalContext);

  useEffect(() => {
    handleGetTasks("OVERDUE", null);
  }, []);

  let content;

  if (status.isLoading) {
    content = <p>Loading...</p>;
  } else if (status.isError) {
    content = <p>Error Loading Tasks</p>;
  } else if (status.isSuccess && tasks.length === 0) {
    content = <p>No overdue tasks</p>;
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
      <header
        className="bg-orange-600 text-white"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <AiOutlineAlert size={40} />
          <h1>Overdue</h1>
        </div>
      </header>
      {/* Overdue Tasks */}
      <div>{content}</div>
    </main>
  );
};

export default TasksOverduePage;
