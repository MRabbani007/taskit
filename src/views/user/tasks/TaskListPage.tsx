import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../../context/TaskState";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import useDebounce from "../../../hooks/useDebounce";
import { ListContext } from "../../../context/ListState";
import { Switch } from "antd";
import { BiPlus } from "react-icons/bi";
import FormTaskAdd from "../../../features/task/FormTaskAdd";
import FormTaskListEdit from "../../../features/taskList/FormTaskListEdit";
import Pagination from "@/features/navigation/Pagination";
import CardTask from "@/features/task/CardTask";
import FormTaskEdit from "@/features/task/FormTaskEdit";
import PageLinks from "@/features/navigation/PageLinks";
import CardListName from "@/features/taskList/CardListName";
import ListImage from "../../../assets/list-2.png";
import { BsPinAngle } from "react-icons/bs";
import { UserContext } from "@/context/UserState";

export default function TaskListPage() {
  const { lists, pinnedLists, userLists, handleUpdateList } =
    useContext(ListContext);
  const { tasks, count, status, handleGetTasks } = useContext(TaskContext);
  const { userSettings } = useContext(UserContext);

  const [searchParams] = useSearchParams();

  const taskDisplay = userSettings?.taskView ?? "board";

  const page = parseInt(searchParams.get("page") ?? "1");
  const id = searchParams?.get("id") ?? "";

  useEffect(() => {
    if (!id) {
      navigate("/myLists");
    }
  }, []);

  const displayList = lists.find((item) => item.id === id);

  const [imgSrc, setImgSrc] = useState(displayList?.icon);

  const handleError = () => {
    setImgSrc(ListImage);
  };

  useEffect(() => {
    setImgSrc(displayList?.icon);
  }, [displayList]);

  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    handleGetTasks({
      comp: showCompleted,
      type: "LIST",
      listID: displayList?.id,
      page,
      ipp: 20,
    });
  }, [displayList?.id, showCompleted, page]);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [showEditList, setShowEditList] = useState(false);
  const [editList, setEditList] = useState<TaskList | null>(null);

  const [add, setAdd] = useState(false);
  // const [block, setBlock] = useState(false);

  const [viewEditTask, setViewEditTask] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  // const [dragItem, setDragItem] = useState<DragItem | null>(null);
  // const [dragOverItem, setDragOverItem] = useState<DragItem | null>(null);

  // const dragStart = ({ type = null, id = null, index = null }) => {
  //   setDragItem({ type, id, index });
  // };
  // const dragEnter = ({ type = null, id = null, index = null }) => {
  //   setDragOverItem({ type, id, index });
  // };
  // const dragEnd = () => {
  //   if (
  //     dragItem?.index === null ||
  //     dragItem?.index === undefined ||
  //     dragOverItem?.index === null ||
  //     dragOverItem?.index === undefined
  //   ) {
  //     setDragItem(null);
  //     setDragOverItem(null);
  //     return null;
  //   }

  //   if (block) {
  //     setBlock(false);
  //     return null;
  //   }

  //   const newTasks = showCompleted
  //     ? [...tasks]
  //     : tasks.filter((item) => item.completed !== true);

  //   const moveItem = newTasks.splice(dragItem?.index, 1)[0];
  //   newTasks.splice(dragOverItem.index, 0, moveItem);

  //   handleSortTasksList(newTasks);

  //   setDragItem(null);
  //   setDragOverItem(null);
  // };

  // const dragReset = () => {
  //   setBlock(true);
  //   setDragItem(null);
  //   setDragOverItem(null);
  // };

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

  let content;

  if (status?.isLoading === true) {
    content = (
      <div className="grid grid-cols-3 gap-4 ">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            className="w-full h-20 bg-rose-300/30 animate-pulse rounded-lg"
            key={i}
          />
        ))}
      </div>
    );
  } else if (status?.isError === true) {
    content = <p>Error Loading Tasks</p>;
  } else if (status?.isSuccess === true) {
    if (tasks.length === 0)
      content = <p>No tasks in this list, add new tasks</p>;
    else {
      // const displayTasks = Array.isArray(tasks)
      //   ? showCompleted
      //     ? tasks
      //     : tasks.filter((item) => item.completed !== true)
      //   : [];
      const displayTasks = tasks;
      content = (
        <div
          className={
            (taskDisplay === "list"
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3") + " grid gap-4 "
          } //flex items-stretch flex-wrap
          // onMouseLeave={dragReset}
        >
          {displayTasks.map((task) => {
            return (
              <CardTask
                task={task}
                key={task.id}
                setEdit={setViewEditTask}
                setEditItem={setEditTask}
              />
              // <CardTaskBlock
              //   openList
              //   key={task?.id}
              //   task={task}
              //   idx={idx}
              //   isDraggable={true}
              //   onDragStart={dragStart}
              //   onDragEnter={dragEnter}
              //   onDragEnd={dragEnd}
              // />
            );
          })}
        </div>
      );
    }
  }

  return (
    <main className="">
      {/* List Name */}
      <div className=" pt-4 pb-8 px-2 flex flex-col items-start rounded-xl bg-gradient-to-r from-sky-800 to-blue-950 shadow-md shadow-zinc-500">
        <header className="text-white gap-4 py-2 px-4 self-stretch group">
          <div className="flex items-stretch flex-1">
            <div
              className={
                (pinned ? "" : "") +
                " duration-200 cursor-pointer flex items-center justify-center"
              }
            >
              <button
                title="Pin List"
                onClick={() => setPinned((curr) => !curr)}
                className={
                  (pinned ? "" : "invisible group-hover:visible") +
                  " absolute top-2 left-2 hover:text-yellow-400 duration-200"
                }
              >
                <BsPinAngle size={28} />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <img src={imgSrc} className="w-10" onError={handleError} />
              <h1>{displayList?.title}</h1>
            </div>
          </div>
          <button
            title="Edit Title"
            onClick={() => setEdit(true)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg duration-200"
          >
            <CiEdit size={30} />
          </button>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            title="Add Task"
            onClick={() => setAdd(true)}
          >
            <BiPlus size={32} />
          </button>
        </header>
        <PageLinks />
      </div>
      {/* List Todo Items */}
      <div className="flex-1 flex flex-col gap-3 items-stretch justify-start px-0">
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
      <Pagination
        page={page}
        count={count}
        itemsPerPage={20}
        className={"mx-auto"}
      />
      {/* Link to other lists */}
      <div className="py-2 px-4 bg-zinc-800 rounded-lg text-white text-xl font-medium">
        <Link to={"/myLists"}>My Lists</Link>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 duration-300">
        {[...pinnedLists, ...userLists].slice(0, 4).map((item) => {
          return (
            <CardListName
              key={item.id}
              taskList={item}
              setEdit={setShowEditList}
              setEditItem={setEditList}
              setEditIcon={() => {}}
            />
          );
        })}
      </div>
      {add ? (
        <FormTaskAdd add={add} listID={displayList?.id ?? ""} setAdd={setAdd} />
      ) : null}
      {viewEditTask && editTask && (
        <FormTaskEdit
          task={editTask}
          edit={viewEditTask}
          setEdit={setViewEditTask}
        />
      )}
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
