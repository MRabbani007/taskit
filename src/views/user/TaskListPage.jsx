import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import ListIcon from "../../features/taskList/ListIcon";
import ListTitle from "../../features/taskList/ListTitle";
import { CiCircleRemove } from "react-icons/ci";
import CardTaskBlock from "../../features/task/CardTaskBlock";
import CardAddTask from "../../features/taskList/CardAddTask";

export default function TaskListPage() {
  const {
    displayList,
    listTasks: tasks,
    handleClose,
  } = useContext(GlobalContext);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!displayList?.id) {
      navigate("/mylists");
    }
  }, []);

  useEffect(() => {}, [tasks]);

  return (
    <div className="flex-1">
      {/* List Name */}
      <h2 className="flex justify-between items-center rounded-xl px-4 py-3 text-xl font-normal bg-gradient-to-r from-blue-800 to-blue-600 text-white icon-cont shadow-md shadow-zinc-500">
        <ListIcon list={displayList} />
        <ListTitle list={displayList} />
        <button
          onClick={() => handleClose(displayList?.id)}
          className="ml-auto"
        >
          <CiCircleRemove size={32} />
        </button>
      </h2>
      {/* List Todo Items */}
      <div className="flex flex-col flex-1 gap-3 items-center justify-center py-3 md:px-3 px-0">
        {/* Add new todo Item */}
        {/* Note: list ID passed from TodoList to enable opening multiple lists */}
        <CardAddTask listID={displayList?.id} />
        {/* Display Tasks */}
        <ul className="flex flex-col gap-3 w-full max-w-[1000px]">
          {Array.isArray(tasks) &&
            tasks.map((task) => {
              return <CardTaskBlock key={task?.id} task={task} />;
            })}
        </ul>
      </div>
    </div>
  );
}
