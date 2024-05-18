import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CiTrash } from "react-icons/ci";
// Imported Media
import { BiCheck, BiX } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";

const CardNoteTitle = ({ note, idx }) => {
  const { handleNotesUpdate } = useContext(GlobalContext);

  const [editTitle, setEditTitle] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [title, setTitle] = useState(note?.title || "");
  const [details, setDetails] = useState(note?.details || "");

  const cols = 30;
  const initialvalue = 0;
  const rows = note?.details
    .split("\n")
    .reduce(
      (acc, curr) => acc + 1 + Math.floor(curr.length / cols),
      initialvalue
    );

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    let newNote = note;
    newNote.title = title;
    handleNotesUpdate(idx, newNote);
    setEditTitle(false);
  };

  const handleResetTitle = () => {
    setEditTitle(false);
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    let newNote = note;
    newNote.details = details;
    handleNotesUpdate(idx, newNote);
    setEditDetails(false);
  };

  const handleResetDetails = () => {
    setEditDetails(false);
  };

  const handleDelete = () => {
    let newNote = { ...note };
    newNote.trash = true;
    handleNotesUpdate(idx, newNote);
  };

  return (
    <li className="flex flex-col flex-1 max-w-[400px] min-w-[400px] sm:w-full">
      {/* title */}
      <div className="bg-yellow-300 border-b-4 border-yellow-400 font-semibold text-slate-600 h-12 flex items-center w-full">
        {editTitle ? (
          <form
            onSubmit={handleSubmitTitle}
            onReset={handleResetTitle}
            className="flex flex-nowrap pr-2 items-center"
          >
            <input
              type="text"
              placeholder="Title"
              className="flex-1 border-0 outline-none bg-inherit max-w-[80%] font-semibold text-slate-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="flex items-center shrink-0">
              <button type="submit" title="Save">
                <BiCheck size={32} />
              </button>
              <button type="reset" title="Cancel">
                <BiX size={32} />
              </button>
            </span>
          </form>
        ) : (
          <p className="group p-2 flex justify-between items-center flex-1">
            <span className="cursor-pointer" onClick={() => setEditTitle(true)}>
              {note.title}
            </span>
            {/* <img
            src={IMG_Edit}
            alt="Edit"
            title="Edit"
            className="icon-md mr-1 cursor-pointer"
          /> */}
            <button
              onClick={handleDelete}
              title="Delete Note"
              className="invisible group-hover:visible"
            >
              <CiTrash size={32} />
            </button>
          </p>
        )}
      </div>
      {/* Body */}
      <div className="p-2 w-full bg-yellow-200 hover:bg-yellow-100 duration-300 font-sans">
        {!editDetails ? (
          <pre
            className="whitespace-break-spaces min-h-[50px] h-full cursor-pointer p-2 font-sans"
            onClick={() => {
              setEditDetails(true);
            }}
          >
            {details}
          </pre>
        ) : (
          <form
            className="relative"
            onSubmit={handleSubmitDetails}
            onReset={handleResetDetails}
          >
            <textarea
              name=""
              id=""
              cols={cols}
              rows={rows}
              className="outline-none border-0 bg-inherit h-full"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
            <p className="absolute bottom-0 right-0">
              <button type="Submit" title="Save">
                <AiOutlineSave size={32} />
              </button>
              <button type="Reset" title="Cancel">
                <BiX size={32} />
              </button>
            </p>
          </form>
        )}
      </div>
    </li>
  );
};

export default CardNoteTitle;
