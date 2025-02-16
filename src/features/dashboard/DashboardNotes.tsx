import { useContext } from "react";
import { Link } from "react-router-dom";
import { NotesContext } from "../../context/NotesState";
import { SlNotebook } from "react-icons/sl";

export default function DashboardNotes() {
  const { notes } = useContext(NotesContext);

  return (
    <article className="border-[px] border-zinc-400 bg-gray-50 rounded-xl min-h-[100px] max-h-[400px] flex flex-col">
      <Link title="Go to Notes" to="/pages/notes">
        <h2 className="flex items-center gap-2 py-4 px-4 font-normal text-sky-800">
          <SlNotebook size={25} />
          Notes
        </h2>
      </Link>
      <div className="flex-1 flex flex-col rounded-b-lg overflow-y-auto">
        {notes.slice(0, 6).map((note, index) => {
          return (
            <div
              key={index}
              className="py-2 px-4 hover:bg-yellow-100 duration-200"
            >
              {note.title}
            </div>
          );
        })}
      </div>
    </article>
  );
}
