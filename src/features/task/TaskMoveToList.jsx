import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const TaskMoveToList = () => {
  const { listNames } = useContext(GlobalContext);
  return (
    <div className="absolute -left-40 top-0 bg-slate-200 rounded-md text-zinc-800 ">
      <p className="p-2">Select List</p>
      <ul className=" max-h-[200px] overflow-y-scroll">
        {listNames.map((list, index) => {
          return (
            <li key={index} className="hover:text-yellow-400 p-2">
              {list.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskMoveToList;
