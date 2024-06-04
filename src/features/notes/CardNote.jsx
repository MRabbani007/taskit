import { useContext, useState } from "react";
import { CiTrash } from "react-icons/ci";
import CardNoteEditTitle from "./CardNoteEditTitle";
import CardNoteEditDetails from "./CardNoteEditDetails";
import { NotesContext } from "../../context/NotesState";

export default function CardNote({ note, idx }) {
  const { handleNoteUpdate } = useContext(NotesContext);

  const [editTitle, setEditTitle] = useState(false);
  const [editDetails, setEditDetails] = useState(false);

  const handleDelete = () => {
    handleNoteUpdate(idx, { ...note, trash: true });
  };

  return (
    <li className="flex flex-col flex-1 max-w-[600px] min-w-[200px] w-full">
      {/* title */}
      <div className="bg-yellow-300 border-b-4 border-yellow-400 font-semibold text-slate-600 h-12 flex items-center w-full rounded-t-lg">
        {editTitle ? (
          <CardNoteEditTitle
            note={note}
            setEditTitle={setEditTitle}
            idx={idx}
          />
        ) : (
          <p className="group py-2 px-4 flex justify-between items-center flex-1">
            <span className="cursor-pointer" onClick={() => setEditTitle(true)}>
              {note?.title}
            </span>
            {/* <img
            src={IMG_Edit}
            alt="Edit"
            title="Edit"
            className="icon-md mr-1 cursor-pointer"
          /> */}
            <button
              onClick={handleDelete}
              title="Trash Note"
              className="invisible group-hover:visible"
            >
              <CiTrash size={32} />
            </button>
          </p>
        )}
      </div>
      {/* Body */}
      <div className="p-2 w-full h-full bg-yellow-200 hover:bg-yellow-100 duration-300 font-sans rounded-b-lg">
        {!editDetails ? (
          <pre
            className="whitespace-break-spaces min-h-[50px] h-full cursor-pointer p-2 font-sans rounded-b-lg"
            onClick={() => {
              setEditDetails(true);
            }}
          >
            {note?.details}
          </pre>
        ) : (
          <CardNoteEditDetails
            note={note}
            setEditDetails={setEditDetails}
            idx={idx}
          />
        )}
      </div>
    </li>
  );
}
