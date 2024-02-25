// Imported Components
import { useContext, useState } from "react";
import CardListName from "./CardListName";
import { GlobalContext } from "../context/GlobalState";
import { BsCardList } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";

const SectionListNames = () => {
  const { listNames } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  return (
    // container
    <div>
      <h2
        className="bg-zinc-600 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <BsCardList className="icon" />
        <span>My Lists</span>
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
          " p-3 duration-300 flex flex-wrap gap-2"
        }
      >
        {Array.isArray(listNames) &&
          listNames.map((list, index) => {
            if (list?.trash === undefined || list?.trash === false) {
              return <CardListName key={index} taskList={list} />;
            }
          })}
      </ul>
      {listNames?.length === 0 && "No Lists"}
    </div>
  );
};

export default SectionListNames;
