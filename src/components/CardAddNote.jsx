import { useContext, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";

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
              <FaPlus className="icon" />
            </button>
            <FaTimes className="icon" onClick={() => setAdd(false)} />
          </span>
        </form>
      ) : (
        <FaPlus onClick={() => setAdd(true)} />
      )}
    </div>
  );
};

export default CardAddNote;
