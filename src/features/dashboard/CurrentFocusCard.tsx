import React from "react";
import { FaCircle } from "react-icons/fa6";

export default function CurrentFocusCard() {
  const focusItems = [
    { title: "NextJS", progress: 45 },
    { title: "React Native", progress: 18 },
    { title: "E-Commerce App", progress: 23 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-stone-100 flex-1">
      <h2>Current Focus</h2>
      <ul className="">
        {focusItems.map((item, idx) => (
          <FocusItem title={item.title} key={idx} progress={item.progress} />
        ))}
      </ul>
    </div>
  );
}

function FocusItem({ title, progress }: { title: string; progress: number }) {
  return (
    <li className="flex justify-between items-center gap-3">
      <span>{title}</span>
      <span className="text-slate-400 flex items-center gap-1">
        {new Array(5)
          .fill("")
          .map((item, idx) =>
            progress / 20 > idx ? (
              <FaCircle className="text-green-500" />
            ) : (
              <FaCircle />
            )
          )}
      </span>
    </li>
  );
}
