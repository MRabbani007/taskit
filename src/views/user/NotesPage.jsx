import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { SlArrowRight } from "react-icons/sl";
import CardAddNote from "../../features/notes/CardAddNote";
import { NotesProvider } from "../../context/NotesState";
import SectionNotes from "../../features/notes/SectionNotes";

const NotesPage = () => {
  const [expand, setExpand] = useState(true);

  return (
    <NotesProvider>
      <div className="flex flex-col w-full min-w-fit flex-1">
        <h2
          className="bg-gradient-to-r from-yellow-500 to-yellow-300 p-3 text-white rounded-xl text-center cursor-pointer relative flex items-center gap-3 shadow-md shadow-zinc-500"
          // onClick={() => setExpand((prev) => !prev)}
        >
          <GrNotes className="icon" />
          <span>Notes</span>
          {/* <SlArrowRight
            className={
              (expand ? "rotate-90 " : "") +
              "icon-sm absolute right-2 top-[35%] duration-300"
            }
          /> */}
        </h2>
        <SectionNotes expand={expand} />
        <CardAddNote />
      </div>
    </NotesProvider>
  );
};

export default NotesPage;
