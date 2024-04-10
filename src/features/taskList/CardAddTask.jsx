import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IoAddOutline } from "react-icons/io5";

const CardAddTask = ({ listID }) => {
  const { handleAddTask } = useContext(GlobalContext);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle === "") {
      return;
    } else {
      handleAddTask(listID, newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center justify-center gap-2"
      name={"addtodo-" + listID}
    >
      <input
        type="text"
        className="max-w-[90%] flex-1 text-lg border-2"
        value={newTaskTitle}
        placeholder="New Task"
        onChange={(e) => {
          setNewTaskTitle(e.target.value);
        }}
      />
      <button
        className="bg-yellow-300 rounded-full w-12 h-12 m-0 p-0"
        type="submit"
      >
        <IoAddOutline className="icon" />
      </button>
    </form>
  );
};

export default CardAddTask;
