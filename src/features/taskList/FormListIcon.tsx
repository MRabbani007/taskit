import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ListContext } from "@/context/ListState";
import DisplayFolder from "../components/DisplayFolder";
import Drawer from "../components/Drawer";

export default function FormListIcon({
  list,
  edit,
  setEdit,
}: {
  list: TaskList;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleUpdateList } = useContext(ListContext);
  const [state, setState] = useState(list);

  const handleSelectIcon = (icon: string) => {
    setState((curr) => ({ ...curr, icon }));
  };

  // Handle update list icon
  const onSubmit = () => {
    handleUpdateList(state);
    setEdit(false);
  };

  return (
    <Drawer
      show={edit}
      setShow={setEdit}
      onSubmit={onSubmit}
      title="Update List Icon"
    >
      <DisplayFolder
        initialFolder="lists"
        icon={state?.icon}
        handleSelectIcon={handleSelectIcon}
      />
      <div className="flex items-center justify-center my-6 gap-4">
        <button
          type="submit"
          className="py-2 px-4 bg-zinc-900 hover:bg-zinc-800 duration-200 text-sm font-medium rounded-md text-zinc-50"
          title="Save List"
        >
          Save
        </button>
        <button
          type="reset"
          className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200 text-sm font-medium rounded-md text-zinc-800"
          title="Cancel"
        >
          Cancel
        </button>
      </div>
    </Drawer>
  );
}
