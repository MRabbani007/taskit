import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Imported Context
import useAuth from "../../hooks/useAuth";
// Imported Components
import MenuMobile from "../navigation/MenuMobile";
import { Button, Menu } from "antd";
// Imported Media
import Logo from "../../assets/todo.svg";
// Imported Icons
import { IoLogOutOutline, IoMenu, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import UserMenu from "../navigation/UserMenu";

export default function Navbar() {
  const { auth } = useAuth();
  const [viewMobileMenu, setViewMobileMenu] = useState(false);

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
      <Button type="primary">
        <Link to="/login" style={{}}>
          Get Started
        </Link>
      </Button>
    ),
  };

  const menuUser = {
    key: "navbar_user",
    icon: <AiOutlineUser size={30} />,
    label: auth?.user,
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
      <div className="hidden md:flex items-center">
        <AiOutlineUser size={30} />
        {auth?.user}
      </div>
    ),
    // style: {
    //   display: "flex",
    //   borderWidth: "1px",
    //   borderColor: "red",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   padding: 0,
    // },
    children: [
      {
        key: "navbar_admin_1",
        label: (
          <Link to={"/user/profile"} className="flex items-center gap-2">
            <FaRegCircleUser size={28} />
            Profile
          </Link>
        ),
      },
      {
        key: "navbar_admin_2",
        label: (
          <Link to={"/user/settings"} className="flex items-center gap-2">
            <IoSettingsOutline size={28} />
            Settings
          </Link>
        ),
      },
      {
        key: "navbar_admin_3",
        label: (
          <Link to={"/logout"} className="flex items-center gap-2">
            <IoLogOutOutline size={28} />
            Sign Out
          </Link>
        ),
      },
    ],
  };

  const mobileMenuButton = {
    key: "navbar_hamburger",
    // icon: <IoMenu size={30}  />,
    // label: "Menu",
    label: (
      <button
        className={
          (viewMobileMenu ? "is-active" : "") +
          " hamburger hamburger--spin md:hidden "
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

  // const items = !isLoggedIn
  //   ? [homeButton, menuGuest]
  //   : isAdmin
  //   ? [homeButton, menuAdmin, mobileMenuButton]
  //   : [homeButton, menuUser, mobileMenuButton];

  return (
    <>
      <nav className="flex items-center justify-between gap-4 py-2 px-4 bg-zinc-200">
        <Link to="/" title="Home Page" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-10" />
          <span className="font-bold text-xl">Taskit</span>
        </Link>
        <button
          title="Menu"
          onClick={() => setViewMobileMenu(true)}
          className="lg:hidden"
        >
          <IoMenu size={25} />
        </button>
        <UserMenu />
      </nav>
      <MenuMobile
        viewMobileMenu={viewMobileMenu}
        setViewMobileMenu={setViewMobileMenu}
      />
    </>
  );
}
