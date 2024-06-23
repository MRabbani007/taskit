import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesState";
import { AiOutlineSave } from "react-icons/ai";
import { BiX } from "react-icons/bi";

// Simple UI
// Quick Entry/Capture - quickly create tasks, easy editing
// Filters & sorting
// Calendar
// Today List, Future Tasks, important, overdue
// Prioritization & priority levels
// Reorder Tasks
// Recurring Tasks
// Status Tracking

export default function CardNoteEditDetails({ note, setEditDetails, idx }) {
  const { handleNoteUpdate } = useContext(NotesContext);

  const [details, setDetails] = useState(note?.details || "");

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    handleNoteUpdate(idx, { ...note, details });
    setEditDetails(false);
  };

  const handleResetDetails = () => {
    setEditDetails(false);
  };

  const cols = 30;
  const initialvalue = 0;
  const rows = note?.details
    .split("\n")
    .reduce(
      (acc, curr) => acc + 1 + Math.floor(curr.length / cols),
      initialvalue
    );

  return (
    <form
      className="relative h-full p-2"
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
  );
}
