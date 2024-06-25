import { useContext, useRef, useState } from "react";
// Context
import { NotesContext } from "../../context/NotesState";
// Components
import CardAddNote from "../../features/notes/CardAddNote";
import CardNote from "../../features/notes/CardNote";
// Icons
import { GrNotes } from "react-icons/gr";
import { message } from "antd";

export const AcceptTypes = {
  Note: "Note",
};

const NotesPage = () => {
  const { notes, status } = useContext(NotesContext);
  const [expand, setExpand] = useState(true);

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
        notes.map((note, index) => {
          return <CardNote note={note} idx={index} key={index} />;
        })
      );
  }

  return (
    <main>
      <header
        className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white shadow-md shadow-zinc-500"
        // onClick={() => setExpand((curr) => !curr)}
      >
        <div>
          <GrNotes size={40} />
          <h1>Notes</h1>
        </div>
      </header>
      <div className="h-auto">
        <div
          className={
            (expand
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 ") +
            " flex flex-wrap flex-1 gap-4 items-stretch duration-300"
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
