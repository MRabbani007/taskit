import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaPlus, FaTimes } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
// Imported Media
import IMG_Delete from "../assets/trash.png";
import IMG_Edit from "../assets/edit.png";
import IMG_Cancel from "../assets/cancel.png";
import IMG_Save from "../assets/save.png";

const CardNoteTitle = ({ note, idx }) => {
  const { handleNotesUpdate } = useContext(GlobalContext);

  const [editTitle, setEditTitle] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [title, setTitle] = useState(note?.title || "");
  const [details, setDetails] = useState(note?.details || "");

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    let newNote = note;
    newNote.title = title;
    handleNotesUpdate(idx, newNote);
    setEditTitle(false);
  };

  const handleSubmiteDetails = (e) => {
    e.preventDefault();
    let newNote = note;
    newNote.details = details;
    handleNotesUpdate(idx, newNote);
    setEditDetails(false);
  };

  const handleDelete = () => {
    let newNote = note;
    newNote.trash = true;
    handleNotesUpdate(idx, newNote);
  };

  return (
    <li className="flex flex-col flex-1 min-w-fit bg-yellow-200 shadow-sm shadow-slate-600 rounded-md">
      {editTitle ? (
        <form
          onSubmit={handleSubmitTitle}
          className="flex flex-wrap justify-between px-2 items-center rounded-t-md gap-3 bg-yellow-300"
        >
          <input
            type="text"
            placeholder="Title"
            className="flex-1 border-0 bg-inherit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="flex items-center">
            <button>
              <img
                src={IMG_Save}
                alt="Save"
                title="Save"
                className="icon-md mr-2"
              />
            </button>
            <img
              src={IMG_Cancel}
              alt="Cancel"
              title="Cancel"
              className="icon-md"
              onClick={() => {
                setEditTitle(false);
              }}
            />
          </span>
        </form>
      ) : (
        <span className="group p-2 bg-yellow-300 font-semibold text-slate-600 flex justify-between items-center rounded-t-md">
          <span className="cursor-pointer" onClick={() => setEditTitle(true)}>
            {note.title}
          </span>
          {/* <img
            src={IMG_Edit}
            alt="Edit"
            title="Edit"
            className="icon-md mr-1 cursor-pointer"
          /> */}
          <img
            src={IMG_Delete}
            alt="Delete"
            title="Delete"
            className="icon-md cursor-pointer invisible group-hover:visible"
            onClick={handleDelete}
          />
        </span>
      )}
      {!editDetails ? (
        <pre
          className="p-2 min-w-[200px] min-h-[50px] h-full flex items-center rounded-b-mb hover:bg-yellow-100 duration-300 cursor-pointer"
          onClick={() => {
            setEditDetails(true);
          }}
        >
          {details}
        </pre>
      ) : (
        <form className="relative" onSubmit={handleSubmiteDetails}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            className="outline-none border-0 bg-yellow-200 p-2 border-red-700"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          <button>
            <img
              src={IMG_Save}
              alt="Save"
              title="Save"
              className="icon mr-1 absolute top-0 right-0"
            />
          </button>
        </form>
      )}
    </li>
  );
};

export default CardNoteTitle;
