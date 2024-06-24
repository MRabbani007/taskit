import { useContext, useEffect, useRef, useState } from "react";
// Context
import { ListContext } from "../../context/ListState";
// Hooks
import useDebounce from "../../hooks/useDebounce";
// Components
import ListTitleEdit from "./ListTitleEdit";
// Imported Data
import { IMAGES_Icons } from "../../data/templates";
// Imported Media
import { CiEdit, CiTrash } from "react-icons/ci";
import { BsPinAngle } from "react-icons/bs";
import { Button, Popconfirm, message } from "antd";

const CardListName = ({ taskList }) => {
  const { listSummary, handleUpdateList, handleOpen } = useContext(ListContext);

  const [edit, setEdit] = useState(false);
  const [summary, setSummary] = useState({});

  const [pinned, setPinned] = useState(taskList?.pinned || false);
  const debouncePin = useDebounce(pinned, 1000);

  const handlePin = () => {
    handleUpdateList(taskList?.id, "list_pin", debouncePin);
  };

  useEffect(() => {
    let temp = {};
    if (listSummary.length !== 0) {
      temp = listSummary.find((item) => item._id === taskList.id);
      if (!!temp) {
        setSummary(temp);
      }
    }
  }, [listSummary]);

  const handleTrash = () => {
    handleUpdateList(taskList.id, "trash", true);
    message.success("List moved to trash");
  };

  const mounted = useRef();

  useEffect(() => {
    if (mounted?.current === true) {
      handlePin();
      message.success("Task Pinned");
    }
    mounted.current = true;
  }, [debouncePin]);

  return (
    <li
      key={taskList?.id}
      // draggable
      // onDrag={onDragStart}
      className="flex items-stretch py-1 pr-4 border-[1px] border-zinc-300"
    >
      <div
        className={
          (pinned ? "w-[20px] " : "w-[20px] hover:w-[60px]") +
          " duration-200 group cursor-pointer flex items-center justify-center relative"
        }
      >
        <button
          title="Pin List"
          onClick={() => setPinned((curr) => !curr)}
          className={
            pinned
              ? "absolute top-0 left-0 text-sky-800"
              : "hidden group-hover:inline-block"
          }
        >
          <BsPinAngle size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 flex-1 group">
        <img src={IMAGES_Icons + taskList?.icon} className="icon-lg mr-2" />
        <div className="flex-1">
          {/* Edit List Title */}
          {edit ? (
            <ListTitleEdit list={taskList} setEdit={setEdit} />
          ) : (
            <p
              className="text-lg font-bold text-slate-800 px-0 cursor-pointer"
              onClick={() => {
                handleOpen(taskList);
              }}
            >
              {taskList.title}
            </p>
          )}
          <p>
            {(summary?.total ? summary?.total : 0) +
              (summary?.total === 1 ? " task" : " tasks, ") +
              ((summary?.pending ? summary?.pending : 0) + " open")}
          </p>
        </div>
        <span className="flex items-center ml-2 invisible group-hover:visible">
          <button onClick={() => setEdit(true)}>
            <CiEdit size={32} />
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
              <CiTrash size={32} />
            </Button>
          </Popconfirm>
        </span>
      </div>
    </li>
  );
};

export default CardListName;
