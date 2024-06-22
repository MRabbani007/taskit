import { AiOutlineLogin } from "react-icons/ai";
import { BsCardList, BsJournalText } from "react-icons/bs";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MenuMobile = ({ viewMobileMenu, setViewMobileMenu }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = auth?.user ? true : false;

  const isActive = (page) =>
    location.pathname.includes(page) &&
    location.pathname.split("/")[2] === undefined;
  const isHomePage = location.pathname.split("/")[1] === "";

  const iconSize = 40;

  const handleNavigate = (page) => {
    setViewMobileMenu(false);
    navigate(page);
  };

  return (
    <div className={(viewMobileMenu ? "flex" : "hidden") + " mobile-menu"}>
      <div className="menu-item">
        <button
          title="Home Page"
          className={isHomePage ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/")}
        >
          <IoHomeOutline size={iconSize} />
          <span>Dashboard</span>
        </button>
        <button
          title="Calendar"
          className={isActive("/calendar") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/pages/calendar")}
        >
          <IoCalendarOutline size={iconSize} />
          <span>Calendar</span>
        </button>
      </div>
      <div className=" menu-item">
        <button
          title="My Tasks"
          className={isActive("/tasks") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/tasks")}
        >
          <IoListOutline size={iconSize} />
          <span>My Tasks</span>
        </button>
        <button
          title="My Lists"
          className={isActive("/mylists") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/mylists")}
        >
          <BsCardList size={iconSize} />
          <span>My Lists</span>
        </button>
      </div>
      <div className="menu-item">
        <button
          title="Notes"
          className={isActive("/notes") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/pages/notes")}
        >
          <SlNotebook size={iconSize} />
          <span>Notes</span>
        </button>
        <button
          title="Journal"
          className={isActive("/journal") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/pages/journal")}
        >
          <BsJournalText size={iconSize} />
          <span>Journal</span>
        </button>
      </div>
      <div className="menu-item">
        <button
          className={isActive("/settings") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/user/settings")}
        >
          <IoSettingsOutline size={iconSize} />
          <span>Settings</span>
        </button>
        <button
          className={isActive("/logout") ? "text-yellow-400" : ""}
          onClick={() => handleNavigate("/logout")}
        >
          <AiOutlineLogin size={iconSize} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default MenuMobile;
