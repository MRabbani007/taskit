import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { JournalContext } from "../../context/JournalState";

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
      <div key={index} className="w-full flex gap-2 p-2 bg-zinc-100">
        <p className="text-nowrap">
          {new Date(item?.createDate).toUTCString().substring(0, 11)}
        </p>
        <div className="flex-1">
          <p className="font-semibold">{item?.title}</p>
          <p>{item?.detail}</p>
        </div>
      </div>
    );
  });

  return (
    <article className="min-h-[100px] max-h-[400px] p-4 flex flex-col gap-4 rounded-lg bg-stone-100">
      <Link title="Go to Journal" to={"/pages/journal"}>
        <h2>Journal</h2>
      </Link>
      <div className="flex flex-col gap-2 overflow-y-auto">{content}</div>
    </article>
  );
}
