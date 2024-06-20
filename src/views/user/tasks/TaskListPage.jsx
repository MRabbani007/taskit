import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import ListIcon from "../../../features/taskList/ListIcon";
import ListTitleEdit from "../../../features/taskList/ListTitleEdit";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import CardTaskBlock from "../../../features/task/CardTaskBlock";
import CardAddTask from "../../../features/taskList/CardAddTask";
import { BsPinAngle } from "react-icons/bs";

export default function TaskListPage() {
  const { tasks, status, handleGetTasks, displayList, handleClose } =
    useContext(GlobalContext);

  useEffect(() => {
    handleGetTasks("LIST", { listID: displayList?.id });
  }, []);

  const params = useParams();

  const navigate = useNavigate();

  const [pinned, setPinned] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!displayList?.id) {
      navigate("/mylists");
    }
  }, []);

  let content;

  if (status?.isLoading === true) {
    content = <p>Loading...</p>;
  } else if (status?.isError === true) {
    content = <p>Error Loading Tasks</p>;
  } else if (status?.isSuccess === true) {
    content =
      tasks.length === 0 ? (
        <p>No tasks in this list, add new tasks</p>
      ) : (
        <ul className="flex flex-col gap-3 w-full max-w-[1000px]">
          {tasks.map((task) => {
            return <CardTaskBlock key={task?.id} task={task} />;
          })}
        </ul>
      );
  }

  return (
    <main>
      {/* List Name */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md shadow-zinc-500">
        <div className="flex items-stretch">
          <div
            className={
              (pinned ? "w-[60px]" : "w-[20px] hover:w-[60px]") +
              " duration-200 group cursor-pointer flex items-center justify-center"
            }
          >
            <button
              title="Pin List"
              onClick={() => setPinned((curr) => !curr)}
              className={pinned ? "" : "hidden group-hover:inline-block"}
            >
              <BsPinAngle size={28} />
            </button>
          </div>
          <div>
            <ListIcon list={displayList} />
            {!edit ? (
              <h1>{displayList?.title}</h1>
            ) : (
              <ListTitleEdit list={displayList} setEdit={setEdit} />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button title="Edit Title" onClick={() => setEdit(true)}>
            <CiEdit size={32} />
          </button>
          <button
            title="Close List"
            onClick={() => handleClose(displayList?.id)}
          >
            <CiCircleRemove size={32} />
          </button>
        </div>
      </header>
      {/* List Todo Items */}
      <div className="flex flex-col flex-1 gap-3 items-center justify-center py-3 md:px-3 px-0">
        {/* Add new todo Item */}
        {/* Note: list ID passed from TodoList to enable opening multiple lists */}
        <CardAddTask listID={displayList?.id} />
        {/* Display Tasks */}
        {content}
      </div>
    </main>
  );
}
