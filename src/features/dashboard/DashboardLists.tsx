import { useContext, useState } from "react";
import { ListContext } from "../../context/ListState";
import { Link, useNavigate } from "react-router-dom";
import { BsListCheck, BsPinAngle } from "react-icons/bs";
import ListImage from "../../assets/list-2.png";

export default function DashboardLists() {
  const { pinnedLists, userLists } = useContext(ListContext);

  const navigate = useNavigate();
  const handleOpen = (id: string) => {
    navigate(`/myLists/tasklist?id=${id}`);
  };

  const displaylists = [...pinnedLists, ...userLists];

  return (
    <article className="border-[px] border-zinc-400 bg-gray-50 rounded-xl flex flex-col min-h-[100px]">
      <Link title="View Lists" to="/mylists">
        <h2 className="flex items-center gap-2 py-4 px-4 font-normal rounded-t-lg text-sky-800">
          <BsListCheck size={25} />
          Lists
        </h2>
      </Link>
      <ul className="px-4 pb-4 rounded-b-lg flex flex-wrap gap-2 overflow-y-auto">
        {displaylists.length === 0 ? (
          <li>
            You don't have any lists, <Link to="/myLists">create one</Link>
          </li>
        ) : (
          displaylists.slice(0, 6).map((list) => {
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
      className="border-[1px] border-zinc-200 bg-white hover:bg-yellow-100 p-2 overflow-hidden duration-200 rounded-lg flex-1 min-w-[30%] flex flex-col items-center cursor-pointer relative"
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
      {list?.pinned === true && (
        <BsPinAngle size={20} className="absolute top-2 left-2" />
      )}
    </li>
  );
}
