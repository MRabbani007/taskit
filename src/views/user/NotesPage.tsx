import { FormEvent, useContext } from "react";
// Context
import { NotesContext } from "../../context/NotesState";
// Components
import CardNote from "../../features/notes/CardNote";
// Icons
import { GrNotes } from "react-icons/gr";
import { BiPlus } from "react-icons/bi";
import { T_NOTE } from "@/lib/templates";

export const AcceptTypes = {
  Note: "Note",
};

export default function NotesPage() {
  const { notes, status, handleNoteCreate } = useContext(NotesContext);
  const expand = false;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleNoteCreate({ ...T_NOTE, title: "New Note" });
  };

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
      <header className="py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white gap-4 flex items-center">
        <GrNotes size={30} />
        <h1>Notes</h1>
        <form onSubmit={onSubmit} className="ml-auto">
          <button type="submit">
            <BiPlus size={30} />
          </button>
        </form>
      </header>
      <div className="">
        <div
          className={
            (expand
              ? "translate-y-0 opacity-100 "
              : "-translate-y-6 opacity-0 ") +
            " flex flex-wrap gap-4 items-stretch duration-300"
          }
        >
          {content}
        </div>
      </div>
    </main>
  );
}
