import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

const CardNote = ({ note }) => {
  let color = "";
  if (note.priority === "high") {
    color = "bg-red-400";
  } else if (note.priority === "normal") {
    color = "bg-yellow-300";
  } else if (note.priority === "low") {
    color = "bg-green-300";
  }

  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(note?.text || "");

  return (
    <div className="max-w-[400px]">
      <h2 className={color + " p-2 flex justify-between"}>
        <span>{note?.title}</span>
        <span>
          <IoCheckmarkOutline
            className="icon-md"
            onClick={() => setEdit(false)}
          />
          <IoCloseOutline className="icon-md" />
        </span>
      </h2>
      {!edit ? (
        <p
          className="p-2 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer"
          onClick={() => {
            setEdit(true);
          }}
        >
          {/* <FaCircle className={color + " icon-sm mr-2"} /> */}
          {content}
        </p>
      ) : (
        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          className="outline-none border-0 bg-yellow-200 p-2 border-red-700"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

export default CardNote;
