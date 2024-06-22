import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { BsCalendar4Event } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import CardTaskTimeLine from "./CardTaskTimeLine";

const DayTimeLine = () => {
  const { tasks } = useContext(TaskContext);
  const [expand, setExpand] = useState(true);

  return (
    <div>
      <h2
        className="bg-green-600 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <BsCalendar4Event className="icon" />
        <span>Today Tasks</span>
        <SlArrowRight
          className={
            (expand ? "rotate-90 " : "") +
            "icon-sm absolute right-2 top-[35%] duration-300"
          }
        />
      </h2>
    </div>
  );
};

export default DayTimeLine;
