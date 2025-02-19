import { getDate } from "@/lib/dateFunctions";

export default function CardDate() {
  const { day, date, monthStr, year } = getDate();
  return (
    <div className="hidden lg:flex items-center gap-2">
      <div className="w-12 h-12 rounded-full hover:font-bold duration-200 border-[1px] bg-white border-blue-500 flex items-center justify-center text-blue-500">
        {date}
      </div>
      <div className="flex flex-col bg-white rounded-xl py-1 text-sm px-6 border-[1px] border-blue-500">
        <div className="text-zinc-950 font-bold">{day}</div>
        <div className="text-zinc-700 font-medium">
          <span>{monthStr}</span>
          <span>, </span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}
