// Imported Components
import { useContext, useState } from "react";
import CardListName from "./CardListName";
import { GlobalContext } from "../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { IoSkullOutline } from "react-icons/io5";

const SectionTrash = () => {
  const { trash } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  if (!Array.isArray(trash)) {
    return null;
  } else {
    return (
      // container
      <div>
        <h2
          className="bg-zinc-600 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3"
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
              : "translate-y-[-20px] opacity-0 ") +
            " p-3 duration-300 flex flex-col gap-2"
          }
        >
          {trash.map((list, index) => {
            console.log(list);
            if (list?.trash === true) {
              return (
                <li key={index}>
                  {list.title}
                  <LiaTrashRestoreAltSolid className="icon" />
                  <IoSkullOutline className="icon" />
                </li>
              );
            }
          })}
        </ul>
        {trash?.length === 0 && "No Lists"}
      </div>
    );
  }
};

export default SectionTrash;
