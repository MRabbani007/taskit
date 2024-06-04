import { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesState";
import { BiCheck, BiX } from "react-icons/bi";

export default function CardNoteEditTitle({ note, setEditTitle, idx }) {
  const { handleNoteUpdate } = useContext(NotesContext);

  const [title, setTitle] = useState(note?.title || "");

  const cols = 30;
  const initialvalue = 0;
  const rows = note?.details
    .split("\n")
    .reduce(
      (acc, curr) => acc + 1 + Math.floor(curr.length / cols),
      initialvalue
    );

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    handleNoteUpdate(idx, { ...note, title });
    setEditTitle(false);
  };

  const handleResetTitle = () => {
    setEditTitle(false);
  };

  return (
    <form
      onSubmit={handleSubmitTitle}
      onReset={handleResetTitle}
      className="flex flex-nowrap pr-2 items-center"
    >
      <input
        type="text"
        placeholder="Title"
        className="flex-1 border-0 outline-none bg-inherit max-w-[80%] font-semibold text-slate-600"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="flex items-center shrink-0 text-white">
        <button type="submit" title="Save">
          <BiCheck size={32} />
        </button>
        <button type="reset" title="Cancel">
          <BiX size={32} />
        </button>
      </span>
    </form>
  );
}
