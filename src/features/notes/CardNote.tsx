import { ChangeEvent, useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesState";
import { BiCheck, BiX } from "react-icons/bi";
import { T_NOTE } from "@/lib/templates";
import { Button, Popconfirm } from "antd";
import { CiTrash } from "react-icons/ci";
import useDebounce from "@/hooks/useDebounce";

export default function CardNote({ note }: { note: Note }) {
  const { handleNoteUpdate } = useContext(NotesContext);

  const [state, setState] = useState({ ...T_NOTE, ...note });

  const debounceNote = useDebounce(state.title + state.details, 3000);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // e.preventDefault();
    handleNoteUpdate(state);
  };

  const handleDelete = () => {
    handleNoteUpdate({ ...note, trash: true });
  };

  const handleClose = () => {
    handleNoteUpdate({ ...note, isOpen: false });
  };

  useEffect(() => {
    if (state?.title !== note?.title || state?.details !== note?.details) {
      handleNoteUpdate(state);
    }
  }, [debounceNote]);

  const cols = 30;
  const initialvalue = 0;
  const rows = note?.details
    ? note.details
        .split("\n")
        .reduce(
          (acc, curr) => acc + 1 + Math.floor(curr.length / cols),
          initialvalue
        )
    : 1;

  const canSave =
    state?.title !== note.title || state?.details !== note?.details;

  return (
    <div className="flex flex-col relative rounded-lg overflow-clip group">
      <div className="relative flex">
        {/* title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="flex-1 bg-yellow-300 py-2 px-4 border-none outline-none bg-inherit font-semibold text-zinc-600"
          value={state?.title}
          onChange={handleChange}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center  invisible group-hover:visible">
          <Button type="text" className="p-1" onClick={handleClose}>
            <BiX size={20} />
          </Button>
          <Popconfirm
            title="Trash Note"
            description="Move note to trash?"
            onConfirm={handleDelete}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button
              type="text"
              className="flex items-center justify-center m-0 p-1 bg-transparent"
            >
              <CiTrash size={20} />
            </Button>
          </Popconfirm>
        </div>
        {/* <button className="absolute top-1/2 -translate-y-1/2 right-2">
          <BiDotsHorizontal size={25} />
        </button> */}
      </div>

      {/* Body */}
      <textarea
        name="details"
        id="details"
        cols={cols}
        rows={rows}
        className="bg-yellow-200 outline-none border-0 bg-inherit h-full p-4"
        value={state?.details}
        onChange={handleChange}
      />

      <div
        className={
          (canSave ? "" : " invisible opacity-0 pointer-events-none ") +
          " absolute bottom-2 right-2 flex items-center gap-2 duration-200"
        }
      >
        <button
          className="p-2 text-green-700 bg-green-700/20 hover:bg-green-700/40 duration-200 rounded-md"
          onClick={handleSubmit}
        >
          <BiCheck size={25} />
        </button>
        <button className="p-2 text-red-700 bg-red-700/20 hover:bg-red-700/40 duration-200 rounded-md">
          <BiX size={25} />
        </button>
      </div>
    </div>
  );
}
