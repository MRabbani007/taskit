import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaCircle } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { GrNotes } from "react-icons/gr";

const SectionNotes = () => {
  const { overdueTasks, handleOpen } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  const notes = [
    { title: "First Note", priority: "normal" },
    { title: "Second Note", priority: "normal" },
    { title: "Third Note", priority: "normal" },
  ];

  return (
    <div className="w-full min-w-fit">
      <h2
        className="bg-yellow-500 p-3 text-white rounded-lg text-center cursor-pointer relative flex items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <GrNotes className="icon" />
        <span>Notes</span>
        <SlArrowRight
          className={
            (expand ? "rotate-90 " : "") +
            "icon-sm absolute right-2 top-[35%] duration-300"
          }
        />
      </h2>
      <div
        className={
          (expand
            ? "translate-y-[0] opacity-100 "
            : "translate-y-[-20px] opacity-0 ") + " p-3 duration-300"
        }
      >
        {Array.isArray(notes) &&
          notes.map((item, index) => {
            let color = "";
            if (item.priority === "high") {
              color = "text-red-400";
            } else if (item.priority === "normal") {
              color = "text-yellow-300";
            } else if (item.priority === "low") {
              color = "text-green-300";
            }
            return (
              <p
                key={index}
                className="p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer"
                onClick={() => {}}
              >
                <FaCircle className={color + " icon-sm mr-2"} />
                {item.title}
              </p>
            );
          })}
        {notes?.length === 0 && "No Notes"}
      </div>
    </div>
  );
};

export default SectionNotes;
