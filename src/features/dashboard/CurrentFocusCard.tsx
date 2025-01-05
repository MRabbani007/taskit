import { FaCircle } from "react-icons/fa6";
import { RiFocus3Line } from "react-icons/ri";

export default function CurrentFocusCard() {
  const focusItems = [
    { title: "NextJS", progress: 45 },
    { title: "React Native", progress: 18 },
    { title: "E-Commerce App", progress: 23 },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="flex items-center gap-2 bg-red-600 text-white font-normal rounded-t-lg py-2 px-4">
        <RiFocus3Line size={24} className="" />
        <span className="">Current Focus</span>
      </h2>
      <ul className="flex-1 flex flex-col gap-2 p-2 rounded-b-lg bg-stone-300">
        {focusItems.map((item, idx) => (
          <FocusItem title={item.title} key={idx} progress={item.progress} />
        ))}
      </ul>
    </div>
  );
}

function FocusItem({ title, progress }: { title: string; progress: number }) {
  return (
    <li className="flex justify-between items-center gap-4">
      <span className="font-semibold">{title}</span>
      <span className="text-slate-400 flex items-center gap-1">
        {new Array(5)
          .fill("")
          .map((_, idx) =>
            progress / 20 > idx ? (
              <FaCircle className="text-green-500" key={idx} />
            ) : (
              <FaCircle key={idx} />
            )
          )}
      </span>
    </li>
  );
}
