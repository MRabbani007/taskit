import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { JournalContext } from "../../context/JournalState";

export default function DashboardJournal() {
  const { journal } = useContext(JournalContext);

  const lastItems = Array.isArray(journal)
    ? journal
        .sort((a, b) =>
          (a?.createDate || "")
            .toString()
            .localeCompare((b?.createDate || "").toString())
        )
        .slice(-6)
    : [];

  const content = lastItems.map((item, index) => {
    return (
      <div className="w-full flex gap-2 p-2 bg-zinc-100">
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
    <article className="flex-1 min-w-[300px] min-h-[200px]">
      <h2 className="py-2 px-4 bg-gradient-to-l from-green-300 to-green-100 text-zinc-800 ">
        <Link
          title="Go to Journal"
          to={"/journal"}
          className="hover:text-yellow-500 duration-200"
        >
          Journal
        </Link>
      </h2>
      <div className="w-full flex flex-col h-full gap-2 py-2 max-h-[400px] overflow-y-auto">
        {content}
      </div>
    </article>
  );
}
