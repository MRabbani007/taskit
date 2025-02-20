import { useContext } from "react";
import { Link } from "react-router-dom";
import { JournalContext } from "../../context/JournalState";
import { BsJournalText } from "react-icons/bs";

export default function DashboardJournal() {
  const { journal } = useContext(JournalContext);

  const lastItems = Array.isArray(journal)
    ? journal
        .sort((a, b) =>
          (b?.createDate || "")
            .toString()
            .localeCompare((a?.createDate || "").toString())
        )
        .slice(0, 6)
    : [];

  const content = lastItems.map((item, index) => {
    return (
      <div
        key={index}
        className="w-full flex gap-2 p-2 border-[1px] rounded-md border-zinc-200 bg-white hover:bg-yellow-100"
      >
        <p className="text-nowrap">
          {new Date(item?.onDate).toUTCString().substring(0, 11)}
        </p>
        <div className="flex-1">
          <p className="font-semibold">{item?.title}</p>
          <p>{item?.detail}</p>
        </div>
      </div>
    );
  });

  return (
    <article className="border-[px] border-zinc-400 bg-gray-50 rounded-xl flex flex-col gap-2">
      <Link title="Go to Journal" to={"/pages/journal"}>
        <h2 className="flex items-center gap-2 py-4 px-4 font-normal text-sky-800">
          <BsJournalText size={24} className="" />
          Journal
        </h2>
      </Link>
      <div className="px-6 flex flex-col items-center gap-2 p-4">
        <p className="font-medium">Today</p>
        <button className="bg-sky-800 text-white py-1 px-2 rounded-lg text-sm">
          Add activities for today
        </button>
      </div>
      <p></p>
      <div className="h-full min-h-[100px] max-h-[300p] overflow-y-auto rounded-b-xl">
        <div className="flex flex-col gap-2 px-4 pb-4">{content}</div>
      </div>
    </article>
  );
}
