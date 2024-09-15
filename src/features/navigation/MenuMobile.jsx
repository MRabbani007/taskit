import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { BsActivity, BsCardList, BsJournalText } from "react-icons/bs";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaRegCircleUser, FaTimeline } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { Drawer } from "antd";

const MenuMobile = ({ viewMobileMenu, setViewMobileMenu }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = auth?.user ? true : false;

  const isActive = (page) => location.pathname.split("/").includes(page);
  const isTasksPage =
    location.pathname.split("/").includes("tasks") &&
    !location.pathname.split("/").includes("planner");

  const iconSize = 30;

  const handleNavigate = (page) => {
    setViewMobileMenu(false);
    navigate(`/${page}`);
  };

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
      placement="right"
      // size={size}
      onClose={() => setViewMobileMenu(false)}
      open={viewMobileMenu}
      width={"70%"}
      rootClassName={""}
    >
      <div className="grid grid-cols-2 items-center justify-center gap-4">
        {menuItems.map((item, idx) => (
          <button
            title={item?.title}
            key={idx}
            className={
              (isActive(item?.url) ? "text-yellow-400" : "") +
              " duration-200 flex items-center gap-2"
            }
            onClick={() => handleNavigate(item?.url)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </Drawer>
  );
};

export default MenuMobile;

// const menuOld = (
//   <div className={(viewMobileMenu ? "flex" : "hidden") + " mobile-menu"}>
//     <div className="menu-item">
//       <button
//         title="Home Page"
//         className={isActive("dashboard") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/dashboard")}
//       >
//         <IoHomeOutline size={iconSize} />
//         <span>Dashboard</span>
//       </button>
//       <button
//         title="Calendar"
//         className={isActive("calendar") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/pages/calendar")}
//       >
//         <IoCalendarOutline size={iconSize} />
//         <span>Calendar</span>
//       </button>
//       <button
//         title="Journal"
//         className={isActive("journal") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/pages/journal")}
//       >
//         <BsJournalText size={iconSize} />
//         <span>Journal</span>
//       </button>
//     </div>
//     <div className=" menu-item">
//       <button
//         title="My Tasks"
//         className={isTasksPage ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/tasks")}
//       >
//         <IoListOutline size={iconSize} />
//         <span>My Tasks</span>
//       </button>
//       <button
//         title="Planner"
//         className={isActive("planner") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/tasks/planner")}
//       >
//         <FaTimeline size={iconSize} />
//         <span>Planner</span>
//       </button>
//       <button
//         title="My Lists"
//         className={isActive("mylists") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/mylists")}
//       >
//         <BsCardList size={iconSize} />
//         <span>My Lists</span>
//       </button>
//     </div>
//     <div className="menu-item">
//       <button
//         title="Activities"
//         className={isActive("activities") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/activities")}
//       >
//         <BsActivity size={iconSize} />
//         <span>Activities</span>
//       </button>
//       <button
//         title="Teams"
//         className={isActive("teams") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/teams")}
//       >
//         <GrGroup size={iconSize} />
//         <span>Teams</span>
//       </button>
//       <button
//         title="Notes"
//         className={isActive("notes") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/pages/notes")}
//       >
//         <SlNotebook size={iconSize} />
//         <span>Notes</span>
//       </button>
//     </div>
//     <div className="menu-item">
//       <button
//         className={isActive("profile") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/user/profile")}
//       >
//         <FaRegCircleUser size={iconSize} />
//         <span>Profile</span>
//       </button>
//       <button
//         className={isActive("settings") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/user/settings")}
//       >
//         <IoSettingsOutline size={iconSize} />
//         <span>Settings</span>
//       </button>
//       <button
//         className={isActive("logout") ? "text-yellow-400" : ""}
//         onClick={() => handleNavigate("/logout")}
//       >
//         <AiOutlineLogin size={iconSize} />
//         <span>Sign Out</span>
//       </button>
//     </div>
//   </div>
// );
