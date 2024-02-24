import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IMAGES_Icons, listTemplates } from "../data/templates";
import IMG_Close from "../assets/cancel.png";
import { GlobalContext } from "../context/GlobalState";
import { RiPlayListAddLine } from "react-icons/ri";
// Create new lists
const CreateList = ({}) => {
  const { handleCreateList, toggleCreateList } = useContext(GlobalContext);

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
    <div className="w-full">
      <div className="text-slate-950 text-lg bg-slate-200 p-3 mb-2 font-semibold flex justify-between rounded-lg">
        <h3 className="">
          <RiPlayListAddLine className="icon mr-3" />
          <span>Create New List</span>
        </h3>
        <img
          src={IMG_Close}
          alt=""
          className="icon-sm"
          onClick={() => toggleCreateList()}
        />
      </div>
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
          onChange={(event) => setNewItem(event.target.value)}
          id="item"
        />
        <button className="btn btn-yellow mx-2">
          <FaPlus className="icon" />
          {/* <img src={CreateListLogo} alt="Create" className="icon" /> */}
        </button>
      </form>
      <div className="flex flex-wrap justify-center gap-3 my-3 mx-auto w-[600px] font-semibold">
        {listTemplates.map((item, index) => {
          // let Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => handleCreate(item.name, item.icon)}
              className="w-[120px] min-h-[80px] py-3 rounded-lg bg-slate-300 text-slate-950 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-400 duration-300"
            >
              {/* <Icon className="icon" /> */}
              <img src={IMAGES_Icons + item.icon} alt="" className="icon-lg" />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateList;
