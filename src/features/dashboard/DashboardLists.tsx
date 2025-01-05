import { useContext } from "react";
import { ListContext } from "../../context/ListState";
import { Link } from "react-router-dom";
import { BsListCheck } from "react-icons/bs";

export default function DashboardLists() {
  const { lists, handleOpen } = useContext(ListContext);

  return (
    <article className="flex flex-col min-h-[100px] rounded-lg">
      <Link title="View Lists" to="/mylists">
        <h2 className="flex items-center gap-2 py-2 px-4 font-normal rounded-t-lg bg-stone-600 text-white">
          <BsListCheck size={24} />
          Lists
        </h2>
      </Link>
      <ul className="p-2 rounded-b-lg bg-stone-200 flex flex-wrap gap-2 overflow-y-auto">
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
                className="bg-slate-100 hover:bg-slate-200 p-2 overflow-hidden duration-200 rounded-lg flex-1 min-w-[30%] flex flex-col items-center cursor-pointer"
                onClick={() => handleOpen(list?.id)}
              >
                <img src={list?.icon} alt="icon" className="w-10" />
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
