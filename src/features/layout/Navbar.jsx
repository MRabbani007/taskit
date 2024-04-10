import { useContext } from "react";
import { Link } from "react-router-dom";
// Imported Context
import { UserContext } from "../../context/UserState";
// Imported Components
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import { SlNotebook } from "react-icons/sl";
import { BsCardList, BsJournalText } from "react-icons/bs";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <menu className="">
      <span className="flex gap-3 items-center">
        <Link to="/" title="Home Page">
          <IoHomeOutline className="icon" />
        </Link>
        <Link to="/mylists" title="My Lists">
          <BsCardList className="icon" />
        </Link>
        <Link to="/tasks" title="My Tasks">
          <IoListOutline className="icon" />
        </Link>
        <Link to="/notes" title="Notes">
          <SlNotebook className="icon-md" />
        </Link>
        <Link to="/journal" title="Journal">
          <BsJournalText className="icon-md" />
        </Link>
        {/* <Link to="/">
          <TbReportAnalytics className="icon" />
        </Link>
        <Link to="/">
          <IoAddCircleOutline className="icon mx-3" />
        </Link> */}
        {/* {auth?.roles && Object.values(auth?.roles).includes(5150) && (
          <Link to="/admin">
            <RiAdminLine className="icon" />
          </Link>
        )} */}
      </span>
      <div className="flex items-center gap-3">
        {/* <MdOutlineDarkMode className="icon mx-3" /> */}
        <Link to="/login">
          {auth?.user === "" ? "" : auth?.user}
          <FiUser className="icon ml-3" />
        </Link>
        <Link to="/settings">
          <IoSettingsOutline className="icon" />
        </Link>
      </div>
    </menu>
  );
};

export default Navbar;
