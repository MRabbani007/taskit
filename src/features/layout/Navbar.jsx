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
import UserMenu from "../navigation/UserMenu";

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
    <>
      <menu
        className="menu_bar sm:py-4 py-2 px-8 w-full bg-gradient-to-br from-black to-zinc-600 text-white"
        id="menu_bar"
      >
        <div className="flex flex-row justify-between max-w-[1000px] mx-auto">
          {/* Mobile Menu Button */}
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
          {/* Left Block */}
          <span className="sm:flex gap-3 items-center hidden">
            <Link
              to="/"
              title="Home Page"
              className={isHomePage ? "text-yellow-400" : ""}
            >
              <IoHomeOutline size={32} />
            </Link>
            {auth?.user ? (
              <>
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
              </>
            ) : null}
          </span>
          <UserMenu />
        </div>
      </menu>
      <MenuMobile
        viewMobileMenu={viewMobileMenu}
        setViewMobileMenu={setViewMobileMenu}
      />
    </>
  );
};

export default Navbar;
