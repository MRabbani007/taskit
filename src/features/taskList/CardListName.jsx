import { useContext, useEffect, useState } from "react";
// Imported Data
import { IMAGES_Icons } from "../../data/templates";
// Imported Media
import { GlobalContext } from "../../context/GlobalState";
import { CiEdit, CiTrash } from "react-icons/ci";
import { BsPinAngle } from "react-icons/bs";
import ListTitleEdit from "./ListTitleEdit";

const CardListName = ({ taskList }) => {
  const { handleOpen, listSummary } = useContext(GlobalContext);

  const [edit, setEdit] = useState(false);
  const [summary, setSummary] = useState({});

  const [pinned, setPinned] = useState(false);

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
  };

  return (
    <li
      key={taskList?.id}
      className="flex items-stretch py-1 pr-4 shadow-sm shadow-slate-600 rounded-md"
    >
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
                handleOpen(taskList.id);
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
          <button onClick={handleTrash}>
            <CiTrash size={32} />
          </button>
        </span>
      </div>
    </li>
  );
};

export default CardListName;
