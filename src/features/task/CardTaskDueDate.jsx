import { useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// Data
import { getDate } from "../../data/utils";
// AntD
import { message } from "antd";
// Icons
import { MdOutlineNextPlan } from "react-icons/md";
import { HiArrowDownTray } from "react-icons/hi2";
import { useRef } from "react";

const CardTaskDueDate = ({ task, setEdit = () => {} }) => {
  const { handleUpdateTask } = useContext(TaskContext);

  // hold due date value
  const [dueDate, setDueDate] = useState(() => {
    if (task?.dueDate) {
      if (task.dueDate.includes("1900-01-01")) {
        return getDate();
      } else {
        return task.dueDate.substr(0, 10);
      }
    }
  });

  const isMounted = useRef(null);

  const handleAssignToday = async () => {
    setDueDate(getDate());
  };
  const handleAssignTomorrow = async () => {
    setDueDate(getDate(1));
  };
  const handleChange = async (e) => {
    setDueDate(e.target.value);
  };

  useEffect(() => {
    if (
      isMounted?.current === true &&
      dueDate !== task?.dueDate.substr(0, 10)
    ) {
      handleUpdateTask({
        ...task,
        dueDate,
        prevDueDate: task.dueDate.substr(0, 10),
      });
      message.success("Task updated");
    }
  }, [dueDate]);

  isMounted.current = true;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault;
      }}
      onReset={() => {}}
      className="flex items-center gap-3 ml-10"
    >
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        title="Due Date"
        value={dueDate}
        onChange={handleChange}
        className="font-light outline-none border-none p-0 m-0 bg-transparent"
        placeholder="Due Date"
      />
      <button
        title="Assign for today"
        type="button"
        onClick={handleAssignToday}
      >
        <HiArrowDownTray size={20} />
      </button>
      <button
        title="Assign for tomorrow"
        type="button"
        onClick={handleAssignTomorrow}
      >
        <MdOutlineNextPlan size={20} />
      </button>
      {/* <input
        type="time"
        className="font-light outline-none border-none bg-transparent"
        title="Due Time"
      /> */}
    </form>
  );
};

export default CardTaskDueDate;
