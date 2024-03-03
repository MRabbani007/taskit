import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaCircle } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import CardNote from "./CardNote";
import SectionNotesList from "./SectionNotesList";

const SectionNotes = () => {
  const { notes } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

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
            : "translate-y-[-20px] opacity-0 ") +
          " p-3 duration-300 flex flex-wrap gap-3"
        }
      >
        <SectionNotesList />
        {/* {Array.isArray(notes) &&
          notes.map((item, index) => {
            return <CardNote key={index} note={item} />;
          })} */}
        {notes?.length === 0 && "No Notes"}
      </div>
    </div>
  );
};

export default SectionNotes;
