import { useContext, useState } from "react";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import CardListName from "../../../features/taskList/CardListName";
import { Link } from "react-router-dom";
import { Button, Flex, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LiaTrashRestoreSolid, LiaTrashSolid } from "react-icons/lia";
import { IMAGES_Icons } from "../../../data/templates";
import { CiTrash } from "react-icons/ci";
import { ListContext } from "../../../context/ListState";
import Loading from "../../../features/components/Loading";

const UserListsPage = () => {
  const { lists, handleUpdateList, handleRemoveList, status } =
    useContext(ListContext);
  const [expand, setExpand] = useState(true);
  const [expandTrash, setExpandTrash] = useState(false);

  const userLists = Array.isArray(lists)
    ? lists.filter((item) => item.trash !== true)
    : [];
  const trashLists = Array.isArray(lists)
    ? lists.filter((item) => item.trash === true)
    : [];

  let contentLists;
  let contentTrash;

  if (status?.isLoading === true) {
    contentLists = <Loading />;
    contentTrash = <Loading />;
  } else if (status?.isError === true) {
    contentLists = <p>Error Loading Lists</p>;
    contentTrash = <p>Error Loading Lists</p>;
  } else if (status.isSuccess === true) {
    if (userLists.length === 0) {
      contentLists = <p>You don't have any lists, create new</p>;
    } else {
      contentLists = (
        <ul
          className={
            (expand
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 invisible h-0 ") +
            " py-4 duration-300 flex flex-1 w-full flex-col gap-4"
          }
        >
          {userLists.map((list, index) => {
            if (list?.trash === undefined || list?.trash === false) {
              return <CardListName key={index} taskList={list} />;
            }
          })}
        </ul>
      );
    }
    if (trashLists.length === 0) {
      contentTrash = (
        <p className="p-4 font-medium text-zinc-800">No lists in trash</p>
      );
    } else {
      contentTrash = (
        <ul
          className={
            (expandTrash
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 h-0") +
            " py-4 duration-300 flex flex-col gap-2 w-full"
          }
        >
          {trashLists.map((list, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between py-1 px-4 shadow-sm shadow-slate-600 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <img src={IMAGES_Icons + list?.icon} className="icon-lg" />
                  <span>{list.title}</span>
                </div>
                <span>
                  <button
                    title="Recover"
                    onClick={() => handleUpdateList(list.id, "un_trash", true)}
                  >
                    <LiaTrashRestoreSolid className="icon text-green-600" />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleRemoveList(list.id)}
                  >
                    <LiaTrashSolid className="icon text-red-600" />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <main>
      <header
        className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white shadow-md shadow-zinc-500"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <BsCardList size={40} />
          <h1>My Lists</h1>
        </div>
        <SlArrowRight
          size={25}
          className={(expand ? "rotate-90 " : "") + "duration-300"}
        />
      </header>
      <section className="w-full">{contentLists}</section>
      <header
        className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white shadow-md shadow-zinc-500"
        onClick={() => setExpandTrash((prev) => !prev)}
      >
        <div>
          <CiTrash size={40} />
          <h2>Trash</h2>
        </div>
        <SlArrowRight
          size={25}
          className={(expandTrash ? "rotate-90 " : "") + "duration-300"}
        />
      </header>
      {contentTrash}
      <Link to={"/createList"}>
        <FloatButton
          type="primary"
          tooltip="Create New List"
          icon={<PlusOutlined />}
          style={{ right: 94 }}
        />
      </Link>
    </main>
  );
};

export default UserListsPage;
