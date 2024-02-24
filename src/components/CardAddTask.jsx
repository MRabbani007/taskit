import { useContext, useState } from "react";
import AddItemImage from "../assets/add-task.png";
import { FaPlus } from "react-icons/fa6";
import { GlobalContext } from "../context/GlobalState";

const CardAddTask = ({ listID }) => {
  const { handleAddTask } = useContext(GlobalContext);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle === "") {
      return;
    } else {
      handleAddTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch justify-center"
      name={"addtodo-" + listID}
    >
      <input
        type="text"
        className="w-[70%] text-lg"
        value={newTaskTitle}
        placeholder="New Task"
        onChange={(e) => {
          setNewTaskTitle(e.target.value);
        }}
      />
      <button className="btn btn-yellow mx-2">
        <FaPlus className="icon" />
        {/* <img src={AddItemImage} alt="Add-Todo" className="icon" /> */}
      </button>
    </form>
  );
};

export default CardAddTask;
