import { useContext, useState } from "react";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import CardAddTask from "../taskList/CardAddTask";
import { GlobalContext } from "../../context/GlobalState";
import CardTaskBlock from "../task/CardTaskBlock";

const UserTasks = () => {
  const [expand, setExpand] = useState(true);
  const { listTasks: tasks } = useContext(GlobalContext);

  return (
    <div className="flex-1 w-full">
      <h2
        className="bg-zinc-600 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3 shrink-0"
        onClick={() => setExpand((prev) => !prev)}
      >
        <BsCardList className="icon" />
        <span className="whitespace-nowrap">My Tasks</span>
        <SlArrowRight
          className={
            (expand ? "rotate-90 " : "") +
            "icon-sm absolute right-5 top-[35%] duration-300"
          }
        />
      </h2>
      <div
        className={
          (expand
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 ") +
          " duration-300 flex flex-col flex-1 w-full gap-3 items-center justify-center p-3"
        }
      >
        <CardAddTask listID={"task_list"} />
        <div className="flex flex-row gap-3 flex-wrap justify-center p-3">
          {Array.isArray(tasks) &&
            tasks.map((task) => {
              return <CardTaskBlock task={task} key={task?.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default UserTasks;
