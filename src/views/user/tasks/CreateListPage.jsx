import { useContext, useState } from "react";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { GlobalContext } from "../../../context/GlobalState";
import { IMAGES_Icons, listTemplates } from "../../../data/templates";

const CreateListPage = () => {
  const { handleCreateList } = useContext(GlobalContext);

  const [newItem, setNewItem] = useState("");

  // Create new list from user input
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newItem === "") return;
    handleCreateList(newItem, "food.png");
    setNewItem("");
  };

  // create new list from templates
  const handleCreate = (title, icon) => {
    handleCreateList(title, icon);
  };

  return (
    <main>
      {/* Header */}
      <header className="bg-gradient-to-r from-zinc-300 to-zinc-200 text-zinc-900 shadow-md shadow-zinc-500">
        <div>
          <RiPlayListAddLine size={40} />
          <h1>Create New List</h1>
        </div>
      </header>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-stretch justify-center my-4 w-full"
          name="create-list"
        >
          <input
            type="text"
            className="w-[70%] text-lg"
            value={newItem}
            placeholder="Enter List Name"
            onChange={(e) => setNewItem(e.target.value)}
            id="item"
          />
          <button className="btn btn-yellow mx-2" title="Create List">
            <IoAddOutline className="icon" />
          </button>
        </form>
        {/* Select list from template */}
        <div className="flex flex-wrap justify-center gap-3 my-3 mx-auto lg:w-[600px] font-semibold">
          {listTemplates.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCreate(item.name, item.icon)}
                className="w-[100px] min-h-[70px] py-2 rounded-lg bg-slate-300 text-slate-950 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-400 duration-300"
              >
                <img
                  src={IMAGES_Icons + item.icon}
                  alt=""
                  className="icon-lg"
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CreateListPage;
