import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { getDate } from "../../data/utils";

const CardTaskDueDate = ({ task, setEdit = () => {} }) => {
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
    // e.preventDefault();
    handleUpdateTask({ ...task, dueDate: e.target.value });
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-3 ml-10"
    >
      <input
        type="date"
        value={dueDate}
        onChange={handleSubmit}
        className="font-light outline-none border-none p-0 m-0 bg-transparent"
        placeholder="Due Date"
      />
      {/* <input
        type="time"
        className="font-light outline-none border-none bg-transparent"
        title="Due Time"
      /> */}
    </form>
  );
};

export default CardTaskDueDate;
