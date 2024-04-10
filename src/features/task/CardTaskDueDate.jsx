import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { getDate } from "../../data/utils";

const CardTaskDueDate = ({ task }) => {
  const { handleUpdateTask } = useContext(GlobalContext);

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

  const handleDueDate = (value) => {
    setDueDate(value);
    handleUpdateTask(task.id, "due_date", value);
  };

  return (
    <div className="flex items-center justify-between flex-nowrap shrink-0 bg-zinc-200">
      {/* date input in format yyyy-mm-dd */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => handleDueDate(e.target.value)}
        className="outline-none border-none bg-transparent text-slate-950"
        placeholder="Due Date"
      />
      <input
        type="time"
        className="outline-none border-none bg-transparent text-slate-950"
        title="Due Time"
      />
    </div>
  );
};

export default CardTaskDueDate;
