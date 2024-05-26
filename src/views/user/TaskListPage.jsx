import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import ListIcon from "../../features/taskList/ListIcon";
import ListTitleEdit from "../../features/taskList/ListTitleEdit";
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

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!displayList?.id) {
      navigate("/mylists");
    }
  }, []);

  useEffect(() => {}, [tasks]);

  return (
    <main>
      {/* List Name */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md shadow-zinc-500">
        <div>
          <ListIcon list={displayList} />
          {!edit ? (
            <h1>{displayList?.title}</h1>
          ) : (
            <ListTitleEdit list={displayList} setEdit={setEdit} />
          )}
        </div>
        <button onClick={() => handleClose(displayList?.id)}>
          <CiCircleRemove size={32} />
        </button>
      </header>
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
    </main>
  );
}
