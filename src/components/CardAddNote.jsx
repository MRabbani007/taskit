import { useContext, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";
import { IoAdd, IoAddCircleOutline, IoCloseOutline } from "react-icons/io5";

const CardAddNote = () => {
  const { handleNotesCreate } = useContext(GlobalContext);

  const [add, setAdd] = useState(false);

  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      handleNotesCreate("New Note");
    } else {
      handleNotesCreate(title);
    }
    setAdd(false);
  };

  const createNote = () => {
    handleNotesCreate("New Note");
  };

  return (
    <div>
      {add ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-3"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>
            <button>
              <IoAdd className="icon" />
            </button>
            <IoCloseOutline className="icon" onClick={() => setAdd(false)} />
          </span>
        </form>
      ) : (
        <IoAddCircleOutline
          className="icon text-yellow-600"
          onClick={createNote}
        />
      )}
    </div>
  );
};

export default CardAddNote;
