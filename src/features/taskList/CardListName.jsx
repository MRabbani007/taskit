import { useContext, useEffect, useState } from "react";
// Imported Data
import { IMAGES_Icons } from "../../data/templates";
// Imported Media
import { GlobalContext } from "../../context/GlobalState";
import { CiEdit, CiTrash } from "react-icons/ci";
import { BiCheck, BiX } from "react-icons/bi";

const CardListName = ({ taskList }) => {
  const { handleUpdateList, handleOpen, listSummary } =
    useContext(GlobalContext);

  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(taskList?.title || "");
  const [summary, setSummary] = useState({});

  useEffect(() => {
    let temp = {};
    if (listSummary.length !== 0) {
      temp = listSummary.find((item) => item._id === taskList.id);
      if (!!temp) {
        setSummary(temp);
      }
    }
  }, [listSummary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateList(taskList.id, "list_title", editInput);
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  const handleTrash = () => {
    handleUpdateList(taskList.id, "trash", true);
  };

  return (
    <li
      key={taskList.id}
      className="flex items-center py-1 px-3 shadow-sm shadow-slate-600 rounded-md"
    >
      <div className="flex items-center justify-between gap-3 flex-1 group">
        <img src={IMAGES_Icons + taskList.icon} className="icon-lg mr-2" />
        <div className="flex-1">
          {/* Edit List Title */}
          {edit ? (
            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className="flex items-center"
            >
              <input
                type="text"
                className="w-[150px] h-auto p-0 text-slate-950 font-normal"
                value={editInput}
                onChange={(e) => {
                  setEditInput(e.target.value);
                }}
              />
              <button type="submit" title="Save">
                <BiCheck size={32} />
              </button>
              <button type="reset" title="Cancel">
                <BiX size={32} />
              </button>
            </form>
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
