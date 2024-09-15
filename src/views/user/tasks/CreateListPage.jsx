import { useContext, useState } from "react";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { ListContext } from "../../../context/ListState";
import { IMAGES_Icons, listTemplates } from "../../../data/templates";

const CreateListPage = () => {
  const { handleCreateList } = useContext(ListContext);

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
      <header className="py-2 px-4 bg-gradient-to-r from-sky-800 to-blue-950 text-white gap-4">
        <RiPlayListAddLine size={40} />
        <h1 className="font-normal">Create New List</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex items-stretch justify-center"
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
              className="p-2 rounded-lg bg-stone-300 text-zinc-950 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-stone-400 duration-200 font-mono w-20"
            >
              <img src={item.icon} alt={item.name} className="w-12" />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CreateListPage;
