import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Imported Context
import { UserContext } from "../../context/UserState";
// Imported Components
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoCalendarOutline,
  IoHomeOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import { SlNotebook } from "react-icons/sl";
import { BsCardList, BsJournalText } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import MenuMobile from "../navigation/MenuMobile";

const Navbar = () => {
  const { auth } = useAuth();
  const [viewMobileMenu, setViewMobileMenu] = useState(false);

  const location = useLocation();

  const isActive = (page) => location.pathname.split("/").includes(page);

  const isHomePage =
    location.pathname.split("/")[1] === "" ||
    location.pathname.split("/")[1] === "dashboard";

  const isAdmin = auth?.roles && auth.roles.includes(5150);

  return (
    <div
      className="menu_bar bg-gradient-to-br from-black to-zinc-600 text-white"
      id="menu_bar"
    >
      <button
        className={
          (viewMobileMenu ? "is-active" : "") +
          " hamburger hamburger--spin sm:hidden"
        }
        type="button"
        onClick={() => setViewMobileMenu(!viewMobileMenu)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <MenuMobile
        viewMobileMenu={viewMobileMenu}
        setViewMobileMenu={setViewMobileMenu}
      />
      <span className="sm:flex gap-3 items-center hidden">
        <Link
          to="/"
          title="Home Page"
          className={isHomePage ? "text-yellow-400" : ""}
        >
          <IoHomeOutline size={32} />
        </Link>
        <Link
          to="/mylists"
          title="My Lists"
          className={isActive("mylists") ? "text-yellow-400" : ""}
        >
          <BsCardList size={32} />
        </Link>
        <Link
          to="/tasks"
          title="My Tasks"
          className={isActive("tasks") ? "text-yellow-400" : ""}
        >
          <IoListOutline size={32} />
        </Link>
        <Link
          to="/calendar"
          title="Calendar"
          className={isActive("calendar") ? "text-yellow-400" : ""}
        >
          <IoCalendarOutline size={32} />
        </Link>
        <Link
          to="/notes"
          title="Notes"
          className={isActive("notes") ? "text-yellow-400" : ""}
        >
          <SlNotebook className="icon-md" />
        </Link>
        <Link
          to="/journal"
          title="Journal"
          className={isActive("journal") ? "text-yellow-400" : ""}
        >
          <BsJournalText className="icon-md" />
        </Link>
        {/* <Link to="/">
          <TbReportAnalytics size={32} />
        </Link>
        <Link to="/">
          <IoAddCircleOutline className="icon mx-3" />
        </Link> */}
        {/* {auth?.roles && Object.values(auth?.roles).includes(5150) && (
          <Link to="/admin">
            <RiAdminLine size={32} />
          </Link>
        )} */}
      </span>
      <div className="flex items-center gap-3">
        {/* <MdOutlineDarkMode className="icon mx-3" /> */}
        <Link
          to={isAdmin ? "/admin" : "/login"}
          className={isActive("/login") ? "text-yellow-400" : ""}
        >
          {auth?.user === "" ? "" : auth?.user}
          <FiUser className="icon ml-3" />
        </Link>
        <Link
          to="/settings"
          className={
            (isActive("/settings") ? "text-yellow-400" : "") +
            " hidden sm:inline-block"
          }
        >
          <IoSettingsOutline size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
