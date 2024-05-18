// Imported Components
import { useContext, useState } from "react";
import CardListName from "./CardListName";
import { GlobalContext } from "../../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { IoSkullOutline } from "react-icons/io5";

const SectionTrash = () => {
  const { trash, handleUpdateList, handleRemoveList } =
    useContext(GlobalContext);
  const [expand, setExpand] = useState(false);

  return (
    // container
    <div>
      <h2
        className="bg-zinc-400 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <BsCardList className="icon" />
        <span>Trash</span>
        <SlArrowRight
          className={
            (expand ? "rotate-90 " : "") +
            "icon-sm absolute right-5 top-[35%] duration-300"
          }
        />
      </h2>
      <ul
        className={
          (expand
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 h-0") +
          " p-3 duration-300 flex flex-col gap-2"
        }
      >
        {Array.isArray(trash) &&
          trash.map((list, index) => {
            if (list?.trash === true) {
              return (
                <li key={index}>
                  {list.title}
                  <LiaTrashRestoreAltSolid
                    className="icon"
                    onClick={() => handleUpdateList(list.id, "un_trash", true)}
                  />
                  <IoSkullOutline
                    className="icon"
                    onClick={() => handleRemoveList(list.id)}
                  />
                </li>
              );
            }
          })}
        {trash?.length === 0 && <li className="p-3">No Lists</li>}
      </ul>
    </div>
  );
};

export default SectionTrash;
