import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../../context/TaskState";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import CardTaskBlock from "../../../features/task/CardTaskBlock";
import { BsPinAngle } from "react-icons/bs";
import useDebounce from "../../../hooks/useDebounce";
import { ListContext } from "../../../context/ListState";
import Loading from "../../../features/components/Loading";
import { Switch } from "antd";
import { BiPlus } from "react-icons/bi";
import FormTaskAdd from "../../../features/task/FormTaskAdd";
import FormTaskListEdit from "../../../features/taskList/FormTaskListEdit";
import Pagination from "@/features/navigation/Pagination";

export default function TaskListPage() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  const { displayList, handleUpdateList } = useContext(ListContext);
  const { tasks, count, status, handleGetTasks, handleSortTasksList } =
    useContext(TaskContext);

  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    handleGetTasks({
      comp: showCompleted,
      type: "LIST",
      listID: displayList?.id,
      page,
    });
  }, [displayList?.id, showCompleted, page]);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [add, setAdd] = useState(false);
  const [block, setBlock] = useState(false);

  const [dragItem, setDragItem] = useState<DragItem | null>(null);
  const [dragOverItem, setDragOverItem] = useState<DragItem | null>(null);

  const dragStart = ({ type = null, id = null, index = null }) => {
    setDragItem({ type, id, index });
  };
  const dragEnter = ({ type = null, id = null, index = null }) => {
    setDragOverItem({ type, id, index });
  };
  const dragEnd = () => {
    if (
      dragItem?.index === null ||
      dragItem?.index === undefined ||
      dragOverItem?.index === null ||
      dragOverItem?.index === undefined
    ) {
      setDragItem(null);
      setDragOverItem(null);
      return null;
    }

    if (block) {
      setBlock(false);
      return null;
    }

    const newTasks = showCompleted
      ? [...tasks]
      : tasks.filter((item) => item.completed !== true);

    const moveItem = newTasks.splice(dragItem?.index, 1)[0];
    newTasks.splice(dragOverItem.index, 0, moveItem);

    handleSortTasksList(newTasks);

    setDragItem(null);
    setDragOverItem(null);
  };

  const dragReset = () => {
    setBlock(true);
    setDragItem(null);
    setDragOverItem(null);
  };

  const [pinned, setPinned] = useState(displayList?.pinned || false);
  const debouncePin = useDebounce(pinned, 1000);

  const handlePin = () => {
    if (displayList?.pinned !== pinned) {
      handleUpdateList({
        ...displayList,
        pinned: debouncePin as boolean,
      } as TaskList);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted === true) {
      handlePin();
    }
  }, [debouncePin]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <ul className="w-full" onMouseLeave={dragReset}>
          {displayTasks.map((task, idx) => {
            return (
              <CardTaskBlock
                openList
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
    <main className="lg:px-40">
      {/* List Name */}
      {/* <header className="bg-gradient-to-r from-sky-800 to-blue-950 text-white group relative pl-8 pr-4 py-2">
        <div className="flex items-stretch flex-1">
          <div
            className={
              (pinned ? "" : "") +
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
            <img src={displayList?.icon} className="w-10" />
            <h1>{displayList?.title}</h1>
          </div>
        </div>
        <button
          title="Edit Title"
          onClick={() => setEdit(true)}
          className="invisible group-hover:visible duration-200"
        >
          <CiEdit size={30} />
        </button>
        <button title="Add Task" onClick={() => setAdd(true)}>
          <BiPlus size={32} />
        </button>
      </header> */}
      <header>{displayList?.title}</header>
      {/* List Todo Items */}
      <div className="flex-1 flex flex-col gap-3 items-stretch justify-start px-0">
        {/* Add new todo Item */}
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
        <div className="flex-1">{content}</div>
      </div>
      <Pagination page={page} count={count} className={"mx-auto"} />
      {add ? (
        <FormTaskAdd add={add} listID={displayList?.id ?? ""} setAdd={setAdd} />
      ) : null}
      {edit ? (
        <FormTaskListEdit
          edit={edit}
          setEdit={setEdit}
          taskList={displayList as TaskList}
        />
      ) : null}
    </main>
  );
}
