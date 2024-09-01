import React, { useContext, useState } from "react";
import { BiCheck, BiPlus, BiX } from "react-icons/bi";
import { ListContext } from "../../context/ListState";

export default function ListTitleEdit({ list, setEdit }) {
  const { handleUpdateList } = useContext(ListContext);

  const [title, setTitle] = useState(list?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateList(list?.id, "list_title", title);
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="outline-none border-none p-0 m-0 bg-transparent"
      />
      <button type="submit" title="Save">
        <BiCheck size={32} />
      </button>
      <button type="reset" title="Cancel">
        <BiX size={32} />
      </button>
    </form>
  );
}
