import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaCircle } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { AiOutlineAlert } from "react-icons/ai";

const SectionTasksOverdue = () => {
  const { overdueTasks, handleOpen } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  return (
    <div className="w-[23%] min-w-fit">
      <h2
        className="bg-orange-600 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <AiOutlineAlert className="icon" />
        <span>Overdue</span>
        <SlArrowRight
          className={
            (expand ? "rotate-90 " : "") +
            "icon-sm absolute right-2 top-[35%] duration-300"
          }
        />
      </h2>
      {/* Upcoming Tasks - 1 week */}
      <div
        className={
          (expand
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 ") + " p-3 duration-300"
        }
      >
        {Array.isArray(overdueTasks) &&
          overdueTasks.map((task, index) => {
            let color = "";
            if (task.priority === "high") {
              color = "text-red-400";
            } else if (task.priority === "normal") {
              color = "text-yellow-300";
            } else if (task.priority === "low") {
              color = "text-green-300";
            }
            return (
              <p
                key={index}
                className="p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer"
                onClick={() => {
                  handleOpen(task.listID);
                }}
              >
                <FaCircle className={color + " icon-sm mr-2"} />
                {task.title}
              </p>
            );
          })}
        {overdueTasks?.length === 0 && "No Tasks"}
      </div>
    </div>
  );
};

export default SectionTasksOverdue;
