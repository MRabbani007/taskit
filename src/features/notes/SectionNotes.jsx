import React, { useContext, useState } from "react";
import CardNoteTitle from "./CardNoteTitle";
import { NotesContext } from "../../context/NotesState";

export default function SectionNotes({ expand }) {
  const { notes } = useContext(NotesContext);

  return (
    <div
      className={
        (expand
          ? "translate-y-[0] opacity-100 "
          : "translate-y-[-20px] opacity-0 ") +
        " p-3 duration-300 flex flex-wrap flex-1 gap-3"
      }
    >
      {Array.isArray(notes) &&
        notes.map((note, idx) => {
          if (note?.trash === true) return;
          return <CardNoteTitle note={note} idx={idx} key={idx} />;
        })}

      {notes?.length === 0 && "No Notes"}
    </div>
  );
}
