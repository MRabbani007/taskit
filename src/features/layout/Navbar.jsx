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
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import { SlNotebook } from "react-icons/sl";
import { BsCardList, BsJournalText } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import MenuMobile from "../navigation/MenuMobile";
import UserMenu from "../navigation/UserMenu";
import Logo from "../../assets/todo.svg";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";

const items = [
  {
    label: (
      <Link to="/" title="Home Page" className="flex items-center gap-1">
        <img src={Logo} alt="Logo" className="w-12" />
        Todo
      </Link>
    ),
    key: "navbar_home",
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <AiOutlineUser size={28} />
        User
      </div>
    ),
    key: "navbar_user",
    style: { marginLeft: "auto" },
    children: [
      {
        key: "navbar_user_1",
        label: (
          <Link to={"/settings"} className="flex items-center gap-1">
            <FaRegCircleUser size={28} />
            Profile
          </Link>
        ),
      },
      {
        key: "navbar_user_2",
        label: (
          <Link to={"/settings"} className="flex items-center gap-1">
            <IoSettingsOutline size={28} />
            Settings
          </Link>
        ),
      },
      {
        key: "navbar_user_3",
        label: (
          <Link to={"/logout"} className="flex items-center gap-1">
            <IoLogOutOutline size={28} />
            Sign Out
          </Link>
        ),
      },
    ],
  },
];

const Navbar = () => {
  const { auth } = useAuth();
  const [viewMobileMenu, setViewMobileMenu] = useState(false);

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const location = useLocation();

  const isActive = (page) => location.pathname.split("/").includes(page);

  const isHomePage =
    location.pathname.split("/")[1] === "" ||
    location.pathname.split("/")[1] === "dashboard";

  const isAdmin = auth?.roles && auth.roles.includes(5150);

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="bg-zinc-200 py-2"
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
              <img src={Logo} alt="Logo" className="icon-lg" />
              {/* <IoHomeOutline size={32} /> */}
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
