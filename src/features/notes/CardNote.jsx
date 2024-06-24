import { useContext, useState } from "react";
import { CiTrash } from "react-icons/ci";
import CardNoteEditTitle from "./CardNoteEditTitle";
import CardNoteEditDetails from "./CardNoteEditDetails";
import { NotesContext } from "../../context/NotesState";
import { Button, Popconfirm } from "antd";

export default function CardNote({ note, idx }) {
  const { handleNoteUpdate } = useContext(NotesContext);

  const [editTitle, setEditTitle] = useState(false);
  const [editDetails, setEditDetails] = useState(false);

  const handleDelete = () => {
    handleNoteUpdate(idx, { ...note, trash: true });
  };

  return (
    <li className="flex flex-col flex-1 w-full">
      {/* title */}
      <div className="bg-yellow-300 border-b-4 border-yellow-400 font-semibold text-slate-600 h-12 flex items-center w-full">
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
            <Popconfirm
              title="Trash Note"
              description="Move note to trash?"
              onConfirm={handleDelete}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button
                type="text"
                className="flex items-center justify-center m-0 p-1 invisible group-hover:visible"
              >
                <CiTrash size={32} />
              </Button>
            </Popconfirm>
          </p>
        )}
      </div>
      {/* Body */}
      <div className="w-full h-full bg-yellow-200 hover:bg-yellow-100 duration-300 font-sans ">
        {!editDetails ? (
          <pre
            className="whitespace-break-spaces min-h-[50px] h-full cursor-pointer p-2 font-sans "
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
