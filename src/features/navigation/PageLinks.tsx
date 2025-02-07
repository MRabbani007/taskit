import { BsJournalText } from "react-icons/bs";
import { FaTimeline } from "react-icons/fa6";
import { IoCalendarOutline, IoListOutline } from "react-icons/io5";
import { MdOutlineChecklist } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { Link } from "react-router-dom";

const items = [
  {
    label: "My Tasks",
    icon: <MdOutlineChecklist size={25} />,
    url: "/tasks",
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
  {
    label: "My Lists",
    url: "/myLists",
    icon: <IoListOutline size={25} />,
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
  {
    label: "Calendar",
    icon: <IoCalendarOutline size={25} />,
    url: "/pages/calendar",
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
  {
    label: "Kanban",
    icon: <FaTimeline size={25} />,
    url: "/tasks/planner",
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
  {
    label: "Journal",
    url: "/pages/journal",
    icon: <BsJournalText size={25} />,
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
  {
    label: "Notes",
    url: "/pages/notes",
    icon: <SlNotebook size={28} />,
    bg: "bg-zinc-200 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-300",
  },
];

export default function PageLinks() {
  return (
    <div className="hidden lg:flex items-center justify-center gap-4 px-4 mt-4 ml-auto">
      {items.map((item) => (
        <Link
          to={item.url}
          key={item.label}
          className={
            item.bg +
            " p-2 rounded-md duration-200 shadow-md shadow-zinc-600 border-[1px] border-white/80 relative group whitespace-nowrap text-xs font-medium"
          }
        >
          <span>{item.icon}</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-4 group-hover:translate-y-2 py-1 px-2 rounded-md bg-zinc-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-200">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
