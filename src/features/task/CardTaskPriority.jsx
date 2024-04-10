import { useContext, useEffect, useState } from "react";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { GlobalContext } from "../../context/GlobalState";
import { IoAlertCircle, IoAlertCircleOutline } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";

const CardTaskPriority = ({ task }) => {
  const { handleUpdateTask } = useContext(GlobalContext);
  const [priority, setPriority] = useState("low");
  const debouncePriority = useDebounce(priority, 1000);

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

  useEffect(() => {
    handleUpdateTask(task.id, "priority", debouncePriority);
  }, [debouncePriority]);

  return (
    <div className="">
      {priority === "high" ? (
        <IoAlertCircle
          onClick={togglePriority}
          className="icon text-red-600 rounded-full"
        />
      ) : priority === "normal" ? (
        <IoAlertCircle
          onClick={togglePriority}
          className="icon text-yellow-400 rounded-full"
        />
      ) : (
        <IoAlertCircle
          onClick={togglePriority}
          className="icon text-green-600 rounded-full"
        />
      )}
    </div>
  );
};

export default CardTaskPriority;
