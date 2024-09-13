import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Imported Context
import useAuth from "../../hooks/useAuth";
// Imported Components
import MenuMobile from "../navigation/MenuMobile";
import UserMenu from "../navigation/UserMenu";
import { Button, Menu } from "antd";
// Imported Media
import Logo from "../../assets/todo.svg";
// Imported Icons
import {
  IoCalendarOutline,
  IoListOutline,
  IoLogOutOutline,
  IoMenu,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { BsBorderWidth, BsCardList, BsJournalText } from "react-icons/bs";
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
      <Button type="primary">
        <Link to="/login" style={{}}>
          Get Started
        </Link>
      </Button>
      // <div className="flex items-center gap-2">
      //   <AiOutlineUser size={30} />
      //   <span>Sign In</span>
      // </div>
    ),
    style: { marginLeft: "auto" },
    // children: [
    //   {
    //     key: "navbar_guest_login",
    //     label: (
    //       <Link to="/login" className="flex items-center gap-2">
    //         <AiOutlineLogin size={28} />
    //         <span>Sign In</span>
    //       </Link>
    //     ),
    //   },
    //   {
    //     key: "navbar_guest_register",
    //     label: (
    //       <Link to="/register" className="flex items-center gap-2">
    //         <HiOutlineUserPlus size={28} />
    //         <span>Sign Up</span>
    //       </Link>
    //     ),
    //   },
    // ],
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

  const homeButton = {
    key: "navbar_home",
    label: (
      <Link to="/" title="Home Page" className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-12" />
        <span className="font-bold text-xl">Taskit</span>
      </Link>
    ),
    style: { marginRight: "auto" },
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

  const items = !isLoggedIn
    ? [homeButton, menuGuest]
    : isAdmin
    ? [homeButton, menuAdmin, mobileMenuButton]
    : [homeButton, menuUser, mobileMenuButton];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        // theme="dark"
        items={items}
        className="bg-zinc-200"
      />
      <MenuMobile
        viewMobileMenu={viewMobileMenu}
        setViewMobileMenu={setViewMobileMenu}
      />
    </>
  );
};

export default Navbar;
