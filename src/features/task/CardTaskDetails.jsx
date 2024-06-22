import { useContext, useState } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// Data
import { ACTIONS } from "../../data/actions";
// Icons
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

const CardTaskDetails = ({ task }) => {
  const { handleUpdateTask } = useContext(TaskContext);
  const [addDetail, setAddDetail] = useState(false);
  const [detailInput, setDetailInput] = useState(task?.details || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateTask(ACTIONS.UPDATE_TASK_DETAILS, {
      id: task?.id,
      details: detailInput,
    });
    setAddDetail(false);
  };

  const handleReset = () => {
    setAddDetail(false);
  };

  return (
    <div className="w-full h-full">
      {addDetail ? (
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="flex items-center"
        >
          <input
            type="text"
            value={detailInput}
            onChange={(e) => {
              setDetailInput(e.target.value);
            }}
            autoFocus
            className="flex-1 p-0 m-0 bg-transparent border-none outline-none"
            placeholder="Details"
          />
          <button type="submit">
            <CiSquareCheck className="icon" />
          </button>
          <button type="reset">
            <CiSquareRemove className="icon" />
          </button>
        </form>
      ) : !task?.details ? (
        <span
          onClick={() => setAddDetail(true)}
          className="font-light italic text-zing-500 cursor-pointer"
        >
          Add Detail
        </span>
      ) : (
        <p
          onClick={() => setAddDetail(true)}
          className="mx-3 whitespace-break-spaces overflow-y-scroll h-full"
        >
          {task?.details}
        </p>
      )}
    </div>
  );
};

export default CardTaskDetails;
