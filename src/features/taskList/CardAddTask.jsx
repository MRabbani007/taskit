import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";
import { IoAddOutline } from "react-icons/io5";
import { message } from "antd";

const CardAddTask = ({ listID }) => {
  const { handleAddTask } = useContext(TaskContext);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle === "") {
      message.info("Enter new task");
      return;
    } else {
      handleAddTask(listID, newTaskTitle);
      message.success("Task created");
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
        className="max-w-[90%] flex-1 text-lg "
        value={newTaskTitle}
        placeholder="New Task"
        onChange={(e) => {
          setNewTaskTitle(e.target.value);
        }}
      />
      <button
        className="bg-yellow-300 hover:bg-yellow-200 duration-200 rounded-full w-12 h-12 m-0 p-0"
        type="submit"
      >
        <IoAddOutline className="icon" />
      </button>
    </form>
  );
};

export default CardAddTask;
