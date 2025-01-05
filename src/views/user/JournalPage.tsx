import SectionJournalItems from "../../features/journal/SectionJournalItems";
import { useState } from "react";
import {
  FaRegObjectGroup,
  FaRegObjectUngroup,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import FormJournalAdd from "../../features/journal/FormJournalAdd";
import { BsJournalText } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";

export default function JournalPage() {
  const [add, setAdd] = useState(false);

  const [group, setGroup] = useState(true);
  const [sortA, setSortA] = useState(true);

  return (
    <main>
      <header className="py-2 px-4 bg-gradient-to-br from-indigo-600 to-indigo-950 text-white gap-4">
        <BsJournalText size={40} />
        <h1 className="flex-1">Journal</h1>
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
          <BiPlus size={30} />
        </button>
      </header>
      <SectionJournalItems group={group} sortA={sortA} />
      {add ? <FormJournalAdd add={add} setAdd={setAdd} /> : null}
    </main>
  );
}
