import { FormEvent, useContext } from "react";
// Context
import { NotesContext } from "../../context/NotesState";
// Components
import CardNote from "../../features/notes/CardNote";
// Icons
import { BiPlus } from "react-icons/bi";
import { T_NOTE } from "@/lib/templates";
import PageLinks from "@/features/navigation/PageLinks";

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
      <div className=" pt-4 pb-8 px-2 flex flex-col items-start rounded-xl bg-gradient-to-r from-yellow-800 to-yellow-400 shadow-md shadow-zinc-500">
        <header className="text-white gap-4 py-2 px-4 self-stretch">
          {/* <BsCardList size={40} /> */}
          <div className="flex-1">
            <h1 className="py-1 px-4 bg-white/20 rounded-lg w-fit">Notes</h1>
          </div>
          {/* <SlArrowRight
          size={25}
          className={(expand ? "rotate-90 " : "") + " duration-300"}
        /> */}
          <form
            onSubmit={onSubmit}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
          >
            <button type="submit">
              <BiPlus size={30} />
            </button>
          </form>
        </header>
        <PageLinks />
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
