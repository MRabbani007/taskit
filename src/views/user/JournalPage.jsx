import CreateJournal from "../../features/journal/CreateJournal";
import { JournalProvider } from "../../context/JournalState";
import SectionJournalItems from "../../features/journal/SectionJournalItems";
import { GrNotes } from "react-icons/gr";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";

const JournalPage = () => {
  const [expand, setExpand] = useState(true);

  return (
    <main>
      <header
        className="bg-gradient-to-r from-green-600 to-green-400 text-white shadow-md shadow-zinc-500"
        // onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <GrNotes size={40} />
          <h1>Journal</h1>
        </div>
        {/* <SlArrowRight
            className={
              (expand ? "rotate-90 " : "") +
              "icon-sm absolute right-2 top-[35%] duration-300"
            }
          /> */}
      </header>
      <div>
        <CreateJournal />
        <SectionJournalItems />
      </div>
    </main>
  );
};

export default JournalPage;
