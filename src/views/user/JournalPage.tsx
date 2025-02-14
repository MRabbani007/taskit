import SectionJournalItems from "../../features/journal/SectionJournalItems";
import { useState } from "react";
import {
  FaRegObjectGroup,
  FaRegObjectUngroup,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import FormJournalAdd from "../../features/journal/FormJournalAdd";
import { BiPlus } from "react-icons/bi";
import PageLinks from "@/features/navigation/PageLinks";

export default function JournalPage() {
  const [add, setAdd] = useState(false);

  const [group, setGroup] = useState(true);
  const [sortA, setSortA] = useState(true);

  return (
    <main className="">
      <div className=" pt-4 pb-8 px-2 flex flex-col items-start rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-950 shadow-md shadow-zinc-500">
        <header className="py-2 px-4 text-white gap-4 self-stretch">
          {/* <BsJournalText size={40} /> */}
          <div className="flex-1">
            <h1 className="py-1 px-4 bg-white/20 rounded-lg w-fit">Journal</h1>
          </div>
          <button
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
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
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            title={sortA ? "Latest" : "Earliest"}
            onClick={() => setSortA((curr) => !curr)}
          >
            {sortA ? (
              <FaSortAmountDown size={30} />
            ) : (
              <FaSortAmountUp size={30} />
            )}
          </button>
          <button
            title="Add Items"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"
            onClick={() => setAdd(true)}
          >
            <BiPlus size={30} />
          </button>
        </header>
        <PageLinks />
      </div>
      <SectionJournalItems group={group} sortA={sortA} />
      {add ? <FormJournalAdd add={add} setAdd={setAdd} /> : null}
    </main>
  );
}
