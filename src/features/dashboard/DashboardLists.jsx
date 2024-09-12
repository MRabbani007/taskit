import React, { useContext } from "react";
import { ListContext } from "../../context/ListState";
import { IMAGES_Icons } from "../../data/templates";
import { Link } from "react-router-dom";

export default function DashboardLists() {
  const { lists, handleOpen } = useContext(ListContext);

  return (
    <article className="flex flex-col gap-4 min-h-[100px] bg-stone-100 rounded-lg p-4">
      <Link title="View Lists" to="/mylists">
        <h2>Lists</h2>
      </Link>
      <ul className="flex flex-wrap gap-2 overflow-y-auto">
        {lists.length === 0 ? (
          <li>
            You don't have any lists,{" "}
            <Link to="/myLists/createList">create one</Link>
          </li>
        ) : (
          lists.slice(0, 6).map((list, index) => {
            return (
              <li
                key={index}
                title={list?.title}
                className="bg-slate-100 hover:bg-slate-200 p-2 overflow-hidden duration-200 rounded-lg flex-1 min-w-[30%] flex flex-col items-center"
                onClick={() => handleOpen(list?.id)}
              >
                <img
                  src={IMAGES_Icons + list?.icon}
                  alt="icon"
                  className="w-12"
                />
                <span className="text-ellipsis whitespace-nowrap font-semibold text-zinc-800">
                  {list?.title}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </article>
  );
}
