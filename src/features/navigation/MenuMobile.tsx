import { AiOutlineLogout } from "react-icons/ai";
import { BsActivity, BsCardList, BsJournalText } from "react-icons/bs";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoMenu,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { BiX } from "react-icons/bi";
// Imported Media
import Logo from "../../assets/todo.svg";
import { useState } from "react";

export default function MenuMobile() {
  const { auth } = useAuth();
  const location = useLocation();

  const [viewMobileMenu, setViewMobileMenu] = useState(false);

  const isActive = (page: string) =>
    location.pathname.split("/").includes(page);

  const iconSize = 30;

  const menuItems = [
    {
      label: "Dashboard",
      title: "Dashboard",
      url: "dashboard",
      icon: <IoHomeOutline size={iconSize} />,
    },
    {
      label: "Calendar",
      title: "Calendar",
      url: "pages/calendar",
      icon: <IoCalendarOutline size={iconSize} />,
    },
    {
      label: "Journal",
      title: "Journal",
      url: "pages/journal",
      icon: <BsJournalText size={iconSize} />,
    },
    {
      label: "Notes",
      title: "Notes",
      url: "pages/notes",
      icon: <SlNotebook size={iconSize} />,
    },
    {
      label: "My Tasks",
      title: "My Tasks",
      url: "tasks",
      icon: <IoListOutline size={iconSize} />,
    },
    {
      label: "My Lists",
      title: "My Lists",
      url: "mylists",
      icon: <BsCardList size={iconSize} />,
    },
    {
      label: "Planner",
      title: "Planner",
      url: "tasks/planner",
      icon: <FaTimeline size={iconSize} />,
    },
    {
      label: "Activities",
      title: "Activities",
      url: "activities",
      icon: <BsActivity size={iconSize} />,
    },
    {
      label: "Teams",
      title: "Teams",
      url: "teams",
      icon: <GrGroup size={iconSize} />,
    },
    {
      label: "Profile",
      title: "Profile",
      url: "user/profile",
      icon: <FaRegCircleUser size={iconSize} />,
    },
    {
      label: "Settings",
      title: "Settings",
      url: "user/settings",
      icon: <IoSettingsOutline size={iconSize} />,
    },
    {
      label: "Sign Out",
      title: "Sign Out",
      url: "logout",
      icon: <AiOutlineLogout size={iconSize} />,
    },
  ];

  if (!auth?.user)
    return (
      <Link
        to={"/login"}
        className="lg:hidden py-2 px-4 rounded-md bg-blue-600 text-white hover:text-white hover:bg-blue-500 duration-200"
      >
        Get Started
      </Link>
    );

  return (
    <>
      <button
        title="Menu"
        onClick={() => setViewMobileMenu(true)}
        className="lg:hidden"
      >
        <IoMenu size={25} />
      </button>
      <div
        onClick={() => setViewMobileMenu(false)}
        className={
          (viewMobileMenu ? "" : "opacity-0 invisible") +
          " fixed inset-0 bg-zinc-900/50 duration-200 z-50 lg:hidden"
        }
      />
      <div
        className={
          (viewMobileMenu ? "" : "-translate-x-full") +
          " fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-zinc-200 text-zinc-900 duration-200 z-[60] lg:hidden"
        }
      >
        <div className="flex items-center justify-between gap-4 p-4">
          <Link to="/" title="Home Page" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-10" />
            <span className="font-bold text-xl">Taskit</span>
          </Link>
          <button onClick={() => setViewMobileMenu(false)}>
            <BiX size={25} />
          </button>
        </div>
        <div className="flex flex-col">
          {menuItems.map((item, idx) => (
            <Link
              to={item?.url}
              title={item?.title}
              key={idx}
              className={
                (isActive(item?.url) ? "" : "") +
                " duration-200 flex items-center gap-2 py-2 px-4 hover:bg-zinc-300 hover:text-black"
              }
              onClick={() => setViewMobileMenu(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
