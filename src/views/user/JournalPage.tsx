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
import PageHeader from "@/features/components/PageHeader";

export default function JournalPage() {
  const [add, setAdd] = useState(false);

  const [group, setGroup] = useState(true);
  const [sortA, setSortA] = useState(true);

  return (
    <main className="">
      <PageHeader className="from-indigo-600 to-indigo-950">
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
      </PageHeader>
      <SectionJournalItems group={group} sortA={sortA} />
      {add ? <FormJournalAdd add={add} setAdd={setAdd} /> : null}
    </main>
  );
}
