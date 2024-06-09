import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IMAGES_Icons } from "../../data/templates";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function DashboardLists() {
  const { listNames, userTasks } = useContext(GlobalContext);
  const { handleOpen } = useContext(GlobalContext);

  return (
    <article className="flex-1 min-w-[300px] min-h-[200px]">
      <h2 className="border-b-2 py-2 px-4 bg-zinc-200 text-zinc-800">
        My Lists
      </h2>
      {/* <div className="flex w-full flex-wrap justify-evenly items-center gap-4 p-2 font-semibold">
        <span className="text-orange-600 bg-zinc-50 flex-1 p-2 text-center">
          {`${listNames.length} Lists`}
        </span>
        <span className="text-green-700 bg-zinc-50 flex-1 p-2 text-center">
          {userTasks?.length + " Tasks"}
        </span>
      </div> */}
      <ul className="flex flex-wrap py-2 justify-center gap-2 max-h-[300px] overflow-y-auto">
        {listNames.slice(0, 6).map((list, index) => {
          return (
            <li
              key={index}
              title={list?.title}
              className="w-full bg-slate-100 hover:bg-slate-200 p-2 flex items-center gap-2 overflow-hidden cursor-pointer duration-200"
              onClick={() => handleOpen(list?.id)}
            >
              <img
                src={IMAGES_Icons + list?.icon}
                alt="icon"
                className="icon-md"
              />
              <span className="whitespace-nowrap text-ellipsis flex-1">
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
