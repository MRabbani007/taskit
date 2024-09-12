import { useContext } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../context/NotesState";

export default function DashboardNotes() {
  const { notes } = useContext(NotesContext);

  return (
    <article className="min-h-[100px] max-h-[400px] flex flex-col gap-4 p-4 bg-stone-100 rounded-lg">
      <Link title="Go to Notes" to="/pages/notes">
        <h2>Notes</h2>
      </Link>
      <ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {notes.slice(0, 6).map((note, index) => {
          return (
            <li key={index} className="py-1 px-4 bg-zinc-200">
              {note.title}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
