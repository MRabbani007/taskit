import { useContext, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalState";

const CardTaskDetails = ({ task }) => {
  const { handleUpdateTask } = useContext(GlobalContext);
  const [addDetail, setAddDetail] = useState(false);
  const [detailInput, setDetailInput] = useState(task?.details || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateTask(task?.id, "detail", detailInput);
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