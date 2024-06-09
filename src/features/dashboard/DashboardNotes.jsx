import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../context/NotesState";

export default function DashboardNotes() {
  const { notes } = useContext(NotesContext);

  return (
    <article className="flex-1 min-w-[300px] min-h-[200px]">
      <h2 className="py-2 px-4 bg-gradient-to-l from-yellow-400 to-yellow-100 text-zinc-800">
        Notes
      </h2>
      <div className="h-full max-h-[300px]  py-2">
        <ul className="flex flex-wrap justify-center gap-2 overflow-y-auto">
          {notes.slice(0, 6).map((note, index) => {
            return (
              <li
                key={index}
                className="w-full bg-slate-300 p-2 flex items-center gap-2"
              >
                {note.title}
              </li>
            );
          })}
        </ul>
        <div className="w-full flex justify-center items-center p-2">
          <Button type="primary" title="Open Notes Page">
            <Link to="/notes">Open Notes</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
