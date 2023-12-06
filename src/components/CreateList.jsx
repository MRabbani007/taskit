import React, { useState } from "react";
import CreateListLogo from "../assets/create-list.png";

// Create new lists
const CreateList = ({ onSubmit }) => {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit(newItem);

    setNewItem("");
  }

  return (
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
          className="w-full rounded-l-3xl py-2 px-4 text-sm text-slate-950 border-0 outline-none"
          value={newItem}
          placeholder="Enter List Name"
          onChange={(event) => setNewItem(event.target.value)}
          id="item"
        />
      </div>
      <button className="bg-red-700 rounded-r-3xl text-sm py-2 px-4">
        Create List
        {/* <img src={CreateListLogo} alt="Create" className="icon" /> */}
      </button>
    </form>
  );
};

export default CreateList;
