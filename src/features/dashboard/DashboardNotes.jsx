import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../context/NotesState";

export default function DashboardNotes() {
  const { notes } = useContext(NotesContext);

  return (
    <article className="flex-1 min-w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
      <h2 className="border-b-2 py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-300 text-white rounded-t-md">
        Notes
      </h2>
      <div className="p-2 h-full max-h-[300px] overflow-y-scroll">
        <ul className="flex flex-wrap justify-center gap-2">
          {notes.slice(0, 8).map((note, index) => {
            return (
              <li
                key={index}
                className="w-full bg-slate-300 rounded-md p-2 flex items-center gap-2"
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
