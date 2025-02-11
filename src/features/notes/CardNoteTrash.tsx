import { NotesContext } from "@/context/NotesState";
import { Button, Popconfirm } from "antd";
import { useContext } from "react";
import { CiTrash } from "react-icons/ci";
import { RiDeviceRecoverLine } from "react-icons/ri";

export default function CardNoteTrash({ note }: { note: Note }) {
  const { handleNoteUpdate, handleNoteDelete } = useContext(NotesContext);

  const handleRecover = () => {
    handleNoteUpdate({ ...note, trash: false });
  };

  const handleDelete = () => {
    handleNoteDelete(note.id);
  };

  return (
    <div className="flex flex-col relative rounded-lg overflow-clip group">
      <div className="relative flex bg-zinc-300 py-2 px-4 bg-inherit font-semibold text-zinc-600">
        <p>{note.title}</p>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 bg-transparent invisible group-hover:visible flex items-center justify-center ">
          <button title="Recover" onClick={handleRecover} className="m-0 p-1">
            <RiDeviceRecoverLine size={20} />
          </button>
          <Popconfirm
            title="Trash Note"
            description="Delete this note?"
            onConfirm={handleDelete}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button
              type="text"
              className="flex items-center justify-center m-0 p-1"
            >
              <CiTrash size={20} />
            </Button>
          </Popconfirm>
        </div>
      </div>
      <div className="flex-1 bg-zinc-200 p-4">{note.details}</div>
    </div>
  );
}
