import React, { useState } from "react";
import CreateListLogo from "../assets/create-list.png";
import { MdOutlineWork } from "react-icons/md";
import { IoBook, IoHome, IoFitness, IoFastFood } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaMusic, FaBars, FaPlus } from "react-icons/fa6";
import { IMAGES_Icons, listTemplates } from "../data/templates";
import IMG_List from "../assets/food.png";
import IMG_Close from "../assets/cancel.png";
import { ACTIONS } from "../data/serverFunctions";

// Create new lists
const CreateList = ({ handleLists, viewCreateList, setViewCreateList }) => {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem === "") return;
    handleLists({
      type: ACTIONS.CREATE_LIST,
      title: newItem,
      icon: "food.png",
    });
    setNewItem("");
  };

  const handleCreate = (title, icon) => {
    handleLists({ type: ACTIONS.CREATE_LIST, title: title, icon: icon });
  };

  const handleClose = () => {
    setViewCreateList(false);
  };

  return (
    <div className={viewCreateList ? "border-[1px] m-2" : "hidden"}>
      <div className="text-slate-950 text-lg bg-slate-200 p-2 mb-2 font-semibold flex justify-between">
        <h3 className="inline">Create New List</h3>
        <img
          src={IMG_Close}
          alt=""
          className="icon"
          onClick={() => handleClose()}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex justify-center items-center"
        name="create-list"
      >
        <div className="flex w-[50%]">
          <label htmlFor="item" className="text-[16px]"></label>
          <input
            type="text"
            className="w-full py-2 px-4 text-sm font-normal text-slate-950 border-[1px] outline-none"
            value={newItem}
            placeholder="Enter List Name"
            onChange={(event) => setNewItem(event.target.value)}
            id="item"
          />
        </div>
        <button className="bg-yellow-400 text-sm py-2 px-4">
          <FaPlus className="icon" />
          {/* <img src={CreateListLogo} alt="Create" className="icon" /> */}
        </button>
      </form>
      <div className="flex flex-wrap justify-center gap-3 my-3 mx-auto w-[400px]">
        {listTemplates.map((item, index) => {
          // let Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => handleCreate(item.name, item.icon)}
              className="w-[80px] h-[80px] rounded-lg bg-slate-300 text-slate-950 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-400 duration-300"
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
