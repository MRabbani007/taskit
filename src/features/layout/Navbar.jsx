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
  IoSettingsOutline,
} from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  const { theme } = useContext(UserContext);

  return (
    <nav className="navbar px-5 duration-500 z-50 bg-zinc-950 text-zinc-300">
      <span>
        <Link to="/">
          <IoHomeOutline className="icon mr-3" />
        </Link>
        {/* <Link to="/">
          <TbReportAnalytics className="icon" />
        </Link>
        <Link to="/">
          <IoAddCircleOutline className="icon mx-3" />
        </Link> */}
        <Link to="/settings">
          <IoSettingsOutline className="icon" />
        </Link>
        <Link to="/admin">
          <RiAdminLine className="icon mx-3" />
        </Link>
      </span>
      <span>
        {/* <MdOutlineDarkMode className="icon mx-3" /> */}
        {auth?.user === "" ? (
          <Link to="/login">
            <FiUser className="icon" />
          </Link>
        ) : (
          <Link to="/login">
            {auth?.user === "" ? "" : auth?.user}
            <FiUser className="icon ml-3" />
          </Link>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
