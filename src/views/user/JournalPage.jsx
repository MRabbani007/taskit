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
import { BsJournalText } from "react-icons/bs";

const JournalPage = () => {
  const [add, setAdd] = useState(false);

  const [group, setGroup] = useState(true);
  const [sortA, setSortA] = useState(true);

  return (
    <main>
      <header>
        <BsJournalText size={40} />
        <h1 className="flex-1">Journal</h1>
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
