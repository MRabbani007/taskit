import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import CardListName from "../../../features/taskList/CardListName";
import { Link } from "react-router-dom";
import { Button, Flex, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LiaTrashRestoreSolid, LiaTrashSolid } from "react-icons/lia";
import { IMAGES_Icons } from "../../../data/templates";
import { CiTrash } from "react-icons/ci";

const UserListsPage = () => {
  const { listNames, trash, handleUpdateList, handleRemoveList } =
    useContext(GlobalContext);
  const [expand, setExpand] = useState(true);
  const [expandTrasn, setExpandTrash] = useState(false);

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
      <section className="w-full">
        <ul
          className={
            (expand
              ? "translate-y-[0] opacity-100 "
              : "translate-y-[-20px] opacity-0 invisible h-0 ") +
            " py-4 duration-300 flex flex-1 w-full flex-col gap-4"
          }
        >
          {Array.isArray(listNames) &&
            listNames.map((list, index) => {
              if (list?.trash === undefined || list?.trash === false) {
                return <CardListName key={index} taskList={list} />;
              }
            })}
        </ul>
        {listNames?.length === 0 ? <p>No Lists</p> : null}
      </section>
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
          className={(expandTrasn ? "rotate-90 " : "") + "duration-300"}
        />
      </header>
      <ul
        className={
          (expandTrasn
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 h-0") +
          " py-4 duration-300 flex flex-col gap-2 w-full"
        }
      >
        {Array.isArray(trash) &&
          trash.map((list, index) => {
            if (list?.trash === true) {
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
                      onClick={() =>
                        handleUpdateList(list.id, "un_trash", true)
                      }
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
            }
          })}
        {trash?.length === 0 && <li className="p-3">No Lists</li>}
      </ul>
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
