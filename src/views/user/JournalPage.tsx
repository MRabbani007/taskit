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
import { BsJournalText } from "react-icons/bs";
import JournalCategories from "@/features/journal/JournalCategories";

export default function JournalPage() {
  const [add, setAdd] = useState(false);

  const [group, setGroup] = useState(true);
  const [sortA, setSortA] = useState(true);

  return (
    <main className="">
      <PageHeader
        className=""
        pageTitle="Journal"
        icon={<BsJournalText size={25} />}
      >
        <button
          className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          title={group ? "un-group" : "Group"}
          onClick={() => setGroup((curr) => !curr)}
        >
          {group ? (
            <FaRegObjectUngroup size={25} />
          ) : (
            <FaRegObjectGroup size={25} />
          )}
        </button>
        <button
          className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          title={sortA ? "Latest" : "Earliest"}
          onClick={() => setSortA((curr) => !curr)}
        >
          {sortA ? (
            <FaSortAmountDown size={25} />
          ) : (
            <FaSortAmountUp size={25} />
          )}
        </button>
        <button
          title="Add Items"
          className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg"
          onClick={() => setAdd(true)}
        >
          <BiPlus size={25} />
        </button>
      </PageHeader>
      <div className="flex items-stretch gap-4">
        <JournalCategories />
        <SectionJournalItems group={group} sortA={sortA} />
      </div>
      {add ? <FormJournalAdd add={add} setAdd={setAdd} /> : null}
    </main>
  );
}
