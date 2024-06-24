import { useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// Hooks
import useDebounce from "../../hooks/useDebounce";
//  AntD
import { message } from "antd";
// Icons
import { IoAlertCircle } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const priorityObj = {
  1: "low",
  2: "normal",
  3: "medium",
  4: "important",
  5: "high",
};

const bgColorObj = {
  1: "#0284c7",
  2: "#16a34a",
  3: "#eab308",
  4: "#f97316",
  5: "#dc2626",
};

const CardTaskPriority = ({ task }) => {
  const { handleUpdateTask } = useContext(TaskContext);
  // const [priority, setPriority] = useState(task?.priority);
  const [priorityLevel, setPriorityLevel] = useState(task?.priorityLevel || 1);
  const debouncePriorityLevel = useDebounce(priorityLevel, 1000);

  const handleUp = () => {
    setPriorityLevel((curr) => (curr < 5 ? curr + 1 : 5));
  };

  const handleDown = () => {
    setPriorityLevel((curr) => (curr > 1 ? curr - 1 : 1));
  };

  // useEffect(() => {
  //   console.log(priorityObj[priorityLevel]);
  //   console.log(bgColorObj[priorityLevel]);
  //   // setPriority()
  // }, [priorityLevel]);

  const bgColor = bgColorObj[priorityLevel];

  const togglePriority = () => {
    setPriority((curr) => {
      if (curr === "low") {
        return "normal";
      }
      if (curr === "normal") {
        return "high";
      }
      if (curr === "high") {
        return "low";
      }
    });
  };

  const handlePriority = async () => {
    handleUpdateTask({
      ...task,
      priority: priorityObj[priorityLevel],
      priorityLevel,
    });
    message.success("Priority updated");
  };

  useEffect(() => {
    if (task?.priorityLevel && task?.priorityLevel !== debouncePriorityLevel) {
      handlePriority();
    }
  }, [debouncePriorityLevel]);

  return (
    <div
      className={
        "w-[20px] hover:w-[60px] duration-200 cursor-pointer flex items-center justify-center group"
      }
      style={{ backgroundColor: bgColor }}
      title={"Priority " + task?.priority}
    >
      <div className="hidden group-hover:flex flex-col items-center justify-center text-white">
        <button onClick={handleUp}>
          <IoIosArrowUp size={32} />
        </button>
        <span className="font-medium">{priorityLevel}</span>
        <button onClick={handleDown}>
          <IoIosArrowDown size={32} />
        </button>
      </div>
    </div>
  );
};

export default CardTaskPriority;
