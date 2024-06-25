import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../../context/TaskState";
import { useNavigate, useParams } from "react-router-dom";
import ListTitleEdit from "../../../features/taskList/ListTitleEdit";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import CardTaskBlock from "../../../features/task/CardTaskBlock";
import CardAddTask from "../../../features/taskList/CardAddTask";
import { BsPinAngle } from "react-icons/bs";
import useDebounce from "../../../hooks/useDebounce";
import { ListContext } from "../../../context/ListState";
import Loading from "../../../features/components/Loading";
import { Switch, message } from "antd";

export default function TaskListPage() {
  const { displayList, handleUpdateList, handleClose } =
    useContext(ListContext);
  const { tasks, status, handleGetTasks, handleSortTasksList } =
    useContext(TaskContext);

  const [showCompleted, setShowCompleted] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const dragStart = ({ type, id, index }) => {
    dragItem.current = { type, id, index };
  };
  const dragEnter = ({ type, id, index }) => {
    dragOverItem.current = { type, id, index };
  };
  const dragEnd = () => {
    if (
      dragItem.current?.index === null ||
      dragOverItem.current?.index === null
    ) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    const newTasks = showCompleted
      ? [...tasks]
      : tasks.filter((item) => item.completed !== true);

    const moveItem = newTasks.splice(dragItem.current?.index, 1)[0];
    newTasks.splice(dragOverItem.current.index, 0, moveItem);

    handleSortTasksList(newTasks);

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const [pinned, setPinned] = useState(displayList?.pinned || false);
  const debouncePin = useDebounce(pinned, 1000);

  const handlePin = () => {
    handleUpdateList(displayList?.id, "list_pin", debouncePin);
  };

  useEffect(() => {
    handleGetTasks("LIST", { listID: displayList?.id });
  }, [displayList?.id]);

  const mounted = useRef();

  useEffect(() => {
    if (mounted?.current === true) {
      handlePin();
    }
    mounted.current = true;
  }, [debouncePin]);

  const params = useParams();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!displayList?.id) {
      navigate("/mylists");
    }
  }, []);

  let content;

  if (status?.isLoading === true) {
    content = <Loading />;
  } else if (status?.isError === true) {
    content = <p>Error Loading Tasks</p>;
  } else if (status?.isSuccess === true) {
    if (tasks.length === 0)
      content = <p>No tasks in this list, add new tasks</p>;
    else {
      const displayTasks = Array.isArray(tasks)
        ? showCompleted
          ? tasks
          : tasks.filter((item) => item.completed !== true)
        : [];
      content = (
        <ul className="w-full" onMouseLeave={dragEnd}>
          {displayTasks.map((task, idx) => {
            return (
              <CardTaskBlock
                key={task?.id}
                task={task}
                idx={idx}
                isDraggable={true}
                onDragStart={dragStart}
                onDragEnter={dragEnter}
                onDragEnd={dragEnd}
              />
            );
          })}
        </ul>
      );
    }
  }

  return (
    <main>
      {/* List Name */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white group relative">
        <div className="flex items-stretch">
          <div
            className={
              (pinned ? "" : "w-[20px] hover:w-[60px]") +
              " duration-200 group cursor-pointer flex items-center justify-center"
            }
          >
            <button
              title="Pin List"
              onClick={() => setPinned((curr) => !curr)}
              className={
                (pinned
                  ? "absolute top-2 left-2"
                  : "hidden group-hover:inline-block") +
                " hover:text-yellow-400 duration-200"
              }
            >
              <BsPinAngle size={28} />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* <ListIcon list={displayList} /> */}
            {!edit ? (
              <h1>{displayList?.title}</h1>
            ) : (
              <ListTitleEdit list={displayList} setEdit={setEdit} />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 invisible group-hover:visible duration-200">
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
      <div className="flex flex-col flex-1 gap-3 items-center justify-center py-3 px-0">
        {/* Add new todo Item */}
        {/* Note: list ID passed from TodoList to enable opening multiple lists */}
        <CardAddTask listID={displayList?.id} />
        <div className="field">
          <Switch
            checked={showCompleted}
            onChange={() => setShowCompleted((curr) => !curr)}
            id="showCompleted"
          />
          <label htmlFor="showCompleted" className="field__label">
            Show Completed
          </label>
        </div>
        {/* Display Tasks */}
        {content}
      </div>
    </main>
  );
}
