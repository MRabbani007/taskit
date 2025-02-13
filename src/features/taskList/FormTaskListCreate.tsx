import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Drawer from "../components/Drawer";
import { ListContext } from "@/context/ListState";
import { T_TASKLIST } from "@/lib/templates";
import DisplayFolder from "../components/DisplayFolder";
import { listTemplates } from "@/lib/taskListTemplates";

export default function FormTaskListCreate({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleCreateList } = useContext(ListContext);
  //   const navigate = useNavigate();

  const [state, setState] = useState(T_TASKLIST);

  const [other, setOther] = useState(false);
  const [title, setTitle] = useState("");

  const handleSelectIcon = (icon: string) => {
    setState((curr) => ({ ...curr, icon }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (title === "") return;

    const id = crypto.randomUUID();

    await handleCreateList({
      ...T_TASKLIST,
      id,
      title,
      icon: "food.png",
    });
    setTitle("");

    setShow(false);
    // navigate(`/myLists/taskList/${id}`);
  };

  // create new list from templates
  const handleCreate = (title: string, icon: string) => {
    handleCreateList({
      ...T_TASKLIST,
      id: crypto.randomUUID(),
      title,
      icon,
    });

    setShow(false);
  };

  return (
    <Drawer
      show={show}
      setShow={setShow}
      onSubmit={onSubmit}
      title="Create List"
    >
      {other ? (
        <>
          <div className="flex flex-col gap-1 border-2 border-zinc-200 p-2 rounded-md mb-4">
            <input
              id="item"
              name="title"
              type="text"
              value={title}
              placeholder="List Name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <p className="font-bold text-zinc-800">Select Icon</p>
          <DisplayFolder
            initialFolder="lists"
            handleSelectIcon={handleSelectIcon}
            icon={state?.icon}
          />

          <div className="flex items-center justify-center my-6 gap-4">
            <button
              type="submit"
              className="py-2 px-4 bg-zinc-900 hover:bg-zinc-800 duration-200 text-sm font-medium rounded-md text-zinc-50"
              title="Create List"
            >
              Create
            </button>
            <button
              type="reset"
              className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200 text-sm font-medium rounded-md text-zinc-800"
              title="Create List"
            >
              Cancel
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              onClick={() => setOther(false)}
              className="py-2 px-4 text-zinc-950 font-medium text-center rounded-md bg-zinc-100 hover:bg-zinc-200 duration-200"
            >
              Select from templates
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto font-semibold font-mono md:px-8">
            {listTemplates.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleCreate(item.name, item.icon)}
                  className="p-4 flex flex-col items-center justify-center gap-2 rounded-lg text-zinc-950 bg-zinc-100 hover:bg-zinc-200 duration-200 cursor-pointer"
                >
                  <img src={item.icon} alt={item.name} className="w-12" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              onClick={() => setOther(true)}
              className="py-2 px-4 text-zinc-950 font-medium text-center rounded-md bg-zinc-100 hover:bg-zinc-200 duration-200"
            >
              Custom List
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
}
