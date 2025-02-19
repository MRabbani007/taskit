import { BsCardList, BsJournalText } from "react-icons/bs";
import {
  IoCalendarOutline,
  IoListOutline,
  IoMenu,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import { BiX } from "react-icons/bi";
// Imported Media
import Logo from "../../assets/todo.svg";
import { ReactNode, useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { PiKanbanLight, PiUserCircleLight } from "react-icons/pi";

export default function MenuMobile({
  toggleButton,
}: {
  toggleButton?: ReactNode;
}) {
  const { auth } = useAuth();
  const location = useLocation();

  const [viewMobileMenu, setViewMobileMenu] = useState(false);

  const isActive = (page: string) =>
    location.pathname.split("/").includes(page);

  const iconSize = 25;

  const menuItems = [
    {
      label: "Dashboard",
      title: "Dashboard",
      url: "/dashboard",
      icon: <RxDashboard size={iconSize} />,
    },
    {
      label: "Calendar",
      title: "Calendar",
      url: "/pages/calendar",
      icon: <IoCalendarOutline size={iconSize} />,
    },
    {
      label: "Journal",
      title: "Journal",
      url: "/pages/journal",
      icon: <BsJournalText size={iconSize} />,
    },
    {
      label: "Notes",
      title: "Notes",
      url: "/pages/notes",
      icon: <SlNotebook size={iconSize} />,
    },
    {
      label: "My Tasks",
      title: "My Tasks",
      url: "/tasks",
      icon: <IoListOutline size={iconSize} />,
    },
    {
      label: "My Lists",
      title: "My Lists",
      url: "/mylists",
      icon: <BsCardList size={iconSize} />,
    },
    {
      label: "Planner",
      title: "Planner",
      url: "/tasks/planner",
      icon: <PiKanbanLight style={{ strokeWidth: "1" }} size={iconSize} />,
    },
    // {
    //   label: "Activities",
    //   title: "Activities",
    //   url: "/activities",
    //   icon: <BsActivity size={iconSize} />,
    // },
    // {
    //   label: "Teams",
    //   title: "Teams",
    //   url: "/teams",
    //   icon: <GrGroup size={iconSize} />,
    // },
    {
      label: "Settings",
      title: "Settings",
      url: "/user/settings",
      icon: <IoSettingsOutline size={iconSize} />,
    },
    {
      label: "Profile",
      title: "Profile",
      url: "/user/profile",
      icon: <PiUserCircleLight size={iconSize} />,
    },
    // {
    //   label: "Sign Out",
    //   title: "Sign Out",
    //   url: "/logout",
    //   icon: <AiOutlineLogout size={iconSize} />,
    // },
  ];

  useEffect(() => {
    const handleEscape = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        setViewMobileMenu(false);
      }
    };

    if (viewMobileMenu) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [viewMobileMenu]);

  if (!auth?.user) return null;
  // <Link
  //   to={"/login"}
  //   className="lg:hidden py-2 px-4 rounded-md bg-blue-600 text-white hover:text-white hover:bg-blue-500 duration-200"
  // >
  //   Get Started
  // </Link>

  return (
    <>
      <button title="Menu" onClick={() => setViewMobileMenu(true)}>
        {toggleButton ? (
          toggleButton
        ) : (
          <div className="p-2 bg-sky-900 hover:bg-sky-800 text-white duration-200 rounded-lg lg:hidden">
            <IoMenu size={25} />
          </div>
        )}
      </button>
      <div
        onClick={() => setViewMobileMenu(false)}
        className={
          (viewMobileMenu ? "" : "opacity-0 invisible") +
          " fixed inset-0 bg-zinc-900/50 duration-200 z-[100] lg:hidden"
        }
      />
      <div
        className={
          (viewMobileMenu ? "" : "-translate-x-full") +
          " fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-zinc-200 text-zinc-900 duration-200 z-[120] lg:hidden"
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
