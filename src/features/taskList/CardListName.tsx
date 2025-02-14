import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
// Context
import { ListContext } from "../../context/ListState";
// Hooks
import useDebounce from "../../hooks/useDebounce";
// Imported Media
import { BsPinAngle } from "react-icons/bs";
import { Button, Popconfirm, message } from "antd";
import ListImage from "../../assets/list-2.png";
import { useNavigate } from "react-router-dom";
import { CiEdit, CiImageOn, CiTrash } from "react-icons/ci";
import ProgressBar from "../components/ProgressBar";

export default function CardListName({
  taskList,
  setEdit,
  setEditIcon,
  setEditItem,
}: {
  taskList: TaskList;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditIcon: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<TaskList | null>>;
}) {
  const { listSummary, handleUpdateList } = useContext(ListContext);
  const navigate = useNavigate();

  const [summary, setSummary] = useState<ListSummary | null>(null);

  const [pinned, setPinned] = useState(taskList?.pinned || false);
  const debouncePin = useDebounce(pinned, 1000);

  const handleOpen = () => {
    navigate(`/myLists/tasklist?id=${taskList?.id}`);
  };
  const handlePin = () => {
    handleUpdateList({ ...taskList, pinned: debouncePin });
  };

  const [imgSrc, setImgSrc] = useState(taskList?.icon);

  const handleError = () => {
    setImgSrc(ListImage);
  };

  useEffect(() => {
    let temp = null;
    if (listSummary.length !== 0) {
      temp = listSummary.find((item) => item._id === taskList.id);
      if (temp) {
        setSummary(temp);
      }
    }
  }, [listSummary]);

  const handleTrash = () => {
    handleUpdateList({ ...taskList, trash: true });
    message.success("List moved to trash");
  };

  useEffect(() => {
    if (debouncePin !== taskList.pinned) {
      handlePin();
      message.success("Task Updated");
    }
  }, [debouncePin]);

  return (
    <div
      key={taskList?.id}
      // draggable
      // onDrag={onDragStart}
      className="flex flex-col relative group"
    >
      <button
        title="Pin List"
        onClick={() => setPinned((curr) => !curr)}
        className={
          pinned
            ? " absolute top-2 left-2 text-sky-800"
            : " hidden group-hover:inline-block  absolute top-2 left-2"
        }
      >
        <BsPinAngle size={20} />
      </button>
      <div className="flex flex-col text-center bg-zinc-100 hover:bg-cyan-100/40 duration-200 rounded-lg p-4 flex-1">
        <div className="flex items-center justify-start gap-2 mb-4">
          <img src={imgSrc} className="w-10" onError={handleError} />
          <p
            className="text-lg font-bold text-slate-800 px-0 cursor-pointer hover:text-blue-500 duration-200"
            onClick={handleOpen}
          >
            {taskList.title}
          </p>
        </div>
        <div className="flex-1">
          {/* Edit List Title */}

          {/* <p>
            {(summary?.total ? summary?.total : 0) +
              (summary?.total === 1 ? " task" : " tasks, ") +
              ((summary?.pending ? summary?.pending : 0) + " open")}
          </p> */}
          {summary?.total && summary?.total !== 0 && (
            <ProgressBar
              completed={summary.total - (summary?.pending ?? 0)}
              total={summary?.total ?? 0}
            />
          )}
        </div>
        {/* <div className="absolute top-1 left-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-200">
          <button className="text-zinc-800">
            <GoPin size={20} />
          </button>
        </div> */}
        <div className="absolute top-1 right-1 flex items-center ml-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 duration-200">
          <button
            onClick={() => {
              setEdit(true);
              setEditItem(taskList);
            }}
            className="p-1"
          >
            <CiEdit size={25} />
          </button>
          <button
            onClick={() => {
              setEditIcon(true);
              setEditItem(taskList);
            }}
            className="p-1"
          >
            <CiImageOn size={25} />
          </button>
          <Popconfirm
            title="Trash List"
            description="Move list to trash?"
            onConfirm={handleTrash}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button
              type="text"
              className="flex items-center justify-center m-0 p-1"
            >
              <CiTrash size={25} />
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}
