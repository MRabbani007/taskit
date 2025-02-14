import { ChangeEvent, useContext, useEffect, useState } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// Data
import { getDate } from "../../data/utils";
// AntD
import { message } from "antd";
// Icons
import { MdOutlineNextPlan } from "react-icons/md";
import { HiArrowDownTray } from "react-icons/hi2";
import toast from "react-hot-toast";

const CardTaskDueDate = ({ task }: { task: Task }) => {
  const { handleUpdateTask } = useContext(TaskContext);

  // hold due date value
  const [dueDate, setDueDate] = useState(() => {
    if (!task?.dueDate) {
      return getDate();
    } else if (
      (typeof task?.dueDate === "string" && task?.dueDate === "") ||
      task?.dueDate?.toString()?.includes("1900-01-01")
    ) {
      return getDate();
    } else {
      return task.dueDate.toString().substr(0, 10);
    }
  });

  useEffect(() => {
    setDueDate(() => {
      if (!task?.dueDate) {
        return getDate();
      } else if (
        (typeof task?.dueDate === "string" && task?.dueDate === "") ||
        task?.dueDate?.toString()?.includes("1900-01-01")
      ) {
        return getDate();
      } else {
        return task.dueDate.toString().substr(0, 10);
      }
    });
  }, [task]);

  const handleAssignToday = async () => {
    handleUpdateTask({
      ...task,
      dueDate: new Date(getDate()),
      prevDueDate: new Date(task.dueDate.toString().substr(0, 10)),
    });
    toast.success("Task assigned for today");
  };
  const handleAssignTomorrow = async () => {
    handleUpdateTask({
      ...task,
      dueDate: new Date(getDate(1)),
      prevDueDate: new Date(task.dueDate.toString().substr(0, 10)),
    });
    toast.success("Task assigned for tomorrow");
  };
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    handleUpdateTask({
      ...task,
      dueDate: new Date(event.target.value),
      prevDueDate: new Date(task.dueDate.toString().substr(0, 10)),
    });
    toast.success("Due date updated");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault;
      }}
      onReset={() => {}}
      className="flex items-center gap-3 ml-10"
    >
      {/* <input
        type="date"
        name="dueDate"
        id="dueDate"
        title="Due Date"
        value={dueDate}
        onChange={(e) => handleChange(e)}
        className="font-light outline-none border-none p-0 m-0 bg-transparent"
        placeholder="Due Date"
      /> */}
      <p>{dueDate}</p>
      <button
        title="Assign for today"
        type="button"
        onClick={() => handleAssignToday()}
      >
        <HiArrowDownTray size={20} />
      </button>
      <button
        title="Assign for tomorrow"
        type="button"
        onClick={() => handleAssignTomorrow()}
      >
        <MdOutlineNextPlan size={20} />
      </button>
    </form>
  );
};

export default CardTaskDueDate;
