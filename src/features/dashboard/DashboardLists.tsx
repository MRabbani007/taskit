import { useContext, useState } from "react";
import { ListContext } from "../../context/ListState";
import { Link, useNavigate } from "react-router-dom";
import { BsListCheck } from "react-icons/bs";
import ListImage from "../../assets/list-2.png";

export default function DashboardLists() {
  const { lists } = useContext(ListContext);

  const navigate = useNavigate();
  const handleOpen = (id: string) => {
    navigate(`/myLists/tasklist?id=${id}`);
  };

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
          lists.slice(0, 6).map((list) => {
            return (
              <RenderList
                taskList={list}
                key={list.id}
                handleOpen={handleOpen}
              />
            );
          })
        )}
      </ul>
    </article>
  );
}

function RenderList({
  taskList: list,
  handleOpen,
}: {
  taskList: TaskList;
  handleOpen: (id: string) => void;
}) {
  const [imgSrc, setImgSrc] = useState(list?.icon);

  const handleError = () => {
    setImgSrc(ListImage);
  };

  return (
    <li
      title={list?.title}
      className="bg-slate-100 hover:bg-slate-200 p-2 overflow-hidden duration-200 rounded-lg flex-1 min-w-[30%] flex flex-col items-center cursor-pointer"
      onClick={() => handleOpen(list?.id)}
    >
      <img
        src={imgSrc}
        alt="icon"
        className="w-10 h-auto object-cover"
        onError={handleError}
      />
      <span className="text-ellipsis whitespace-nowrap font-semibold text-zinc-800">
        {list?.title}
      </span>
    </li>
  );
}
