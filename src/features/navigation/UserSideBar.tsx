import { BsJournalText } from "react-icons/bs";
import { FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import {
  IoCalendarOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineChecklist } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const items = [
  {
    label: "Dashboard",
    icon: <RxDashboard size={25} />,
    url: "/dashboard",
  },
  {
    label: "My Tasks",
    icon: <MdOutlineChecklist size={25} />,
    url: "/tasks",
  },
  {
    label: "My Lists",
    url: "/myLists",
    icon: <IoListOutline size={25} />,
  },
  {
    label: "Calendar",
    icon: <IoCalendarOutline size={25} />,
    url: "/pages/calendar",
  },
  {
    label: "Kanban",
    icon: <FaTimeline size={25} />,
    url: "/tasks/planner",
  },
  {
    label: "Journal",
    url: "/pages/journal",
    icon: <BsJournalText size={25} />,
  },
  {
    label: "Notes",
    url: "/pages/notes",
    icon: <SlNotebook size={28} />,
  },
];

const userItems = [
  {
    label: "Settings",
    url: "/user/settings",
    icon: <IoSettingsOutline size={25} />,
  },
  {
    label: "Profile",
    url: "/user/profile",
    icon: <FaRegCircleUser size={25} />,
  },
];

export default function UserSideBar() {
  return (
    <nav className="hidden lg:flex flex-col bg-gradient-to-br from-sky-950 to-indigo-950 p-4 text-zinc-300 rounded-lg">
      <div className="flex flex-col gap-0">
        {items.map((item) => (
          <Link
            to={item.url}
            key={item.label}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-zinc-300/30 hover:text-zinc-300 duration-200"
          >
            {item.icon}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-0 mt-auto">
        {userItems.map((item) => (
          <Link
            to={item.url}
            key={item.label}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-zinc-300/30 hover:text-zinc-300 duration-200"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
}
