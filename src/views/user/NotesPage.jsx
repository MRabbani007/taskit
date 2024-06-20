import { useContext, useState } from "react";
import { GrNotes } from "react-icons/gr";
import CardAddNote from "../../features/notes/CardAddNote";
import { NotesContext } from "../../context/NotesState";
import CardNote from "../../features/notes/CardNote";

const NotesPage = () => {
  const [expand, setExpand] = useState(true);
  const { notes, status } = useContext(NotesContext);

  let content;

  if (status?.isLoading === true) {
    content = <p>Loading...</p>;
  } else if (status?.isError === true) {
    content = <p>Error Loading Notes</p>;
  } else if (status?.isSuccess === true) {
    content =
      notes.length === 0 ? (
        <p>No notes yet, create new note</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {notes.map((note, idx) => {
            if (note?.trash === true) return;
            return <CardNote note={note} idx={idx} key={idx} />;
          })}
        </ul>
      );
  }

  return (
    <main>
      <header
        className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white shadow-md shadow-zinc-500"
        // onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <GrNotes size={40} />
          <h1>Notes</h1>
        </div>
      </header>
      <div>
        <div
          className={
            (expand
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 ") +
            " duration-300 flex flex-wrap flex-1 gap-4 items-stretch"
          }
        >
          {content}
        </div>
        <CardAddNote />
      </div>
    </main>
  );
};

export default NotesPage;
