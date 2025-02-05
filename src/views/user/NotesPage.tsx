import { FormEvent, useContext } from "react";
// Context
import { NotesContext } from "../../context/NotesState";
// Components
import CardNote from "../../features/notes/CardNote";
// Icons
import { BiPlus } from "react-icons/bi";
import { T_NOTE } from "@/lib/templates";

export const AcceptTypes = {
  Note: "Note",
};

export default function NotesPage() {
  const { notes, status, handleNoteCreate } = useContext(NotesContext);
  const expand = true;

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
          return <CardNote note={note} key={index} />;
        })
      );
  }

  return (
    <main className="p-4 relative">
      <div className="flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className=" bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white"
        >
          <button type="submit">
            <BiPlus size={30} />
          </button>
        </form>
      </div>
      <div
        className={
          (expand
            ? "translate-y-0 opacity-100 "
            : "-translate-y-6 opacity-0 ") +
          " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 duration-300"
        }
      >
        {content}
      </div>
    </main>
  );
}
