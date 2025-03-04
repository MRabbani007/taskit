import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../../context/NotesState";
import CardNote from "../../features/notes/CardNote";
import { BiPlus } from "react-icons/bi";
import { T_NOTE } from "@/lib/templates";
import CardNoteTrash from "@/features/notes/CardNoteTrash";
import PageHeader from "@/features/components/PageHeader";
import { BsBoxArrowUpRight, BsThreeDotsVertical } from "react-icons/bs";
import Button from "@/features/components/Button";

export const AcceptTypes = {
  Note: "Note",
};

export default function NotesPage() {
  const { notes, status, handleNoteCreate, handleNoteUpdate, trash } =
    useContext(NotesContext);

  const [showList, setShowList] = useState(false);

  const expand = true;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleNoteCreate({ ...T_NOTE, title: "New Note" });
  };

  const handleOpen = (note: Note) => {
    handleNoteUpdate({ ...note, isOpen: !note.isOpen });
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let content;
  let contentTrash;

  const NoteSkeleton = () => (
    <div className="flex flex-col animate-pulse rounded-lg">
      <div className="w-full h-10 bg-amber-800 self-stretch"></div>
      <div className="bg-amber-700/30 h-40 self-stretch"></div>
    </div>
  );

  if (status?.isLoading === true) {
    content = (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <NoteSkeleton key={i} />
        ))}
      </>
    );
    contentTrash = <div>Loading...</div>;
  } else if (status?.isError === true) {
    content = <p>Error Loading Notes</p>;
    contentTrash = <p>Error Loading Notes</p>;
  } else if (status?.isSuccess === true) {
    content =
      notes.length === 0 ? (
        <p>No notes yet, create new note</p>
      ) : (
        notes.map(
          (note) =>
            note?.isOpen === true && <CardNote note={note} key={note.id} />
        )
      );
    contentTrash =
      trash.length === 0 ? (
        <p>No notes in trash</p>
      ) : (
        trash.map((note, index) => {
          return <CardNoteTrash note={note} key={index} />;
        })
      );
  }

  return (
    <main className="relative">
      <PageHeader className="">
        <div
          ref={dropdownRef}
          className="flex-1 relative flex items-center gap-2"
        >
          <button
            onClick={() => setShowList((curr) => !curr)}
            className="w-12 h-12 bg-zinc-400/20 hover:bg-zinc-400/50 duration-200 rounded-full flex items-center justify-center"
          >
            <BsThreeDotsVertical size={25} />
          </button>
          <h1 className="font-normal">Notes</h1>
          <div
            className={
              (showList
                ? ""
                : " -translate-y-4 opacity-0 invisible pointer-events-none ") +
              " flex flex-col font-medium text-zinc-900 rounded-lg overflow-clip absolute top-full left-0 duration-200 z-10"
            }
          >
            <div className="flex flex-col">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-zinc-200 hover:bg-zinc-300 duration-200 py-2 px-4 flex items-center gap-2"
                >
                  <p className="flex-1">
                    {note?.title ?? note.details.substring(0, 50)}
                  </p>
                  <Button onClick={() => handleOpen(note)}>
                    <BsBoxArrowUpRight size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <button
            type="submit"
            className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          >
            <BiPlus size={25} />
          </button>
        </form>
      </PageHeader>
      <div className="flex items-stretch gap-4">
        <div
          className={
            (expand
              ? "translate-y-0 opacity-100 "
              : "-translate-y-6 opacity-0 ") +
            "flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 duration-300"
          }
        >
          {content}
        </div>
      </div>
      {/* <header className="py-2 px-4 bg-gradient-to-r from-stone-800 to-stone-950 text-white gap-4 rounded-lg">
        <CiTrash size={30} />
        <h2 className="flex-1">Trash</h2>
        <p>
          {trash.length === 0
            ? "No notes in trash"
            : trash?.length === 1
            ? "1 note in trash"
            : `${trash.length} notes in trash`}
        </p>
      </header>
      <div
        className={
          (expand
            ? "translate-y-0 opacity-100 "
            : "-translate-y-6 opacity-0 ") +
          " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 duration-300"
        }
      >
        {contentTrash}
      </div> */}
    </main>
  );
}
