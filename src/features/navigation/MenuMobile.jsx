import { BsCardList, BsJournalText } from "react-icons/bs";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";

const MenuMobile = ({ viewMobileMenu, setViewMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (page) =>
    location.pathname.includes(page) &&
    location.pathname.split("/")[2] === undefined;
  const isHomePage = location.pathname.split("/")[1] === "";

  const iconSize = 40;

  const handleNavigate = (page) => {
    setViewMobileMenu(false);
    navigate("/" + page);
  };

  return (
    <div
      className={
        (viewMobileMenu ? "flex" : "hidden") +
        " flex-col items-center justify-evenly fixed top-[50px] bottom-0 left-0 right-0 mobile-menu"
      }
    >
      <button
        title="Home Page"
        className={(isHomePage ? "text-yellow-400" : "") + " menu-item"}
        onClick={() => handleNavigate("")}
      >
        <IoHomeOutline size={iconSize} />
        <span>Home</span>
      </button>
      <button
        title="My Lists"
        className={
          (isActive("/mylists") ? "text-yellow-400" : "") + " menu-item"
        }
        onClick={() => handleNavigate("mylists")}
      >
        <BsCardList size={iconSize} />
        <span>My Lists</span>
      </button>
      <button
        title="My Tasks"
        className={(isActive("/tasks") ? "text-yellow-400" : "") + " menu-item"}
        onClick={() => handleNavigate("tasks")}
      >
        <IoListOutline size={iconSize} />
        <span>My Tasks</span>
      </button>
      <button
        title="Calendar"
        className={
          (isActive("/calendar") ? "text-yellow-400" : "") + " menu-item"
        }
        onClick={() => handleNavigate("calendar")}
      >
        <IoCalendarOutline size={iconSize} />
        <span>Calendar</span>
      </button>
      <button
        title="Notes"
        className={(isActive("/notes") ? "text-yellow-400" : "") + " menu-item"}
        onClick={() => handleNavigate("notes")}
      >
        <SlNotebook size={iconSize} />
        <span>Notes</span>
      </button>
      <button
        title="Journal"
        className={
          (isActive("/journal") ? "text-yellow-400" : "") + " menu-item"
        }
        onClick={() => handleNavigate("journal")}
      >
        <BsJournalText size={iconSize} />
        <span>Journal</span>
      </button>
      <button
        className={
          (isActive("/settings") ? "text-yellow-400" : "") + " menu-item"
        }
        onClick={() => handleNavigate("settings")}
      >
        <IoSettingsOutline size={iconSize} />
        <span>Settings</span>
      </button>
    </div>
  );
};

export default MenuMobile;
