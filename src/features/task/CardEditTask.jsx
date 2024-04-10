import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import IMG_Save from "../../assets/save.png";
import IMG_Cancel from "../../assets/cancel.png";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

const CardEditTask = ({ task, setEdit }) => {
  const { handleUpdateTask } = useContext(GlobalContext);
  const [editInput, setEditInput] = useState(task?.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateTask(task.id, "task_title", editInput);
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-1 items-center text-white"
    >
      <input
        type="text"
        autoFocus
        className="flex-1 w-[50%] bg-transparent font-normal outline-none border-none"
        value={editInput}
        onChange={(e) => {
          setEditInput(e.target.value);
        }}
      />
      <span className="flex items-center">
        <button type="submit">
          <CiSquareCheck className="icon-md" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon-md" />
        </button>
      </span>
    </form>
  );
};

export default CardEditTask;
