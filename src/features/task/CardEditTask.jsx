import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { BiCheck, BiX } from "react-icons/bi";
import { ACTIONS } from "../../data/actions";

const CardEditTask = ({ task, setEdit }) => {
  const { handleUpdateTask } = useContext(GlobalContext);
  const [title, setTitle] = useState(task?.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdateTask(ACTIONS.UPDATE_TASK_TITLE, { id: task.id, title });
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center"
    >
      <input
        type="text"
        autoFocus
        className="bg-transparent outline-none border-none p-0 m-0"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <span className="flex items-center">
        <button type="submit">
          <BiCheck size={32} />
        </button>
        <button type="reset">
          <BiX size={32} />
        </button>
      </span>
    </form>
  );
};

export default CardEditTask;
