import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Imported Context
import useAuth from "../../hooks/useAuth";
// Imported Components
import MenuMobile from "../navigation/MenuMobile";
import UserMenu from "../navigation/UserMenu";
import { Menu } from "antd";
// Imported Media
import Logo from "../../assets/todo.svg";
// Imported Icons
import {
  IoCalendarOutline,
  IoListOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { BsCardList, BsJournalText } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineUserPlus } from "react-icons/hi2";

const Navbar = () => {
  const { auth } = useAuth();
  const [viewMobileMenu, setViewMobileMenu] = useState(false);

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  const location = useLocation();

  const isActive = (page) => location.pathname.split("/").includes(page);

  const isHomePage =
    location.pathname.split("/")[1] === "" ||
    location.pathname.split("/")[1] === "dashboard";

  const isLoggedIn = auth?.user ? true : false;
  const isAdmin = auth?.roles && auth.roles.includes(5150);

  const menuGuest = {
    key: "navbar_guest",
    label: (
      <div className="flex items-center gap-2">
        <AiOutlineUser size={30} />
        <span>Sign In</span>
      </div>
    ),
    style: { marginLeft: "auto" },
    children: [
      {
        key: "navbar_guest_login",
        label: (
          <Link to="/login" className="flex items-center gap-2">
            <AiOutlineLogin size={28} />
            <span>Sign In</span>
          </Link>
        ),
      },
      {
        key: "navbar_guest_register",
        label: (
          <Link to="/register" className="flex items-center gap-2">
            <HiOutlineUserPlus size={28} />
            <span>Sign Up</span>
          </Link>
        ),
      },
    ],
  };

  const menuUser = {
    key: "navbar_user",
    label: (
      <div className="hidden md:flex items-center gap-1">
        <AiOutlineUser size={30} />
        <span>{auth?.user}</span>
      </div>
    ),
    style: { marginLeft: "auto" },
    children: [
      {
        key: "navbar_user_1",
        label: (
          <Link to={"/user/profile"} className="flex items-center gap-2">
            <FaRegCircleUser size={28} />
            <span>Profile</span>
          </Link>
        ),
      },
      {
        key: "navbar_user_2",
        label: (
          <Link to={"/user/settings"} className="flex items-center gap-2">
            <IoSettingsOutline size={28} />
            <span>Settings</span>
          </Link>
        ),
      },
      {
        key: "navbar_user_3",
        label: (
          <Link to={"/logout"} className="flex items-center gap-2">
            <IoLogOutOutline size={28} />
            <span>Sign Out</span>
          </Link>
        ),
      },
    ],
  };

  const menuAdmin = {
    key: "navbar_admin",
    label: (
      <div className="hidden md:flex items-center gap-0">
        <AiOutlineUser size={30} />
        <span>{auth?.user}</span>
      </div>
    ),
    style: { marginLeft: "auto" },
    children: [
      {
        key: "navbar_admin_1",
        label: (
          <Link to={"/user/profile"} className="flex items-center gap-1">
            <FaRegCircleUser size={28} />
            Profile
          </Link>
        ),
      },
      {
        key: "navbar_admin_2",
        label: (
          <Link to={"/user/settings"} className="flex items-center gap-1">
            <IoSettingsOutline size={28} />
            Settings
          </Link>
        ),
      },
      {
        key: "navbar_admin_3",
        label: (
          <Link to={"/logout"} className="flex items-center gap-1">
            <IoLogOutOutline size={28} />
            Sign Out
          </Link>
        ),
      },
    ],
  };

  const homeButton = {
    key: "navbar_home",
    label: (
      <Link to="/" title="Home Page" className="flex items-center gap-0">
        <img src={Logo} alt="Logo" className="w-12" />
        <span className="font-bold text-xl">Taskit</span>
      </Link>
    ),
  };

  const mobileMenuButton = {
    key: "navbar_hamburger",
    label: (
      <button
        className={
          (viewMobileMenu ? "is-active" : "") +
          " hamburger hamburger--spin md:hidden pt-6 pb-6"
        }
        type="button"
        onClick={() => setViewMobileMenu(!viewMobileMenu)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    ),
  };

  const items = isLoggedIn ? [homeButton, mobileMenuButton] : [homeButton];

  const userMenuItem = isAdmin ? menuAdmin : isLoggedIn ? menuUser : menuGuest;
  items.splice(1, 0, userMenuItem);

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="bg-zinc-200 py-2 h-[70px]"
      />
      <menu
        className="hidden sm:py-4 py-2 px-8 w-full bg-gradient-to-br from-black to-zinc-600 text-white"
        id="menu_bar"
      >
        <div className="flex flex-row justify-between max-w-[1000px] mx-auto">
          {/* Mobile Menu Button */}
          <button
            className={
              (viewMobileMenu ? "is-active" : "") +
              " hamburger hamburger--spin md:hidden"
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
              <img src={Logo} alt="Logo" className="icon-lg" />
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
