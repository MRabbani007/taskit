import { AiOutlineLogout } from "react-icons/ai";
import { BsActivity, BsCardList, BsJournalText } from "react-icons/bs";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { Drawer } from "antd";

export default function MenuMobile({ viewMobileMenu, setViewMobileMenu }) {
  const { auth } = useAuth();
  const location = useLocation();

  const isLoggedIn = auth?.user ? true : false;

  const isActive = (page) => location.pathname.split("/").includes(page);
  const isTasksPage =
    location.pathname.split("/").includes("tasks") &&
    !location.pathname.split("/").includes("planner");

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

  return (
    <Drawer
      title={`Taskit`}
      placement="left"
      // size={size}
      onClose={() => setViewMobileMenu(false)}
      open={viewMobileMenu}
      width={"70%"}
      // rootClassName={"bg-green-400"}
    >
      <div className="flex flex-col">
        {menuItems.map((item, idx) => (
          <Link
            to={item?.url}
            title={item?.title}
            key={idx}
            className={
              (isActive(item?.url) ? "text-yellow-400" : "") +
              " duration-200 flex items-center gap-2 py-2 px-4 "
            }
            onClick={() => setViewMobileMenu(false)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </Drawer>
  );
}
