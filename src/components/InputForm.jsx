import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const InputForm = ({ initialValue = "", submitFunction = () => {} }) => {
  const [input, setInput] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle === "") {
      return;
    } else {
      submitFunction(input);
    }
  };

  const handleReset = () => {};

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-stretch justify-center gap-2"
    >
      <input
        type="text"
        className="max-w-[90%] flex-1 text-lg"
        placeholder="New Task"
        autoFocus
        required
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button className="btn btn-yellow" type="submit">
        <IoAddOutline className="icon" />
      </button>
    </form>
  );
};

export default InputForm;
