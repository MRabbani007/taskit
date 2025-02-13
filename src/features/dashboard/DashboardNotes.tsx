import { useContext } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../context/NotesState";

export default function DashboardNotes() {
  const { notes } = useContext(NotesContext);

  return (
    <article className="min-h-[100px] max-h-[400px] flex flex-col rounded-lg overflow-clip">
      <Link title="Go to Notes" to="/pages/notes">
        <h2 className="flex items-center py-2 px-4 font-normal rounded-t-lg bg-yellow-400 text-white">
          Notes
        </h2>
      </Link>
      <div className="flex-1 flex flex-col rounded-b-lg bg-stone-300 overflow-y-auto">
        {notes.slice(0, 6).map((note, index) => {
          return (
            <div
              key={index}
              className="py-2 px-4 hover:bg-zinc-100 duration-200"
            >
              {note.title}
            </div>
          );
        })}
      </div>
    </article>
  );
}
