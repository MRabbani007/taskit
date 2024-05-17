import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { getDate } from "../../data/utils";
import { BiCheck, BiX } from "react-icons/bi";
import { ACTIONS } from "../../data/actions";

const CardTaskDueDate = ({ task, setEdit }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdateTask(ACTIONS.UPDATE_TASK_DUEDATE, {
      id: task.id,
      dueDate,
    });
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-3"
    >
      {/* date input in format yyyy-mm-dd */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="font-light outline-none border-none bg-transparent"
        placeholder="Due Date"
      />
      <input
        type="time"
        className="font-light outline-none border-none bg-transparent"
        title="Due Time"
      />
      <button type="submit" title="Save">
        <BiCheck size={28} />
      </button>
      <button type="reset" title="Cancel">
        <BiX size={28} />
      </button>
    </form>
  );
};

export default CardTaskDueDate;
