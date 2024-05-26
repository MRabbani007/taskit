import CreateJournal from "../../features/journal/CreateJournal";
import { JournalProvider } from "../../context/JournalState";
import SectionJournalItems from "../../features/journal/SectionJournalItems";
import { GrNotes } from "react-icons/gr";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";

const JournalPage = () => {
  const [expand, setExpand] = useState(true);

  return (
    <JournalProvider>
      <div className="flex flex-col flex-wrap w-full h-full gap-3">
        <h2
          className="bg-gradient-to-r from-green-600 to-green-400 p-3 text-white rounded-xl text-center cursor-pointer relative flex items-center gap-3 shadow-md shadow-zinc-500"
          // onClick={() => setExpand((prev) => !prev)}
        >
          <GrNotes className="icon" />
          <span>Journal</span>
          {/* <SlArrowRight
            className={
              (expand ? "rotate-90 " : "") +
              "icon-sm absolute right-2 top-[35%] duration-300"
            }
          /> */}
        </h2>
        <div className="flex flex-col gap-2 sm:px-4 px-0">
          <CreateJournal />
          <SectionJournalItems />
        </div>
      </div>
    </JournalProvider>
  );
};

export default JournalPage;
