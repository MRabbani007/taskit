import React, { useContext, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { GrDocumentNotes, GrTask } from "react-icons/gr";
import {
  IoAdd,
  IoAddCircleOutline,
  IoCalendarOutline,
  IoCreateOutline,
  IoHomeOutline,
  IoListOutline,
  IoLogOutOutline,
  IoMenu,
  IoMenuOutline,
  IoRepeatOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import useAuth from "../../hooks/useAuth";
import { FiUser } from "react-icons/fi";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BsCalendar4Week, BsCardList, BsJournalText } from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { FaListCheck, FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import { genDate, genDateString } from "../../data/utils";

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
          <Link title="Calendar" to={"/calendar"}>
            Calendar
          </Link>
        ),
        icon: <IoCalendarOutline size={28} />,
      },
      {
        key: "grp_pages_3",
        label: (
          <Link title="Journal" to={"/journal"}>
            Journal
          </Link>
        ),
        icon: <BsJournalText size={28} />,
      },
      {
        key: "grp_pages_4",
        label: (
          <Link title="Notes" to={"/notes"}>
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
        label: <Link to={"/createList"}>Create List</Link>,
        icon: <IoCreateOutline size={28} />,
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
        label: <Link to={"/settings"}>Profile</Link>,
        icon: <FaRegCircleUser size={28} />,
      },
      {
        key: "grp_user_2",
        label: <Link to={"/settings"}>Settings</Link>,
        icon: <IoSettingsOutline size={28} />,
      },
      {
        key: "grp_user_3",
        label: <Link to={"/login"}>Sign Out</Link>,
        icon: <IoLogOutOutline size={28} />,
      },
    ],
  },
];

const Sidebar = () => {
  const { viewTab, handleViewTab } = useContext(GlobalContext);
  const { auth } = useAuth();
  const [expand, setExpand] = useState(false);

  const location = useLocation();

  const isActive = (page) => location.pathname.includes(page);
  const isHomePage = location.pathname.split("/")[2] === "";

  const onClick = (e) => {
    console.log("click ", e);
  };

  const todayDate = genDateString();

  const username = {
    key: "user",
    label: auth?.user ? auth.user : "Login",
    style: { height: "fit-content" },
    icon: <FaRegCircleUser size={32} />,
  };

  let menuItems = [username, ...items];

  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["grp_pages_1"]}
        defaultOpenKeys={["grp_pages"]}
        mode="inline"
        items={menuItems}
      />
      {/* <nav className="hidden">
        <div className={"flex flex-col items-start gap-3 h-full"}>
          <Link
            to="/tasks/today"
            title="Today's Tasks"
            className={
              (isActive("today") ? "text-yellow-400" : "") +
              " flex items-center"
            }
          >
            <IoTodayOutline className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Today
            </span>
          </Link>
          <Link
            to="/tasks/week"
            title="Tasks for this Week"
            className={
              (isActive("week") ? "text-yellow-400" : "") + " flex items-center"
            }
          >
            <IoCalendarOutline className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              This Week
            </span>
          </Link>
          <Link
            to="/tasks/important"
            title="Important Tasks"
            className={
              (isActive("important") ? "text-yellow-400" : "") +
              " flex items-center"
            }
          >
            <IoStarOutline className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Important
            </span>
          </Link>
          <Link
            to="/tasks/overdue"
            title="Overdue Tasks"
            className={
              (isActive("overdue") ? "text-yellow-400" : "") +
              " flex items-center"
            }
          >
            <IoRepeatOutline className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Overdue
            </span>
          </Link>
        </div>

        <div className="hidden flex-col justify-center gap-3 h-full">
          <span
            className={
              (viewTab === "user_lists" ? "text-yellow-500" : "") +
              " flex items-center"
            }
            onClick={() => {
              handleViewTab("user_lists");
            }}
          >
            <IoMenuOutline title="Show Lists" className="icon duration-500" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              My Lists
            </span>
          </span>
          <span
            className={
              (viewTab === "task_list" ? "text-yellow-500" : "") +
              " flex items-center"
            }
            onClick={() => {
              handleViewTab("task_list");
            }}
          >
            <IoListOutline title="Task List" className="icon duration-500" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Todo List
            </span>
          </span>
          <span
            className={
              (viewTab === "create_list" ? "text-yellow-500" : "") +
              " flex items-center"
            }
            onClick={() => {
              handleViewTab("create_list");
            }}
          >
            <IoAddCircleOutline
              title="Add New List"
              className="icon duration-500"
            />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Create Lists
            </span>
          </span>
          <span
            className={
              (viewTab === "tasks" ? "text-yellow-500" : "") +
              " flex items-center"
            }
            onClick={() => {
              handleViewTab("tasks");
            }}
          >
            <GrTask title="Show Tasks" className="icon duration-500" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Tasks
            </span>
          </span>
          <span
            className={
              (viewTab === "notes" ? "text-yellow-500" : "") +
              " flex items-center"
            }
            onClick={() => {
              handleViewTab("notes");
            }}
          >
            <GrDocumentNotes title="Notes" className="icon duration-500" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Notes
            </span>
          </span>
        </div>

        <div>
          <Link
            to="/createList"
            title="Create New List"
            className={
              (isActive("createList") ? "text-yellow-400" : "") +
              " flex items-center"
            }
          >
            <IoAdd className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              New List
            </span>
          </Link>
        </div>

        <div className="hidden flex-col items-center gap-3">
          <Link to="/login" className="flex items-center">
            <FiUser className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              {auth?.user}
            </span>
          </Link>
          <Link to="/settings" className="flex items-center">
            <IoSettingsOutline className="icon" />
            <span
              className={
                (expand ? "w-24 ml-3" : "w-0 -translate-x-6 invisible") +
                " whitespace-nowrap overflow-hidden duration-500"
              }
            >
              Settings
            </span>
          </Link>
        </div>
      </nav> */}
    </>
  );
};

export default Sidebar;
