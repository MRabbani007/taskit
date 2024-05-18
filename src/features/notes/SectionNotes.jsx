import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { FaCircle } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import CardNote from "./CardNote";
import SectionNotesList from "./SectionNotesList";
import CardNoteTitle from "./CardNoteTitle";
import CardAddNote from "./CardAddNote";

const SectionNotes = () => {
  const { notes } = useContext(GlobalContext);
  const [expand, setExpand] = useState(true);

  return (
    <div className="flex flex-col w-full min-w-fit flex-1">
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
          " p-3 duration-300 flex flex-wrap flex-1 gap-3"
        }
      >
        {Array.isArray(notes) &&
          notes.map((note, idx) => {
            if (note?.trash === true) return;
            return <CardNoteTitle note={note} idx={idx} key={idx} />;
          })}
        {notes?.length === 0 || (notes?.length === undefined && "Add Notes")}
        <CardAddNote />
        {/* <SectionNotesList /> */}
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
