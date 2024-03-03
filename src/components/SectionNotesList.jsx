import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import CardNoteTitle from "./CardNoteTitle";
import CardAddNote from "./CardAddNote";
import CardNote from "./CardNote";

const SectionNotesList = () => {
  const { notes } = useContext(GlobalContext);
  return (
    <div className="flex flex-wrap gap-3 py-3">
      {Array.isArray(notes) &&
        notes.map((note, idx) => {
          if (note.trash === true) return;
          return <CardNoteTitle note={note} idx={idx} key={idx} />;
        })}
      {notes?.length === 0 || (notes?.length === undefined && "Add Notes")}
      <CardAddNote />
    </div>
  );
};

export default SectionNotesList;
