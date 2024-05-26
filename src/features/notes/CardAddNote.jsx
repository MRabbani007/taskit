import { useContext, useState } from "react";
import { IoAdd, IoAddCircleOutline, IoCloseOutline } from "react-icons/io5";
import { NotesContext } from "../../context/NotesState";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CardAddNote = () => {
  const { handleNoteCreate } = useContext(NotesContext);

  const [add, setAdd] = useState(false);

  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      handleNoteCreate("New Note");
    } else {
      handleNoteCreate(title);
    }
    setAdd(false);
  };

  const createNote = () => {
    handleNoteCreate("New Note");
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
        <FloatButton
          type="primary"
          tooltip="Add New Note"
          onClick={createNote}
          icon={<PlusOutlined />}
          style={{ right: 94 }}
        ></FloatButton>
      )}
    </div>
  );
};

export default CardAddNote;
