import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Imported Context
import useAuth from "../../hooks/useAuth";
// Imported Components
import { Menu } from "antd";
// Imported Data
import { genDate, genDateString } from "../../data/utils";
import { GoProjectRoadmap } from "react-icons/go";
import {
  IoCalendarOutline,
  IoCreateOutline,
  IoListOutline,
  IoLogOutOutline,
  IoRepeatOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import {
  BsActivity,
  BsCalendar4Week,
  BsCardList,
  BsJournalText,
} from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { FaListCheck, FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import { RiAdminLine, RiPagesLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";

const items = [
  // {
  //   key: "user",
  //   label: "User",
  //   icon: <FaRegCircleUser size={32} />,
  //   style: { height: "fit-content" },
  // },
  {
    key: "today_date",
    label: genDateString(),
  },
  {
    key: "grp_pages",
    label: "Pages",
    icon: <RiPagesLine size={28} />,
    children: [
      {
        key: "grp_pages_1",
        label: (
          <Link title="Dashboard" to={"/dashboard"}>
            Dashboard
          </Link>
        ),
        icon: <AiOutlineDashboard size={28} />,
        path: "/",
      },
      {
        key: "grp_pages_2",
        label: (
          <Link title="Calendar" to={"/pages/calendar"}>
            Calendar
          </Link>
        ),
        icon: <IoCalendarOutline size={28} />,
      },
      {
        key: "grp_pages_3",
        label: (
          <Link title="Journal" to={"/pages/journal"}>
            Journal
          </Link>
        ),
        icon: <BsJournalText size={28} />,
      },
      {
        key: "grp_pages_4",
        label: (
          <Link title="Notes" to={"/pages/notes"}>
            Notes
          </Link>
        ),
        icon: <SlNotebook size={28} />,
      },
    ],
  },
  {
    key: "grp_tasks",
    label: "Tasks",
    icon: <MdOutlineTaskAlt size={28} />,
    children: [
      {
        key: "grp_tasks_1",
        label: <Link to={"/tasks"}>My Tasks</Link>,
        icon: <FaListCheck size={28} />,
      },
      {
        key: "grp_tasks_6",
        label: <Link to={"/tasks/planner"}>Planner</Link>,
        icon: <FaTimeline size={28} />,
      },
      {
        key: "grp_tasks_2",
        label: <Link to={"/tasks/today"}>Today</Link>,
        icon: <IoTodayOutline size={28} />,
      },
      {
        key: "grp_tasks_3",
        label: <Link to={"/tasks/week"}>This Week</Link>,
        icon: <BsCalendar4Week size={28} />,
      },
      {
        key: "grp_tasks_4",
        label: <Link to={"/tasks/important"}>Important</Link>,
        icon: <IoStarOutline size={28} />,
      },
      {
        key: "grp_tasks_5",
        label: <Link to={"/tasks/overdue"}>Overdue</Link>,
        icon: <IoRepeatOutline size={28} />,
      },
    ],
  },
  {
    key: "grp_lists",
    label: "Lists",
    icon: <BsCardList size={28} />,
    children: [
      {
        key: "grp_lists_1",
        label: <Link to={"/myLists"}>My Lists</Link>,
        icon: <IoListOutline size={28} />,
      },
      {
        key: "grp_lists_2",
        label: <Link to={"/myLists/createList"}>Create List</Link>,
        icon: <IoCreateOutline size={28} />,
      },
    ],
  },
  // Activities
  {
    key: "grp_activities",
    label: "Activities",
    icon: <BsActivity size={28} />,
    children: [
      {
        key: "grp_activities_1",
        label: <Link to={"/activities"}>My Activities</Link>,
        icon: <GoProjectRoadmap size={28} />,
      },
      {
        key: "grp_activities_2",
        label: <Link to={"/activities/create"}>Create Activity</Link>,
        icon: <IoCreateOutline size={28} />,
      },
    ],
  },
  // Teams
  {
    key: "grp_teams",
    label: "Teams",
    icon: <GrGroup size={28} />,
    children: [
      {
        key: "grp_teams_1",
        label: <Link to={"/teams"}>Teams</Link>,
        icon: <IoListOutline size={28} />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "grp_user",
    label: "User",
    icon: <AiOutlineUser size={28} />,
    children: [
      {
        key: "grp_user_1",
        label: <Link to={"/user/profile"}>Profile</Link>,
        icon: <FaRegCircleUser size={28} />,
      },
      {
        key: "grp_user_2",
        label: <Link to={"/user/settings"}>Settings</Link>,
        icon: <IoSettingsOutline size={28} />,
      },
      {
        key: "grp_user_3",
        label: <Link to={"/logout"}>Sign Out</Link>,
        icon: <IoLogOutOutline size={28} />,
      },
    ],
  },
];

const adminItems = [
  {
    key: "grp_admin",
    label: "Admin",
    icon: <RiAdminLine size={28} />,
    children: [
      {
        key: "grp_admin_1",
        label: (
          <Link title="Users" to={"/admin/users"}>
            Users
          </Link>
        ),
        icon: <FiUsers size={28} />,
        // path: "/",
      },
      {
        key: "grp_admin_2",
        label: (
          <Link title="Lists" to={"/admin/lists"}>
            Lists
          </Link>
        ),
        icon: <IoListOutline size={28} />,
      },
      // {
      //   key: "grp_admin_3",
      //   label: (
      //     <Link title="Journal" to={"/pages/journal"}>
      //       Journal
      //     </Link>
      //   ),
      //   icon: <BsJournalText size={28} />,
      // },
      // {
      //   key: "grp_admin_4",
      //   label: (
      //     <Link title="Notes" to={"/pages/notes"}>
      //       Notes
      //     </Link>
      //   ),
      //   icon: <SlNotebook size={28} />,
      // },
    ],
  },
];

const Sidebar = () => {
  const { auth } = useAuth();
  const [expand, setExpand] = useState(false);

  const location = useLocation();

  const isActive = (page) => location.pathname.includes(page);
  const isHomePage = location.pathname.split("/")[2] === "";
  const isAdmin = auth?.roles.includes(5150);

  const onClick = (e) => {
    // console.log("click ", e);
  };

  const todayDate = genDateString();

  const username = {
    key: "user",
    label: auth?.user ? auth.user : "Login",
    style: { paddingTop: "1rem", paddingBottom: "1rem" },
    icon: <FaRegCircleUser size={32} />,
  };

  let menuItems = isAdmin
    ? [username, ...items, ...adminItems]
    : [username, ...items];

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["grp_pages_1"]}
      defaultOpenKeys={["grp_pages"]}
      mode="inline"
      items={menuItems}
      className="bg-zinc-100 hidden md:block static"
    />
  );
};

export default Sidebar;
