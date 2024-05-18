import React, { useContext, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { GlobalContext } from "../../context/GlobalState";

export default function ListTitle({ list }) {
  const { handleUpdateList } = useContext(GlobalContext);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(list?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateList(list?.id, "list_title", editInput);
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" title="Save">
            <BiPlus size={32} />
          </button>
          <button type="reset" title="Cancel">
            <BiX size={32} />
          </button>
        </form>
      ) : (
        <p>{list?.title}</p>
      )}
    </>
  );
}
