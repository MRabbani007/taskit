import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardNotes() {
  const notes = [];

  return (
    <article className="w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
      <h2 className="border-b-2 py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-300 text-white rounded-t-md">
        Notes
      </h2>
      <div className="p-2 h-full">
        <ul className="flex flex-wrap justify-center gap-2">
          {notes.slice(0, 8).map((note, index) => {
            return (
              <li
                key={index}
                className="w-[45%] bg-slate-300 rounded-md p-2 flex items-center gap-2"
              >
                {note.title}
              </li>
            );
          })}
        </ul>
        <div className="w-full flex justify-center items-center h-full">
          <Button type="primary" title="Open Notes Page">
            <Link to="/notes">Open Notes</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
