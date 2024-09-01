import CreateJournal from "../../features/journal/CreateJournal";
import { JournalProvider } from "../../context/JournalState";
import SectionJournalItems from "../../features/journal/SectionJournalItems";
import { GrNotes } from "react-icons/gr";
import { useState } from "react";
import {
  FaPlus,
  FaRegObjectGroup,
  FaRegObjectUngroup,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import FormJournalAdd from "../../features/journal/FormJournalAdd";

const JournalPage = () => {
  const [add, setAdd] = useState(false);

  const [group, setGroup] = useState(true);
  const [sortA, setSortA] = useState(true);

  //
  // border-b-4 border-zinc-600 text-zinc-800 p-0 pb-2
  return (
    <main>
      <header className="bg-gradient-to-r from-green-600 to-green-400 text-white shadow-md shadow-zinc-500">
        <div>
          <GrNotes size={40} />
          <h1>Journal</h1>
        </div>
        <div className="space-x-2">
          <button
            title={group ? "un-group" : "Group"}
            onClick={() => setGroup((curr) => !curr)}
          >
            {group ? (
              <FaRegObjectUngroup size={30} />
            ) : (
              <FaRegObjectGroup size={30} />
            )}
          </button>
          <button
            title={sortA ? "Latest" : "Earliest"}
            onClick={() => setSortA((curr) => !curr)}
          >
            {sortA ? (
              <FaSortAmountDown size={30} />
            ) : (
              <FaSortAmountUp size={30} />
            )}
          </button>
          <button title="Add Items" onClick={() => setAdd(true)}>
            <FaPlus size={30} />
          </button>
        </div>
      </header>
      {/* <CreateJournal /> */}
      <SectionJournalItems group={group} sortA={sortA} />
      {add ? <FormJournalAdd setAdd={setAdd} /> : null}
    </main>
  );
};

export default JournalPage;
