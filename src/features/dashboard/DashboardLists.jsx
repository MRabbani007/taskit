import React, { useContext } from "react";
import { ListContext } from "../../context/ListState";
import { IMAGES_Icons } from "../../data/templates";
import { Link } from "react-router-dom";

export default function DashboardLists() {
  const { lists, handleOpen } = useContext(ListContext);

  return (
    <article className="flex-1 min-w-[300px] min-h-[200px]">
      <h2 className="py-2 px-4 bg-zinc-200 text-zinc-800">
        <Link
          title="View Lists"
          to="/mylists"
          className="hover:text-yellow-500 duration-200"
        >
          Lists
        </Link>
      </h2>
      <ul className="flex flex-wrap py-2 gap-2 max-h-[300px] overflow-y-auto">
        {lists.slice(0, 4).map((list, index) => {
          return (
            <li
              key={index}
              title={list?.title}
              className="bg-slate-100 hover:bg-slate-200 p-2 flex flex-col items-center gap-2 overflow-hidden cursor-pointer duration-200 flex-1"
              onClick={() => handleOpen(list?.id)}
            >
              <img
                src={IMAGES_Icons + list?.icon}
                alt="icon"
                className="w-12"
              />
              <span className="text-ellipsis text-center whitespace-break-spaces flex-1 font-semibold text-zinc-800">
                {list?.title}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
