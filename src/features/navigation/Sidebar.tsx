import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Imported Context
import useAuth from "../../hooks/useAuth";
import { GoProjectRoadmap } from "react-icons/go";
import {
  IoCalendarOutline,
  IoCreateOutline,
  IoListOutline,
  // IoLogOutOutline,
  IoRepeatOutline,
  // IoSettingsOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import {
  MdOutlineChecklist,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineTaskAlt,
} from "react-icons/md";
import {
  BsActivity,
  BsCalendar4Week,
  BsCardList,
  BsJournalText,
} from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
// import { AiOutlineUser } from "react-icons/ai";
import { FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import { RiAdminLine, RiPagesLine } from "react-icons/ri";
// import { GrGroup } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";

// const olditems = [
//   // Teams
//   {
//     key: "grp_teams",
//     label: "Teams",
//     icon: <GrGroup size={28} />,
//     children: [
//       {
//         key: "grp_teams_1",
//         label: <Link to={"/teams"}>Teams</Link>,
//         icon: <IoListOutline size={28} />,
//         style: { display: "flex", alignItems: "center" },
//       },
//     ],
//   },
//   {
//     type: "divider",
//   },
//   {
//     key: "grp_user",
//     label: "User",
//     icon: <AiOutlineUser size={28} />,
//     children: [
//       {
//         key: "grp_user_1",
//         label: <Link to={"/user/profile"}>Profile</Link>,
//         icon: <FaRegCircleUser size={28} />,
//         style: { display: "flex", alignItems: "center" },
//       },
//       {
//         key: "grp_user_2",
//         label: <Link to={"/user/settings"}>Settings</Link>,
//         icon: <IoSettingsOutline size={28} />,
//         style: { display: "flex", alignItems: "center" },
//       },
//       {
//         key: "grp_user_3",
//         label: <Link to={"/logout"}>Sign Out</Link>,
//         icon: <IoLogOutOutline size={28} />,
//         style: { display: "flex", alignItems: "center" },
//       },
//     ],
//   },
// ];

const items = [
  {
    label: "Pages",
    url: "",
    icon: <RiPagesLine size={25} />,
    children: [
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
    ],
  },
  // {
  //   label: "Tasks",
  //   icon: <MdOutlineTaskAlt size={25} />,
  //   children: [
  //     {
  //       label: "My Tasks",
  //       icon: <MdOutlineChecklist size={25} />,
  //       url: "/tasks",
  //     },
  //     {
  //       label: "Today",
  //       icon: <IoTodayOutline size={25} />,
  //       url: "/tasks/today",
  //     },
  //     {
  //       label: "This Week",
  //       icon: <BsCalendar4Week size={25} />,
  //       url: "/tasks/week",
  //     },
  //     {
  //       label: "Important",
  //       icon: <IoStarOutline size={25} />,
  //       url: "/tasks/important",
  //     },
  //     {
  //       label: "Overdue",
  //       icon: <IoRepeatOutline size={25} />,
  //       url: "/tasks/overdue",
  //     },
  //   ],
  // },
  // {
  //   label: "Lists",
  //   icon: <BsCardList size={25} />,
  //   children: [
  //     {
  //       label: "My Lists",
  //       url: "/myLists",
  //       icon: <IoListOutline size={25} />,
  //     },
  //     {
  //       label: "Create List",
  //       url: "/myLists/createList",
  //       icon: <IoCreateOutline size={25} />,
  //     },
  //   ],
  // },
  // Activities
  // {
  //   label: "Activities",
  //   url: "",
  //   icon: <BsActivity size={28} />,
  //   children: [
  //     {
  //       label: "My Activities",
  //       url: "/activities",
  //       icon: <GoProjectRoadmap size={25} />,
  //     },
  //     {
  //       label: "Create Activity",
  //       url: "/activities/create",
  //       icon: <IoCreateOutline size={25} />,
  //     },
  //   ],
  // },
];

const adminItems = [
  {
    label: "Admin",
    icon: <RiAdminLine size={28} />,
    url: "",
    children: [
      {
        label: "Users",
        url: "/admin/users",
        icon: <FiUsers size={25} />,
      },
      {
        label: "Lists",
        url: "/admin/lists",
        icon: <IoListOutline size={25} />,
      },
    ],
  },
];

export default function Sidebar() {
  const { auth } = useAuth();

  const ref = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState(true);

  const [expandGroup, setExpandGroup] = useState(-1);

  const isAdmin = auth?.roles?.includes(5150);

  let menuItems = isAdmin ? [...items, ...adminItems] : [...items];

  useEffect(() => {
    setExpandGroup(-1);
  }, [collapsed]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event?.target as Node | null)) {
        setExpandGroup(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={
        (collapsed ? "" : "w-40") +
        " hidden lg:flex flex-col bg-teal-950 text-zinc-100 duration-300"
      }
    >
      <Link
        to={"/dashboard"}
        className="flex items-center justify-center py-2 px-4"
      >
        <FaRegCircleUser size={30} />
        <span
          className={`whitespace-nowrap ${
            collapsed ? "w-0 invisible opacity-0" : "w-20 ml-2"
          } transition-all duration-300`}
        >
          {auth?.user}
        </span>
      </Link>
      <div ref={ref}>
        {menuItems.map((menuGroup, idx) => (
          <div
            key={idx}
            className={
              (expandGroup === idx ? "bg-zinc-200" : "") +
              (collapsed ? " flex justify-center " : "") +
              " relative w-full"
            }
          >
            <button
              onClick={() =>
                setExpandGroup((curr) => (curr === idx ? -1 : idx))
              }
              className={
                " font-semibold py-2 px-2 flex items-center gap-2 duration-200"
              }
            >
              {menuGroup.icon}
              <span
                className={`whitespace-nowrap ${
                  collapsed ? "hidden" : "block"
                } transition-all duration-300`}
              >
                {menuGroup.label}
              </span>
            </button>
            {menuGroup?.children?.length !== 0 && (
              <div
                className={
                  (expandGroup === idx
                    ? ""
                    : " translate-y-4 h-0 invisible opacity-0 ") +
                  (collapsed ? " absolute top-0 left-full " : "") +
                  " duration-200 bg-white z-50"
                }
              >
                {menuGroup.children.map((menuItem, index) => (
                  <Link
                    key={index}
                    to={menuItem.url}
                    className="flex items-center gap-2 py-2 px-4"
                  >
                    {menuItem.icon}
                    <span className=" whitespace-nowrap">{menuItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        title={collapsed ? "Expand" : "Collapse"}
        onClick={() => setCollapsed((curr) => !curr)}
        className="mx-auto py-2 px-4 rounded-md bg-zinc-200 mt-2"
      >
        <MdOutlineKeyboardDoubleArrowRight
          size={20}
          className={collapsed ? "" : "rotate-180" + " duration-200 "}
        />
      </button>
    </nav>
  );
}
