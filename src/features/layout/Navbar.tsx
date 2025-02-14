import { Link } from "react-router-dom";
import MenuMobile from "../navigation/MenuMobile";
// import Logo from "../../assets/todo.svg";
import UserMenu from "../navigation/UserMenu";
import { MdOutlineTaskAlt } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4 py-4 px-4 bg-gradient-to-l from-cyan-950 to-gray-950 text-white">
      <Link to="/" title="Home Page" className="flex items-center gap-2">
        {/* <img src={Logo} alt="Logo" className="w-10" /> */}
        <MdOutlineTaskAlt size={25} />
        <span className="font-bold text-xl">Taskit</span>
      </Link>
      <MenuMobile />
      <UserMenu />
    </nav>
  );
}
