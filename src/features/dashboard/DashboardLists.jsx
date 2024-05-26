import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IMAGES_Icons } from "../../data/templates";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function DashboardLists() {
  const { listNames } = useContext(GlobalContext);
  const { handleOpen } = useContext(GlobalContext);

  return (
    <article className="flex-1 min-w-[300px] min-h-[200px] shadow-md rounded-md shadow-slate-400">
      <h2 className="border-b-2 py-2 px-4 bg-gradient-to-r from-zinc-600 to-zinc-400 text-white rounded-t-md">
        My Lists
      </h2>
      <div className="flex w-full flex-wrap justify-evenly items-center gap-4 p-2 ">
        <span className="bg-orange-600 text-zinc-50 flex-1 p-2 rounded-md text-center">
          {`${listNames.length} Lists`}
        </span>
        <span className="bg-yellow-600 text-zinc-50 flex-1 p-2 rounded-md text-center">
          35 tasks
        </span>
      </div>
      <ul className="flex flex-wrap p-2 justify-center gap-1 pb-2">
        {listNames.slice(0, 8).map((list, index) => {
          return (
            <li
              key={index}
              title={list?.title}
              className="flex-1 min-w-fit bg-slate-300 hover:bg-slate-200 rounded-md p-2 flex items-center gap-2 overflow-hidden cursor-pointer duration-200"
              onClick={() => handleOpen(list?.id)}
            >
              <img
                src={IMAGES_Icons + list?.icon}
                alt="icon"
                className="icon-md"
              />
              <span className="whitespace-nowrap text-ellipsis">
                {list?.title}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center p-2">
        <Button type="primary" title="Show all lists">
          <Link to="/mylists">View Lists</Link>
        </Button>
      </div>
    </article>
  );
}
