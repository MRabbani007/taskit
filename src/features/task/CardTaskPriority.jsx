import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IoAlertCircle } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";

const CardTaskPriority = ({ task }) => {
  const { handleUpdateTask } = useContext(GlobalContext);
  const [priority, setPriority] = useState(task?.priority);
  const debouncePriority = useDebounce(priority, 1000);

  const bgColor =
    task?.priority === "high"
      ? "#dc2626"
      : task?.priority === "normal"
      ? "#facc15"
      : "#16a34a";

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
    handleUpdateTask({ ...task, priority: debouncePriority });
  };

  useEffect(() => {
    if (task?.priority !== debouncePriority) {
      handlePriority();
    }
  }, [debouncePriority]);

  return (
    <div
      className={
        "w-[20px] hover:w-[60px] duration-200 cursor-pointer flex items-center justify-center group"
      }
      style={{ backgroundColor: bgColor }}
      title={"Priority " + task?.priority}
    >
      <div className="hidden group-hover:inline-block">
        <IoAlertCircle
          onClick={togglePriority}
          size={32}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default CardTaskPriority;
