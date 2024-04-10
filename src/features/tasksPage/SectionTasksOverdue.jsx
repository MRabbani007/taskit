import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { FaCircle } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { AiOutlineAlert } from "react-icons/ai";
import { Button, Timeline } from "flowbite-react";
import CardTaskTimeLine from "./CardTaskTimeLine";

const SectionTasksOverdue = () => {
  const { overdueTasks, handleOpen } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  return (
    <div className="flex-1 min-w-fit">
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
            : "translate-y-[-20px] opacity-0 h-0") + " p-3 duration-300"
        }
      >
        {overdueTasks?.length === 0 ? (
          "No Tasks"
        ) : (
          <Timeline className="max-h-[70vh] overflow-y-scroll">
            {overdueTasks.map((task, index) => {
              return <CardTaskTimeLine task={task} key={index} />;
            })}
          </Timeline>
        )}
      </div>
    </div>
  );
};

export default SectionTasksOverdue;
